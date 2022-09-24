import logo from './logo.svg';
import './App.css';
import { Placeholder } from './Placeholder';
import { ArtEra } from './ArtEra';
import { useEffect, useState } from 'react';

function App() {
  const [zoom, setZoom] = useState(0);
  const [eras, setEras] = useState([]);
  
  function handleScroll(event) {
    setZoom(window.scrollY);
  }
  
  useEffect(() => {
    if(eras.length == 0) {
      var erasTemp = [];
      for(var i = 0; i < 2; i++) {
        erasTemp.push(1);
      }
      setEras(erasTemp); //more verbose later
    }
  });

  window.addEventListener('scroll', handleScroll);

  return (
    <div className="container">
      {eras.map((era, i) => {
        return <ArtEra key={i} zoom={zoom/(era * era)}/>
      })}
    </div>
  );
}

export default App;
