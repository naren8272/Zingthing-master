import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { COLORS } from "../../common/Utils/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { translator } from "../../localization/I18n";
import moment from "moment";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";

const { width, height } = Dimensions.get("window");

interface JobDetailsProps {
  MainItem: string; // Assuming MainItem is a string representing the jobId
}

interface JobDetails {
  name: string;
  mobile_number: string;
  state_name: string;
  city_name: string;
  job_type: string;
  job_title: string;
  job_type_id: number;
  business: { business: { business: string } }[];
  working_time: string;
  gender: string;
  line_of_educations: { line_of_educations: { line_of_education: string } }[];
  qualification: string;
  skills: { skills: { skills: string } }[];
  experience: string;
  age_group: string;
  environment_to_work: string;
  salary_range: string;
  localilty: string;
  facilities: { facilities: { facilities: string } }[];
  message: string;
  created_at: string;
  job_post_date: string;
  job_search_days: number;
  landmark: string;
}

const ViewCandidateDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: JobDetailsProps }, "params">>();
  const { MainItem } = route.params;
  const { Language } = useContext(ContextProvider) as { Language: string };
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobDetails = async (jobId: string) => {
    try {
      const response = await fetch(
        `https://jobportal.zingthing.in/api/jobpost-search-list-jobpostid/${jobId}`
      );
      const json = await response.json();
      setJobDetails(json.data[0]);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (MainItem) {
      fetchJobDetails(MainItem);
    }
  }, [MainItem]);

  if (loading) {
    return (
      <View style={styles.mainBody}>
        <ActivityIndicator size="large" color={COLORS.PrimaryColor} />
      </View>
    );
  }

  if (!jobDetails) {
    return (
      <View style={styles.mainBody}>
        <Text>No job details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainBody}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("FullName", Language)}</Text>
            <Text style={styles.value}>: {jobDetails.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              {translator("MobileNumber", Language)}
            </Text>
            <Text style={styles.value}>: {jobDetails.mobile_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("State", Language)}</Text>
            <Text style={styles.value}>: {jobDetails.state_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("City", Language)}</Text>
            <Text style={styles.value}>: {jobDetails.city_name}</Text>
          </View>
          {jobDetails.job_type_id === 1 && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("Landmark", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.landmark}</Text>
              </View>
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>{translator("JobType", Language)}</Text>
            <Text style={styles.value}>: {jobDetails.job_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("JobTitle", Language)}</Text>
            <Text style={styles.value}>: {jobDetails.job_title}</Text>
          </View>

          {jobDetails.job_type_id !== 1 && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("BusinessType", Language)}
                </Text>
                <Text style={styles.value}>
                  :{" "}
                  {jobDetails.business
                    .map((b) => b.business.business)
                    .join(", ")}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("JobTime/WorkingTime", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.working_time}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("Gender", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.gender}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("LineofEducation", Language)}
                </Text>
                <Text style={styles.value}>
                  :{" "}
                  {jobDetails.line_of_educations
                    .map((e) => e.line_of_educations.line_of_education)
                    .join(", ")}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("Qualification", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.qualification}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("AdditionalSkills", Language)}
                </Text>
                <Text style={styles.value}>
                  : {jobDetails.skills.map((s) => s.skills.skills).join(", ")}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("WorkExperienceYears", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.experience}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("AgeGroup", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.age_group}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("WorkPlace", Language)}
                </Text>
                <Text style={styles.value}>
                  : {jobDetails.environment_to_work}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("SalaryRange", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.salary_range}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {translator("AdditionalFacilities", Language)}
                </Text>
                <Text style={styles.value}>
                  :{" "}
                  {jobDetails.facilities
                    .map((f) => f.facilities.facilities)
                    .join(", ")}
                </Text>
              </View>
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>{translator("Posted", Language)}</Text>
            <Text style={styles.value}>
              : {moment(jobDetails.created_at).format("MMMM Do YYYY")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("Expires", Language)}</Text>
            <Text style={styles.value}>
              :{" "}
              {moment(jobDetails.job_post_date)
                .add(jobDetails.job_search_days, "days")
                .format("MMMM Do YYYY")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("Message", Language)}</Text>
            <Text style={styles.value}>: {jobDetails.message}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: RFValue(20),
  },
  content: {
    padding: RFValue(15),
    borderWidth: 1,
    borderColor: COLORS.SperatorColor,
    borderRadius: RFValue(8),
    margin: RFValue(15),
  },
  row: {
    flexDirection: "row",
    marginVertical: RFValue(8),
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
    fontSize: RFValue(14),
    color: COLORS.TextBlack,
    width: "40%",
  },
  value: {
    fontSize: RFValue(14),
    color: COLORS.TextBlack,
    width: "60%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(20),
  },
  button: {
    backgroundColor: COLORS.PrimaryColor,
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(4),
  },
  buttonText: {
    color: COLORS.White,
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
});

export default ViewCandidateDetails;
