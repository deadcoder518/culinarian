import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {createAndStartPicovoice, stopAndDeletePicovoice} from '../picovoice';

export function CookingMode() {
  useEffect(() => {
    createAndStartPicovoice();

    return () => {
      stopAndDeletePicovoice();
    };
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Text style={styles.text}>Stop</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});
