import {useLocalSearchParams, useRouter} from 'expo-router';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BackIcon from '../../../assets/icons/back.svg';

import {getPhotos} from '@/api/api';
import CustomActivityIndicator from '@/components/ActivityIndicator';
import ListEmpty from '@/components/ListEmpty';
import ListItem from '@/components/ListItem';
import {COLORS, SIZES} from '@/constants/theme';
import {formatDate} from '@/utils/utils';

export default function CameraRollScreen() {
  const router = useRouter();
  const {camera, date, cameraTitle} = useLocalSearchParams();

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
    return <CustomActivityIndicator mode="light" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsList}>
        <View style={styles.header}>
          <BackIcon width={24} height={24} onPress={() => router.back()} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{cameraTitle}</Text>
            <Text style={styles.subtitle}>{formatDate(new Date(date))}</Text>
          </View>
          <View style={{width: 24, height: 24}} />
        </View>
        <FlatList
          data={photos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ListItem photo={item} />}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ListEmpty />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    verticalAlign: 'top',
    width: '100%',
    backgroundColor: COLORS.background,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontFamily: 'semibold', fontSize: 18},
  subtitle: {fontFamily: 'regular', fontSize: 13},
  itemsList: {
    width: SIZES.width - 24,
    height: SIZES.height,
  },
});
