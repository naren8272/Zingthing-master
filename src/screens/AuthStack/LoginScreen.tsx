import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import AuthTemplate from "../../common/Components/AuthTemplate";
import { COLORS } from "../../common/Utils/Colors";
import LoginForm from "../../common/Components/LoginForm";

interface Props {
  children: React.ReactNode;
}

const LoginScreen = ({ children }: Props) => {
  const navigation = useNavigation();

  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
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
    justifyContent: "center",
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

export default LoginScreen;
