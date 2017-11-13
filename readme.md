# Soy with Incremental DOM Demo App

## Overview

This is an implementation of [TodoMVC](http://todomvc.com/) using Soy templates compiled to IncrementalDOM.

## Hacking On The App

You will need to install the [boot build tool](https://github.com/boot-clj/boot).

Once you have boot installed you can run:

    boot dev

and open your browser to [localhost:3000](http://localhost:3000/). Changes you make to the Soy templates will auto compile and re-render in the browser without refreshing the page.

To run a "production" build with advanced compilation run:

    boot prod
