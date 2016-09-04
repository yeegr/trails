'use strict';

import React, { Component } from 'react';

const clickHandler = (action, type, id) => {
    console.log('you clicked: ' + action + ' : ' + type + ' | ' + id);
};

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }
    
    likeClickHandler(e) {
        e.stopPropagation();
        clickHandler('like', this.props.type, this.props.id);
    }

    saveClickHandler(e) {
        e.stopPropagation();
        clickHandler('save', this.props.type, this.props.id);
    }

    shareClickHandler(e) {
        e.stopPropagation();
        clickHandler('share', this.props.type, this.props.id);
    }

    render() {
        return (
            <toolbar>
                <button onClick={(event)=>this.likeClickHandler(event)} type="glyph" data-glyph="like"></button>
                <button onClick={(event)=>this.saveClickHandler(event)} type="glyph" data-glyph="save"></button>
                <button onClick={(event)=>this.shareClickHandler(event)} type="glyph" data-glyph="share"></button>
            </toolbar>
        );
    }
};
