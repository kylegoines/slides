import './../scss/main.scss'

import Slideshow from './components/Slideshow'
// hello area 17
window.onload = () => {
  const slideshow = new Slideshow(document.querySelector('.slideshow'))
  setTimeout(() => {
    slideshow.nextSlide()
    slideshow.nextSlide()
    slideshow.nextSlide()
    slideshow.nextSlide()
    slideshow.prevSlide()
    slideshow.prevSlide()
    slideshow.prevSlide()
    slideshow.prevSlide()
    slideshow.prevSlide()
  }, 1000)
}
