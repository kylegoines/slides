class Slideshow {
  constructor(elem) {
    this.elem = elem
    this.slides = [...elem.querySelectorAll('div')]
    this.slideCount = this.slides.length
    this.currentIndex = 0
    this._setSlide(this.currentIndex)
    this._generateDots()
    this._addArrowKeyTriggers()
  }

  nextSlide() {
    this._unsetSlide(this.currentIndex)
    if (this.currentIndex === this.slides.length - 1) {
      this.currentIndex = 0
    } else {
      this.currentIndex = this.currentIndex + 1
    }
    this._setSlide(this.currentIndex)
  }

  prevSlide() {
    this._unsetSlide(this.currentIndex)
    if (this.currentIndex === 0) {
      this.currentIndex = this.slideCount - 1
    } else {
      this.currentIndex = this.currentIndex - 1
    }
    this._setSlide(this.currentIndex)
  }

  gotoSlide(index) {
    this._unsetSlide(this.currentIndex)
    this.currentIndex = index
    this._setSlide(this.currentIndex)
  }

  _setSlide(index) {
    this.slides[this.currentIndex].classList.add('is-active')
  }

  _unsetSlide(index) {
    this.slides[this.currentIndex].classList.remove('is-active')
  }

  _generateDots() {
    let buttonList = '<div class="slideShow__buttonList">'
    this.slides.forEach((slide, index) => {
      buttonList = buttonList + '<button class="slideShow__button">dot</button>'
    })
    buttonList = buttonList + '</div>'
    console.log(buttonList)
    this.elem.insertAdjacentHTML('beforeend', buttonList)
    const buttons = [...this.elem.querySelectorAll('.slideShow__button')]
    buttons.forEach((elem, index) => elem.addEventListener('click', () => this.gotoSlide(index)))
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
}

export default Slideshow
