export default (ctx={}) => {
  const {
    siteName,
    pageTitle,
    description,
    isTypeArticle,
    pageUrl,
    imageUrl,
  } = ctx
  
  // let image = ''
  // if (imageUrl) image = resizeBase64(imageUrl, 600, 315)
  // console.log(image)
  
  return [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: description || '' },
    { hid: 'og:site_name', property: 'og:site_name', content: siteName || '' },
    { hid: 'og:type', property: 'og:type', content: isTypeArticle ? 'article' : 'website' },
    { hid: 'og:url', property: 'og:url', content: pageUrl || '' },
    { hid: 'og:title', property: 'og:title', content: `${ pageTitle } - ${ process.env.siteTitle }` || process.env.siteTitle },
    { hid: 'og:description', property: 'og:description', content: description || '' },
    { hid: 'og:image', property: 'og:image', content: imageUrl || '' },
    { name: 'twitter:card', content: 'summary' }
  ]
}