'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router } from 'react-router';
import routes from './routes';
import Redux, { createStore } from 'redux';

window.apiBaseUrl = 'http://localhost:8888/';
const wrapper = document.querySelector('wrapper');

// todo: version comparison
// todo: better global
// todo: local storage
var url = window.apiBaseUrl + 'settings/latest';

$.get(url, function(result) {
    if (result) {
        var appSettings = result;

        window.lang = appSettings.lang,
        window.apiBaseUrl = appSettings.apiBaseUrl ? appSettings.apiBaseUrl : window.apiBaseUrl,
        window.assetUri = appSettings.assetUri,
        window.appSettings = appSettings,
        window.userId = "57440a4a3addc708af80f429";

        render(
            <Router>
                {routes}
            </Router>,
            wrapper
        );
    }
});
