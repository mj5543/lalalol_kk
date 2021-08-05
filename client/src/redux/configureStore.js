import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import users from "./modules/users";
import auth from "./modules/auth";
import { createBrowserHistory } from "history";
import  { composeWithDevTools } from "redux-devtools-extension";

const env = process.env.NODE_ENV;

const history = createBrowserHistory()

const middlewares = [thunk, routerMiddleware(history)];

if(env === 'development') {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  auth,
  users,
  routing: routerReducer,
});

let store;

if (env === "development") {
  store = initialState =>
    createStore(reducer,
    composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };

export default store();