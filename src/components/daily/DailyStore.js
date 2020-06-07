import SpeedrunUtils from "speedrun-utils"

const { RunData, GameData } = SpeedrunUtils.data

class DailyStore {
  constructor({ from, to }) {
    this.from = from
    this.to = to
  }

  async load () {
    let url = `http://tna-upload.oss-cn-shanghai.aliyuncs.com/speedrun-weekly-leaderboard-runs-data/from-to/${this.from}-${this.to}-week-detail.json`

    let res = await fetch(url)
    let data = await res.json()
    // console.log(data)

    this.data = data
      .map(x => new DailyItem(x))
      .sort((a, b) => {
        return b.leaderboardLength - a.leaderboardLength
      })

    // A 级：榜单人数 >= 300  
    // B 级：300 > 榜单人数 >= 100  
    // C 级：100 > 榜单人数 >= 30  
    // D 级：30 > 榜单人数 >= 10  
    // E 级：10 > 榜单人数 > 1  
    // Z 级：榜单人数 = 1

    this.typeData = {
      A: this.data.filter(x => x.leaderboardLength >= 300),
      B: this.data.filter(x => 300 > x.leaderboardLength && x.leaderboardLength >= 100),
      C: this.data.filter(x => 100 > x.leaderboardLength && x.leaderboardLength >= 30),
      D: this.data.filter(x => 30 > x.leaderboardLength && x.leaderboardLength >= 10),
      E: this.data.filter(x => 10 > x.leaderboardLength && x.leaderboardLength > 1),
      Z: this.data.filter(x => x.leaderboardLength === 1)
    }
  }
}

class DailyItem {
  constructor (data) {
    this.run = new RunData(data.run)
    this.game = new GameData(data.run.game.data)
    this.leaderboard = data.leaderboard
    // console.log(data)
    // console.log(data.run.values)
  }

  get runId () {
    return this.run.id
  }

  get runLink () {
    return this.run.weblink
  }

  get devRunLink () {
    return `/dev/run/${this.runId}`
  }

  get ValuesDesc () {
    return this.run.subCategorieNames
  }

  get gameName () {
    return this.game.cnORenName
  }

  get categoryName () {
    return this.run.categoryName
  }

  get leaderboardLength () {
    return this.leaderboard.length
  }

  get leaderboardLink () {
    return this.leaderboard.weblink
  }
}

export default DailyStore