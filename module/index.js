import axios from 'axios'

const switchImageType = link => {
  /**
   * @param {string} type
   * @return {string} string : data type
  */
  const makeDataType = type => `data:image/${type};base64,`
  switch (true){
    case /\.[jpg|jpeg]/i.test(link): return makeDataType('jpeg')
    case /\.webp/i.test(link): return makeDataType('webp')
    case /\.png/i.test(link): return makeDataType('png')
    case /\.gif/i.test(link): return makeDataType('gif')
    case /\.svg/i.test(link): return makeDataType('svg')
    case /\.pdf/i.test(link): return makeDataType('pdf')
  }
}

export const axiosImageToBase64 = async (imageUrl, query={}) => {
  const { data } = await axios.get(imageUrl, { query, responseType: 'arraybuffer' })
  return switchImageType(imageUrl)
  + Buffer.from(data, 'binary').toString('base64')
}

export const textContentBlocksToText = contents => {
  return contents.filter(content => {
    return content.type === 'textBlock'
  }).reduce((text, content) => {
    const { value: values } = content
    // return text += values.reduce((t, { value }) => {})
    return text + values.map(value => value.value).join('')
  }, '').slice(0, 120) + '...'
}

export const reqCMS = async (route, params) => {
  const { data } = await axios.get(process.env.microCMS.url + route, {
    headers: { 'X-MICROCMS-API-KEY': process.env.microCMS.api_key },
    params
  })
  return data
}
