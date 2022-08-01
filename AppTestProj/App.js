import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Create from './components/Create';
import Details from './components/Details';
import Edit from './components/Edit';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

function App() {

  return (
    <View style={styles.container}> 

      <Stack.Navigator initialRouteName = 'Início' detachInactiveScreens = {false}>
        <Stack.Screen name = 'Início' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name = 'Novo' component={Create} options={{headerShown:false}}/>
        <Stack.Screen name = 'Detalhes' component={Details} options={{headerShown:false}}/>
        <Stack.Screen name = 'Editar' component={Edit} options={{headerShown:false}}/>
      </Stack.Navigator>

    </View>
  );
}

export default() => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    marginTop:Constants.statusBarHeight,
  },
});
