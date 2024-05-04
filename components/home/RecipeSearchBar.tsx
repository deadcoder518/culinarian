import React from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

export default function RecipeSearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchField}>
          <TextInput
            style={styles.input}
            placeholder="Restaurants, groceries, dishes"
            value=""
            onChange={() => {}}
          />
        </View>
        <Button title="Search" color="orange" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    paddingHorizontal: '5%',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  searchField: {
    backgroundColor: '#d4d3cf',
    borderRadius: 8,
    width: '70%',
    flexDirection: 'row',
    paddingLeft: '3%',
  },
  input: {
    color: 'black',
    paddingVertical: '2%',
  },
  searchIcon: {
    paddingLeft: 10,
  },
  button: {
    borderRadius: 10,
  },
});
