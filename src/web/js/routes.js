'use strict';

import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import App from './app';
import AreaList from './components/area/AreaList';
import AreaDetail from './components/area/AreaDetail';
import TrailList from './components/trail/TrailList';
import TrailDetail from './components/trail/TrailDetail';
import EventList from './components/event/EventList';
import EventDetail from './components/event/EventDetail';
import AgendaDetail from './components/event/Agenda';
import PostList from './components/post/PostList';
import PostDetail from './components/post/PostDetail';
import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';
import Gallery from './components/shared/Gallery';
import Map from './components/shared/Map';
import Comments from './components/shared/Comments';

module.exports = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="areas" component={AreaList} />
            <Route path="areas/:id" component={AreaDetail} />
            <Route path="areas/:id/gallery" component={Gallery} />
            <Route path="areas/:id/comments" component={Comments} />
            <Route path="trails" component={TrailList} />
            <Route path="trails/:id" component={TrailDetail} />
            <Route path="trails/:id/gallery" component={Gallery} />
            <Route path="trails/:id/comments" component={Comments} />
            <Route path="events" component={EventList} />
            <Route path="events/:id" component={EventDetail} />
            <Route path="events/:id/gallery" component={Gallery} />
            <Route path="events/:id/comments" component={Comments} />
            <Route path="posts" component={PostList} />
            <Route path="posts/:id" component={PostDetail} />
            <Route path="users" component={UserList} />
            <Route path="user/:id" component={UserDetail} />
        </Route>
    </Router>
);
