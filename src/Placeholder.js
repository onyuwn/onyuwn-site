/* eslint-disable */
import { useEffect, useState } from "react"

export function Placeholder(props) {
    const [color, setColor] = useState("");
    const [cat, setCat] = useState("");
    const [width, setWidth] = useState(0);
    const [r, setR] = useState(0);
    const [x, setX] = useState(0);
    const [fxScale, setFxScale] = useState(0);

    useEffect(() => {
        var vH = window.innerHeight;
        var vW = window.innerWidth;
        setR(Math.sqrt(Math.pow((Math.abs(props.x) - (vW/2)), 2) + Math.pow((Math.abs(props.y) - (vH/2)),2))); // dist from center of vp
        var vDiag = Math.sqrt(Math.pow(vH, 2) + Math.pow(vW, 2))/2; //viewport diagonal divide by two bc relative to origin in center
        vDiag = vDiag - (vDiag * .3); // set some margins
        setX(Math.abs(((r/vDiag) * 100))); // "x" of the filters scaling function -- pct of where this object is in the vp
        var maxWidth = Math.round(vW * .01);
        //var widthScale = ((-1/25) * Math.pow(x - 50, 2)) + 100;
        var widthScale = 100 * Math.pow(Math.E, -1 * ((Math.pow((2 * x) - 100, 2))/625)); //gauss function -- cool guy
        setFxScale(widthScale/100);
        setWidth(maxWidth * (widthScale/100));

        if(cat == "") {
            // fetch("https://api.thecatapi.com/v1/images/search")
            // .then((response) => response.json())
            // .then(
            //     (result) => {
            //         setCat(result[0].url)
            //     }
            // );
        }
    });

    return (
        <div className="placeholder" style={{zIndex:Math.ceil(100 * fxScale), top:props.y - (16 * (width/2)), left:props.x - (16 * (width/2)), width:width + "em",
             height:width+"em", filter:'blur(' + Math.ceil(2 - Math.floor((5 * fxScale))) + 'px)',  opacity:(fxScale).toFixed(1)}}>
            <img src={cat} style={{width:width + "em", height:width+"em"}}/>
            <p>{props.z}</p>
        </div>
    )
}