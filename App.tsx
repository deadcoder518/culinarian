import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {RecipeDetail} from './screens/RecipeDetail';
import {CookingMode} from './screens/CookingMode';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  RecipeDetail: {id: string};
  CookingMode: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Culinarian', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CookingMode"
          component={CookingMode}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
