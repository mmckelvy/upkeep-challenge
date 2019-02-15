import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Hover extends Component {
  constructor() {
    super()
    this.state = {
      hovered: false
    }

    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  handleEnter() {
    this.setState({
      hovered: true
    })
  }

  handleLeave() {
    this.setState({
      hovered: false
    })
  }

  render() {
    const { children: fn } = this.props
    const { hovered } = this.state

    return fn({
      hovered,
      handleEnter: this.handleEnter,
      handleLeave: this.handleLeave
    })
  }
}

Hover.propTypes = {
  children: PropTypes.func
}
