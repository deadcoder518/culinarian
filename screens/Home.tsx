import React from 'react';
import {StyleSheet, View} from 'react-native';
import PopularRecipes from '../components/home/PopularRecipes';
import RecipeSearchBar from '../components/home/RecipeSearchBar';
import Welcome from '../components/home/Welcome';

export function Home() {
  return (
    <View style={styles.container}>
      <Welcome />

      <RecipeSearchBar />

      <PopularRecipes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
