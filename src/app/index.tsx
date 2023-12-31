import DateTimePicker from '@react-native-community/datetimepicker';
import {Link} from 'expo-router';
import {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import CalendarIcon from '../../assets/icons/calendar.svg';
import DropDownIcon from '../../assets/icons/dropdown.svg';

import {SIZES, COLORS} from '@/constants/theme';
import {DropDownItem} from '@/types/types';
import {cameraData} from '@/utils/cameraData';
import {formatDate, formatLinkDate} from '@/utils/utils';

export default function HomeScreen(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>(
    'Front Hazard Avoidance Camera',
  );
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [dropDownValue, setDropDownValue] = useState<string>('');
  const [dropDownItems, setDropDownItems] = useState<DropDownItem[]>([
    ...cameraData,
  ]);

  const onChange = (currentDate: Date | undefined): void => {
    setShowDatePicker(false);
    if (currentDate) {
      setDate(currentDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Camera and Date</Text>
      <View style={styles.wrapperContainer}>
        <Text style={styles.subtitle}>Rover Camera</Text>
        <DropDownPicker
          open={openDropDown}
          value={dropDownValue}
          items={dropDownItems}
          setOpen={setOpenDropDown}
          setValue={setDropDownValue}
          setItems={setDropDownItems}
          onSelectItem={item => setCurrentItem(item.label ?? '')}
          maxHeight={400}
          placeholder="Select a camera"
          props={{
            style: [styles.optionContainer, styles.buttonsBackground],
          }}
          labelProps={{
            style: [
              styles.inputText,
              styles.container,
              styles.buttonsBackground,
            ],
          }}
          disableBorderRadius
          ArrowDownIconComponent={() => <DropDownIcon width={24} height={24} />}
          ArrowUpIconComponent={() => (
            <DropDownIcon
              width={24}
              height={24}
              style={{transform: [{rotateX: '180deg'}]}}
            />
          )}
        />
        <Text style={styles.subtitle}>Date</Text>
        <View style={[styles.optionContainer, styles.buttonsBackground]}>
          <TouchableOpacity style={styles.button} onPress={showDatepicker}>
            <Text style={styles.inputText}>{formatDate(date)}</Text>
            <CalendarIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(event, date) => onChange(date)}
            maximumDate={new Date()}
          />
        )}
        <Text style={styles.subtitle} />
        <View style={[styles.optionContainer, styles.accentBackground]}>
          <Link
            href={{
              pathname: '/photos/[camera+date]',
              params: {
                camera: dropDownValue,
                date: formatLinkDate(date),
                cameraTitle: currentItem,
              },
            }}
            asChild>
            <TouchableOpacity style={[styles.button, styles.centralPosition]}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <Image
        style={styles.image}
        source={require('../../assets/images/curiosity.png')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    zIndex: 1,
  },
  wrapperContainer: {
    marginTop: '32%',
    width: SIZES.width - 48,
    zIndex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginTop: 7,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.width - 48,
    paddingHorizontal: 16,
    height: '100%',
  },
  buttonsBackground: {
    backgroundColor: COLORS.transparentWhite,
  },
  accentBackground: {backgroundColor: COLORS.accent},
  centralPosition: {justifyContent: 'center'},
  title: {
    fontFamily: 'semibold',
    fontSize: 18,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: 'regular',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
  inputText: {
    fontFamily: 'regular',
    fontSize: 18,
  },
  buttonText: {
    fontFamily: 'semibold',
    fontSize: 18,
    color: COLORS.white,
  },
  image: {
    width: SIZES.width,
  },
});
