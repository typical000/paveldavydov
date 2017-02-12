module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  site: {
    head: {
      title: 'Pavel Davydov',
      description: 'Pavel Davydov - Front-end developer',
      keywords: [
        'paveldavydov',
        'pavel',
        'Davydov',
        'html',
        'css',
        'react',
        'frontend',
        'portfolio',
      ]
    },
    og: {
      title: 'Pavel Davydov',
      description: 'Pavel Davydov - Front-end developer',
      type: 'website',
      image: 'http://cssinjs.org/images/logo-og.png', // Can't be relative url, and can't be svg
      url: 'http://paveldavydov.com/'
    }
  }
}
