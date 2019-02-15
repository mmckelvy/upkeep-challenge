import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { Block, Loader } from 'components'
import { Home, Login } from 'views'

export default class Root extends Component {
  constructor() {
    super()
    this.state = {
      checkingAuth: true,
      isAuthenticated: false
    }

    this.authenticate = this.authenticate.bind(this)
    this.logout = this.logout.bind(this)
  }

  /**
  * Any component that re-directs from a public route to a protected route will
  * have to call this function.
  */
  authenticate() {
    this.setState({
      isAuthenticated: true,
      checkingAuth: false
    })
  }

  logout() {
    localStorage.removeItem('sessionToken')
    this.setState({
      isAuthenticated: false
    })
  }

  async verifyAuthToken() {
    const authToken = localStorage.getItem('sessionToken')

    /*
    In a production application we could check with the server to make sure
    this token is actually valid.  For now, we are just going to check for the
    presence of a token.
    */
    if (!authToken) {
      return this.setState({checkingAuth: false})
    }

    this.authenticate()
  }

  componentDidMount() {
    this.verifyAuthToken()
  }

  render() {
    const {
      checkingAuth,
      isAuthenticated
    } = this.state

    return (
      <Block>

        <Block>

          <Switch>
            <Route path="/login" render={() => {
              if (checkingAuth) {
                return <Loader msg="Checking your credentials..." />
              }

              if (isAuthenticated) {
                return <Redirect to="/" />
              }

              return <Login />
            }} />


            {/* Protected route */}
            <Route path="/" render={(props) => {
              if (checkingAuth) {
                return <Loader msg="Checking your credentials..." />
              }

              if (isAuthenticated) {
                return <Home updateStatus={this.updateStatus} {...props} />
              }

              return <Redirect to="/login" />
            }} />
          </Switch>
        </Block>

      </Block>
    )
  }
}
