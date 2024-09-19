import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../common/Utils/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { translator } from '../../localization/I18n';
import { ContextProvider } from '../StateManagment/StateManagment';
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import moment from 'moment';
import { FCMContext, CustomerContext } from '../../../App';
import JobDetails from './AvailableJobs/JobDetails';
import { SCREENS } from '../../common/Utils/screenName';

const { width, height } = Dimensions.get("window");

interface JobDetail {
    id: number;
    name: string;
    mobile_number: string;
    state_name: string;
    state_id: string;
    city_name: string;
    city_id: string;
    job_type: string;
    job_type_id: string;
    job_title: string;
    job_title_id: string;
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
    facilities: { facilities: { facilities: string } }[];
    created_at: string;
    job_post_date: string;
    job_search_days: number;
    message: string;
    renewal_id: string;
    landmark:string;
}

const ViewJobSearch: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [jobDetails, setJobDetails] = useState<JobDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const { Language } = useContext(ContextProvider);
    const fcmToken = useContext(FCMContext);
    const customerId = useContext(CustomerContext);

    useEffect(() => {
        if (route.params?.NavData) {
            setJobDetails(route.params.NavData);
            setLoading(false);
        }
    }, [route.params?.NavData]);

    if (loading) {
        return (
            <View style={styles.mainBody}>
                <ActivityIndicator size="large" color={COLORS.Orange} />
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

    const handleJobClose = async () => {
        Alert.alert(
            "Close Job Search",
            "Are you sure you want to close this job search?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", 
                    onPress: async () => {
                        // Handle job close logic here
                        try {
                            const data = new FormData();
                            data.append("job_post_date", moment().format("YYYY-MM-DD"));
                            data.append("candidate_id", customerId);
                            data.append("job_title_id", jobDetails.job_title_id);
                            data.append("job_type_id", jobDetails.job_type_id);
                            data.append("job_search_subscription_id", "1");
                            data.append("state_id", jobDetails.state_id);
                            data.append("city_id", jobDetails.city_id);
                            data.append("name", jobDetails.name);
                            data.append("mobileNumber", jobDetails.mobile_number);
                            data.append("message", jobDetails.message);
                            data.append("status", "0");
                            data.append("notification", "0");
                            data.append("landmark", jobDetails.landmark);
    
                            const response = await fetch(
                                `https://zingthing-app.ptechwebs.com/api/jobpost-search-update/${jobDetails.id}?_method=PUT`,
                                {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json,*/*",
                                        "Content-Type": "multipart/form-data",
                                    },
                                    body: data,
                                }
                            );
                            const json = await response.json();
                            console.log(json);
    
                            const formData = new FormData();
                            formData.append("topic", "SEARCH" + json?.data?.job_post_search_id);
                            formData.append("deviceToken", fcmToken);
                            await fetch(
                                `https://zingthing-app.ptechwebs.com/api/unSubscribeToTopic`,
                                {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json",
                                    },
                                    body: formData,
                                }
                            );
                            // Navigate back to MyJobs page after closing the job
                            navigation.navigate(SCREENS.OldJobPosts);
                        } catch (err: any) {
                            console.log("--Error--", err);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };
    

    return (
        <View style={styles.mainBody}>
            <View>
                <OnBordingHeader label={"Job Search Details"} Back={true} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.label}>{translator("JOBID", Language)}</Text>
                        <Text style={styles.value}>:{`#${jobDetails.renewal_id ? jobDetails.renewal_id : "JOB" + jobDetails.id}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{translator("FullName", Language)}</Text>
                        <Text style={styles.value}>: {jobDetails.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{translator("MobileNumber", Language)}</Text>
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
                                <Text style={styles.label}>{translator("Landmark", Language)}</Text>
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
                                <Text style={styles.label}>{translator("BusinessType", Language)}</Text>
                                <Text style={styles.value}>
                                    : {jobDetails.business.map(b => b.business.business).join(', ')}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("JobTime/WorkingTime", Language)}</Text>
                                <Text style={styles.value}>: {jobDetails.working_time}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("Gender", Language)}</Text>
                                <Text style={styles.value}>: {jobDetails.gender}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("LineofEducation", Language)}</Text>
                                <Text style={styles.value}>
                                    : {jobDetails.line_of_educations.map(e => e.line_of_educations.line_of_education).join(', ')}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("Qualification", Language)}</Text>
                                <Text style={styles.value}>: {jobDetails.qualification}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("AdditionalSkills", Language)}</Text>
                                <Text style={styles.value}>
                                    : {jobDetails.skills.map(s => s.skills.skills).join(', ')}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("WorkExperienceYears", Language)}</Text>
                                <Text style={styles.value}>: {jobDetails.experience}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("AgeGroup", Language)}</Text>
                                <Text style={styles.value}>: {jobDetails.age_group}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("WorkPlace", Language)}</Text>
                                <Text style={styles.value}>: {jobDetails.environment_to_work}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("SalaryRange", Language)}</Text>
                                <Text style={styles.value}>: {jobDetails.salary_range}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{translator("AdditionalFacilities", Language)}</Text>
                                <Text style={styles.value}>
                                    : {jobDetails.facilities.map(f => f.facilities.facilities).join(', ')}
                                </Text>
                            </View>
                        </>
                    )}
                    <View style={styles.row}>
                        <Text style={styles.label}>{translator("Posted", Language)}</Text>
                        <Text style={styles.value}>: {moment(jobDetails.created_at).format("MMMM Do YYYY")}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{translator("Expires", Language)}</Text>
                        <Text style={styles.value}>
                            : {moment(jobDetails.job_post_date).add(jobDetails.job_search_days, "days").format("MMMM Do YYYY")}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{translator("Message", Language)}</Text>
                        <Text style={styles.value}>: {jobDetails.message}</Text>
                    </View>
                </View>
                {Number(jobDetails.status) === 1 && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleJobClose}
                    >
                        <Text style={styles.buttonText}>{translator("JobFoundCloseSearch", Language)}</Text>
                    </TouchableOpacity>
                </View>
                )}
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
        paddingHorizontal: RFValue(15),
    },
    content: {
        paddingVertical: RFValue(15),
    },
    row: {
        flexDirection: 'row',
        marginVertical: RFValue(8),
        flexWrap: 'wrap',
    },
    label: {
        fontWeight: 'bold',
        fontSize: RFValue(14),
        color: COLORS.TextBlack,
        width: '40%',
    },
    value: {
        fontSize: RFValue(14),
        color: COLORS.TextBlack,
        width: '60%',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFValue(20),
    },
    button: {
        backgroundColor: COLORS.Orange,
        paddingHorizontal: RFValue(20),
        paddingVertical: RFValue(10),
        borderRadius: RFValue(4),
    },
    buttonText: {
        color: COLORS.White,
        fontSize: RFValue(14),
        fontWeight: 'bold',
    },
});

export default ViewJobSearch;
