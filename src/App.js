/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Placeholder } from './Placeholder';
import { ArtEra } from './ArtEra';
import { useEffect, useState } from 'react';
import d from "./assets/d copy.png"
import g from "./assets/g.png"
import glare from "./assets/glare.png"
import O from "./assets/O.png"
import paper from "./assets/paper2 dispd.png"
import f from "./assets/f copy 4.png"

function App() {
  const [zoom, setZoom]= useState(0);
  const [target, setTarget] = useState([]);
  const [debugging, setDebug] = useState(false);
  var images = [d,g,glare,O,paper,f];
  var eras = [1,2,3,4,5];
  var eraStep = Math.round((window.innerHeight * 5)/eras.length); // const 5 comes from viewport height -- not how many eras
  function handleScroll(event) {
    setZoom(window.scrollY);
  }
  
  useEffect(() => {
  });

  function setFocus(e) {
    if(target[0] > 0) {
        console.log(e.clientX.toString() + "," + e.clientY.toString());
        setTarget([-e.clientX, -e.clientY]);
    } else {
        console.log(e.clientX.toString() + "," + e.clientY.toString());
        setTarget([e.clientX, e.clientY]);
    }
  };

  function toggleDebug(e) {
    setDebug(!debugging);
  }

  window.addEventListener('scroll', handleScroll);

  return (
    <div className="container">
      <div id="controls">
        <button onClick={toggleDebug}>debug</button>
      </div>
      {eras.map((era, i) => {
        return (
          <>
            <ArtEra images={images} idx={i} resolution={20} debugging={debugging} key={i} target={target} zoomCap={eraStep}
                    zoom={zoom - ((eraStep - (eraStep/eras.length)) * i)}/>
          </>
        )
      })}
    </div>
  );
}

export default App;
