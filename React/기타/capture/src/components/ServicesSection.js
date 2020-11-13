import React from 'react'

import clock from '../img/clock.svg'
import diaphragm from '../img/diaphragm.svg'
import money from '../img/money.svg'
import teamwork from '../img/teamwork.svg'
import home2 from '../img/home2.png'

function ServicesSection() {
  return (
    <div className="services">
      <div className="description">
        <h2>High <span>quality </span><span>services</span></h2>
        <div className="cards">
          <div className="card">
            <div alt="icon" className="icon">
              <img src={clock} />
              <h3>Efficient</h3>
            </div>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div alt="icon" className="icon">
              <img src={teamwork} />
              <h3>Teamwork</h3>
            </div>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div alt="icon" className="icon">
              <img src={diaphragm} />
              <h3>Diaphragm</h3>
            </div>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>  
        </div>
        <div className="cards">
          <div className="card">
            <div alt="icon" className="icon">
              <img src={money} />
              <h3>Affordable</h3>
            </div>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
      <div className="image">
        <img alt="camera" src={home2}/>
      </div>
    </div>
  )
}

export default ServicesSection  