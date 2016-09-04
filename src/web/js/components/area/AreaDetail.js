'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { TagList } from '../shared/Tag';
import Icon from '../shared/Icon';
import { GalleryPreview } from '../shared/Gallery';
import { setBackgroundImage } from '../shared/Transformers';
import { UserListItem } from '../user/UserList';
import { TrailCard } from '../trail/TrailList';

export default class AreaDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: true
        };
    }

    componentDidMount() {
        $.get(window.apiBaseUrl + 'areas/' + this.props.routeParams.id, function(data) {
            this.setState({
                data: data,
                loading: false
            })
        }.bind(this));
    }

    render() {
        if (this.state.loading === true) {
            return (
                <data data-loading></data>
            );
        } else {
            const appSettings = window.appSettings,
                lang = window.lang,
                tagList = lang.tagList.split(','),
                data = this.state.data,
                hero = setBackgroundImage(data.hero);

            var leaderSection = null,
                trailSection = null;

            if (data.leaders && data.leaders.length > 0) {
                leaderSection = (
                    <section>
                        <header>
                            <h1>{lang.topCaptains}</h1>
                        </header>
                        <list>
                        {
                            data.leaders.map(function(user, index) {
                                return (
                                    <UserListItem key={user._id} user={user} />
                                )
                            })
                        }
                        </list>
                    </section>
                );
            }

            if (data.trail && data.trails.length > 0) {
                trailSection = (
                    <section>
                        <header>
                            <h1>{lang.trails}</h1>
                            <Link className="text-more" to={`/trails`}>{lang.moreTrails}</Link>
                        </header>
                        <list>
                        {
                            data.trails.map(function(trail, index) {
                                return (
                                    <TrailCard key={trail.id} trail={trail} />
                                )
                            })
                        }
                        </list>
                    </section>
                );
            }

            return (
                <detail>
                    <hero style={hero}>
                        <intro>
                            <h3>{data.province ? data.province + ' ' : ''}{window.lang.cities[data.city]} {data.name}</h3>
                            <p>{data.description}</p>
                        </intro>
                    </hero>
                    <main>
                        <section>
                            <header>
                                <h1>{lang.tags}</h1>
                            </header>
                            <grid>
                            {
                                data.tags.map(function(val, index) {
                                    return (
                                        <Icon key={index} value={val} label={tagList[val]} />
                                    )
                                })
                            }
                            </grid>
                        </section>
                        <GalleryPreview path={`/areas/area/${data.id}`} id={data.id} photos={data.photos} />
                        <section>
                            <header>
                                <h1>{lang.map}</h1>
                                <Link className="text-more" to={`areas/area/${data.id}/map`}>{lang.dataMap}</Link>
                            </header>
                            <row>
                                <map></map>
                            </row>
                        </section>
                        {
                            leaderSection
                        }
                        {
                            trailSection
                        }
                    </main>
                </detail>
            )
        }
    }
}