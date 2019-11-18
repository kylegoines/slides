const getSlideshowHTML = () => {
  const div = document.createElement('div')
  div.innerHTML = `
    <div>
    <div class="slideshow" tabindex="0">
      <div class="slideshow__slides">
          <div class="slideshow__slide slideshow__slide--green">
              <div class="content">
                  <img src="https://via.placeholder.com/650x250" />
              </div>
          </div>
          <div class="slideshow__slide slideshow__slide--blue">
              <div class="content">
                  <img src="https://via.placeholder.com/450x750" />
              </div>
          </div>
          <div class="slideshow__slide slideshow__slide--red">
              <div class="content">
                  image
              </div>
          </div>
      </div>
      </div>
    </div>
      `
  return div
}

export default getSlideshowHTML
