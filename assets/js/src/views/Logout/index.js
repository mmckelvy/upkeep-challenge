import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Logout extends Component {
  async componentDidMount() {
    const { history, logout } = this.props
    await logout()
    history.push('/login')
  }

  render() {
    return null
  }
}

Logout.propTypes = {
  history: PropTypes.object,
  logout: PropTypes.func,
  hideSidebar: PropTypes.func
}
