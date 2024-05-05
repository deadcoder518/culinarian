import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../App';
import {initialiseRecipe} from '../store/recipe/recipeSlice';
import {useDispatch} from 'react-redux';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

export function RecipeDetail({route, navigation}: ScreenProps) {
  const {id} = route.params;
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.request({
          method: 'GET',
          url: `https://api.spoonacular.com/recipes/${id}/information`,
          params: {
            apiKey: process.env.SPOONACULAR_API_KEY,
            addRecipeInformation: true,
            instructionsRequired: true,
            fillIngredients: true,
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
  }, [id]);

  function navigateToCookingMode() {
    const extendedIngredients: any[] = data.extendedIngredients;
    const ingredients = extendedIngredients.map(ingredient => {
      return {
        name: ingredient.nameClean,
        amount: ingredient.amount,
        unit: ingredient.unit,
      };
    });
    const extendedInstructions: any[] = data.analyzedInstructions[0].steps;
    const instructions = extendedInstructions.map(
      instruction => instruction.step,
    );
    dispatch(initialiseRecipe({ingredients, instructions}));
    navigation.navigate('CookingMode');
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <View>
          <TouchableOpacity onPress={navigateToCookingMode}>
            <Text>{data.title}</Text>
          </TouchableOpacity>
          <FlatList
            data={data.extendedIngredients}
            renderItem={({item}) => <Text>{item.name}</Text>}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: '5%',
  },
});
