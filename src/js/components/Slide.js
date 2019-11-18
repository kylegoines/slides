class Slide {
  constructor(elem) {
    this.elem = elem
    const rect = this.elem.getBoundingClientRect()
    console.log(rect)
    this.height = rect.height
    this.width = rect.width
    this.calculatePosition()
  }

  calculatePosition() {
    if (this.width > this.height) {
      this.elem.classList.add('is-landscape')
    } else {
      this.elem.classList.add('is-portrait')
    }
  }
}

export default Slide
