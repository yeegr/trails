'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <tabbar>
                    <tab><Link to="/areas">轨迹</Link></tab>
                    <tab><Link to="/events">活动</Link></tab>
                    <tab><Link to="/posts">文章</Link></tab>
                    <tab><Link to={`/user/${window.userId}`}>我的</Link></tab>
                </tabbar>
            </nav>
        )
    }
};
