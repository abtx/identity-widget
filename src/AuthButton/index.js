import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import { Button } from 'react-bootstrap'
import { Redirect, withRouter } from 'react-router-dom'
import { useUserContext } from "../userContext"

const AuthButton = ({history, ...props}) => {

    const { manageLoginState, setUser } = useUserContext()

    return(
      netlifyIdentity.currentUser() ? (
      <>
        
        <Button
          size="sm" 
          onClick={() => {
            props.netlifyAuth.signout(() => {
              history.push('/')
              setUser(null)
              manageLoginState(false)
              return 
            });
          }}
        >
          Sign out
        </Button>
        <Redirect to={'/main'} />
      </>
    ) : ( 
        
      <p>You are not logged in.
        <Redirect to={'/login'} />
      </p>
    )
    )}

export default withRouter(AuthButton)