'use strict';

import React, { Component } from 'react';
import $ from 'jquery';

import { Link } from 'react-router';
import { TagList } from '../shared/Tag';
import { UserCardItem } from '../user/UserList';
import Toolbar from '../shared/Toolbar';
import { setBackgroundImage } from '../shared/Transformers';

export default class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            loading: true
        };
    }

    componentDidMount() {
        console.log('did mount');
        $.get(window.apiBaseUrl + 'events', function(data) {
            this.setState({
                eventList: data,
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
                    this.state.eventList.map(function(item, index) {
                        return (
                            <EventCard key={item.id} item={item} />
                        )
                    })
                }
            </list>
        );
    }
};

export class EventCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item,
              hero = setBackgroundImage(item.hero),
              user = item.captain,
              avatar = setBackgroundImage(user.avatar);

        return (
            <card key={item.id}>
                <Link to={`/events/event/${item.id}`}>
                    <hero style={hero}>
                        <intro>
                            <p>{item.province ? item.province + ' ' : ''}{item.city} {item.name}</p>
                            <div>
                                <tag></tag>
                            </div>
                        </intro>
                    </hero>
                </Link>
                <foot>
                    <row>
                        <UserCardItem user={user} />
                        <end>
                            <Toolbar type="event" data={item} />
                        </end>
                    </row>
                </foot>
            </card>
        );
    }
};