import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../common/Utils/Colors"; // Make sure to have your color constants
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../common/Utils/screenName";

const CustomAlertModal = ({
  visible,
  onClose,
  jobPostNumber,
  sbscriptionDayes,
}) => {
  const navigation = useNavigation();

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>CONGRATULATIONS</Text>
          <Text style={styles.modalMessage}>
            YOUR REQUEST FOR JOB POST WITH NUMBER {jobPostNumber} IS POSTED
            SUCCESSFULLY.
          </Text>
          <Text style={styles.modalMessage}>
            YOU WILL RECEIVE THE UPDATE NOTIFICATION IN CASE ANY CANDIDATE FITS
            YOUR JOB POST.
          </Text>
          <Text style={styles.modalMessage}>
            YOUR JOB POST WILL REMAIN LIVE TILL {sbscriptionDayes}.
          </Text>
          <Text style={styles.modalMessage}>
            FOR ANY FURTHER ASSISTANCE, PLEASE CONTACT US ON:
          </Text>
          <Text style={styles.modalContacts}>
            9723233194 / 9737333194 / 9824333194 / 9979333194
          </Text>
          <Text style={styles.modalMessage}>
            PLEASE REFER TO YOUR JOB POST NUMBER.
          </Text>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => {
              onClose();
              navigation.navigate(SCREENS.MyJobs);
            }}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: COLORS.White,
    borderRadius: 10,
    padding: RFValue(20),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: COLORS.PrimaryColor,
    marginBottom: RFValue(10),
  },
  modalMessage: {
    fontSize: RFValue(14),
    color: COLORS.TextBlack,
    textAlign: "center",
    marginVertical: RFValue(5),
  },
  modalContacts: {
    fontSize: RFValue(14),
    color: COLORS.PrimaryColor,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: RFValue(10),
  },
  okButton: {
    backgroundColor: COLORS.PrimaryColor,
    borderRadius: 5,
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(20),
    marginTop: RFValue(20),
  },
  okButtonText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: RFValue(16),
  },
});

export default CustomAlertModal;
