import React from 'react'

import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import FaqSection from '../components/FaqSection'

import { motion } from 'framer-motion'
import { PageAnimation } from '../animation'
import ScrollTop from '../components/ScrollTop'

function AboutUs() {
  return (
    <motion.div
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <AboutSection />
      <ServicesSection/>
      <FaqSection />
      <ScrollTop />
    </motion.div>
  )
}

export default AboutUs