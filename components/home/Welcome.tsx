import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.hiText}>👋 Hi there!</Text>
      <Text style={styles.blurbText}>What's cooking?</Text>
      <Text style={styles.descriptionText}>
        Select from over 1000+ mouth-watering recipes to chef up today!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '7%',
    height: 'auto',
    marginBottom: '5%',
    paddingHorizontal: '5%',
  },
  hiText: {
    fontSize: 30,
    marginBottom: '1%',
    color: 'black',
  },
  blurbText: {
    fontSize: 30,
    fontWeight: '500',
    color: 'brown',
    marginBottom: '3%',
  },
  descriptionText: {
    color: 'black',
  },
});
