import React, { Component } from 'react'

import { Block, Headline, Form, Input, PrimaryButton } from 'components'

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
            maxWidth: spacing.base * 32
          }}>

          <Form>
            {({ values, handleChange }) => {
              return (
                <Input
                  width={spacing.base * 20}
                  name="email"
                  placeholder="you@email.com"
                  value={values.email}
                  onChange={handleChange}
                />
              )
            }}
          </Form>
        </Block>
      </Block>
    )
  }
}
