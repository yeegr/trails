'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

export class Agenda extends Component {
    render() {
        const lang = window.lang,
            path = this.props.path, 
            day = this.props.day,
            index = this.props.index, 
            agenda = this.props.agenda,
            type = agenda.type;

        if (type > 89 && type < 100) {
            return (
                <Link to={`${path}/agenda/${day}/${index}`}>
                    <row>
                        <start>
                            <pictogram shape="circle" data-value={type} />
                        </start>
                        <center className="image-more">
                            <split data-glyph="circle-next">
                                <pretitle>
                                    <span>{agenda.start}</span>
                                    <span>{agenda.end}</span>
                                </pretitle>
                                <title>
                                    <span>{agenda.from.name}</span>
                                    <span>{agenda.to.name}</span>
                                </title>
                            </split>
                        </center>
                    </row>
                </Link>
            );
        } else if (type < 90) {
            return (
                <Link to={`${path}/agenda/${day}/${index}`}>
                    <row>
                        <start>
                            <pictogram shape="circle" data-value={type} />
                        </start>
                        <center className="image-more">
                            <split>
                                <pretitle>
                                    <span>{agenda.start}</span>
                                    <span>{agenda.end}</span>
                                </pretitle>
                                <title>{agenda.from.name}</title>
                            </split>
                        </center>
                    </row>
                </Link>
            );
        }
    }
};


export default class AgendaDetail extends Component {
    render() {
        const lang = window.lang;

        return (
            <div>
                agenda detail
            </div>
        );
    }
};
