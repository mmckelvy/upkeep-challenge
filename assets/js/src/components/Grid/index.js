import React from 'react'
import Media from 'react-media'
import PropTypes from 'prop-types'

import { spacing, media } from 'theme'

export default function Grid({
  center, // center the grid relative to its container
  wrap, // whether or not columns inside rows should wrap or shrink
  gutters = spacing.med,
  maxWidth = '100%',
  padding = 0, // Padding on the grid container itself
  style,
  noMobileWrap, // override the default mobile wrapping
  colMarginBottom, // Option to pass along margin bottom at the grid level
  children,
  ...rest
}) {

  const margin = center ? {marginLeft: 'auto', marginRight: 'auto'} : {}

  // Pass on the marginBottom prop if defined else set to zero
  const appliedMarginBottom = colMarginBottom
    ? {colMarginBottom}
    : {colMarginBottom: 0}

  return (
    <Media query={media.mobile}>
      {(isMobile) => {
        return (
          <div
            className="grid"
            style={{
              paddingLeft: padding,
              paddingRight: padding,
              maxWidth,
              ...margin,
              ...style,
            }}
            {...rest}>

            {React.Children.map(children, (child) => {
              // Passed in a null child
              if (!child) {
                return child
              }

              return React.cloneElement(child, {
                isMobile: noMobileWrap ? false : isMobile,
                wrap,
                gutters,
                ...appliedMarginBottom
              })
            })}
          </div>
        )
      }}
    </Media>
  )
}

Grid.propTypes = {
  center: PropTypes.bool,
  wrap: PropTypes.bool,
  justifyContent: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gutters: PropTypes.number,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  noMobileWrap: PropTypes.bool,
  colMarginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
}
