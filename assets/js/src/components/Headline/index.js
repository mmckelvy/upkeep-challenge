import React from 'react'
import PropTypes from 'prop-types'

import { type } from 'theme'

export default function Headline({ style, children, ...rest }) {
  return (
    <div
      style={{
        fontSize: type.xl,
        ...style
      }}
    {...rest}>

      {children}
    </div>
  )
}

Headline.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
}

