import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../App';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

export function RecipeDetail({route, navigation}: ScreenProps) {
  const {id} = route.params;
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('CookingMode')}>
          <Text>{data.title}</Text>
        </TouchableOpacity>
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
