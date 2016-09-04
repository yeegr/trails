'use strict';

import React, { Component } from 'react';

export default class Tag extends Component {
    render() {
        return (
            <tag>{this.props.text}</tag>
        );
    }
};

export class TagList extends Component {
    render() {
        return (
            <span>
            {
                this.props.tags.map(function(t, i) {
                    return (
                        <Tag key={'tag-'+i} text={t} />
                    )
                })
            }
            </span>
        );
    }
};