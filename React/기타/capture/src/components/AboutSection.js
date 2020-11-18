import React from 'react'
import home1 from '../img/home1.png'
import Wave from './Wave'
import { About, Description, Image, Hide } from '../styles'

import { motion } from 'framer-motion'
import { titleAnim, fade, photoAnim } from '../animation'
import styled from 'styled-components'


function Aboutsection() {
  return (
    <About className="about">
      <Description>
        <motion.div>
          <Hide>
            <motion.h2
              variants={titleAnim}
            >
              We work to make
            </motion.h2>
          </Hide>
          <Hide>
            <motion.h2
              variants={titleAnim}
            >
              Your<span> dreams</span> <span>come</span>
            </motion.h2>
          </Hide>
          <Hide>
            <motion.h2
              variants={titleAnim}
            >
              true.
            </motion.h2>
          </Hide>
        </motion.div>
        <motion.p
          variants={fade}
        >
          Contact us for any photography or videography ideas that you have. We have professionals with amazing skills
        </motion.p>
        <motion.button
          variants={fade}
        >
          Contact Us
        </motion.button>
      </Description>
      <Image>
        <motion.img variants={photoAnim} src={home1} alt="a guy with camera" />
      </Image>
      <Wave />
    </About>
  )
}


export default Aboutsection