import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import RecipeCard from '../cards/RecipeCard';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const mealTypes = ['Breakfast', 'Main', 'Side Dish', 'Dessert', 'Appetizer'];

export default function PopularRecipes() {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  const [activeMealType, setActiveMealType] = useState('Breakfast');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://api.spoonacular.com/recipes/complexSearch',
          params: {
            apiKey: process.env.SPOONACULAR_API_KEY,
            type: activeMealType,
            addRecipeInformation: true,
            addRecipeNutrition: true,
          },
        });

        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.debug(e);
        if (e instanceof Error) {
          setError(e);
        }
      }
    };

    fetchData();
  }, [activeMealType]);

  return (
    <View style={styles.container}>
      <View style={styles.mealTypesTabContainer}>
        <FlatList
          data={mealTypes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={mealTypesTabStyles.tab(activeMealType, item)}
              onPress={() => {
                setActiveMealType(item);
              }}>
              <Text style={mealTypesTabStyles.tabText(activeMealType, item)}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          keyExtractor={item => item}
          contentContainerStyle={styles.mealTypesList}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Choice</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SearchResults', {mealType: activeMealType})
          }>
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recipeCardContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : error ? (
          <Text>Error</Text>
        ) : (
          <FlatList
            data={data.results}
            renderItem={({item}) => <RecipeCard recipe={item} />}
            ListFooterComponent={<View style={styles.recipeCard} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },
  header: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
  },
  moreText: {
    fontSize: 20,
    fontWeight: '300',
    color: 'orange',
  },
  mealTypesList: {
    columnGap: 10,
  },
  mealTypesTabContainer: {
    paddingLeft: '5%',
    marginTop: '5%',
    width: '100%',
    borderColor: 'black',
    marginBottom: '5%',
  },
  recipeCardContainer: {
    paddingHorizontal: '5%',
    marginTop: '5%',
    overflow: 'scroll',
  },
  recipeCard: {
    height: 200,
  },
});

const mealTypesTabStyles = {
  tab: (activeMealType: string, item: string): ViewStyle => ({
    borderRadius: 10,
    borderWidth: 1,
    borderColor: activeMealType === item ? 'black' : 'lightgrey',
    padding: 10,
  }),
  tabText: (activeMealType: string, item: string): TextStyle => ({
    color: activeMealType === item ? 'black' : 'lightgrey',
  }),
};
