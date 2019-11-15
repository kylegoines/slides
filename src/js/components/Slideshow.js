class Slideshow {
  constructor(elem) {
    console.log(elem)
    this.elem = elem
    this.slides = [...elem.querySelectorAll('div')]
    this.slideCount = this.slides.length
    console.log(this.slides)
    this.currentIndex = 0
  }

  nextSlide() {
    if (this.currentIndex === this.slides.length - 1) {
      this.currentIndex = 0
    } else {
      this.currentIndex = this.currentIndex + 1
    }
    console.log(this.currentIndex)
  }

  prevSlide() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.slideCount - 1
    } else {
      this.currentIndex = this.currentIndex - 1
    }
    console.log(this.currentIndex)
  }

  gotoSlide(index) {}
}

export default Slideshow
