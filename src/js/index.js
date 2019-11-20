import './../scss/main.scss'
import Slideshow from './components/Slideshow'
import renderHelper from './components/helperRender'

// hello area 17
window.onload = () => {
  const elem = document.querySelector('.slideshow')
  if (elem) {
    const slideshow = new Slideshow(elem)
    window.slideshow = slideshow
  }

  const renderHelper = document.querySelector('.renderHelper')
  if (renderHelper) {
    renderHelper.innerHTML = renderHelper()
  }
}
