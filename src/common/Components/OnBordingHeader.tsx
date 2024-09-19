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
  ImageBackground,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { IMAGE } from "../Utils/image";
import { COLORS } from "../Utils/Colors";
import { FONTS } from "../Utils/fonts";
import { useNavigation } from "@react-navigation/native";
import TranslateImage from "../../../assets/translate.png";
import { translator } from "../../localization/I18n";
import Icon from "react-native-vector-icons/AntDesign";
import useAuthState from "../../store/AuthState";
import { ContextProvider } from "../../screens/StateManagment/StateManagment";

const ScreenHeight = Dimensions.get("screen").height;
const ScreenWidth = Dimensions.get("screen").width;

const OnBordingHeader = ({
  label,
  Back = true,
  isMyJob = false,
  Locale = true,
}) => {
  const navigation = useNavigation();
  const { Language, SetLanguage } = useContext(ContextProvider);
  const [Open, SetOpen] = useState(false);
  const logout = useAuthState((state) => state.logout);

  return (
    <View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.White} />
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
        <View style={styles.headerContent}>
          {Back && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={IMAGE.Back} style={styles.backImage} />
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.headerText,
              {
                width: Back
                  ? ScreenWidth - RFValue(84)
                  : ScreenWidth - RFValue(64),
              },
            ]}
          >
            {label.toLowerCase().includes("update") ||
            label.toLowerCase().includes("details")
              ? label
              : translator(label, Language)}
          </Text>
          <TouchableOpacity
            style={{ marginLeft: -30, marginRight: 10 }}
            onPress={() => logout()}
          >
            <Icon name="logout" size={20} color={COLORS.Black} />
          </TouchableOpacity>

          {Locale && (
            <TouchableOpacity onPress={() => SetOpen(true)}>
              <Image
                source={TranslateImage}
                style={{ width: 27, height: 27 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: COLORS.White,
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(20),
    borderBottomRightRadius: RFValue(20),
    borderBottomLeftRadius: RFValue(20),
    marginTop: RFValue(26),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    textAlign: "left",
    color: COLORS.Orange,
    fontSize: RFValue(16),
    fontFamily: FONTS.ExtraBold,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  backImage: {
    resizeMode: "contain",
    height: RFValue(18),
    width: RFValue(18),
  },
});

export default OnBordingHeader;
