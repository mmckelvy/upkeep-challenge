import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles'

export default function ClickAway({ zIndex, onClick, style }) {
  return (
    <div style={{...styles, zIndex, ...style}} onClick={onClick} />
  )
}

ClickAway.propTypes = {
  zIndex: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object
}
