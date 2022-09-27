/* eslint-disable */
import { Placeholder } from "./Placeholder";
import React, {Component, useEffect, useState} from 'react';

// ring of art organized by date
export class ArtEra extends Component {
    constructor(props) {
        super(props);
        this.state = {points: [], zoom: this.props.zoom, cats: [], pathStr:"", inFocus:-1};
        this.getPoints();
    }

    componentDidUpdate() {
        this.state.zoom = this.props.zoom;
        this.getPoints();
        if(this.state.cats.length < 10) {
            this.getCats();
        }
    }

    updatePathStr(points) {
        this.state.pathStr = "";
        points.forEach((p,i) => {
            if(p[0] != Infinity && p[0] != NaN && p[1] != Infinity && p[1] != NaN) {
                // var newPt = " L" +p[0].toString() + "," + p[1].toString();
                // this.state.pathStr += newPt;
                if(i === 0) {
                    var newPt = " C" + Math.round(window.innerWidth/2) + "," + Math.round((window.innerHeight/2) + 100) + " " + p[0].toString() + "," + (p[1] + 25).toString() + " " + p[0].toString() + "," + p[1].toString();
                    this.state.pathStr += newPt;
                } else {
                    var newPt = " S" + p[0].toString() + "," + (p[1] + 25).toString() + " " + p[0].toString() + "," + p[1].toString();
                    this.state.pathStr += newPt;
                }
            }
        });
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
            if(curTheta >= 360) {
                curTheta = 0;
            }
            var xFinal = Math.ceil(x) + (Math.ceil(vWidth)/2);
            var yFinal = Math.ceil(y) + (Math.ceil(vHeight)/2)
            pointsTemp.push([xFinal, yFinal]);
        }
        this.updatePathStr(pointsTemp);
        this.state.points = pointsTemp;
    }

    isNear(point1, point2) {
        var threshold = 2 * 16; // radius of placeholder from em to px
        if(Math.abs(point1[0] - point2[0]) <= threshold && Math.abs(point1[1] - point2[1]) <= threshold) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        var placeholders = [];

        this.state.points.forEach((point, i) => {
            if(this.props.target && this.props.target[0] > 0 && this.props.zoom >= 250 && this.props.zoom <= 500) {
                console.log("nn");
                if(this.isNear(this.props.target, point) === true) {
                    placeholders.push(<Placeholder idx={i} key={i} x={point[0]} y={point[1]} z={this.props.zoom}/>);
                }
            } else {
                placeholders.push(<Placeholder idx={i} key={i} x={point[0]} y={point[1]} z={this.props.zoom}/>);
            }
        });
        
        return (
            <div className="art-era">
                <svg viewBox={"0" + " 0 " + window.innerWidth.toString() + " " + window.innerHeight.toString()}>
                    <path d={"M" + Math.round(window.innerWidth/2).toString() + "," + Math.round(window.innerHeight/2).toString() + " " + this.state.pathStr}></path>
                </svg>
                {placeholders && placeholders.length >= 1 &&
                    <div>{placeholders}</div>
                }
                <div className={this.props.target[0] > 0 ? "viewer show" : "viewer"}>
                    {placeholders && placeholders.length === 1 &&
                        <div>{placeholders}</div>
                    }
                </div>
            </div>
        );
    }
}