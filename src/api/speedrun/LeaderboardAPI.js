const ENDPOINT = require('./endpoint').ENDPOINT

// GET /leaderboards/{game}/category/{category}
// GET /leaderboards/{game}/level/{level}/{category}
const get = async ({ game, level, category }) => {
  let path = _buildPath({ game, level, category })
  let res = await fetch(path)
  let data = await res.json()
  return data
}

const _buildPath = ({ game, level, category }) => {
  let _params = {
    embed: 'game,category,players'
  }

  let params = Object.keys(_params).map(key => {
    let value = _params[key]
    return `${key}=${value}`
  }).join('&')

  if (level) {
    return `${ENDPOINT}/leaderboards/${game}/level/${level}/${category}?${params}`
  }

  return `${ENDPOINT}/leaderboards/${game}/category/${category}?${params}`
}

module.exports = { get }