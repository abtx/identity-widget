import {  useReducer, useEffect } from "react";
import createUseContext from "constate"; // State Context Object Creator
import netlifyIdentity from 'netlify-identity-widget'

// useIdentityContext provides the identity credentials associated with user object
// user object lives in Fauna db, and agregates information about user status, preferences, their unique id
// the id refers to collections owned by the user

let initialState = {
  loggedIn: null,
  user: null
}

const reducer = (state, action) => {

  switch  (action.type) {
    
    case "MANAGE_LOGIN":

      return action.payload ? 
      {
        ...state, 
        loggedIn: true, 
      } :
      {
        ...state, 
        loggedIn: false, 
        user: null
      }
    case "UPDATE_USER":

      return {
        ...state,
        user: action.payload
      }

    default:
      throw new Error()
    }
  }

function userContext() {

  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { loggedIn, user } = state

  useEffect(()=> {
    console.log(user, loggedIn)
  }, [user, loggedIn])
  
  
  useEffect(()=> {
    netlifyIdentity.currentUser() && setUser(netlifyIdentity.currentUser()) && manageLoginState(true)
    
  }, [netlifyIdentity])

  // functions
  const manageLoginState = (bool) => {

    dispatch({
      type: "MANAGE_LOGIN",
      payload: bool
    })
  }


  const setUser = user => {
  
    dispatch({
      type: "UPDATE_USER",
      payload: user
    })
   
  }

  return { 
    manageLoginState, 
    loggedIn,
    setUser,
    user
  }
}

export const useUserContext = createUseContext(userContext)