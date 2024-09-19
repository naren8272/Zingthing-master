import React, { useContext } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../common/Utils/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../common/Utils/screenName";
import { translator } from "../../localization/I18n";
import { ContextProvider } from "../StateManagment/StateManagment";
import OnBordingHeader from "../../common/Components/OnBordingHeader";

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const { Language } = useContext(ContextProvider);

  return (
    <View style={styles.mainBody}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.PrimeryColor}
        barStyle={"dark-content"}
      />
      <OnBordingHeader label={"Dashboard"} Back={false} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate(SCREENS.OldJobPosts)}
        >
          <Text style={styles.buttonText}>
            {translator("FindAJobWithOldSearch", Language)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() =>
            navigation.navigate(SCREENS.PostJob, {
              NavData: null,
            })
          }
        >
          <Text style={styles.buttonText}>
            {translator("FindAJobWithNewSearch", Language)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate(SCREENS.AvailableJob)}
        >
          <Text style={styles.buttonText}>
            {translator("AvailableJobs", Language)}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate(SCREENS.NewsFeed)}
        >
          <Text style={styles.buttonText}>{"NEWS FEED"}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
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

export default Dashboard;
