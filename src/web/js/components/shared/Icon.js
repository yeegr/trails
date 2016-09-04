'use strict';

import React, { Component } from 'react';

export default class Icon extends Component {
    render() {
        return (
            <icon><pictogram shape="circle" data-value={this.props.value} />{this.props.label}</icon>
        )
    }
};
