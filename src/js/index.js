import './../scss/main.scss'

import Slideshow from './components/Slideshow'
// hello area 17
window.onload = () => {
  const slideshow = new Slideshow(document.querySelector('.slideshow'))
  window.slideshow = slideshow
  //   setTimeout(() => {
  //     slideshow.nextSlide()
  //     setTimeout(() => {
  //       slideshow.nextSlide()
  //       setTimeout(() => {
  //         slideshow.nextSlide()
  //         setTimeout(() => {
  //           slideshow.nextSlide()
  //           setTimeout(() => {
  //             slideshow.prevSlide()
  //           }, 1000)
  //         }, 1000)
  //       }, 1000)
  //     }, 1000)
  //     // slideshow.nextSlide()
  //     // slideshow.nextSlide()
  //     // slideshow.nextSlide()
  //     // slideshow.prevSlide()
  //     // slideshow.prevSlide()
  //     // slideshow.prevSlide()
  //     // slideshow.prevSlide()
  //     // slideshow.prevSlide()
  //   }, 1000)
}
