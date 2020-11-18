import React from 'react'
import home1 from '../img/home1.png'
import { About, Description, Image, Hide } from '../styles'

import { motion } from 'framer-motion'


function Aboutsection() {
  return (
    <About className="about">
      <Description>
        <motion.div>
          <Hide>
            <motion.h2>
              We work to make
            </motion.h2>
          </Hide>
          <Hide>
            <motion.h2>
              Your<span> dreams</span> <span>come</span>
            </motion.h2>
          </Hide>
          <Hide>
            <motion.h2>
              true.
            </motion.h2>
          </Hide>
        </motion.div>
        <p>
          Contact us for any photography or videography ideas that you have. We have professionals with amazing skills
        </p>
        <button>Contact Us</button>
      </Description>
      <Image>
        <img src={home1} alt="a guy with camera" />
      </Image>
    </About>
  )
}



export default Aboutsection