import React from 'react'
import MainNavigator from './src/templates/mainNavigator';
import { SocketProvider } from './src/templates/SocketContext';
export const App = () => {
  return (
    <SocketProvider>
    <MainNavigator />
    </SocketProvider>
  )
}


export default App

