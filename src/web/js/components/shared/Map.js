'use strict';

import React, { Component } from 'react';

export default class Map extends Component {
    remapTrailPoints(points) {
        var path = points.map(function(arr, index) {
                return [arr[2], arr[1]];
            })
        return path;
    }

    mapTrail(mapId, points) {
        var mapping = window.appSettings.mapping,
            path = this.remapTrailPoints(points),
            map = new AMap.Map(mapId, {
                keyboardEnable: false,
                scrollWheel: false,
                zoomEnable: false
            }),
            satelliteLayer = new AMap.TileLayer.Satellite(),
            polyline = new AMap.Polyline({
                path: path,
                strokeColor: mapping.strokeColor,
                strokeOpacity: mapping.strokeOpacity,
                strokeWeight: mapping.strokeWeight,
                strokeStyle: mapping.strokeStyle,
                strokeDasharray: mapping.strokeDasharray
            }),
            startMarker = new AMap.Marker({
                map: map,
                position: path[0],
                draggable: false,
                content: '<marker data-glyph="start"></marker>'
            }),
            endMarker = new AMap.Marker({
                map: map,
                position: path[path.length - 1],
                draggable: false,
                content: '<marker data-glyph="end"></marker>'
            });
        
        satelliteLayer.setMap(map);
        polyline.setMap(map);
        map.setFitView();
    }
    
    mapPoi(q) {
        var poi = JSON.parse(q),
            map = new AMap.Map("tempMap", {
                zoom: 12,
                center: [poi.lng, poi.lat]
            }),
            scale = new AMap.Scale(),
            toolbar = new AMap.ToolBar(),
            overview = new AMap.OverView(),
            satelliteLayer = new AMap.TileLayer.Satellite();

        map.addControl(scale);
        map.addControl(toolbar);
        //map.addControl(overView);
        //satelliteLayer.setMap(map);
    }
    
    componentDidMount() {
        if (this.props.type === "trail") {
            this.mapTrail(this.props.id, this.props.points);
        } else {
            this.mapPoi(this.props.location.query.poi);
        }
    }
    
    componentWillUpdate() {
        console.log('will update');
    }
    
    componentDidUpdate() {
        console.log('did update');
    }
    
    render() {
        if (this.props.id) {
            return (
                <map id={this.props.id}></map>
            );
        } else {
            return (
                <map id="tempMap"></map>
            );
        }
        
    }
};
