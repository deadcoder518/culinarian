import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function RecipeCard(recipe: any) {
  const data = recipe.recipe;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('RecipeDetail', {id: data.id})}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: data.image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.recipeTitle}>{data.title}</Text>
        <Text style={styles.recipeMiniInfoText}>
          {data.cookingMinutes === -1
            ? '⏰ 30 minutes'
            : `⏰ ${data.cookingMinutes} minutes`}
        </Text>
        <Text style={styles.recipeMiniInfoText}>
          🔥 {data.nutrition.nutrients[0].amount}kcal
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    marginBottom: '7%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 30,
  },
  imageContainer: {
    marginLeft: '5%',
  },
  infoContainer: {
    marginTop: '3%',
    width: '70%',
  },
  recipeTitle: {
    color: 'black',
    fontWeight: '300',
    marginBottom: '2%',
  },
  recipeMiniInfoText: {},
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
});
