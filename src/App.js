/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Placeholder } from './Placeholder';
import { ArtEra } from './ArtEra';
import { useEffect, useState } from 'react';

function App() {
  const [zoom, setZoom]= useState(0);
  const [target, setTarget] = useState([]);
  const [debugging, setDebug] = useState(true);
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
      <div id="progressIndicator" style={{top:zoom}}></div>
      <div id="controls">
        <button id="debugButton" onClick={toggleDebug}>debug</button>
        <p>jake h</p>
        <p>blog</p>
        <p>contact</p>
        <span class="blurb">welcome to my site.</span>
      </div>
      <div id="header">
        <h2>scroll down...</h2>
      </div>
      {eras.map((era, i) => {
        return (
          <>
            <ArtEra idx={i} resolution={10} debugging={debugging} key={i} target={target} zoomCap={eraStep}
                    zoom={zoom - ((eraStep - (eraStep/eras.length)) * i)}/>
          </>
        )
      })}
    </div>
  );
}

export default App;
