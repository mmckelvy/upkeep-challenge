import React from 'react'
import PropTypes from 'prop-types'

import Block from '../Block'

export default function Loader({ msg = 'Loading...' }) {
  return (
    <Block>
      {msg}
    </Block>
  )
}

Loader.propTypes = {
  msg: PropTypes.string
}
