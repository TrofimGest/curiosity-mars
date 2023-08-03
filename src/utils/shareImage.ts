import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const openShareDialogAsync = async mediaProp => {
  const fileDetails = {
    extension: '.jpg',
    shareOptions: {
      mimeType: 'image/jpeg',
      dialosTitle: 'Check out this image!',
      UTI: 'image/jpeg',
    },
  };
  const downloadPath = `${FileSystem.cacheDirectory}tmp.jpg`;
  const {uri: localUrl} = await FileSystem.downloadAsync(
    mediaProp,
    downloadPath,
  );
  await Sharing.shareAsync(localUrl, fileDetails.shareOptions);
};
