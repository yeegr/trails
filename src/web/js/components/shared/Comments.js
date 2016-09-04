'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import Moment from 'moment';
import { setBackgroundImage, formatFromNow } from './Transformers';

export default class Comments extends Component {
    render() {
        const comments = (this.props.type === 'preview') ? this.props.comments : window.tempCommentStore;

        return (
            <list>
                {
                    comments.map(function(comment, index) {
                        const user = comment.user;

                        return (
                            <row key={`user-${index}`}>
                                <start>
                                    <avatar style={setBackgroundImage(user.avatar)}></avatar>
                                </start>
                                <center>
                                    <content>
                                        <title>{user.handle}</title>
                                        <subtitle>{formatFromNow(comment.uploaded)}</subtitle>
                                        <comment>{comment.content}</comment>
                                    </content>
                                </center>
                            </row>
                        )
                    })
                }
            </list>
        );
    }
};

export class CommentsPreview extends Component {
    render() {
        const appSettings = window.appSettings,
            lang = window.lang,
            path = this.props.path + '/comments',
            id = this.props.id,
            comments = this.props.comments.items,
            preview = comments.slice(0, appSettings.maxCommentPreviewsPerTrail),
            more = (comments.length > appSettings.maxCommentPreviewsPerTrail) ? <Link className="text-more" to={`${path}`}>{lang.moreComments}</Link> : null;

            window.tempCommentStore = comments;

        return (
            <section>
                <header>
                    <h1>{lang.comments}</h1>
                    { more }
                </header>
                <Comments type="preview" comments={preview} />
            </section>
        );
    }
};
