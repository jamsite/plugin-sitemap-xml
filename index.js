const fs = require('fs')
const path = require('path')
const { PageTemplate } = require('@jamsite/jamsite')

const SITEMAP_XML = 'sitemap.xml'

const template = fs.readFileSync(
  path.join(__dirname, 'sitemap.xml.hbs'),
  { encoding: 'utf8' }
)

module.exports = {
  options: {
    // todo: true
  },

  setOptions (options) {
    this.options = Object.assign({}, this.options, options)
  },

  async onAfterUpdateRoutes (jamsite) {
    return addSitemapXmlPage(jamsite, this.options)
  }
}

async function addSitemapXmlPage (jamsite, options) {
  const staticUrls = jamsite.router.getStaticUrls()
  delete staticUrls[`/${SITEMAP_XML}`]
  const data = Object.assign({}, options, { staticUrls })

  // fixme: regular jamsite.addPageTemplate does not work here try to use it again
  jamsite.router.addRoute(
    { path: SITEMAP_XML },
    new PageTemplate(SITEMAP_XML, template, false, data)
  )
}
