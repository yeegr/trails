'use strict';

import React, { Component } from 'react';
import { RouteHandler } from 'react-router';
import Header from './components/shared/Header';
  
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <app>
                <Header />
                <page>
                {
                    this.props.children
                }
                </page>
            </app>
        )
    }
};
