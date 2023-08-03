import {useRouter} from 'expo-router';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SIZES} from '@/constants/theme';

export default function ListEmpty() {
  const router = useRouter();

  return (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.listEmptyText}>
        Sorry!{'\n'}There are no photos here
      </Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={[styles.listEmptyText, styles.underline]}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height,
  },
  listEmptyText: {
    textAlign: 'center',
    fontFamily: 'semibold',
    fontSize: 18,
  },
  underline: {textDecorationLine: 'underline'},
});
