import {useLocalSearchParams} from 'expo-router';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getPhotos} from '@/api/api';

export default function CameraRoll() {
  const {camera, date} = useLocalSearchParams();

  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPhotos(date, camera);
        setPhotos(data.photos);
      } catch (error) {
        console.log('Error fetching pictures: ', error.message);
      }
    };

    fetchPhotos();
  }, [date, camera]);

  if (!photos) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>{date}</Text>
      <FlatList
        data={photos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Text style={{color: 'black'}}>{item.id}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
