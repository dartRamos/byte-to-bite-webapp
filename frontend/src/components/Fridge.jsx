import React from 'react'
import fridge from '../assets/fridge.png'
import kitchen from '../assets/kitchen.png'
import '../styling/Fridge.css'

function Fridge() {
  return (
    <div 
    className="fridge-container"
    style={{ backgroundImage: `url(${kitchen})` }}
    >
      <div className='fridge-wrapper'>
      <img src={fridge} alt="Fridge" className="fridge-image"/>
      </div>
    </div>
  );
}

export default Fridge;