'use strict';

import React, { Component } from 'react';
import $ from 'jquery';

import { Link } from 'react-router';
import { TagList } from '../shared/Tag';
import Toolbar from '../shared/Toolbar';
import { setBackgroundImage } from '../shared/Transformers';
import { UserCardItem } from '../user/userList';

export default class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            loading: true
        };
    }

    componentDidMount() {
        console.log('did mount');
        $.get(window.apiBaseUrl + 'posts', function(data) {
            this.setState({
                postList: data,
                loading: false
            })
        }.bind(this));
    }

    componentWillReceiveProps() {
        console.log('will receive props - set props');
    }

    componentWillUpdate() {
        console.log('will update');
    }

    componentDidUpdate() {
        console.log('did update');
    }

    render() {
        var loading = this.state.loading ? 'true' : 'false';

        return (
            <list data-loading={loading}>
                {
                    this.state.postList.map(function(post, index) {
                        return (
                            <PostCard key={post.id} post={post} />
                        )
                    })
                }
            </list>
        );
    }
};

export class PostCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const post = this.props.post,
              hero = setBackgroundImage(post.hero),
              creator = post.creator;

        return (
            <card key={post.id}>
                <Link to={`/posts/${post._id}`}>
                    <hero style={hero}>
                        <intro>
                            <p>{post.title}</p>
                            <TagList tags={post.tags} />
                        </intro>
                    </hero>
                </Link>
                <foot>
                    <row>
                        <UserCardItem user={creator} />
                        <end>
                            <Toolbar type="post" data={post} />
                        </end>
                    </row>
                </foot>
            </card>
        );
    }
}

