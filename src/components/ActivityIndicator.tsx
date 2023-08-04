import {
  ActivityIndicator as DefaultActivityIndicator,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLORS} from '@/constants/theme';

interface ICustomActivity {
  mode: string;
}

export default function CustomActivityIndicator({mode}: ICustomActivity) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        mode === 'dark'
          ? {backgroundColor: COLORS.black}
          : {backgroundColor: COLORS.background},
      ]}>
      <DefaultActivityIndicator
        size="large"
        color={mode === 'dark' ? COLORS.background : COLORS.accent}
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
