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

const LoanCommenView = ({onpress, label, image}: any) => {
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
        borderRadius: 14,
        backgroundColor: COLORS.LightBlack,
        marginHorizontal: RFValue(12, SCREEN_HEIGHT),
      }}>
      <View
        style={{
          backgroundColor: COLORS.Black,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: COLORS.PrimeryColor,
          paddingHorizontal: RFValue(10),
          paddingVertical: RFValue(16),
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            height: RFValue(30, SCREEN_HEIGHT),
            width: RFValue(30, SCREEN_HEIGHT),
          }}
          source={image}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: RFValue(8),
          width: SCREEN_WIDTH * 0.8,
        }}>
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
          source={IMAGE.NextArrow}
          style={{
            resizeMode: 'contain',
            width: RFValue(56),
            height: RFValue(20),
            marginLeft: RFValue(10),
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

export default LoanCommenView;
