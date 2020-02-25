const ENDPOINT = `//1246105.cn-hongkong.fc.aliyuncs.com/2016-08-15/proxy/speedrun-api-directly/api`

const get = async ({ game, level, category }) => {
  let path = _buildPath({ game, level, category })
  let res = await fetch(path)
  let data = await res.json()
  return data
}

// GET /leaderboards/{game}/category/{category}
// GET /leaderboards/{game}/level/{level}/{category}
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