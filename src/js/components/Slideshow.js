// aspect ratio
// centering of images within ratio (new class for that)
// eventing? no
// loop unless mouse over
// add + remove extra slide ability
class Slideshow {
  constructor(elem) {
    this.elem = elem
    this.slides = [...elem.querySelectorAll('div')]
    this.slideCount = this.slides.length
    this.currentIndex = 0
    this._setSlide()
    this._generateDots()
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
  }

  prevSlide() {
    this._unsetSlide()
    if (this.currentIndex === 0) {
      this.currentIndex = this.slideCount - 1
    } else {
      this.currentIndex = this.currentIndex - 1
    }
    this._setSlide()
  }

  gotoSlide(index) {
    this._unsetSlide()
    this.currentIndex = index
    this._setSlide()
  }

  _setSlide() {
    this.slides[this.currentIndex].classList.add('is-active')
  }

  _unsetSlide() {
    this.slides[this.currentIndex].classList.remove('is-active')
  }

  _generateDots() {
    let buttonList = '<div class="slideShow__buttonList">'
    this.slides.forEach(() => {
      buttonList = buttonList + '<button class="slideShow__button">dot</button>'
    })
    buttonList = buttonList + '</div>'
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
