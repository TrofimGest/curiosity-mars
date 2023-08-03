import React from 'react';
import {View, Pressable, Image, StyleSheet} from 'react-native';

import {SIZES} from '@/constants/theme';

export default function ListItem({photo}) {
  const {img_src, id} = photo;
  console.log(img_src, id);
  return (
    <View style={styles.item}>
      <Pressable>
        <Image source={{uri: img_src}} style={styles.image} />
      </Pressable>
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
