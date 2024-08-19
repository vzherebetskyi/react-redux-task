# REACT-REDUX-CHALLENGE-TASK

A challenge task built in accordance with the requirements.
It renders a list of articles fetched using the following APIs:

- NewsAPI
- The Guardian
- New York Times

The project has implemented search for articles by keyword and filter the results by date, category, and source. Search is done by sending the request to the API and rendering the received results. Filtering is done on the FE. Filters are formed from the results sent by the API. Search and filtering are not persistent so if you refresh the page they will be gone.

Alongside with search and filtering it is possible to set preferences. Preferences are persistent (stored in the localStorage) and are applied when the page is loaded. So if you changed the preferences you need to refresh the page for preferences to be reapplied.

## How the project was built

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

### Node Version 20+

Set this as the node version.

### Add .env file

Create .env.development and .env.production files in the root folder and add the API keys to it.
REACT_APP_NEWS_API_KEY=...
REACT_APP_GUARDIAN_API_KEY=...
REACT_APP_NYT_API_KEY=...

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

### `npm test`

To run tests for the project.

## Start Docker container

Create .env file in the root directory and copy env variables to it (it will be sent to you in a separate message).

Run command `docker build -t <container-name> .`

Run command
`docker run \`<br>
`-it \` <br>
`--rm \`<br>
`-v ${PWD}:/app \`<br>
`-p 3001:3000 \`<br>
`-e CHOKIDAR_USEPOLLING=true \`<br>
`<container-name>`<br>

Open http://localhost:3001/

## Structure

Folder Structure is as follows:

- **public**: Has all public files and `index.html` which gets mounted.
- **src**: Has following parts:

#### index.js

Starting point of the react app. Has store and route setup.

#### assets

All images are stored in the assets folder.

#### components

Currently `layouts`, FilterBlock and several other reusable components have been added.

#### pages

Here is where the web app resides. It has been divided into different folders as per a page. Currently has `ArticlesList` and `NotFound` pages.

#### redux

Has store definition, reducers, actionTypes and actions.

#### services

Has the implementation of main requests made to the API.

#### services

Folder with tests for the project.
