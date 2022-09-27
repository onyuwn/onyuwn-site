/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Placeholder } from './Placeholder';
import { ArtEra } from './ArtEra';
import { useEffect, useState } from 'react';

function App() {
  const [zoom, setZoom] = useState(0);
  const [eras, setEras] = useState([]);
  const [target, setTarget] = useState([]);
  
  function handleScroll(event) {
    setZoom(window.scrollY);
  }
  
  useEffect(() => {
    if(eras.length == 0) {
      var erasTemp = [];
      for(var i = 0; i < 5; i++) {
        erasTemp.push(i);
      }
      setEras(erasTemp); //more verbose later
    }
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

  window.addEventListener('scroll', handleScroll);

  return (
    <div className="container" onClick={(e) => setFocus(e)}>
      {eras.map((era, i) => {
        return <ArtEra idx={i} key={i} target={target} zoom={zoom/(era * era)}/>
      })}
    </div>
  );
}

export default App;
