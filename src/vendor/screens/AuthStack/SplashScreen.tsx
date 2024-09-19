import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Platform,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMAGE } from "../../common/Utils/image";
import { COLORS } from "../../common/Utils/Colors";
import { SCREENS } from "../../common/Utils/screenName";
import { RFValue } from "react-native-responsive-fontsize";

export const SplashScreen = () => {
  const navigation: any = useNavigation();
  const isFocus = useIsFocused();

  const ScreenHeight = Dimensions.get("screen").height;
  const ScreenWidth = Dimensions.get("screen").width;

  useEffect(() => {
    (async () => {
      const B_Token = await AsyncStorage.getItem("auth_token");
      setTimeout(
        () => {
          if (B_Token != null) {
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'dashboard'}],
            // });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.DashBoard }],
            });
          }
        },
        Platform.OS == "android" ? 3000 : 2000
      );
    })();
  }, []);

  return (
    <View style={styles.mainBody}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.PrimaryColor}
        barStyle={"light-content"}
      />
      <Image 
      source={require('../../assets/images/Logo.png')}
      style={{width:Dimensions.get('window').width*0.8,height:Dimensions.get('window').width,resizeMode:'contain'}}
      />
      {/* <Text style={{ color: COLORS.White, fontSize: RFValue(20) }}>
        Zing Thing
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: COLORS.PrimaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
