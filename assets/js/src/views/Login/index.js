import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Block,
  Headline,
  Form,
  Input,
  PrimaryButton,
  Grid,
  Row,
  Col
} from 'components'

import { spacing, shadows } from 'theme'

export default class Login extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit({ values }) {
    const { history, authenticate } = this.props
    // In a production app we would sanitize / validate these values

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })

      if (res.ok) {
        const { sessionToken } = await res.json()

        localStorage.setItem('sessionToken', sessionToken)
        authenticate()

        // Redirect to the home page.
        setTimeout(() => history.push('/'), 1000)

      } else {
        // Show some error message to the user.
        console.log(res)
      }

    } catch (err) {
      console.log(err)
      // Show some error message to the user.
    }
  }

  render() {
    return (
      <Block>
        <Headline
          style={{
            textAlign: 'center',
            marginBottom: spacing.med
          }}>

          UpKeep Maintenance
        </Headline>

        <Block
          style={{
            margin: `0 auto`,
            padding: spacing.med,
            boxShadow: shadows.shadow1,
            maxWidth: spacing.base * 24
          }}>

          <Form
            onSubmit={this.handleSubmit}
            initialInputs={{
              email: '',
              password: ''
            }}>

            {({ values, handleChange }) => {
              return (
                <Grid>

                  <Row>
                    <Col marginBottom={spacing.med}>
                      <Input
                        name="email"
                        placeholder="you@email.com"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col marginBottom={spacing.xl}>
                      <Input
                        name="password"
                        placeholder="myStrongPassword"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col marginBottom={0}>
                      <PrimaryButton
                        style={{width: '100%'}}>

                        Log in
                      </PrimaryButton>
                    </Col>
                  </Row>
                </Grid>
              )
            }}
          </Form>

        </Block>
      </Block>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object, // Injected by RR
}
