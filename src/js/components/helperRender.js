// import 'react' from React

const data = [
  {
    title: 'test',
  },
  {
    title: 'test2',
  },
  {
    title: 'test3',
  },
  {
    title: 'test4',
  },
]

const renderHelper = () => {
  let str = ''
  data.forEach((item) => {
    str =
      str +
      `
        <article>
            <div class="content">
                <div class="article__info">
                    <div class="article__title">
                        <h3> sdkfj jdkf sdkfjs dkfjsd dsf dsf</h3>
                    </div>
                    <div class="article__byline byline">
                        <div class="byline__author"></div>
                        <div class="byline__info">
                            <p class="byline__name">dskfj dsfj jkjdf</p>
                            <p class="byline__title">fake title</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
      `
  })
  return str
}

export default renderHelper
