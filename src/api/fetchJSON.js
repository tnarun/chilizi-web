const fetchJSON = async (path) => {
  let res = await fetch(path)
  let data = await res.json()
  return data
}

module.exports = fetchJSON