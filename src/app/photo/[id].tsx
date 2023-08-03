import {useLocalSearchParams, useRouter} from 'expo-router';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BackIcon from '../../../assets/icons/backWhite.svg';
import ShareIcon from '../../../assets/icons/shareWhite.svg';

import {COLORS, SIZES} from '@/constants/theme';

export default function PhotoScreen() {
  const {id, img_src} = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.photoContainer}>
        <View style={styles.header}>
          <BackIcon width={24} height={24} onPress={() => router.back()} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.subtitle}>Photo ID</Text>
            <Text style={styles.title}>{id}</Text>
          </View>
          <ShareIcon width={24} height={24} />
        </View>
        <Image source={{uri: img_src}} style={styles.image} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.black,
  },
  photoContainer: {
    width: SIZES.width - 32,
    height: SIZES.height,
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
  title: {
    fontFamily: 'semibold',
    fontSize: 18,
    color: COLORS.white,
  },
  subtitle: {
    fontFamily: 'regular',
    fontSize: 13,
    color: COLORS.white,
  },
  image: {
    aspectRatio: 9 / 18,
    width: '100%',
    borderRadius: 8,
  },
});
