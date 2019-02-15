import React from 'react'
import PropTypes from 'prop-types'

export default function Row({
  isMobile,
  wrap,
  gutters,
  style,
  children,
  onMouseEnter = null,
  onMouseLeave = null,
  ...rest
}) {
  // Set negative margins to ensure columns are flush with the container
  const appliedGutters = gutters
    ? {marginRight: -gutters / 2, marginLeft: -gutters / 2}
    : {}

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="row"
      style={{
        display: 'flex',
        flexFlow: isMobile || wrap ? 'row wrap' : 'row nowrap',
        ...appliedGutters,
        ...style
      }}>

      {/* Pass the isMobile and gutters props down to the Cols */}
      {React.Children.map(children, (child) => {
        if (!child) {
          return child
        }

        return React.cloneElement(child, {isMobile, gutters, ...rest})
      })}
    </div>
  )
}

Row.propTypes = {
  isMobile: PropTypes.bool, // Injected by parent
  wrap: PropTypes.bool, // Injected by parent
  justifyContent: PropTypes.string, // Injected by parent
  gutters: PropTypes.number, // Injected by parent
  style: PropTypes.object,
  children: PropTypes.node,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}
