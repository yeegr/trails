'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { TagList } from '../shared/Tag';
import { setBackgroundImage } from '../shared/Transformers';

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            loading: true
        };
    }

    componentDidMount() {
        $.get(window.apiBaseUrl + 'users/' + this.props.routeParams.id, function(data) {
            this.setState({
                detail: data,
                loading: false
            })
        }.bind(this));
    }

    render() {
        if (this.state.loading === true) {
            return (
                <detail data-loading></detail>
            );
        } else {
            const appSettings = window.appSettings,
                lang = window.lang,
                user = this.state.detail;

            return (
                <detail>
                    <user style={setBackgroundImage(appSettings.userBackground)}>
                        <circle className="avatar">
                            <avatar style={setBackgroundImage(user.avatar)} />
                        </circle>
                        <captain data-level={user.level}>{lang.goldCaptain}</captain>
                        <title>{user.handle}</title>
                        <div><points>{user.xp}</points></div>
                        <div><tag>10年驴龄</tag><tag>北京</tag><tag>英语</tag><tag>广东话</tag></div>
                    </user>
                    <main>
                        <section>
                            <header>
                                <h1>{lang.hisEvents}</h1>
                                <Link className="text-more" to={`/events`}>{lang.pastEvents}</Link>
                            </header>
                        </section>
                        <section>
                            <header>
                                <h1>{lang.hisTrails}</h1>
                                <Link className="text-more" to={`/trails`}>{lang.moreTrails}</Link>
                            </header>
                        </section>
                        <section>
                            <header>
                                <h1>{lang.hisPosts}</h1>
                                <Link className="text-more" to={`/posts`}>{lang.morePosts}</Link>
                            </header>
                        </section>
                    </main>
                </detail>
            )
        }
    }
};