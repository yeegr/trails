'use strict';

import React, { Component } from 'react';
import $ from 'jquery';

import { Link } from 'react-router';
import { setBackgroundImage, formatTime, formatDuration } from '../shared/Transformers';
import { UserCardItem } from '../user/UserList';
import Toolbar from '../shared/Toolbar';
import Map from '../shared/Map';
import { TrailInfo, TrailData } from './TrailUtil';

export default class TrailList extends Component {
    render() {
        return (
            <div>
                we need some trails!
            </div>
        )
    }
};

export class TrailCard extends Component {
    render() {
        const appSettings = window.appSettings,
            lang = window.lang,
            trail = this.props.trail,
            user = trail.user;

        return (
            <card type="info">
                <TrailInfo trail={trail} />
                <TrailData trail={trail} />
                <section className="map">
                    <Map key={trail.id} id={trail.id} type="trail" points={trail.points} />
                </section>
                <foot>
                    <row>
                        <UserCardItem user={user} />
                        <end>
                            <Toolbar type="trail" data={trail} />
                        </end>
                    </row>
                </foot>
            </card>
        );
    }
};
