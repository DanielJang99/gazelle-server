import BaseComponent from 'lib/BaseComponent';
import React from 'react';
import { browserHistory } from 'react-router';
import { hash } from 'lib/utilities';
import NotFound from 'components/main/NotFound';
import _ from 'lodash';

export default class Login extends BaseComponent {
  constructor(props) {
    super(props);
    this.safeSetState({
      passwordValue: '',
    });
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePasswordChange(e) {
    this.safeSetState({
      passwordValue: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const pass = e.target.password.value;
    // eslint-disable-next-line max-len
    if (hash(pass) !== 'ebbfa89c771f3f004f8e3959def97cb7f63c313a3b62a35ffe9e298067bea2d95c16e145df6390bcf84ea297fb1b8dfecf03cee47262f5f0ec03975cb42e4110') {
      window.alert('Incorrect password');
      e.target.password.value = ''; // eslint-disable-line no-param-reassign
    } else {
      // Otherwise it is correct and we let the site redirect the client
      let url = this.props.location.query.url || '';
      if (url) {
        _.forEach(this.props.location.query, (q, name) => {
          if (name !== 'url') {
            url += `&${name}=${q}`;
          }
        });
      }
      browserHistory.push(url);
    }
  }

  render() {
    const ENV = process.env.NODE_ENV;
    if (ENV === 'production') {
      return <NotFound />;
    }

    let url = this.props.location.query.url || '';
    if (url) {
      _.forEach(this.props.location.query, (q, name) => {
        if (name !== 'url') {
          url += `&${name}=${q}`;
        }
      });
    }

    return (
      <div className="login-container">
        <h2>Gazelle Staging Login Page</h2>
        <p>
          Welcome to the Gazelle's Staging site, if you were looking for the
          main Gazelle webpage please follow <a href={`https://www.thegazelle.org${url}`}>
          this link</a>. This page is only meant for The Gazelle Team to test
          out new features before we release them on the main page. <br /><br />
          If you on the other hand are part of The Gazelle and want to use the
          staging page, login below with the password you have been given
        </p>
        <div className="login">
          <form className="form form--login" onSubmit={this.handleSubmit}>
            <div className="form__field">
              <label className="fontawesome-lock" htmlFor="login__password">
                <span className="hidden">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="login__password"
                className="form__input"
                autoFocus
                required
              />
            </div>

            <div className="form__field">
              <input
                type="submit"
                value="Enter Staging Site"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}