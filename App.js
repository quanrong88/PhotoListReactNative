import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PhotoListScreen from './screens/PhotoListScreen';
import PhotoDetailScreen from './screens/PhotoDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PhotoList" component={PhotoListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} options={{ title: 'Photo Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}