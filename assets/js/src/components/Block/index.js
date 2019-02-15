import React from 'react'
import PropTypes from 'prop-types'

export default function Block({ style, children, ...rest }) {
  return (
    <div style={style} {...rest}>
      {children}
    </div>
  )
}

Block.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
}
