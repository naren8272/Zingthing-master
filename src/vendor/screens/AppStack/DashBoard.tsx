import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../common/Utils/Colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FONTS } from "../../common/Utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../common/Utils/screenName";
import { translator } from "../../localization/I18n";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";

// Define type for the ContextProvider
interface ContextProviderProps {
  Language: string;
  SetLanguage: (language: string) => void;
}

export default function DashBoard() {
  const navigation = useNavigation();
  const { Language, SetLanguage } = useContext(
    ContextProvider
  ) as ContextProviderProps;
  const [Open, SetOpen] = useState<boolean>(false);

  return (
    <View style={styles.mainBody}>
      <Modal visible={Open} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Select Language</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                SetLanguage("en");
                SetOpen(false);
              }}
            >
              <Text style={styles.modalButtonText}>ENGLISH</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                SetLanguage("hi");
                SetOpen(false);
              }}
            >
              <Text style={styles.modalButtonText}>HINDI</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                SetLanguage("gu");
                SetOpen(false);
              }}
            >
              <Text style={styles.modalButtonText}>GUJARATI</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                SetLanguage("mr");
                SetOpen(false);
              }}
            >
              <Text style={styles.modalButtonText}>MARATHI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={COLORS.PrimaryColor}
        />
        <View style={styles.headerView}>
          <Text style={styles.headerText}>
            {translator("Dashboard", Language)}
          </Text>
          <TouchableOpacity onPress={() => SetOpen(true)}>
            <MaterialIcons name="translate" size={24} color={COLORS.White} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, margin: RFValue(12) }}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate(SCREENS.NewsFeed)}
        >
          <Text style={styles.buttonText}>
            {translator("AddNewsFeed", Language) + " ->"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate(SCREENS.MyJobs)}
        >
          <Text style={styles.buttonText}>
            {translator("MyJobs", Language) + " ->"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
    fontSize: RFValue(16),
    color: COLORS.PrimaryColor,
    fontWeight: "bold",
  },
  buttonView: {
    backgroundColor: COLORS.White,
    borderWidth: 1,
    borderColor: COLORS.PrimaryColor,
    padding: RFValue(10),
    borderRadius: RFValue(4),
    marginTop: RFValue(12),
  },
  headerView: {
    backgroundColor: COLORS.PrimaryColor,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFValue(20),
  },
  headerText: {
    textAlign: "center",
    color: COLORS.White,
    fontSize: RFValue(16),
    fontFamily: FONTS.ExtraBold,
    fontWeight: "bold",
    width: Dimensions.get("window").width - RFValue(64),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: COLORS.White,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  modalHeaderText: {
    color: COLORS.Black,
    fontWeight: "600",
    paddingTop: 14,
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 14,
  },
  modalButtonText: {
    color: COLORS.Black,
    fontWeight: "500",
    textAlign: "center",
  },
  modalDivider: {
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 1,
  },
});
