import Slide from './Slide'
import ProtoComponent from './ProtoComponent'

class Slideshow extends ProtoComponent {
  constructor(elem, config = {}) {
    super()
    const configDefaults = {
      autoPlay: false,
      dots: true,
    }

    this.config = { ...configDefaults, ...config }
    this.elem = elem
    this.elem.classList.add
    this.slides = [...elem.querySelectorAll('.slideshow__slide')]
    this.slideCount = this.slides.length
    this.buttons = []
    this.currentIndex = 0

    this.autoPlayInterval = this.config.autoPlay ? this._autoPlay() : false
    this.isAutoPlay = true

    if (this.config.autoPlay) {
      this._initAutoPlay(this.elem)
    }

    // adding slideshow modules
    this.renderComponents()

    this._setSlide()
    this._addArrowKeyTriggers()
  }

  nextSlide() {
    this._unsetSlide()
    if (this.currentIndex === this.slides.length - 1) {
      this.currentIndex = 0
    } else {
      this.currentIndex = this.currentIndex + 1
    }
    this._setSlide()
    super.dispatch('onNextSlide', { currentIndex: this.currentIndex, elem: this.slides[this.currentIndex] })
  }

  prevSlide() {
    this._unsetSlide()
    if (this.currentIndex === 0) {
      this.currentIndex = this.slideCount - 1
    } else {
      this.currentIndex = this.currentIndex - 1
    }
    this._setSlide()
    super.dispatch('onPrevSlide', { currentIndex: this.currentIndex, elem: this.slides[this.currentIndex] })
  }

  gotoSlide(index) {
    this._unsetSlide()
    this.currentIndex = index
    this._setSlide()
    super.dispatch('onGoToSlide', { currentIndex: this.currentIndex, elem: this.slides[this.currentIndex] })
  }

  _setSlide() {
    this.slides[this.currentIndex].classList.add('is-active')
    if (this.config.dots) {
      this.buttons[this.currentIndex].classList.add('is-active')
    }
  }

  _unsetSlide() {
    this.slides[this.currentIndex].classList.remove('is-active')
    if (this.config.dots) {
      this.buttons[this.currentIndex].classList.remove('is-active')
    }
  }

  _autoPlay() {
    return setInterval(() => {
      this.nextSlide()
    }, 3000)
  }

  renderComponents() {
    // for testing
    this.elem.setAttribute('data-testid', 'slideshow')

    this._generateSlides()
    this._generateArrows()

    if (this.config.dots) {
      this._generateDots()
    }
  }

  _generateDots() {
    let buttonList = '<div class="slideShow__buttonList">'
    this.slides.forEach(() => {
      buttonList = buttonList + '<button class="slideShow__button">dot</button>'
    })
    buttonList = buttonList + '</div>'
    this.elem.insertAdjacentHTML('beforeend', buttonList)
    this.buttons = [...this.elem.querySelectorAll('.slideShow__button')]
    this.buttons.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        this.gotoSlide(index)
      })
      if (this.config.autoPlay) {
        this._initAutoPlay(elem)
      }
    })
  }

  _generateSlides() {
    this.slides.forEach((slide) => new Slide(slide))
  }

  _generateArrows() {
    const arrowControls = `
    <div class="slideshow__controls">
        <button class="slideshow__arrow slideshow__arrow--prev">Prev</button>
        <button class="slideshow__arrow slideshow__arrow--next">next</button> 
    </div>`
    this.elem.insertAdjacentHTML('beforeend', arrowControls)
    const prevArrow = this.elem.querySelector('.slideshow__arrow--prev')
    const nextArrow = this.elem.querySelector('.slideshow__arrow--next')
    prevArrow.addEventListener('click', () => this.prevSlide())
    nextArrow.addEventListener('click', () => this.nextSlide())
  }

  _addArrowKeyTriggers() {
    this.elem.onkeydown = (e) => {
      if (e.keyCode === 37) {
        this.prevSlide()
      } else if (e.keyCode === 39) {
        this.nextSlide()
      }
    }
  }

  _initAutoPlay(elem) {
    elem.addEventListener('mouseenter', () => {
      this._cancelAutoPlay()
    })

    elem.addEventListener('focus', () => {
      this._cancelAutoPlay()
    })

    elem.addEventListener('blur', (e) => {
      this._resumeAutoPlay()
    })

    elem.addEventListener('mouseleave', () => {
      this._resumeAutoPlay()
    })
  }

  _cancelAutoPlay() {
    if (this.isAutoPlay) {
      this.isAutoPlay = false
      clearInterval(this.autoPlayInterval)
    }
  }

  _resumeAutoPlay() {
    if (!this.isAutoPlay) {
      this.isAutoPlay = true
      this.autoPlayInterval = this._autoPlay()
    }
  }

  getConfig() {
    return this.config
  }
}

export default Slideshow
