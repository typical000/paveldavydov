import normalize from 'normalize-jss'

import injectSheet from '../../utils/jss'

const styles = {
  '@font-face': [{
    fontFamily: 'Gotham Pro',
    src: [
      'url("fonts/gothaprolig.woff2") format("woff2")',
      'url("fonts/gothaprolig.woff") format("woff")',
    ],
    fontWeight: 'normal',
    fontStyle: 'normal'
  }, {
    fontFamily: 'Gotham Pro',
    src: [
      'url("fonts/gothaproligita.woff2") format("woff2")',
      'url("fonts/gothaproligita.woff") format("woff")',
    ],
    fontWeight: 'normal',
    fontStyle: 'italic'
  }, {
    fontFamily: 'Gotham Pro',
    src: [
      'url("fonts/gothapromed.woff2") format("woff2")',
      'url("fonts/gothapromed.woff") format("woff")',
    ],
    fontWeight: 'bold',
    fontStyle: 'normal'
  }, {
    fontFamily: 'Gotham Pro',
    src: [
      'url("fonts/gothapromedita.woff2") format("woff2")',
      'url("fonts/gothapromedita.woff") format("woff")',
    ],
    fontWeight: 'bold',
    fontStyle: 'italic'
  }],

  ...normalize
}

export default injectSheet(styles)()
