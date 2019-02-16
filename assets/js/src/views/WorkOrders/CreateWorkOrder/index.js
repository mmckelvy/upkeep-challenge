import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Block,
  Form,
  Input,
  Grid,
  Row,
  Col,
  PrimaryButton,
  SecondaryButton
} from 'components'
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
              <Grid
                colMarginBottom={spacing.med}>

                <Row>
                  <Col
                    onClick={hideCreateWorkOrder}
                    style={{
                      cursor: 'pointer'
                    }}>

                    CLOSE
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Input
                      width="100%"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      label="Title"
                      placeholder="Fix sink"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Input
                      width="100%"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      label="Description"
                      placeholder="Sink on 2nd floor is broken"
                      multiLine
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Input
                      width="100%"
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                      label="Priority"
                      placeholder="0, 1, 2, or 3"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col marginBottom={spacing.xl}>
                    <Input
                      width="100%"
                      name="dueDate"
                      value={values.dueDate}
                      onChange={handleChange}
                      label="Due Date"
                      placeholder="YYYY-MM-DD"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>

                    <SecondaryButton
                      type="button"
                      style={{marginRight: spacing.med}}>

                      Cancel
                    </SecondaryButton>

                    <PrimaryButton>
                      Submit
                    </PrimaryButton>
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
