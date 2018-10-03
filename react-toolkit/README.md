## HOW TO USE

1. install the package `yarn add --dev ../path/to/react-toolkit/`
2. install peer dependencies `yarn add react react-dom`
3. create a *index.html* in the root of your project - it will be used as a template
4. create the entry file of your app - *src/client.jsx* - e.g:
```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(
  <App />,
  document.getElementById("element-id")
);
```
5. finally add scripts to the *package.json*:
```json
"scripts": {
  "dev": "react-toolkit dev",  // this runs the development server
  "build": "react-toolkit build" // this builds the optimized and minified version of your app to the `dist/` directory
},
```

