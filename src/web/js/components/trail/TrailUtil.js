'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import Toolbar from '../shared/Toolbar';
import Map from '../shared/Map';
import { setBackgroundImage, formatTime, formatDuration } from '../shared/Transformers';

export class TrailInfo extends Component {
    render() {
        var trail = this.props.trail;

        return (
            <section>
                <Link to={`/trails/trail/${trail.id}`}>
                    <row>
                        <start>
                            <pictogram shape="circle" data-value={trail.type} />
                        </start>
                        <center>
                            <content>
                                <title>{trail.title}</title>
                                <subtitle>{formatTime(trail.date)}</subtitle>
                            </content>
                        </center>
                    </row>
                </Link>
            </section>
        );
    }
};

export class TrailData extends Component {
    render() {
        var trail = this.props.trail;

        return (
            <section>
                <grid>
                    <tile>
                        <pictogram type="glyph" data-glyph={trail.difficultyLevel} />
                        <tile-caption>{lang.difficultyLevel}</tile-caption>
                        <tile-data>{trail.difficultyLevel}</tile-data>
                    </tile>
                    <tile>
                        <pictogram type="glyph" data-glyph="timer" />
                        <tile-caption>{lang.totalDuration}</tile-caption>
                        <tile-data>{formatDuration(trail.totalDuration)}</tile-data>
                    </tile>
                    <tile>
                        <pictogram type="glyph" data-glyph="ruler" />
                        <tile-caption>{lang.totalDistance}</tile-caption>
                        <tile-data>{trail.totalDistance}{lang.kilometre}</tile-data>
                    </tile>
                    <tile>
                        <pictogram type="glyph" data-glyph="trending-up" />
                        <tile-caption>{lang.totalElevation}</tile-caption>
                        <tile-data>{trail.totalElevation}{lang.metre}</tile-data>
                    </tile>
                    <tile>
                        <pictogram type="glyph" data-glyph="going-up" />
                        <tile-caption>{lang.maximumAltitude}</tile-caption>
                        <tile-data>{trail.maximumAltitude}{lang.metre}</tile-data>
                    </tile>
                    <tile>
                        <pictogram type="glyph" data-glyph="dashboard" />
                        <tile-caption>{lang.averageSpeed}</tile-caption>
                        <tile-data>{trail.averageSpeed}{lang.kilometrePerHour}</tile-data>
                    </tile>
                </grid>
            </section>
        );
    }
};