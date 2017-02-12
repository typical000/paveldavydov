import React from 'react'
import {renderToString} from 'react-dom/server'
import {SheetsRegistryProvider, SheetsRegistry} from 'react-jss'
import {stripIndents} from 'common-tags'
import {minify} from 'html-minifier'

import config from './config'
import {version} from '../package.json'

import App from './components/App'

const renderAnalytics = () => (
  stripIndents`

  `
)

const renderApp = () => {
  const sheets = new SheetsRegistry()

  const app = renderToString(
    <SheetsRegistryProvider registry={sheets}>
      <App />
    </SheetsRegistryProvider>
  )

  return {
    app,
    css: sheets.toString()
  }
}

const renderHTML = ({app, css, analytics}) => minify(stripIndents`
  <!doctype html>
  <html lang="en">
    <head>
      <title>${config.site.head.title}</title>
      <meta name="description" content="${config.site.head.description}" />
      <meta name="keywords" content="${config.site.head.keywords.join(' ')}" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="${config.site.og.title}" />
      <meta property="og:description" content="${config.site.og.description}" />
      <meta property="og:type" content="${config.site.og.type}" />
      <meta property="og:image" content="${config.site.og.image}" />
      <meta property="og:url" content="${config.site.og.url}" />
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <style id="critical-css" type="text/css">
        ${css}
      </style>
    </head>
    <body>
      ${app}
      <script src="/vendor.bundle.v${version}.js"></script>
      <script src="/bundle.v${version}.js"></script>
      ${analytics}
    </body>
  </html>
`, {
  minifyCSS: true,
  minifyJS: true
})


export default renderHTML({
  ...renderApp(),
  analytics: renderAnalytics()
})
