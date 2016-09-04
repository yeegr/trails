'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import { setBackgroundImage } from '../shared/Transformers';

export default class UserList extends Component {
    render() {
        return (
            <div>
                we need some users!
            </div>
        )
    }
};

export class UserListItem extends Component {
    render() {
        const lang = window.lang,
            user = this.props.user;

        return (
            <row>
                <Link to={`/user/${user._id}`} className="user-link">
                    <start>
                        <avatar style={setBackgroundImage(user.avatar)}></avatar>
                    </start>
                    <center className="image-more">
                        <content>
                            <pretitle className="gold">{lang.goldCaptain}</pretitle>
                            <title>{user.handle}</title>
                        </content>
                    </center>
                </Link>
            </row>
        );
    }
};


export class UserCardItem extends Component {
    render() {
        const lang = window.lang,
            user = this.props.user;

        return (
            <Link to={`/user/${this.props.user._id}`} className="user-link">
                <start>
                    <avatar style={setBackgroundImage(user.avatar)}></avatar>
                </start>
                <center>
                    <content>
                        <pretitle className="gold">{lang.goldCaptain}</pretitle>
                        <title>{user.handle}</title>
                    </content>
                </center>
            </Link>
        );
    }
};
