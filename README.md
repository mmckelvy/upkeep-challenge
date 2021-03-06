# UpKeep Code Challenge

## Installation & Setup
Make sure you have [Node.js](https://nodejs.org/en/download/) installed.

Clone the repo.

From the repo's working directory, run:


    npm install

Then run:

    npm run build:prod

## Start the app

    npm run start:prod

Navigate your browser to:

    localhost:3000

That's it!

## Build and run in development mode
Development mode watches files and recompiles the backend and frontend when anything changes.  It also does not minify or gzip the code.  **For purposes of checking the exercise, you do NOT need to run the app in dev mode.**

Cleanup the prod frontend files:

    npm run build:dev

Build & watch the frontend:

    npm run watch:dev

Start (do this in a separate terminal tab):

    npm run start:dev

## Style overview
I prefer to build my UIs with components, and I try to keep styles encapsulated at the component level via inline styles written in JavaScript.  This avoids many of the pitfalls of traditional CSS (e.g. global variables) and gives you the power of a proper programming language for styling.

In addition to component level styles, I generally build out a design system with core typography, spacing, colors, and shadows expressed as JavaScript variables (see `/assets/js/src/theme`).  This keeps design consistent and allows for faster iteration.

Finally, I do use traditional CSS where styles need to be applied globally.  I generally co-locate these styles with the appropriate component (see `/assets/js/src/views/Root`) for development convenience and extract them to a separate file via webpack.

Note that I am comfortable using traditional CSS systems (Less, Sass) and some of the newer flavors of styling approaches such as CSS-in-JS if necessary.
