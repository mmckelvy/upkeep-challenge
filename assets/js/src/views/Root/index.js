import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { Block, Loader } from 'components'
import { Home, Login, Logout } from 'views'

import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

import './styles.css'

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

  async logout() {
    try {
      const res = await fetch('/api/logout', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`
        }
      })

      if (res.ok) {
        localStorage.removeItem('sessionToken')

        this.setState({
          isAuthenticated: false
        })

      // some error message
      } else {

      }

    } catch (err) {
      // some error message
    }
  }

  async verifySessionToken() {
    /*
    In a production application we could check with the server to make sure
    this token is actually valid.  For now, we are just going to check for the
    presence of a token.
    */
    const sessionToken = localStorage.getItem('sessionToken')

    if (!sessionToken) {
      return this.setState({checkingAuth: false})
    }

    this.authenticate()
  }

  componentDidMount() {
    this.verifySessionToken()
  }

  render() {
    const {
      checkingAuth,
      isAuthenticated
    } = this.state

    return (
      <Block
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh'
        }}>

        {/* SiteHeader renders no matter what */}
        <Route path="/" render={(props) => {
          return (
            <SiteHeader
              isAuthenticated={isAuthenticated}
              logout={this.logout}
              {...props}
            />
          )
        }} />

        {/* Main content */}
        <Block>

          <Switch>
            <Route path="/login" render={(props) => {
              if (checkingAuth) {
                return <Loader msg="Checking your credentials..." />
              }

              if (isAuthenticated) {
                return <Redirect to="/" />
              }

              return (
                <Login
                  authenticate={this.authenticate}
                  {...props}
                />
              )
            }} />

            <Route path="/logout" render={({ history }) => {
              return (
                <Logout
                  history={history}
                  logout={this.logout}
                />
              )
            }} />


            {/* Protected route */}
            <Route path="/" render={(props) => {
              if (checkingAuth) {
                return <Loader msg="Checking your credentials..." />
              }

              if (isAuthenticated) {
                return <Home />
              }

              return <Redirect to="/login" />
            }} />
          </Switch>
        </Block>

        {/* SiteFooter renders no matter what */}
        <SiteFooter />
      </Block>
    )
  }
}
