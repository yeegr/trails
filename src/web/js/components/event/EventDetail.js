'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { TagList } from '../shared/Tag';
import Icon from '../shared/Icon';
import { GalleryPreview } from '../shared/Gallery';
import { formatTime, setBackgroundImage, phoneLink, createMarkup } from '../shared/Transformers';
import { UserListItem } from '../user/UserList';
import { Agenda } from './Agenda';

export default class AreaDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            loading: true
        };
    }

    componentDidMount() {
        console.log('did mount');
        $.get(window.apiBaseUrl + 'events/event/1', function(data) {
            this.setState({
                event: data,
                loading: false
            })
        }.bind(this));
    }

    componentDidUpdate() {
        const body = document.querySelector('body'),
            nav = document.querySelector('nav'),
            hero = document.querySelector('hero'),
            sidebar = document.querySelector('sidebar'),
            earArray = Array.prototype.slice.call(document.querySelectorAll('sidebar ear')),
            sectionArray = Array.prototype.slice.call(document.querySelectorAll('main section')),
            navHeight = nav ? nav.offsetHeight : 0,
            heroHeight = hero ? hero.offsetHeight : 0;

        let posArray = [];

        sectionArray.forEach(function (i) {
            posArray.push(i.offsetTop - navHeight);
        });

        window.addEventListener('scroll', function (e) {
            var scrollTop = body.scrollTop,
                scrollDiff = Math.ceil(scrollTop) - heroHeight,
                posIndex = (Math.ceil(scrollTop) + window.innerHeight === body.scrollHeight) ? (posArray.length - 1) : posSeeker(posArray, scrollDiff);

            sidebar.className = (scrollDiff >= 0) ? 'fixed' : '';
            setEar(posIndex);
        }, false);

        setEar(0);

        function posSeeker(arr, num) {
            if (num < arr[1]) {
                return 0;
            } else if (num >= arr[arr.length - 1]) {
                return arr.length - 1;
            } else {
                for (var i = 1, j = arr.length - 1; i < j; i++) {
                    if (num >= arr[i] && num < arr[i+1]) {
                        return i;
                    }
                }
            }
        };

        function setEar(index) {
            earArray.forEach(function (item, i) {
                (index === i) ? item.setAttribute('selected', 'selected') : item.removeAttribute('selected');
            })
        };
    }

    earClick(e) {
        const target = document.getElementById(e.currentTarget.getAttribute('class')),
            body = document.querySelector('body'),
            nav = document.querySelector('nav'),
            navHeight = nav ? nav.offsetHeight : 0;

        target.scrollIntoView();

        if (navHeight > 0) {
            window.scrollTo(0, body.scrollTop - navHeight);
        }

    }

    render() {
        if (this.state.loading === true) {
            return (
                <detail data-loading></detail>
            );
        } else {
            const appSettings = window.appSettings,
                lang = window.lang,
                tagList = lang.tagList.split(','),
                gearList = lang.gearList.split(','),
                event = this.state.event,
                gatherTime = formatTime(event.gatherTime, 'lll'),
                heroImage = setBackgroundImage(event.hero),
                captain = event.captain;

            return (
                <detail>
                    <hero style={heroImage}>
                        <intro>
                            <p>{event.description}</p>
                        </intro>
                    </hero>
                    <main>
                        <sidebar>
                            <ear onClick={this.earClick.bind(this)} className="eventInfo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4V22h4v12zm0-16h-4v-4h4v4z"/>
                                </svg>
                                <div>{lang.eventInfo}</div>
                            </ear>
                            <ear onClick={this.earClick.bind(this)} className="signUps">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M32 22c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm-16 0c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm0 4c-4.67 0-14 2.34-14 7v5h28v-5c0-4.66-9.33-7-14-7zm16 0c-.58 0-1.23.04-1.93.11C32.39 27.78 34 30.03 34 33v5h12v-5c0-4.66-9.33-7-14-7z"/>
                                </svg>
                                <div>{lang.signUps}</div>
                            </ear>
                            <ear onClick={this.earClick.bind(this)} className="detailSchedule">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M34 24H24v10h10V24zM32 2v4H16V2h-4v4h-2c-2.21 0-3.98 1.79-3.98 4L6 38c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4h-2V2h-4zm6 36H10V16h28v22z"/>
                                </svg>
                                <div>{lang.detailSchedule}</div>
                            </ear>
                            <ear onClick={this.earClick.bind(this)} className="eventExpenses">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M28,24h6v4h-7v4h7v4h-7v6h-6v-6h-7v-4h7v-4h-7v-4h6L9.6,6h8L24,17.1L30.4,6h8L28,24z"/>
                                </svg>
                                <div>{lang.eventExpenses}</div>
                            </ear>
                            <ear onClick={this.earClick.bind(this)} className="destination">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M9,21v14h6V21H9z M21,21v14h6V21H21z M5,45h38v-6H5V45z M33,21v14h6V21H33z M24,3L5,13v4h38v-4L24,3z"/>
                                </svg>
                                <div>{lang.destination}</div>
                            </ear>
                            <ear onClick={this.earClick.bind(this)} className="gearsToBring">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M38 12h-4c0-5.52-4.48-10-10-10S14 6.48 14 12h-4c-2.21 0-3.98 1.79-3.98 4L6 40c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zM24 6c3.31 0 6 2.69 6 6H18c0-3.31 2.69-6 6-6zm0 20c-5.52 0-10-4.48-10-10h4c0 3.31 2.69 6 6 6s6-2.69 6-6h4c0 5.52-4.48 10-10 10z"/>
                                </svg>
                                <div>{lang.gearsToBring}</div>
                            </ear>
                            <ear onClick={this.earClick.bind(this)} className="eventNotes">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z"/>
                                </svg>
                                <div>{lang.eventNotes}</div>
                            </ear>
                        </sidebar>
                        <article>
                            <section id="eventInfo">
                                <header>
                                    <h2>{lang.eventInfo}</h2>
                                </header>
                                <list>
                                    <row>
                                        <start>
                                            <pictogram shape="circle" data-value={event.type} />
                                        </start>
                                        <center>
                                            <pretitle>{lang.eventTitle}</pretitle>
                                            <title>{event.title}</title>
                                        </center>
                                    </row>
                                    <row>
                                        <start>
                                            <pictogram shape="circle" data-glyph="clock" />
                                        </start>
                                        <center>
                                            <pretitle>{lang.gatherTime}</pretitle>
                                            <title>{gatherTime}</title>
                                        </center>
                                    </row>
                                    <Link to={{pathname: `/events/event/${event.id}/map`, query: {poi: JSON.stringify(event.gatherLocation)}}}>
                                        <row>
                                            <start>
                                                <pictogram shape="circle" data-glyph="pin" />
                                            </start>
                                            <center className="image-more">
                                                <pretitle>{lang.gatherLocation}</pretitle>
                                                <title>{event.gatherLocation.name}</title>
                                            </center>
                                        </row>
                                    </Link>
                                    <UserListItem user={captain} />
                                    <row>
                                        <start>
                                            <pictogram shape="circle" data-glyph="phone" />
                                        </start>
                                        <center>
                                            <pretitle>{lang.mobileNumbers}</pretitle>
                                            <title>
                                                {
                                                    event.phoneNumbers.map(function(tel) {
                                                        return (
                                                            <a className="tel" key={tel} href={phoneLink(tel)}>{tel}</a>
                                                        )
                                                    })
                                                }
                                            </title>
                                        </center>
                                    </row>
                                    <row>
                                        <start>
                                            <pictogram shape="circle" data-glyph="group" />
                                        </start>
                                        <center>
                                            <pretitle>{lang.attendeeLimits}</pretitle>
                                            <title>
                                                {event.minAttendee} - {event.maxAttendee}{lang.persons}
                                            </title>
                                        </center>
                                    </row>
                                </list>
                            </section>
                            <section id="signUps">
                            </section>
                            <section id="detailSchedule">
                                <header>
                                    <h2>{lang.detailSchedule}</h2>
                                </header>
                                {
                                    event.schedule.map(function(day, i) {
                                        return (
                                            <day key={i}>
                                                {
                                                    day.map(function(agenda, j) {
                                                        return (
                                                            <Agenda day={i} key={j} index={j} path={`/events/event/${event.id}`} agenda={agenda} />
                                                        )
                                                    })
                                                }
                                            </day>
                                        )
                                    })
                                }
                            </section>
                            <section id="eventExpenses">
                                <header>
                                    <h2>{lang.eventExpenses}</h2>
                                </header>
                                <list>
                                    <row>
                                        <center>
                                            <pretitle>{lang.expenseDetail}</pretitle>
                                            <div className="html-content" dangerouslySetInnerHTML={createMarkup(event.expenses.detail)} />
                                        </center>
                                    </row>
                                    <row>
                                        <center>
                                            <pretitle>{lang.expenseIncludes}</pretitle>
                                            <div className="html-content" dangerouslySetInnerHTML={createMarkup(event.expenses.includes)} />
                                        </center>
                                    </row>
                                    <row>
                                        <center>
                                            <pretitle>{lang.expenseExcludes}</pretitle>
                                            <div className="html-content" dangerouslySetInnerHTML={createMarkup(event.expenses.excludes)} />
                                        </center>
                                    </row>
                                </list>
                            </section>
                            <section id="destination">
                                <header>
                                    <h2>{lang.destination}</h2>
                                </header>
                                <list>
                                    <row>
                                        <center>
                                            <div className="html-content" dangerouslySetInnerHTML={createMarkup(event.destination)} />
                                        </center>
                                    </row>
                                </list>
                            </section>
                            <section id="gearsToBring">
                                <header>
                                    <h2>{lang.gearsToBring}</h2>
                                </header>
                                <list>
                                    <row>
                                        <center>
                                            <grid className="figure-list">
                                            {
                                                event.gears.images.map(function(num, i) {
                                                    return (
                                                        <gear key={num} style={setBackgroundImage(`gears/${num}.jpg`)}><gear-caption>{gearList[num]}</gear-caption></gear>
                                                    )
                                                })
                                            }
                                            </grid>
                                        </center>
                                    </row>
                                    <row>
                                        <center>
                                            <pretitle>{lang.otherGears}</pretitle>
                                            <div className="tag-list">
                                                <TagList tags={event.gears.tags} />
                                            </div>
                                        </center>
                                    </row>
                                </list>
                            </section>
                            <section id="eventNotes">
                                <header>
                                    <h2>{lang.eventNotes}</h2>
                                </header>
                                <list>
                                    <row>
                                        <center>
                                            <div className="html-content" dangerouslySetInnerHTML={createMarkup(event.notes)} />
                                        </center>
                                    </row>
                                </list>
                            </section>
                        </article>
                    </main>
                </detail>
            )
        }
    }
}