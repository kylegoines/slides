class Slideshow {
  constructor(elem) {
    this.elem = elem
    this.slides = [...elem.querySelectorAll('div')]
    this.slideCount = this.slides.length
    console.log(this.slides)
    this.currentIndex = 0
    this.slides[this.currentIndex].classList.add('is-active')
  }

  nextSlide() {
    this.slides[this.currentIndex].classList.remove('is-active')
    if (this.currentIndex === this.slides.length - 1) {
      this.currentIndex = 0
    } else {
      this.currentIndex = this.currentIndex + 1
    }
    // console.log(this.slides[this.currentIndex])
    console.log(this.currentIndex)
    this.slides[this.currentIndex].classList.add('is-active')
  }

  prevSlide() {
    this.slides[this.currentIndex].classList.remove('is-active')
    if (this.currentIndex === 0) {
      this.currentIndex = this.slideCount - 1
    } else {
      this.currentIndex = this.currentIndex - 1
    }
    this.slides[this.currentIndex].classList.add('is-active')
  }

  gotoSlide(index) {
    this.slides[this.currentIndex].classList.remove('is-active')
    this.currentIndex = index
    this.slides[this.currentIndex].classList.add('is-active')
  }
}

export default Slideshow
