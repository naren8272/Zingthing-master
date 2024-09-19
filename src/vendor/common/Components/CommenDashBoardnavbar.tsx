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

const CommenDashBoardnavbar = ({onpress, label, image}: any) => {
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onpress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        paddingHorizontal: RFValue(12),
        borderRadius: 14,
      }}>
      <Image
        style={{
          resizeMode: 'contain',
          height: RFValue(50, SCREEN_HEIGHT),
          width: RFValue(50, SCREEN_HEIGHT),
        }}
        source={image}
      />
      <View
        style={{
          backgroundColor: COLORS.LightBlack,
          flexDirection: 'row',
          paddingVertical: 16,
          borderRadius: RFValue(8),
          marginLeft: RFValue(10),
          width: SCREEN_WIDTH * 0.75,
        }}>
        <Text
          style={{
            color: COLORS.White,
            fontSize: RFValue(16),
            marginLeft: RFValue(14),
            width: SCREEN_WIDTH * 0.6,
          }}>
          {label}
        </Text>
        <Image
          source={IMAGE.BackWithView}
          style={{
            resizeMode: 'contain',
            width: RFValue(60),
            height: RFValue(24),
          }}
        />
      </View>
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

export default CommenDashBoardnavbar;
