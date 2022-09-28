/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Placeholder } from './Placeholder';
import { ArtEra } from './ArtEra';
import { useEffect, useState } from 'react';

function App() {
  const [zoom, setZoom]= useState(0);
  const [target, setTarget] = useState([]);
  const [debugging, setDebug] = useState(false);
  var eras = [1,2,3,4];
  
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
      <div id="controls"><button onClick={toggleDebug}>debug</button></div>
      {eras.map((era, i) => {
        return <ArtEra idx={i} resolution={10} debugging={debugging} key={i} target={target} zoom={zoom/(Math.pow(era,2))}/>
      })}
    </div>
  );
}

export default App;
