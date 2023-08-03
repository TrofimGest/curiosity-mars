import {useLocalSearchParams} from 'expo-router';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getPhotos} from '@/api/api';
import CustomActivityIndicator from '@/components/ActivityIndicator';
import ListItem from '@/components/ListItem';
import {COLORS, SIZES} from '@/constants/theme';

export default function CameraRoll() {
  const {camera, date} = useLocalSearchParams();

  const [photos, setPhotos] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

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
    return <CustomActivityIndicator mode="dark" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsList}>
        <FlatList
          data={photos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ListItem photo={item} />}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    verticalAlign: 'top',
    width: '100%',
    backgroundColor: COLORS.background,
  },
  itemsList: {
    width: SIZES.width - 24,
  },
});
