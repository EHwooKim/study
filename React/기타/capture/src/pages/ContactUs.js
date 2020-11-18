import React from 'react'

import { motion } from 'framer-motion'
import { PageAnimation } from '../animation'

function ContactUs() {
  return (
    <motion.div
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{background: "#fff"}}
    >
      <h1>ContactUs</h1>
    </motion.div>
  )
}

export default ContactUs