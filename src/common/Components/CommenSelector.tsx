import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {IMAGE} from '../Utils/image';
import {COLORS} from '../Utils/Colors';
import {FONTS} from '../Utils/fonts';

interface Props {
  onPress: () => void;
  Back: boolean;
  Header: any;
}

const CommenSelector = ({onpress, index, ischecked, label}: any) => {
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onpress(index)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 6,
        padding: 16,
        backgroundColor: COLORS.LightBlack,
        borderRadius: 14,
      }}>
      <View
        style={{
          borderColor: COLORS.PrimeryColor,
          borderWidth: 1,
          padding: RFValue(5),
          borderRadius: 8,
        }}>
        <View
          style={{
            backgroundColor: ischecked
              ? COLORS.PrimeryColor
              : COLORS.LightBlack,
            width: RFValue(18),
            height: RFValue(18),
            borderRadius: RFValue(50),
          }}
        />
      </View>
      <Text
        style={{
          color: COLORS.White,
          fontSize: RFValue(16),
          marginLeft: RFValue(14),
          width: SCREEN_WIDTH * 0.55,
        }}>
        {label}
      </Text>
      <Image
        source={IMAGE.BackWithView}
        style={{
          resizeMode: 'contain',
          width: RFValue(60),
          height: RFValue(24),
          marginLeft: RFValue(16),
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: COLORS.LightBlack,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(6),
  },
  headerText: {
    textAlign: 'center',
    color: COLORS.White,
    fontSize: RFValue(14),
    fontFamily: FONTS.Bold,
  },
});

export default CommenSelector;
