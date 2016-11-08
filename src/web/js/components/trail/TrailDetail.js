'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Icon from '../shared/Icon';
import Map from '../shared/Map';
import { TagList } from '../shared/Tag';
import { GalleryPreview } from '../shared/Gallery';
import CommentPreview from '../shared/CommentPreview';
import { createMarkup } from '../shared/Transformers';
import { TrailInfo, TrailData } from './TrailUtil';
import { UserListItem } from '../user/UserList';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            loading: true
        };
    }

    componentDidMount() {
        console.log('did mount');
        $.get(window.apiBaseUrl + 'trails/trail/1', function(data) {
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
                trail = this.state.detail,
                user = trail.user;

            return (
                <detail>
                    <main>
                        <TrailInfo trail={trail} />
                        <TrailData trail={trail} />
                        <section>
                            <row>
                                <Map id={trail.id} type="trail" points={trail.points} />
                            </row>
                        </section>
                        <section>
                            <UserListItem key={user._id} user={user} />
                        </section>
                        <section>
                            <header>
                                <h1>{lang.description}</h1>
                            </header>
                            <post>
                                <div className="html-content" dangerouslySetInnerHTML={createMarkup(trail.description)} />
                            </post>
                        </section>
                        <GalleryPreview path={`/trails/trail/${trail.id}`} photos={trail.photos} />
                        <CommentPreview path={`/trails/trail/${trail.id}`} comments={trail.comments} />
                    </main>
                </detail>
            )
        }
    }
}