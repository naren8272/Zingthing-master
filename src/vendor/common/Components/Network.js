import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import {FONTS} from './../Utils/fonts';
import {COLORS} from './../Utils/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import NetInfo from '@react-native-community/netinfo';
import {IMAGE} from '../Utils/image';

const Network = () => {
  const [isConnected, setIsConnected] = useState(true);

  const ScreenHeight = Dimensions.get('screen').height;
  const ScreenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(value => {
      console.log('Is connected?', value.isConnected);
      setIsConnected(value.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      {/* <SafeAreaView />
      <StatusBar /> */}
      {!isConnected ? (
        <View
          style={[
            styles?.mainView,
            {
              height: ScreenHeight,
              width: ScreenWidth,
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          ]}>
          <Image
            source={IMAGE.Nointernate}
            style={{
              resizeMode: 'contain',
              height: RFValue(200, ScreenHeight),
              width: RFValue(200, ScreenWidth),
            }}
          />
          <Text style={styles?.internetText}>No Internet Connection</Text>
          <Text
            style={[
              styles?.internetText,
              {
                fontSize: RFValue(14, ScreenHeight),
                marginTop: RFValue(10, ScreenHeight),
              },
            ]}>
            Please Turn On Your Internet For Full access
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  internetText: {
    textAlign: 'center',
    color: COLORS.Black,
    fontSize: RFValue(18),
    fontFamily: FONTS.SemiBold,
  },
  mainView: {
    backgroundColor: 'red',
    // position: 'absolute',
    // top: 100,
    // right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Network;
