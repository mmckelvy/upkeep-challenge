import React, { Component } from 'react'

import { Block } from 'components'

import { spacing } from 'theme'

export default class SiteHeader extends Component {
  render() {
    return (
      <Block
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>

        <Block
          style={{
            padding: `${spacing.med}px ${spacing.med}px ${spacing.med}px 0`
          }}>

          Logout
        </Block>
      </Block>
    )
  }
}
