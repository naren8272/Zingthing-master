import React, { useContext, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { IMAGE } from "../Utils/image";
import { COLORS } from "../Utils/Colors";
import { FONTS } from "../Utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../Utils/screenName";
const ScreenHeight = Dimensions.get("screen").height;
const ScreenWidth = Dimensions.get("screen").width;
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { translator } from "../../localization/I18n";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";
import Icon from "react-native-vector-icons/AntDesign";
import useAuthState from "../../../store/AuthState";

const OnBordingHeader = ({
  label,
  Back = true,
  isMyJob = false,
  Locale = false,
}: any) => {
  const navigation = useNavigation();
  const { Language, SetLanguage } = useContext(ContextProvider);
  const [Open, SetOpen] = useState(false);
  const logout = useAuthState((state) => state.logout);

  return (
    <View>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={COLORS.PrimaryColor}
      />
      <View style={styles.headerView}>
        <Modal visible={Open} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.White,
                paddingHorizontal: 40,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: COLORS.Black,
                  fontWeight: "600",
                  paddingTop: 14,
                  marginBottom: 10,
                }}
              >
                Select Language
              </Text>
              <TouchableOpacity
                style={{ paddingVertical: 14 }}
                onPress={() => {
                  SetLanguage("en");
                  SetOpen(false);
                }}
              >
                <Text
                  style={{
                    color: COLORS.Black,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  ENGLISH
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: COLORS.Black,
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity
                style={{ paddingVertical: 14 }}
                onPress={() => {
                  SetLanguage("hi");
                  SetOpen(false);
                }}
              >
                <Text
                  style={{
                    color: COLORS.Black,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  HINDI
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: COLORS.Black,
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity
                style={{ paddingVertical: 14 }}
                onPress={() => {
                  SetLanguage("gu");
                  SetOpen(false);
                }}
              >
                <Text
                  style={{
                    color: COLORS.Black,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  GUJARATI
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: COLORS.Black,
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity
                style={{ paddingVertical: 14 }}
                onPress={() => {
                  SetLanguage("mr");
                  SetOpen(false);
                }}
              >
                <Text
                  style={{
                    color: COLORS.Black,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  MARATHI
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            alignItems: "flex-start",
          }}
          onPress={() => SetOpen(true)}
        >
          <MaterialIcons name="translate" size={24} color={COLORS.White} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => logout()}>
          <Icon name="logout" size={20} color={COLORS.White} />
        </TouchableOpacity>
        {Back && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={IMAGE.Back} style={styles.backImge} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>{translator(label, Language)}</Text>
        {Locale && (
          <TouchableOpacity>
            <MaterialIcons name="translate" size={24} color={COLORS.White} />
          </TouchableOpacity>
        )}
        {isMyJob && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: COLORS.Red,
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(5),
              position: "absolute",
              right: RFValue(10),
              borderRadius: RFValue(2),
            }}
            onPress={() => navigation.navigate(SCREENS.PostJob)}
          >
            <Text
              style={{
                color: COLORS.White,
                fontWeight: "bold",
                fontSize: RFValue(12),
              }}
            >
              {translator("POSTJOB", Language)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: COLORS.PrimaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFValue(20),
  },
  headerText: {
    textAlign: "center",
    color: COLORS.White,
    fontSize: RFValue(16),
    fontFamily: FONTS.ExtraBold,
    fontWeight: "bold",
    width: ScreenWidth - RFValue(64),
  },
  backImge: {
    resizeMode: "contain",
    height: RFValue(24),
    width: RFValue(24),
  },
});

export default OnBordingHeader;
