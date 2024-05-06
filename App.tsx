import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {RecipeDetail} from './screens/RecipeDetail';
import {CookingMode} from './screens/CookingMode';
import {SearchResults} from './screens/SearchResults';
import {store} from './store';
import {Provider} from 'react-redux';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  RecipeDetail: {id: string};
  CookingMode: undefined;
  SearchResults: {query?: string; mealType?: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen
            name="SearchResults"
            component={SearchResults}
            options={{title: 'Search Results', headerTitleAlign: 'center'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
