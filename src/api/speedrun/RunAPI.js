const ENDPOINT = `//1246105.cn-hongkong.fc.aliyuncs.com/2016-08-15/proxy/speedrun-api-directly/api`

// GET /runs/{id}
const get = async ({ id }) => {
  let path = _buildPath({ id })
  let res = await fetch(path)
  let data = await res.json()
  return data
}

const _buildPath = ({ id }) => {
  let _params = {
    embed: 'game,category,players'
  }

  let params = Object.keys(_params).map(key => {
    let value = _params[key]
    return `${key}=${value}`
  }).join('&')

  return `${ENDPOINT}/runs/${id}?${params}`
}

module.exports = { get }