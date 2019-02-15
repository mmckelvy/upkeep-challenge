import React, { Component } from 'react'

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
  /*
  - Make a request to the server w/ email and pass.
  - Receive a token.
  - Save the token to localStorage for subsequent requests.
  - Call the authenticate function.
  */
  handleSubmit() {

  }

  render() {
    return (
      <Block>
        <Headline
          style={{
            textAlign: 'center',
            marginBottom: spacing.med
          }}>

          Welcome to UpKeep! Please login below.
        </Headline>

        <Block
          style={{
            margin: `0 auto`,
            padding: spacing.med,
            boxShadow: shadows.shadow1,
            maxWidth: spacing.base * 24
          }}>

          <Form>
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
