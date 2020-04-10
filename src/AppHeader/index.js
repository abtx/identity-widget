import React, { useEffect, useState } from 'react'
import {Badge, Button, ButtonGroup} from 'react-bootstrap'
import netlifyIdentity from 'netlify-identity-widget'

const AppHeader = (props) => {

  const [ name, setName ] = useState('User Settings')

  useEffect(()=> {
    netlifyIdentity.currentUser() 
    && netlifyIdentity.currentUser().user_metadata 
    && netlifyIdentity.currentUser().user_metadata.full_name 
    && 
    setName(netlifyIdentity.currentUser().user_metadata.full_name) 
  }, [netlifyIdentity])
  return (
    <header className='header d-flex justify-content-between'>
      <div>

        <Badge className="ml-2" pill variant="info">
          Uggly Beta
        </Badge>

      </div>
      <ButtonGroup>
        <Button size="sm" variant="outline-primary">{name}</Button>
        {props.authButton}
      </ButtonGroup>
    </header>
  )
}

export default AppHeader