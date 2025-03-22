import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
            includeNutrition: true,
            fillIngredients: true,
          },
        });

        setData(response.data);
      } catch (e) {
        console.debug(e);
        if (e instanceof Error) {
          setError(e);
        }
      }
      setIsLoading(false);
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
          <Image source={{uri: data.image}} style={styles.image} />
          <View>
            <Text style={styles.recipeTitle}>{data.title}</Text>
            <View style={styles.recipeInfoMini}>
              <Text style={styles.recipeInfoText}>
                🔥 {data.nutrition.nutrients[0].amount}kcal
              </Text>
              <Text style={styles.recipeInfoText}>
                {data.cookingMinutes === -1
                  ? '⏰ 30 minutes'
                  : `⏰ ${data.cookingMinutes} minutes`}
              </Text>
              <Text style={styles.recipeInfoText}>
                ⭐ {data.aggregateLikes} likes!
              </Text>
            </View>
          </View>
          <ScrollView style={styles.recipeDetailedInfo}>
            <Text style={styles.recipeIngredientsTitle}>Ingredients</Text>
            {data.extendedIngredients.map(ingredient => (
              <Text style={styles.recipeIngredientsText}>
                - {ingredient.amount} {ingredient.unit} {ingredient.nameClean}
              </Text>
            ))}
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={styles.recipeIngredientsTitle}>Instructions</Text>
            {data.analyzedInstructions[0].steps.map(instruction => (
              <Text style={styles.recipeIngredientsText}>
                • {instruction.step}
              </Text>
            ))}
          </ScrollView>
          <Button
            title="Cook Now"
            color="black"
            onPress={navigateToCookingMode}
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
  },
  image: {
    height: 350,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  recipeTitle: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: '2%',
    marginLeft: '2%',
    color: 'black',
  },
  recipeInfoMini: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginTop: '2.5%',
  },
  recipeInfoText: {
    marginLeft: '2%',
    fontSize: 15,
    fontWeight: '700',
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    borderRadius: 20,
  },
  recipeDetailedInfo: {
    marginTop: '5%',
    paddingHorizontal: '5%',
    height: 330,
  },
  recipeIngredientsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: '2%',
  },
  recipeIngredientsText: {
    fontWeight: '600',
  },
});
