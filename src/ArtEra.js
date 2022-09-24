/* eslint-disable */
import { Placeholder } from "./Placeholder";
import React, {Component, useEffect, useState} from 'react';

// ring of art organized by date
export class ArtEra extends Component {
    constructor(props) {
        super(props);
        this.state = {points: [], zoom: this.props.zoom, cats: []};
        this.getPoints();
    }

    componentDidUpdate() {
        this.state.zoom = this.props.zoom;
        this.getPoints();
        if(this.state.cats.length < 10) {
            this.getCats();
        }
    }

    getCats() {

    }

    getPoints() {
        const resolution = 20; //10 points along the circle
        const vHeight = window.innerHeight;
        const scrollCap = vHeight * 5; // times 5 because height is set to 500% vh
        const vWidth = window.innerWidth;
        //radius will change depending on if in focus
        const radius = this.state.zoom; //depends on pixels in viewport
        var thetaStep = (360 / resolution) + (this.state.zoom / scrollCap);
        var curTheta = 0;
        var pointsTemp = [];

        for(var i = 0; i < resolution; i++) {
            var x = (radius * (1 - (i/resolution))) * Math.cos(curTheta);
            var y = (radius * (1 - (i/resolution))) * Math.sin(curTheta);
            // var x = (radius) * Math.cos(curTheta);
            // var y = (radius) * Math.sin(curTheta);
            curTheta += thetaStep;
            pointsTemp.push([Math.ceil(x) + (Math.ceil(vWidth)/2), Math.ceil(y) + (Math.ceil(vHeight)/2)]);
        }

        this.state.points = pointsTemp;
    }

    render() {
        return (
            <div className="art-era">
                {this.state.points.map(function(point, i){
                    return <Placeholder idx={i} key={i} x={point[0]} y={point[1]}/>
                })}
            </div>
        );
    }
}