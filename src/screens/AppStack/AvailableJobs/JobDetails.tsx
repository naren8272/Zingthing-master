import React, { useState, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { COLORS } from "../../../common/Utils/Colors";
import OnBordingHeader from "../../../common/Components/OnBordingHeader";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { translator } from '../../../localization/I18n';
import { ContextProvider } from '../../StateManagment/StateManagment';

const { width, height } = Dimensions.get("window");

const JobDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { details } = route.params as { details: any };
  const [jobData, setJobData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { Language } = useContext(ContextProvider);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `https://zingthing-app.ptechwebs.com/api/jobpost/${details.id}`
        );
        const json = await response.json();
        if (json.status && json.data) {
          setJobData(json.data);
        } else {
          Alert.alert("Error", "Failed to load job details");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while fetching job details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [details.id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          color={COLORS.White}
          size={Dimensions.get("window").width * 0.2}
        />
      </View>
    );
  }

  if (!jobData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: COLORS.White }}>No job data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <OnBordingHeader label={`JobID #${jobData.id} Details`} Back={true} />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <Text style={styles.jobPostIdText}>
                  {translator("JobPostId", Language)}
                </Text>
                <Text style={styles.jobIdText}>{jobData.id}</Text>
              </View>
              <View style={styles.headerRight}>
                <Text style={styles.postedRecentlyText}>
                  {translator("PostedRecently", Language)}
                </Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <JobDetailRow
                label={translator("EmployerName", Language)}
                value={jobData.name}
              />
              <JobDetailRow
                label={translator("MobileNumber", Language)}
                value={jobData.mobile_number}
              />
              <JobDetailRow
                label={translator("State", Language)}
                value={jobData.state_name}
              />
              <JobDetailRow
                label={translator("City", Language)}
                value={jobData.city_name}
              />
              {jobData.job_type_id === 1 && (
                <>
                  <JobDetailRow
                    label={translator("Landmark", Language)}
                    value={jobData.landmark}
                  />
                </>
              )}
              <JobDetailRow
                label={translator("JobType", Language)}
                value={jobData.job_type}
              />
              {jobData?.working_time && (
                <JobDetailRow
                  label={translator("JobTime", Language)}
                  value={jobData.working_time}
                />
              )}
              {jobData?.gender && (
                <JobDetailRow
                  label={translator("Gender", Language)}
                  value={jobData.gender}
                />
              )}
              {jobData?.line_of_educations?.length !== 0 && (
                <JobDetailRow
                  label={translator("LineOfEducation", Language)}
                  value={
                    jobData.line_of_educations &&
                      Array.isArray(jobData.line_of_educations)
                      ? jobData.line_of_educations
                        .map((ele) => ele.line_of_educations.line_of_education)
                        .join(", ")
                      : ''
                  }
                />
              )}
              {jobData?.qualification && (
                <JobDetailRow
                  label={translator("Qualification", Language)}
                  value={jobData.qualification}
                />
              )}
              {jobData?.skills?.length !== 0 && (
                <JobDetailRow
                  label={translator("AdditionalSkills", Language)}
                  value={jobData.skills?.map((ele) => ele.skills.skills).join(", ")}
                />
              )}
              {jobData?.experience && (
                <JobDetailRow
                  label={translator("WorkExperience", Language)}
                  value={jobData.experience}
                />
              )}
              {jobData?.quantity && (
                <JobDetailRow
                  label={translator("NoOfVacancies", Language)}
                  value={jobData.quantity}
                />
              )}
              {jobData?.age_group && (
                <JobDetailRow
                  label={translator("AgeGroup", Language)}
                  value={jobData.age_group}
                />
              )}
              {jobData?.environment_to_work && (
                <JobDetailRow
                  label={translator("WorkPlace", Language)}
                  value={jobData.environment_to_work}
                />
              )}
              {jobData?.salary_range && (
                <JobDetailRow
                  label={translator("SalaryRange", Language)}
                  value={jobData.salary_range}
                />
              )}
              {jobData?.facilities?.length !== 0 && (
                <JobDetailRow
                  label={translator("AdditionalFacility", Language)}
                  value={jobData.facilities?.map(
                    (ele) => ele.facilities.facilities
                  ).join(", ")}
                />
              )}
              {jobData?.business?.length !== 0 && (
                <JobDetailRow
                  label={translator("BusinessType", Language)}
                  value={jobData.business?.map(
                    (ele) => ele.business.business
                  ).join(", ")}
                />
              )}
              <JobDetailRow
                label={translator("Message", Language)}
                value={jobData.message}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const JobDetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PrimeryColor,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: RFValue(18),
    paddingBottom: RFValue(10),
  },
  card: {
    borderRadius: RFValue(4),
    backgroundColor: COLORS.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.DarkPrimeryColor,
    borderTopLeftRadius: RFValue(4),
    borderTopRightRadius: RFValue(4),
  },
  headerLeft: {
    flexDirection: "row",
  },
  jobPostIdText: {
    color: COLORS.Orange,
    fontWeight: "bold",
  },
  jobIdText: {
    color: COLORS.SkyBlueText,
    fontWeight: "bold",
    marginLeft: RFValue(10),
  },
  headerRight: {
    backgroundColor: COLORS.ButtonPurpal,
    paddingHorizontal: 8,
    paddingVertical: RFValue(4),
    borderRadius: RFValue(4),
  },
  postedRecentlyText: {
    fontSize: RFValue(10),
    color: COLORS.White,
  },
  cardBody: {
    padding: RFValue(15),
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: RFValue(4),
    alignItems: "center",
  },
  detailLabel: {
    color: COLORS.Black,
    fontSize: RFValue(12),
    width: "45%", // Adjusted for better flexibility
  },
  detailValue: {
    color: COLORS.Black,
    fontSize: RFValue(12),
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default JobDetails;
