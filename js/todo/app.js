goog.provide('todo.app');

goog.require('goog.array');

goog.require('todo.Component');
goog.require('todo.views');

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]) {

            return squares[a];
        }
    }
    return null;
}

todo.app.Square = class extends todo.Component {
    constructor(props) {
        super(todo.views.square);
        this.props = props;
    }

    getViewModel() {
        return {
            value: this.props.value,
            onClick: this.props.onClick,
        };
    }
};

todo.app.Board = class extends todo.Component {
    constructor(props) {
        super(todo.views.board);
        this.props = props;
    }

    renderSquare(i) {
        return new todo.app.Square({
            value: this.props.squares[i],
            onClick: () => this.props.onClick(i),
        });
    }

    getViewModel() {
        let squares = goog.array.map(
            goog.array.range(9),
            (i) => {
                return this.renderSquare(i);
            }
        );

        return {
            squares: squares,
        };
    }
}

todo.app.Game = class extends todo.Component {
    constructor() {
        super(todo.views.game);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.state = {
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        };
        this.update();
    }

    jumpTo(step) {
        this.state = {
            history: this.state.history,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        };
        this.update();
    }

    getViewModel() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                         'Go to move #' + move :
                         'Go to game start';
            return {
                desc: desc,
                onClick: () => this.jumpTo(move),
            };
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return {
            board: new todo.app.Board({
                squares: current.squares,
                onClick: (i) => this.handleClick(i),
            }),
            moves: moves,
            status: status,
        };
    }
}

/** Start the app */
todo.app.main = () => {
    let renderComponent = () => {
        todo.Component.render(
            document.getElementById('root'),
            new todo.app.Game()
        );

        todo.Component.render(
            document.getElementById('root2'),
            new todo.app.Game()
        );
    };

    renderComponent();

    /** Allow for hot swapping */
    todo.app.onReload = () => {
        renderComponent();
    };
};
