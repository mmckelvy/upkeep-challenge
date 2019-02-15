import React from 'react'
import PropTypes from 'prop-types'

export default function Col({
  isMobile,
  flex,
  mobileFlex = `0 0 100%`,
  colMarginBottom,
  marginBottom,
  gutters,
  style,
  ...rest
}) {
  let flexProp

  if (isMobile) {
    flexProp = mobileFlex
  // No flex prop specified, let flex allocate the items evenly
  } else if (!flex) {
    flexProp = `1 1 0`
  } else {
    flexProp = flex
  }

  const appliedGutters = gutters
    ? {paddingLeft: gutters / 2, paddingRight: gutters / 2}
    : {}

  const appliedMarginBottom = marginBottom || marginBottom === 0
    ? marginBottom
    : colMarginBottom

  return (
    <div
      className="col"
      style={{
        flex: flexProp,
        marginBottom: appliedMarginBottom,
        ...appliedGutters,
        ...style
      }}
      {...rest}
    />
  )
}

Col.propTypes = {
  isMobile: PropTypes.bool, // Injected by parent
  gutters: PropTypes.number, // Injected by parent
  flex: PropTypes.string,
  mobileFlex: PropTypes.string,
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  colMarginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
