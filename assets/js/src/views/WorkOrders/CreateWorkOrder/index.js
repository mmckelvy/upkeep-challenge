import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Block, Form, Input, Grid, Row, Col } from 'components'
import { spacing, shadows, type } from 'theme'

export default class CreateWorkOrder extends Component {
  render() {
    const { creatingWorkOrder, hideCreateWorkOrder } = this.props
    const xPos = creatingWorkOrder ? 0 : spacing.base * 25

    return (
      <Block
        style={{
          width: spacing.base * 25,
          boxShadow: shadows.shadow1,
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          zIndex: 3,
          padding: spacing.med,
          transform: `translateX(${xPos}px)`,
          transition: 'transform 150ms ease-in-out',
          backgroundColor: 'white',
          fontSize: type.small,
          overflowY: 'auto',
        }}>

        <Form>
          {({ values, handleChange }) => {
            return (
              <Grid>
                <Row>
                  <Col flex={`0 1 ${spacing.base * 20}px`}>
                    <Input
                      width="100%"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      label="Title"
                      placeholder="Fix sink"
                    />
                  </Col>

                  <Col flex={`0 1 ${spacing.base * 20}px`}>
                    <Input
                      width="100%"
                      name="Description"
                      value={values.description}
                      onChange={handleChange}
                      label="Description"
                      placeholder="Sink on 2nd floor is broken"

                    />
                  </Col>
                </Row>
              </Grid>
            )
          }}
        </Form>

      </Block>
    )
  }
}

CreateWorkOrder.propTypes = {
  creatingWorkOrder: PropTypes.bool,
  hideCreateWorkOrder: PropTypes.func
}
