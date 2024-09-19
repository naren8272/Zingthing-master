import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert, // Import Alert component
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { COLORS } from "../../common/Utils/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { translator } from "../../localization/I18n";
import moment from "moment";
import { FCMContext, VendorContext } from "../../../../App";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";

const { width, height } = Dimensions.get("window");

interface JobDetailsProps {
  MainItem: string; // Assuming MainItem is a string representing the jobId
}

interface JobDetails {
  id: number;
  name: string;
  mobile_number: string;
  state_name: string;
  state_id: string;
  city_name: string;
  city_id: string;
  job_type: string;
  job_title: string;
  job_title_id: string;
  job_type_id: number;
  business: { business: { business: string } }[];
  working_time: string;
  gender: string;
  line_of_educations: { line_of_educations: { line_of_education: string } }[];
  qualification: string;
  skills: { skills: { skills: string } }[];
  experience: string;
  quantity: number;
  age_group: string;
  environment_to_work: string;
  salary_range: string;
  localilty: string;
  facilities: { facilities: { facilities: string } }[];
  message: string;
  created_at: string;
  job_post_date: string;
  job_post_days: number;
  notification: number;
  renewal_id: string | null;
  landmark: string | null;
  status: string;
  working_time_id: number | null;
  gender_id: number | null;
  line_of_educations_ids: string | null;
  qualification_id: number | null;
  skills_ids: string | null;
  experience_id: number | null;
  quantity_id: number | null;
  age_group_id: number | null;
  localilty_id: number | null;
  environment_to_work_id: number | null;
  place_of_posting: string | null;
  salary_range_id: number | null;
  facility_ids: string | null;
}

const ViewJobPost: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: JobDetailsProps }, "params">>();
  const { MainItem } = route.params;
  const { Language } = useContext(ContextProvider) as { Language: string };
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fcmToken = useContext(FCMContext);
  const vendorId = useContext(VendorContext);

  const fetchJobDetails = async (jobId: string) => {
    try {
      const response = await fetch(
        `https://zingthing-app.ptechwebs.com/api/jobpost/${jobId}`
      );
      const json = await response.json();
      setJobDetails(json.data);
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

  const handleClose = () => {
    // Show a confirmation dialog
    Alert.alert(
      "Confirmation",
      "Are you sure you want to close this job?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // The actual close job logic goes here
            if (!jobDetails) return;

            const dataForEncode = {
              name: jobDetails.name || "",
              mobile_number: jobDetails.mobile_number || "",
              city_id: jobDetails.city_id || "",
              state_id: jobDetails.state_id || "",
              job_title_id: jobDetails.job_title_id || "",
              job_type_id: jobDetails.job_type_id || "",
              message: jobDetails.message || "",
              status: 0,
              notification: 0,
              landmark: jobDetails.landmark || "",
              job_post_date: jobDetails.job_post_date || "",
              vendor_id: vendorId,
            };

            try {
              const UrlEncodedData = new URLSearchParams(
                dataForEncode
              ).toString();

              const response = await fetch(
                `https://zingthing-app.ptechwebs.com/api/jobpost-update/${MainItem}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: UrlEncodedData,
                }
              );

              const json = await response.json();
              console.log(json);
              if (json.code == 200 || json.code == 201) {
                var formData = new FormData();
                formData.append("topic", "JOB" + json?.data);
                formData.append("deviceToken", fcmToken);
                const notify = await fetch(
                  `https://zingthing-app.ptechwebs.com/api/unSubscribeToTopic`,
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                    },
                    body: formData,
                  }
                );
              }

              if (!response.ok) {
                console.log("Response Error:", response);
              } else {
                // If the job close was successful, navigate back to the MyJobs screen
                navigation.navigate("MyJobs"); // Replace 'MyJobs' with the correct screen name
              }
            } catch (error) {
              console.log("Fetch Error:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
            <Text style={styles.label}>{translator("JOBID", Language)}</Text>
            <Text style={styles.value}>
              :{" "}
              {`#${
                jobDetails.renewal_id
                  ? jobDetails.renewal_id
                  : "JOB" + jobDetails.id
              }`}
            </Text>
          </View>
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
                  {translator("NOofVacancies", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.quantity}</Text>
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
                  {translator("Locality", Language)}
                </Text>
                <Text style={styles.value}>: {jobDetails.localilty}</Text>
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
                .add(jobDetails.job_post_days, "days")
                .format("MMMM Do YYYY")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("Message", Language)}</Text>
            <Text style={styles.value}>: {jobDetails.message}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              {translator("Notifications", Language)}
            </Text>
            <Text style={styles.value}>
              : {Number(jobDetails.notification) === 1 ? "Enabled" : "Disabled"}
            </Text>
          </View>
          {jobDetails?.status != 0 && (
            <TouchableOpacity
              onPress={handleClose}
              style={{
                backgroundColor: COLORS.Black,
                paddingVertical: height * 0.014,
                borderRadius: width * 0.02,
                marginTop: 20,
                zIndex: -1,
              }}
            >
              <Text
                style={{
                  color: COLORS.White,
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {translator("CloseJob", Language)}
              </Text>
            </TouchableOpacity>
          )}
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
});

export default ViewJobPost;
