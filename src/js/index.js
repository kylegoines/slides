import './../scss/main.scss'
import Slideshow from './components/Slideshow'
import React from 'react'
import renderHelper from './components/helperRender'

// hello area 17
window.onload = () => {
  const elem = document.querySelector('.slideshow')
  if (elem) {
    const slideshow = new Slideshow(elem)
    window.slideshow = slideshow
  }

  document.querySelector('.renderHelper').innerHTML = renderHelper()

  console.log(thing)
}
