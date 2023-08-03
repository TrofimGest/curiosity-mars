import {Link} from 'expo-router';
import {View, Pressable, Image, StyleSheet} from 'react-native';

export default function ListItem({photo}) {
  const {img_src, id} = photo;

  return (
    <View style={styles.item}>
      <Link
        href={{
          pathname: '/photo/[id]',
          params: {
            id,
            img_src,
          },
        }}
        asChild>
        <Pressable>
          <Image source={{uri: img_src}} style={styles.image} />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1 / 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 4,
  },
  image: {
    aspectRatio: 1 / 1,
    width: '100%',
    borderRadius: 8,
  },
});
