class PlayerStore {
  constructor ({ data, css }) {
    this.data = data
    this.css = css
  }

  get name () {
    try {
      return this.data.names.international
    } catch (e) {
      return <span className={ this.css.guest }>guest</span>
    }
  }
}

class GameStore {
  constructor ({ data }) {
    this.data = data
  }

  get name () {
    return this.data.names.international
  }

  get abbreviation () {
    return this.data.abbreviation
  }
}

class CategoryStore {
  constructor ({ data }) {
    this.data = data
  }

  get name () {
    return this.data.name
  }

  get type () {
    return this.data.type
  }

  get rules () {
    return this.data.rules
  }
}

export { PlayerStore, GameStore, CategoryStore }