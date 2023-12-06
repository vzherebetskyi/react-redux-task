
# REACT-REDUX-ROUTES-ACTIONS-REDUCERS

All of the mentioned components are set up with this boilerplate, along with some simple folder organising. I made this since the boilerplates I saw elsewhere were either too complicated, based in TypeScript, or had a folder hierarchy that was more rigid than necessary for managing the application.

I wanted something that I could start with and add to as I went along. Though it lacked redux setup and routing, `Create React App` seemed like a nice place to start. After adding those, I also included the fundamental framework for reducers and actions. Clutter is decreased and anything that didn't seem useful is deleted.

This template should come in handy for hackathons or anyone wishing to quickly build up React, Redux, and routing with the bare minimum.

## How to work with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

### Node Version 16

Set this as the node version.

### `npm install`

Installs all the dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Structure
Folder Structure is as follows:

 - **public**: Has all public files and `index.html` which gets mounted.
 - **src**: Has following parts:
#### index.js
Starting point of the react app. Has store and route setup.
#### components
Currently only `layouts` has been added. But things like error toast, notifications, sidebar etc can also be added as components here.
#### pages
Here is where the web app resides. It has been divided into different folders as per a feature. Currently has `App` and `Counter` folders.
#### redux
Has store definition, reducers, actionTypes and actions.

### Counter App
This app is accessible on route `/counter` and has a basic counter for increment, decrement and reset option. It uses counterActions and counterReducer and has end to end example on how to use it with actions and reducers.

### Things to add:
1. ajax example
2. bootstrap integration
3. better routing setup
4. testing setup
