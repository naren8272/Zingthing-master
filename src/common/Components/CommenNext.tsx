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

const CommenNext = ({onpress}: any) => {
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.PrimeryColor,
        width: SCREEN_WIDTH * 0.4,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: RFValue(10),
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: COLORS.White,
        marginTop: RFValue(20),
      }}
      onPressIn={onpress}>
      <Text
        style={{
          color: COLORS.White,
          fontFamily: FONTS.Bold,
          fontSize: RFValue(20),
        }}>
        Next
      </Text>
      <Image
        source={IMAGE.Vector}
        style={{
          width: 25,
          height: 25,
          resizeMode: 'contain',
          position: 'absolute',
          left: SCREEN_WIDTH * 0.365,
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

export default CommenNext;
