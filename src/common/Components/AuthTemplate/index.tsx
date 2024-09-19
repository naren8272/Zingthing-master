import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../Utils/Colors";
import { IMAGE } from "../../Utils/image";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

interface Props {
  children: React.ReactNode;
  hasBackIcon?: boolean;
}

const AuthTemplate = ({ children, hasBackIcon }: Props) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.mainBody}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.PrimeryColor}
        barStyle={"dark-content"}
      />
      <View style={styles.container}>
        <View className="justify-between  items-center flex-row">
          <View>
            {hasBackIcon && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcon
                  name="arrow-back-ios"
                  size={RFValue(20)}
                  color={COLORS.Black}
                />
              </TouchableOpacity>
            )}
          </View>
          <View className="mr-[80]">
            <Image
              source={IMAGE.ZingThing}
              style={{
                resizeMode: "contain",
                height: RFValue(125),
                width: RFValue(175),
              }}
            />
          </View>
        </View>
        <View className="w-full">{children}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: COLORS.PrimeryColor,
  },
  container: {
    flex: 1,
    margin: RFValue(12),
    padding: RFValue(30),
  },
  buttonView: {
    backgroundColor: COLORS.Orange,
    padding: RFValue(10),
    borderRadius: RFValue(4),
    marginTop: RFValue(30),
    marginHorizontal: RFValue(20),
  },
  buttonText: {
    textAlign: "center",
    fontSize: RFValue(16),
    color: COLORS.PrimeryColor,
    fontWeight: "500",
    marginHorizontal: RFValue(45),
    lineHeight: RFValue(22),
  },
});

export default AuthTemplate;
