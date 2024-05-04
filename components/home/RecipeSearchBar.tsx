import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

export default function RecipeSearchBar() {
  const [textInput, setTextInput] = useState<string>('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchField}>
          <TextInput
            style={styles.input}
            placeholder="Restaurants, groceries, dishes"
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <Button
          title="Search"
          color="orange"
          onPress={() =>
            navigation.navigate('SearchResults', {query: textInput})
          }
        />
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
