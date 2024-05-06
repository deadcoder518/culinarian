import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import axios from 'axios';
import RecipeCard from '../components/cards/RecipeCard';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchResults'>;

export function SearchResults({route}: ScreenProps) {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  const params = route.params;

  const getAPIRequestParams = useCallback(() => {
    if (params.query) {
      return {query: params.query};
    } else if (params.mealType) {
      return {type: params.mealType};
    }
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const requestParams = getAPIRequestParams();

      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://api.spoonacular.com/recipes/complexSearch',
          params: {
            apiKey: process.env.SPOONACULAR_API_KEY,
            addRecipeInformation: true,
            addRecipeNutrition: true,
            ...requestParams,
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
  }, [getAPIRequestParams]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <FlatList
          data={data.results}
          renderItem={({item}) => <RecipeCard recipe={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
});
