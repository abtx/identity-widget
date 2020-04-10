import React from 'react'
import { Button } from 'react-bootstrap'
import Main from '../Main'
import Public from '../Public'
import netlifyIdentity from 'netlify-identity-widget'
import AuthButton from '../AuthButton'
import AppHeader from '../AppHeader'
import { useUserContext } from "../userContext"
import {
    BrowserRouter as Router,
    Route,
    Redirect,
  } from 'react-router-dom'
  



const netlifyAuth = {
    user: null,
    authenticate(callback) {
      netlifyIdentity.open();
      netlifyIdentity.on('login', user => {
        this.user = user;        
        callback(user)
      });
    },
    signout(callback) {
      netlifyIdentity.logout();
      netlifyIdentity.on('logout', () => {
        this.user = null;
        
        callback()

      });
    }
  };

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            netlifyIdentity.currentUser() ? (
            <Component {...props}  netlifyAuth={netlifyAuth} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }




  class Login extends React.Component {
    state = { redirectToReferrer: false }
    abortController = new AbortController()

    login = () => {
      netlifyAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };

    componentWillUnmount() {
      this.abortController.abort()
    }
  
    render() {
      let { from } = this.props.location.state || { from: { pathname: '/' } };
      let { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) return <Redirect to={from} />;
  
      return (
        <div>
          <p>You must log in to view your tasks.</p>
          <p><Button size="sm" onClick={this.login}>Log in</Button></p>
        </div>
      );
    }
  }

export default function Auth() {

    const { manageLoginState, setUser } = useUserContext()
    netlifyIdentity.on('login', (user) => {
      setUser(user)
      manageLoginState(true)
      netlifyIdentity.close()
      return
    });


    return (

    
      <Router>
        <div>
          <AppHeader authButton={<AuthButton />}/>
          
          <Route path="/" exact component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/main" component={Main} />
        </div>
      </Router>
    );
  }