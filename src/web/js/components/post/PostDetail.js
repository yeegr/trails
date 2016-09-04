'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Icon from '../shared/Icon';
import { TagList } from '../shared/Tag';
import { GalleryPreview } from '../shared/Gallery';
import { setBackgroundImage, createMarkup } from '../shared/Transformers';
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
        $.get(window.apiBaseUrl + 'posts/' + this.props.routeParams.id, function(data) {
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
                post = this.state.detail,
                hero = setBackgroundImage(post.hero),
                creator = post.creator;

            return (
                <detail>
                    <hero style={hero}>
                        <intro>
                            <p>{post.title}</p>
                            <TagList tags={post.tags} />
                        </intro>
                    </hero>
                    <main>
                        <section>
                            <UserListItem key={creator._id} user={creator} />
                        </section>
                        <section>
                            <post>
                                <div className="html-content" dangerouslySetInnerHTML={createMarkup(post.content)} />
                            </post>
                        </section>
                    </main>
                </detail>
            )
        }
    }
}