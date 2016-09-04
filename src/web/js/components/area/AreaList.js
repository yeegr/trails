'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { setBackgroundImage } from '../shared/Transformers';
import { TagList } from '../shared/Tag';
import { UserCardItem } from '../user/UserList';
import Toolbar from '../shared/Toolbar';

export default class AreaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaList: [],
            city: '010',
            loading: true
        };
    }

    componentDidMount() {
        $.get(window.apiBaseUrl + 'areas/?city=' + this.state.city, function(data) {
            this.setState({
                areaList: data,
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
                    this.state.areaList.map(function(item, index) {
                        return (
                            <AreaCard key={item.id} area={item} />
                        )
                    })
                }
            </list>
        );
    }
};

export class AreaCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const area = this.props.area,
              hero = setBackgroundImage(area.hero),
              tagList = lang.tagList.split(',');

        var tags = [];
        area.tags.map(function(t) {
            tags.push(tagList[t]);
        });

        return (
            <card key={area.id}>
                <Link to={`/areas/${area._id}`}>
                    <hero style={hero}>
                        <intro>
                            <p>{area.province ? area.province + ' ' : ''}{window.lang.cities[area.city]} {area.name}</p>
                            <div>
                                <tag className="primary">共{area.totalTrails}条轨迹</tag>
                                <TagList tags={tags} />
                            </div>
                        </intro>
                    </hero>
                </Link>
                <foot>
                    <row>
                        <tier>
                        {
                            area.leaders.map(function(user, index) {
                                return (
                                    <Link kye={index} to={`/user/${user._id}`} className="avatar-link">
                                        <avatar style={setBackgroundImage(user.avatar)}></avatar>
                                    </Link>
                                )
                            })
                        }
                        </tier>
                        <end>
                            <Toolbar type="area" data={area} />
                        </end>
                    </row>
                </foot>
            </card>
        );
    }
}
