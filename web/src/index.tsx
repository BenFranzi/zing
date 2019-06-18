import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import ConfigureStore from './state/ConfigureStore';
import {createApiClient, getApiClient} from './api/ApiClient';
import config from './config/config';

createApiClient(config.apiEndpont);
const store = ConfigureStore();

ReactDOM.render(
    <BrowserRouter>
        <ReduxProvider store={store}>
            <App/>
        </ReduxProvider>
    </BrowserRouter>,
    document.getElementById('root')
);