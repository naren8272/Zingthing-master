import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState,useContext } from "react";
import { COLORS } from "../../common/Utils/Colors";
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import { RFValue } from "react-native-responsive-fontsize";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../common/Utils/screenName";
import { FONTS } from "../../common/Utils/fonts";
import DownloadFile from "../../common/Components/DownloadFile";
import { translator } from '../../localization/I18n'
import { ContextProvider } from '../StateManagment/StateManagment'

export default function JobDetailsScreen({ route }) {
  const JobId = route?.params?.Job_Id;
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [mainDetilsData, setMainDetilsData] = useState([]);
  const { Language, SetLanguage } = useContext(ContextProvider);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://zingthing-app.ptechwebs.com/api/job-apply/${JobId}`
      );
      const json = await response.json();
      console.log("object", json.data);
      setMainDetilsData(json.data[0]);
    } catch (error) {
      // setError(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [focus]);

  https: return (
    <View style={styles.mainBody}> 
      <OnBordingHeader label={`${mainDetilsData.renewal_id ? mainDetilsData.renewal_id : "JOB"+mainDetilsData.id}`} Back={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
        style={{
          flex: 1,
          paddingHorizontal: RFValue(28),
          paddingTop: RFValue(12),
        }}
      >
        <View>
          <Text style={styles.HeadingText}>{translator("Name", Language)} :</Text>
          <Text style={styles.BodyText}>{mainDetilsData.name}</Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("JobTitle", Language)} :</Text>
          <Text style={styles.BodyText}>
            {mainDetilsData.job_posts?.[0].job_title}
          </Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("City", Language)} : </Text>
          <Text style={styles.BodyText}>{mainDetilsData.city}</Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("Salary", Language)} : </Text>
          <Text style={styles.BodyText}>
            ₹ {mainDetilsData.job_posts?.[0].salary_range}
          </Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("Qualifications", Language)} :</Text>
          <Text style={styles.BodyText}>
            {mainDetilsData.job_posts?.[0].qualification}
          </Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("CanidateType", Language)} :</Text>
          <Text style={styles.BodyText}>
            {mainDetilsData.job_posts?.[0].localilty}
          </Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("MobileNumber", Language)} :</Text>
          <Text style={styles.BodyText}>{mainDetilsData.mobile_no}</Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("WorkingHours", Language)} :</Text>
          <Text style={styles.BodyText}>
            {mainDetilsData.job_posts?.[0].working_time}
          </Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("AgeGroups", Language)} :</Text>
          <Text style={styles.BodyText}>
            {mainDetilsData.job_posts?.[0].age_group}
          </Text>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("Resume", Language)} : </Text>
          <TouchableOpacity
            onPress={() => DownloadFile({ FileUrl: mainDetilsData.resume })}
            activeOpacity={0.5}
            style={{
              backgroundColor: COLORS.Black,
              borderRadius: RFValue(4),
              width: RFValue(180),
              alignSelf: "center",
              marginTop: RFValue(10),
            }}
          >
            <Text
              style={{
                color: COLORS.White,
                alignSelf: "center",
                paddingHorizontal: RFValue(16),
                paddingVertical: RFValue(8),
              }}
            >
              {translator("DownloadResume", Language)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: RFValue(8) }}>
          <Text style={styles.HeadingText}>{translator("Message", Language)}:</Text>
          <Text style={styles.BodyText}>{mainDetilsData.message}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  HeadingText: {
    fontSize: RFValue(16),
    color: COLORS.TextBlack,
    fontFamily: FONTS.Regular,
  },
  BodyText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.SemiBold,
    color: COLORS.Black,
    // fontWeight: "bold",
  },
});
