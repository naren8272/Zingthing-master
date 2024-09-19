import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  StatusBar,
} from "react-native";
import CheckBox from "react-native-elements/dist/checkbox/CheckBox";
import { COLORS } from "../../common/Utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../common/Utils/screenName";
import { RFValue } from "react-native-responsive-fontsize";
import { translator } from "../../localization/I18n";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";

const HowItWorks: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const navigation = useNavigation();
  const { Language, SetLanguage } = useContext(ContextProvider);
  const [Open, SetOpen] = useState(false);

  const handleProceed = async () => {
    if (agreed) {
      try {
        await AsyncStorage.setItem("hasAgreed", "true");
        navigation.replace(SCREENS.MyJobs); // or your default screen
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to save your preference. Please try again."
        );
      }
    } else {
      Alert.alert(
        "Agreement Required",
        "Please agree to the terms to proceed."
      );
    }
  };

  const handleOnChange = () => {
    setAgreed(!agreed);
  };

  return (
    <View style={{ flex: 1 }}>
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
        <TouchableOpacity
          onPress={() => SetOpen(true)}
          style={styles.translateIconContainer}
        >
          <MaterialIcons
            name="translate"
            size={24}
            color={COLORS.DarkTextBlack}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>
            {translator("HowItWorks", Language)}
          </Text>
          <View style={styles.section}>
            <Text style={styles.number}>1.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep1", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>2.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep2", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>3.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep3", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>4.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep4", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>5.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep5", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>6.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep6", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>7.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep7", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>8.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep8", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>9.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep9", Language)}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.number}>10.</Text>
            <Text style={styles.text}>
              {translator("HowItWorksStep10", Language)}
            </Text>
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title={translator("IAgree", Language)}
              checked={agreed}
              onPress={handleOnChange}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleProceed}>
            <Text style={styles.buttonText}>
              {translator("Proceed", Language)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.White,
  },
  headerView: {
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: COLORS.White,
  },
  translateIconContainer: {
    padding: 10,
  },
  translateIcon: {
    width: 27,
    height: 27,
  },
  content: {
    backgroundColor: COLORS.LightGray,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.Gray,
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.Black,
  },
  section: {
    flexDirection: "row",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: COLORS.Orange,
  },
  text: {
    fontSize: 14,
    textAlign: "justify",
    color: COLORS.TextBlack,
    lineHeight: 22,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TextBlack,
  },
  button: {
    backgroundColor: COLORS.PrimaryColor,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.White,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HowItWorks;
