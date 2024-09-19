import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ImageBackground,
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

class AuthHeader extends React.Component<Props> {
  render() {
    const {onPress, Back = true, Header} = this.props;
    const SCREEN_WIDTH = Dimensions.get('screen').width;
    const SCREEN_HEIGHT = Dimensions.get('screen').height;
    return (
      <View>
        <StatusBar barStyle={'dark-content'} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: RFValue(35),
            marginLeft: RFValue(27),
          }}>
          {/* {Back && (
            <TouchableOpacity
              onPress={onPress}
              hitSlop={{
                left: RFValue(10, SCREEN_HEIGHT),
                right: RFValue(10, SCREEN_HEIGHT),
                top: RFValue(10, SCREEN_HEIGHT),
                bottom: RFValue(10, SCREEN_HEIGHT),
              }}>
              <Image
                source={IMAGE.SplashScreen}
                style={{
                  resizeMode: 'contain',
                  height: RFValue(30),
                  width: RFValue(30),
                  tintColor: COLORS.Black,
                }}
              />
            </TouchableOpacity>
          )} */}
          {Header && (
            <Text
              style={{
                marginLeft: RFValue(30, SCREEN_HEIGHT),
                color: COLORS.Black,
                fontFamily: FONTS.SemiBold,
                fontSize: RFValue(14),
              }}>
              {Header}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

export default AuthHeader;
