import React from 'react'
import Auth from './Auth'
import { useUserContext } from './userContext'



export default function App() {

    return (
    
        <useUserContext.Provider>

              <Auth />

        </useUserContext.Provider>
    )
    
  }