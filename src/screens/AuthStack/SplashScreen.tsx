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
        backgroundColor={COLORS.PrimeryColor}
        barStyle={"dark-content"}
      />
      <Text style={{ color: COLORS.Black, fontSize: RFValue(20) }}>
        Zing Thing Customer
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: COLORS.PrimeryColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
