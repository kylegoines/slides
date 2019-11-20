import './../scss/main.scss'
import Slideshow from './components/Slideshow'

// hello area 17
window.onload = () => {
  const elem = document.querySelector('.slideshow')
  if (slideshow.length > 0) {
    const slideshow = new Slideshow(elem)
    window.slideshow = slideshow
  }
}
