import './../scss/main.scss'
import Slideshow from './components/Slideshow'

// hello area 17
window.onload = () => {
  const slideshow = new Slideshow(document.querySelector('.slideshow'))
  window.slideshow = slideshow
}
