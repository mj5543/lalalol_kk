import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/configureStore';
// import {createStore} from 'redux';
// import reducers from './reducers';

// const store = createStore(reducers);

const Root = () => {
    console.log(store.getState())
    
    return (

    <Provider store={store}>
      <BrowserRouter>
        <App store={store}/>
      </BrowserRouter>
    </Provider>
)};

export default Root;