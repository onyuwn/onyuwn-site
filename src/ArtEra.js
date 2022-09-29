/* eslint-disable */
import { Placeholder } from "./Placeholder";
import React, {Component, useEffect, useState} from 'react';

// ring of art organized by date
export class ArtEra extends Component {
    constructor(props) {
        super(props);
        this.state = {points: [], cats:[], pathStr:"", inFocus:-1, era:props.idx, selected:-1};
        this.getPoints();
    }

    componentDidUpdate() {
        this.getPoints();

        if(this.props.debugging === true && this.state.cats.length < this.props.resolution) 
        {
            fetch("https://api.thecatapi.com/v1/images/search")
            .then((response) => response.json())
            .then(
                (result) => {
                    this.setState((state) => {state.cats.push(result[0].url)});
                }
            );
        }
    }

    updatePathStr(points) {
        this.state.pathStr = "";
        points.forEach((p,i) => {
            if(p[0] != Infinity && p[0] != NaN && p[1] != Infinity && p[1] != NaN) {
                // var newPt = " L" +p[0].toString() + "," + p[1].toString();
                // this.state.pathStr += newPt;
                if(!(p[0]  > window.innerWidth || p[0] < 0 || p[1] > window.innerHeight || p[1] < 0)) {
                    if(i === 0) {
                        var newPt = " C" + Math.round(window.innerWidth/2) + "," + Math.round((window.innerHeight/2) + 100) + " " + p[0].toString() + "," + (p[1] + 25).toString() + " " + p[0].toString() + "," + p[1].toString();
                        this.state.pathStr += newPt;
                    } else {
                        var newPt = " S" + p[0].toString() + "," + (p[1] + 25).toString() + " " + p[0].toString() + "," + p[1].toString();
                        this.state.pathStr += newPt;
                    }
                }
            }
        });
    }

    getPoints() {
        const resolution = this.props.resolution; //10 points along the circle
        const vHeight = window.innerHeight;
        const vWidth = window.innerWidth;
        //radius will change depending on if in focus
        const radius = this.props.zoom; //depends on pixels in viewport
        var thetaStep = ((2 * Math.PI) / resolution); // radians :)
        var curTheta = 0;
        var pointsTemp = [];

        for(var i = 0; i < resolution - Math.round(resolution * .2); i++) {
            var x = (radius * (1 - (i/resolution))) * Math.cos(curTheta);
            var y = (radius * (1 - (i/resolution))) * Math.sin(curTheta);
            // var x = (radius) * Math.cos(curTheta);
            // var y = (radius) * Math.sin(curTheta);
            curTheta += thetaStep;
            var xFinal = Math.ceil(x) + (Math.ceil(vWidth)/2);
            var yFinal = Math.ceil(y) + (Math.ceil(vHeight)/2);
            pointsTemp.push([xFinal, yFinal]);
        }
        this.updatePathStr(pointsTemp);
        this.state.points = pointsTemp;
    }

    isNear(point1, point2, i) {
        var threshold = 2 * 16; // radius of placeholder from em to px
        var xError = Math.abs(point1[0] - point2[0]);
        var yError = Math.abs(point1[1] - point2[1]);

        console.log(i.toString() + ":::: " + xError.toString() + ", " + yError.toString());

        if(Math.abs(point1[0] - point2[0]) <= threshold && Math.abs(point1[1] - point2[1]) <= threshold) {
            return true;
        } else {
            return false;
        }
    }

    eraVisible() {
        return this.props.zoom > 0 && this.props.zoom < this.props.zoomCap;
    }

    handleSelect(idx) {
        console.log(idx.toString() + " selected!");
        this.setState({selected: idx});
    }

    render() {
        var placeholders = [];

        this.state.points.forEach((point, i) => {
            if(this.eraVisible() === true) {
                placeholders.push(
                    <Placeholder cat={this.state.cats[i]} debugging={this.props.debugging}
                                 idx={i} key={i} x={point[0]} y={point[1]} z={this.props.zoom} era={this.state.era}
                                 handleSelect={this.handleSelect.bind(this)} selected={i===this.state.selected}
                                 checkSelected={this.state.selected>=0}/>
                );
            }
        });
        
        return (
            <div className="art-era">
                {this.props.debugging &&
                    <svg viewBox={"0" + " 0 " + window.innerWidth.toString() + " " + window.innerHeight.toString()}>
                        <path d={"M" + Math.round(window.innerWidth/2).toString() + "," + Math.round(window.innerHeight/2).toString() + " " + this.state.pathStr}></path>
                    </svg>
                }
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