import React, {useState,  useEffect} from 'react';
import AuthButton from '../AuthButton'
import { useUserContext } from "../userContext"
import netlifyIdentity from 'netlify-identity-widget'

function Main(props) {

  const [ name, setName ] = useState('User Settings')
  const { loggedIn, user } = useUserContext()


  useEffect(()=> {

     let n = netlifyIdentity.currentUser()
      && netlifyIdentity.currentUser().user_metadata 
      && netlifyIdentity.currentUser().user_metadata.full_name 
      n && setName(n) 
      console.log('setName to ', n)

  }, [loggedIn, user])

  return (

    <div>  

      {/* <AppHeader authButton={props.authButton}/> */}
      <AuthButton netlifyAuth={props.netlifyAuth}/>
      hello { name } protected route

      
    </div>
  );
}




export default Main;