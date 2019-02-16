import React, { Component } from 'react'

import { Block } from 'components'

import { colors, spacing } from 'theme'

export default class SiteFooter extends Component {
  render() {
    return (
      <Block
        style={{
          color: colors.blueGrey300,
          padding: spacing.med
        }}>

        2019 UpKeep Maintenance
      </Block>
    )
  }
}
