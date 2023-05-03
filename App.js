import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/navigators/MainStack'
import { ContextProvider } from './src/context/DataContext'
const App = () => {

  return (
    <ContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ContextProvider>
  );
};



export default App;
