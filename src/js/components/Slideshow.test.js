// defaults
jest.useFakeTimers()

// test
import { getByText, getByTestId, queryByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

// code
import Slideshow from './Slideshow'
import getSlideshowHTML from './../testUtils/getSlideshowHTML'

const initContainer = (config = {}) => {
  const container = getSlideshowHTML()
  const slideShowElem = container.querySelector('.slideshow')
  const slideshow = new Slideshow(slideShowElem, config)
  return { container, slideshow }
}

test('it Renders', async () => {
  const { container } = initContainer()
  const value = queryByTestId(container, 'slideshow')
  expect(value).toBeTruthy()
})

test('rendering with no config should set defaults', async () => {
  const { container, slideshow } = initContainer()
  const result = slideshow.getConfig()
  const expectedResult = {
    autoPlay: false,
    dots: true,
  }
  // confirm defualt config is correct
  expect(result).toEqual(expectedResult)

  // confirm dots are avaliable
  const dots = container.querySelector('.slideShow__buttonList')
  expect(dots).toBeTruthy()

  // confirm auto play not on
  let slides = [...container.querySelectorAll('.slideshow__slide')]
  expect(slides[0]).toHaveClass('is-active')
  jest.runTimersToTime(3000)
  expect(slides[1]).not.toHaveClass('is-active')
})

test('setting defaults should remove dots', async () => {
  const { container } = initContainer({ dots: false })
  const dots = container.querySelector('.slideShow__buttonList')
  expect(dots).toBeFalsy()
})

test('page triggers work', async () => {
  const { container } = initContainer()
  let slides = [...container.querySelectorAll('.slideshow__slide')]

  const arrowPrev = container.querySelector('.slideshow__arrow--prev')
  const arrowNext = container.querySelector('.slideshow__arrow--next')

  const dotList = [...container.querySelectorAll('.slideShow__button')]

  arrowNext.click()
  expect(slides[1]).toHaveClass('is-active')

  arrowNext.click()
  expect(slides[2]).toHaveClass('is-active')

  arrowNext.click()
  expect(slides[0]).toHaveClass('is-active')

  arrowPrev.click()
  expect(slides[2]).toHaveClass('is-active')

  arrowPrev.click()
  expect(slides[1]).toHaveClass('is-active')

  arrowPrev.click()
  expect(slides[0]).toHaveClass('is-active')

  dotList[2].click()
  expect(slides[2]).toHaveClass('is-active')

  dotList[1].click()
  expect(slides[1]).toHaveClass('is-active')

  dotList[0].click()
  expect(slides[0]).toHaveClass('is-active')
})

test('setting defaults should trigger autoPlay', async () => {
  const { container } = initContainer({ autoPlay: true })
  let slides = [...container.querySelectorAll('.slideshow__slide')]
  expect(slides[0]).toHaveClass('is-active')
  //   await wait()
  jest.runTimersToTime(3000)
  expect(slides[1]).toHaveClass('is-active')

  jest.runTimersToTime(3000)
  expect(slides[2]).toHaveClass('is-active')

  jest.runTimersToTime(3000)
  expect(slides[0]).toHaveClass('is-active')

  jest.runTimersToTime(3000)
  expect(slides[1]).toHaveClass('is-active')
})
