import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import * as authActions from 'ducks/auth'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const styles = theme => ({})

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  handleLogin = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.authenticate({ username, password })
  }

  handleCreate = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.createUser({ username, password })
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const {
      classes,
      data: { loading, currentUser, errors },
      token,
    } = this.props
    console.log(errors)
    return (
      <div className={classes.root}>
        {loading && 'loading'}
        <div>
          Current user: {currentUser ? currentUser.username : 'nope'}
          <br />
          token: {token}
          <br />
        </div>
        <div>
          <form onSubmit={this.handleLogin}>
            Username{' '}
            <input
              type="text"
              name="username"
              onChange={e => this.setState({ username: e.target.value })}
            />
            Password{' '}
            <input
              type="password"
              name="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <br />
            <button type="submit">Login</button>
            <button onClick={this.handleCreate}>create</button>
            <button onClick={this.handleLogout}>logout</button>
          </form>
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      token: state.auth.token,
    }),
    dispatch => ({
      authenticate: d => dispatch(authActions.authenticate(d)),
      logout: d => dispatch(authActions.reset()),
    })
  ),
  graphql(
    gql`
      query {
        currentUser {
          id
          username
        }
      }
    `,
    {
      options: {
        errorPolicy: 'ignore',
      },
    }
  ),
  graphql(
    gql`
      mutation createUser($username: String!, $password: String!) {
        createUser(input: { username: $username, password: $password }) {
          id
          errors {
            messages
          }
        }
      }
    `,
    {
      props: ({ mutate }) => ({
        createUser: user => mutate({ variables: user }),
      }),
    }
  )
)(Login)
