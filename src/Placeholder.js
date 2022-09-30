/* eslint-disable */
import { useEffect, useState } from "react"
import d from "./assets/d copy.png"
import g from "./assets/g.png"
import glare from "./assets/glare.png"
import O from "./assets/O.png"
import paper from "./assets/paper2 dispd.png"
import f from "./assets/f copy 4.png"

export function Placeholder(props) {
    const [color, setColor] = useState("");
    const [width, setWidth] = useState(0);
    const [r, setR] = useState(0);
    const [x, setX] = useState(0);
    const [fxScale, setFxScale] = useState(0);
    const [hide, setHidden] = useState(false);

    useEffect(() => {
        var vH = window.innerHeight;
        var vW = window.innerWidth;
        setR(Math.sqrt(Math.pow((Math.abs(props.x) - (vW/2)), 2) + Math.pow((Math.abs(props.y) - (vH/2)),2))); // dist from center of vp
        var vDiag = Math.sqrt(Math.pow(vH, 2) + Math.pow(vW, 2))/2; //viewport diagonal divide by two bc relative to origin in center
        vDiag = vDiag - (vDiag * .5); // set some margins
        setX(Math.abs(((r/vDiag) * 100))); // "x" of the filters scaling function -- pct of where this object is in the vp
        var maxWidth = Math.round(vW * .01);
        //var widthScale = ((-1/25) * Math.pow(x - 50, 2)) + 100;
        var widthScale = 100 * Math.pow(Math.E, -1 * ((Math.pow(x - 50, 2))/625)); //gauss function -- cool guy
        
        if(props.checkSelected === true) {
            if(props.selected === true) {
                setFxScale(widthScale/100);
                setWidth(maxWidth * (widthScale/100));
            } else {
                setHidden(true);
            }
        } else {
            setFxScale(widthScale/100);
            setWidth(maxWidth * (widthScale/100));
        }
    });

    function getBorder(i) {
        if(props.debugging === true) {
            if(i == 0) {
                return "2px solid red";
            } else if(i == 1) {
                return "2px solid blue";
            } else if(i == 2) {
                return "2px solid green";
            } else if(i == 3) {
                return "2px solid black";
            } else if(i == 4) {
                return "2px solid pink";
            }
        } else {
            return "";
        }
    }

    function getImage(i) {
        var images = [d, f, g, glare, O, paper];
        return images[i];
    }
    
    return (
        <div className={`placeholder ${hide === true ? "hide" : ""} ${props.selected === true ? "selected" : ""}`}
            style={{zIndex:Math.ceil(100 * fxScale), top:props.y - (16 * (width/2)),
            left:props.x - (16 * (width/2)), width:width + "em",
            height:width+"em", filter:'blur(' + Math.ceil(2 - Math.floor((5 * fxScale))) + 'px)',
            opacity:(fxScale).toFixed(1), border:getBorder(props.era)}} 
            onClick={() => props.handleSelect(props.idx)}>
            {props.debugging === false && 
                <img src={getImage(props.seed)} style={{width:width + "em", height:width+"em"}}/>
            }
            {props.debugging === true &&
                <>
                    <img src={props.cat} style={{width:width + "em", height:width+"em"}}/>
                    <p>{props.x},{props.y} :: A{props.z}</p>
                    <p>{props.idx}</p>
                </>
            }
        </div>
    )
}