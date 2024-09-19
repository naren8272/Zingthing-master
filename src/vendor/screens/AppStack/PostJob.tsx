import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../common/Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import { RFValue } from "react-native-responsive-fontsize";
import moment from "moment";
import { translator } from "../../localization/I18n";
import { FCMContext, VendorContext } from "../../../../App";
import RazorpayCheckout from "react-native-razorpay";
import { sendSMS } from "../../apis/sendSMS";
import { SCREENS } from "../../common/Utils/screenName";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";

const { width, height } = Dimensions.get("window");

const PostJob = ({ route }: any) => {
  const NavData = route?.params?.MainItem ? route?.params?.MainItem : null;
  const { Language } = useContext(ContextProvider);

  const navigation = useNavigation();
  const pickerRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [JobTitleopen, setJobTitleOpen] = useState(false);
  const [JobTitlevalue, setJobTitleValue] = useState(null);
  const [JobTitleitems, setJobTitleItems] = useState([]);

  const [BusinnesTypeopen, setBusinnesTypeOpen] = useState(false);
  const [BusinnesTypevalue, setBusinnesTypeValue] = useState(null);
  const [BusinnesTypeitems, setBusinnesTypeItems] = useState([]);

  const [WorkingTimeopen, setWorkingTimeOpen] = useState(false);
  const [WorkingTimevalue, setWorkingTimeValue] = useState(null);
  const [WorkingTimeitems, setWorkingTimeItems] = useState([]);

  const [GenderListopen, setGenderListOpen] = useState(false);
  const [GenderListvalue, setGenderListValue] = useState(null);
  const [GenderListitems, setGenderListItems] = useState([]);

  const [EducationLineopen, setEducationLineOpen] = useState(false);
  const [EducationLinevalue, setEducationLineValue] = useState(null);
  const [EducationLineitems, setEducationLineItems] = useState([]);

  const [Qualificationopen, setQualificationOpen] = useState(false);
  const [Qualificationvalue, setQualificationValue] = useState(null);
  const [Qualificationitems, setQualificationItems] = useState([]);

  const [AddSkillsopen, setAddSkillsOpen] = useState(false);
  const [AddSkillsvalue, setAddSkillsValue] = useState(null);
  const [AddSkillsitems, setAddSkillsItems] = useState([]);

  const [WorkExperienceopen, setWorkExperienceOpen] = useState(false);
  const [WorkExperiencevalue, setWorkExperienceValue] = useState(null);
  const [WorkExperienceitems, setWorkExperienceItems] = useState([]);

  const [Vaccanciesopen, setVaccanciesOpen] = useState(false);
  const [Vaccanciesvalue, setVaccanciesValue] = useState(null);
  const [Vaccanciesitems, setVaccanciesItems] = useState([]);

  const [AgeListopen, setAgeListOpen] = useState(false);
  const [AgeListvalue, setAgeListValue] = useState(null);
  const [AgeListitems, setAgeListItems] = useState([]);

  const [WorkPlaceopen, setWorkPlaceOpen] = useState(false);
  const [WorkPlacevalue, setWorkPlaceValue] = useState(null);
  const [WorkPlaceitems, setWorkPlaceItems] = useState([]);

  const [SalaryRangeopen, setSalaryRangeOpen] = useState(false);
  const [SalaryRangevalue, setSalaryRangeValue] = useState(null);
  const [SalaryRangeitems, setSalaryRangeItems] = useState([]);

  const [Localityopen, setLocalityOpen] = useState(false);
  const [Localityvalue, setLocalityValue] = useState(null);
  const [Localityitems, setLocalityItems] = useState([]);

  const [AdditionalFacilityopen, setAdditionalFacilityOpen] = useState(false);
  const [AdditionalFacilityvalue, setAdditionalFacilityValue] = useState(null);
  const [AdditionalFacilityitems, setAdditionalFacilityItems] = useState([]);

  const [CandidateMessagevalue, setCandidateMessagevalue] = useState("");

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [landmark, setLandmark] = useState("");

  const [sbscriptionAmount, setSubscriptionAmount] = useState(50);
  const [sbscriptionDayes, setSubscriptionDays] = useState(10);
  const [sbscriptionInDayes, setSubscriptionInDays] = useState(10);

  const [isLoading, setisLoading] = useState(false);

  const [Stateopen, setStateOpen] = useState(false);
  const [Statevalue, setStateValue] = useState(null);
  const [Stateitems, setStateItems] = useState([]);

  const [Cityopen, setCityOpen] = useState(false);
  const [Cityvalue, setCityValue] = useState(null);
  const [Cityitems, setCityItems] = useState([]);

  const fcmToken = useContext(FCMContext);
  const vendorId = useContext(VendorContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setisLoading(true);
      const responseAllList = await fetch(
        "https://zingthing-app.ptechwebs.com/api/all-list"
      );
      const jsonAllList = await responseAllList.json();
      setItems(
        jsonAllList.data["Job Type"].map((item: any) => {
          return { label: item?.job_type, value: item?.id };
        })
      );
      setJobTitleItems(
        jsonAllList.data["JobTitle Lists"].map((item: any) => {
          return { label: item?.job_title, value: item?.id };
        })
      );
      setBusinnesTypeItems(
        jsonAllList.data["Business Lists"].map((item: any) => {
          return { label: item?.business, value: item?.id };
        })
      );
      setWorkingTimeItems(
        jsonAllList.data["WorkingTime Lists"].map((item: any) => {
          return { label: item?.working_time, value: item?.id };
        })
      );
      setGenderListItems(
        jsonAllList.data["Gender Lists"].map((item: any) => {
          return { label: item?.gender, value: item?.id };
        })
      );
      setEducationLineItems(
        jsonAllList.data["LineOfEducation Lists"].map((item: any) => {
          return { label: item?.line_of_education, value: item?.id };
        })
      );
      setQualificationItems(
        jsonAllList.data["Qualification Lists"].map((item: any) => {
          return { label: item?.qualification, value: item?.id };
        })
      );
      setAddSkillsItems(
        jsonAllList.data["Skills Lists"].map((item: any) => {
          return { label: item?.skills, value: item?.id };
        })
      );
      setWorkExperienceItems(
        jsonAllList.data["Experience Lists"].map((item: any) => {
          return { label: item?.experience, value: item?.id };
        })
      );
      setVaccanciesItems(
        jsonAllList.data["Quantity Lists"].map((item: any) => {
          return { label: item?.quantity, value: item?.id };
        })
      );
      setAgeListItems(
        jsonAllList.data["AgeGroup Lists"].map((item: any) => {
          return { label: item?.age_group, value: item?.id };
        })
      );
      setWorkPlaceItems(
        jsonAllList.data["EnvironmentToWork Lists"].map((item: any) => {
          return { label: item?.environment_to_work_with, value: item?.id };
        })
      );
      setSalaryRangeItems(
        jsonAllList.data["SalaryRange Lists"].map((item: any) => {
          return { label: item?.salary_range, value: item?.id };
        })
      );
      setLocalityItems(
        jsonAllList.data["Localilty Lists"].map((item: any) => {
          return { label: item?.localilty, value: item?.id };
        })
      );
      setAdditionalFacilityItems(
        jsonAllList.data["Facilities Lists"].map((item: any) => {
          return { label: item?.facilities, value: item?.id };
        })
      );

      const responseSubscription = await fetch(
        "https://zingthing-app.ptechwebs.com/api/job-post-subscription-list"
      );
      const jsonSubscription = await responseSubscription.json();
      setSubscriptionAmount(jsonSubscription.data[0].job_post_rupees);
      const expirationDate = moment(moment().format("YYYY-MM-DD")).add(
        Number(jsonSubscription.data[0].job_post_days),
        "days"
      );
      setSubscriptionDays(moment(expirationDate).format("DD-MM-YYYY"));
      setSubscriptionInDays(jsonSubscription.data[0].job_post_days);

      const responseState = await fetch(
        "https://zingthing-app.ptechwebs.com/api/state-list"
      );
      const jsonState = await responseState.json();
      setStateItems(
        jsonState.data.map((item: any) => {
          return { label: item?.state_name, value: item?.id };
        })
      );

      if (NavData?.id) {
        fetchJobDetails(NavData.id);
      } else {
        setisLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobDetails = async (id) => {
    try {
      setisLoading(true);

      const response = await fetch(
        "https://zingthing-app.ptechwebs.com/api/jobpost-list/"
      );
      const json = await response.json();

      const jobData = json.data.find((job) => job.id === id);

      if (jobData) {
        setFullName(jobData.name);
        setMobileNumber(jobData.mobile_number);
        setLandmark(jobData.landmark);
        setStateValue(jobData.state_id);
        setValue(jobData.job_type_id);
        setJobTitleValue(jobData.job_title_id);
        setBusinnesTypeValue(jobData.business.map((ele) => ele.business_id));
        setWorkingTimeValue(jobData.working_time_id);
        setGenderListValue(jobData.gender_id);
        setEducationLineValue(
          jobData.line_of_educations.map((ele) => ele.line_of_educations_id)
        );
        setQualificationValue(jobData.qualification_id);
        setAddSkillsValue(jobData.skills.map((ele) => ele.skill_id));
        setWorkExperienceValue(jobData.experience_id);
        setVaccanciesValue(jobData.quantity_id);
        setAgeListValue(jobData.age_group_id);
        setWorkPlaceValue(jobData.environment_to_work_id);
        setSalaryRangeValue(jobData.salary_range_id);
        setLocalityValue(jobData.localilty_id);
        setAdditionalFacilityValue(
          jobData.facilities.map((ele) => ele.facilities_id)
        );
        setCandidateMessagevalue(jobData.message);

        // Fetch cities based on state
        await GetCityValue({ id: jobData.state_id });
        setCityValue(jobData.city_id); // Accessing the nested city id
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setisLoading(false);
    }
  };

  const GetCityValue = async ({ id }) => {
    try {
      setisLoading(true);
      const response = await fetch(
        `https://zingthing-app.ptechwebs.com/api/city/${id}`
      );
      const json = await response.json();
      setCityItems(
        json.data.map((item: any) => {
          return { label: item?.city_name, value: item?.id };
        })
      );
      setisLoading(false);
    } catch (error) {
      console.error("--Error-City-List--", error);
      setisLoading(false);
    }
  };

  const CheckValidation = () => {
    if (!fullName.trim()) {
      Alert.alert("Please Enter Your Name");
      return;
    }
    if (!mobileNumber.trim()) {
      Alert.alert("Please Enter Your Mobile Number");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber.trim())) {
      Alert.alert("Please enter a valid 10-digit mobile number");
      return;
    }
    if (Statevalue == null) {
      Alert.alert("Please Select State");
      return;
    }
    if (Cityvalue == null) {
      Alert.alert("Please Select City");
      return;
    }
    if (value == null) {
      Alert.alert("Please Select Job Type");
      return;
    }
    if (JobTitlevalue == null) {
      Alert.alert("Please Select Job Title");
      return;
    }
    if (value == 2) {
      if (BusinnesTypevalue == null) {
        Alert.alert("Please Select Business Type");
        return;
      }
      if (WorkingTimevalue == null) {
        Alert.alert("Please Select Working Time");
        return;
      }
      if (GenderListvalue == null) {
        Alert.alert("Please Select Gender List");
        return;
      }
      if (EducationLinevalue == null) {
        Alert.alert("Please Select Education Line");
        return;
      }
      if (Qualificationvalue == null) {
        Alert.alert("Please Select Qualification");
        return;
      }
      if (AddSkillsvalue == null) {
        Alert.alert("Please Select Add Skills");
        return;
      }
      if (WorkExperiencevalue == null) {
        Alert.alert("Please Select Work Experience");
        return;
      }
      if (Vaccanciesvalue == null) {
        Alert.alert("Please Select Vaccancies");
        return;
      }
      if (AgeListvalue == null) {
        Alert.alert("Please Select Age List");
        return;
      }
      if (WorkPlacevalue == null) {
        Alert.alert("Please Select Work Place");
        return;
      }
      if (SalaryRangevalue == null) {
        Alert.alert("Please Select Salary Range");
        return;
      }
      if (Localityvalue == null) {
        Alert.alert("Please Select Locality");
        return;
      }

      if (AdditionalFacilityvalue == null) {
        Alert.alert("Please Select Additional Facility");
        return;
      }
    }

    handlePayment();
  };

  const handlePayment = () => {
    var options = {
      description: "Credits towards consultation",
      image: "https://zingthing.in/frontend_theme/assets/images/logo.png",
      currency: "INR",
      key: "rzp_test_1Y0isRtUawGbne",
      amount: sbscriptionAmount * 100,
      name: "ZingThing",
      prefill: {
        email: "example@razorpay.com",
        contact: mobileNumber,
        name: fullName,
      },
      theme: { color: COLORS.PrimaryColor },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        setisLoading(true);
        onSubmit();
      })
      .catch((error) => {
        Alert.alert(`Something Wen't Wrong`);
      });
  };

  const onSubmit = async () => {
    try {
      let updatedRenewalId = null;

      if (NavData) {
        if (NavData?.renewal_id) {
          // Extract the numeric part after the hyphen
          const parts = NavData.renewal_id.split("-");
          const numericPart = parseInt(parts[1], 10); // Convert to number

          // Increment the numeric part by 1
          const incrementedPart = numericPart + 1;

          // Construct the new renewal_id
          updatedRenewalId = `${parts[0]}-${incrementedPart}`;
        } else {
          // Handle case where renewal_id is null or not provided
          updatedRenewalId = "JOB" + NavData.id + "-1"; // This is a default value or could be handled differently
        }
      }
      if (NavData) {
        const dataForEncode = {
          name: fullName,
          mobile_number: mobileNumber,
          city_id: Cityvalue,
          state_id: Statevalue,
          job_post_date: moment().format("YYYY-MM-DD"),
          vendor_id: vendorId,
          job_title_id: JobTitlevalue,
          business_ids: BusinnesTypevalue
            ? Array.isArray(BusinnesTypevalue)
              ? BusinnesTypevalue.join(",")
              : BusinnesTypevalue
            : "",
          working_time_id: WorkingTimevalue ? WorkingTimevalue : "",
          gender_id: GenderListvalue ? GenderListvalue : "",
          line_of_educations_ids: EducationLinevalue
            ? Array.isArray(EducationLinevalue)
              ? EducationLinevalue.join(",")
              : EducationLinevalue
            : "",
          qualification_id: Qualificationvalue ? Qualificationvalue : "",
          skills_ids: AddSkillsvalue
            ? Array.isArray(AddSkillsvalue)
              ? AddSkillsvalue.join(",")
              : AddSkillsvalue
            : "",
          experience_id: WorkExperiencevalue ? WorkExperiencevalue : "",
          quantity_id: Vaccanciesvalue ? Vaccanciesvalue : "",
          age_group_id: AgeListvalue ? AgeListvalue : "",
          localilty_id: Localityvalue ? Localityvalue : "",
          environment_to_work_id: WorkPlacevalue ? WorkPlacevalue : "",
          place_of_posting: "Ahmedabad",
          salary_range_id: SalaryRangevalue ? SalaryRangevalue : "",
          facility_ids: AdditionalFacilityvalue
            ? Array.isArray(AdditionalFacilityvalue)
              ? AdditionalFacilityvalue.join(",")
              : AdditionalFacilityvalue
            : "",
          job_type_id: value ? value : "",
          job_post_subscription_id: "1",
          message: CandidateMessagevalue,
          renewal_id: updatedRenewalId,
          status: "1",
          landmark: landmark,
        };
        var UrlEncodedData = new URLSearchParams(dataForEncode);
      } else {
        var data = new FormData();
        data.append("name", fullName);
        data.append("mobile_number", mobileNumber);
        data.append("city_id", Cityvalue);
        data.append("state_id", Statevalue);
        data.append("job_post_date", moment().format("YYYY-MM-DD"));
        data.append("vendor_id", vendorId);
        data.append("job_title_id", JobTitlevalue);
        data.append(
          "business_ids",
          BusinnesTypevalue
            ? Array.isArray(BusinnesTypevalue)
              ? BusinnesTypevalue.join(",")
              : BusinnesTypevalue
            : ""
        );
        data.append(
          "working_time_id",
          WorkingTimevalue ? WorkingTimevalue : ""
        );
        data.append("gender_id", GenderListvalue ? GenderListvalue : "");
        data.append(
          "line_of_educations_ids",
          EducationLinevalue
            ? Array.isArray(EducationLinevalue)
              ? EducationLinevalue.join(",")
              : EducationLinevalue
            : ""
        );
        data.append(
          "qualification_id",
          Qualificationvalue ? Qualificationvalue : ""
        );
        data.append(
          "skills_ids",
          AddSkillsvalue
            ? Array.isArray(AddSkillsvalue)
              ? AddSkillsvalue.join(",")
              : AddSkillsvalue
            : ""
        );
        data.append(
          "experience_id",
          WorkExperiencevalue ? WorkExperiencevalue : ""
        );
        data.append("quantity_id", Vaccanciesvalue ? Vaccanciesvalue : "");
        data.append("age_group_id", AgeListvalue ? AgeListvalue : "");
        data.append("localilty_id", Localityvalue ? Localityvalue : "");
        data.append(
          "environment_to_work_id",
          WorkPlacevalue ? WorkPlacevalue : ""
        );
        data.append("place_of_posting", "Ahmedabad");
        data.append(
          "salary_range_id",
          SalaryRangevalue ? SalaryRangevalue : ""
        );
        data.append(
          "facility_ids",
          AdditionalFacilityvalue
            ? Array.isArray(AdditionalFacilityvalue)
              ? AdditionalFacilityvalue.join(",")
              : AdditionalFacilityvalue
            : ""
        );
        data.append("job_type_id", value ? value : "");
        data.append("job_post_subscription_id", "1");
        data.append("message", CandidateMessagevalue);
        data.append("status", "1");
        data.append("landmark", landmark);
      }

      const response = await fetch(
        NavData
          ? `https://zingthing-app.ptechwebs.com/api/jobpost-update/${NavData.id}`
          : "https://zingthing-app.ptechwebs.com/api/jobpost-add",
        {
          method: NavData ? "PUT" : "POST",
          headers: NavData
            ? {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
              }
            : {
                Accept: "application/json",
              },
          body: NavData ? UrlEncodedData.toString() : data,
        }
      );

      if (!response.ok) {
        console.log(response);
      }

      const json = await response.json();
      if (json.code == 200 || json.code == 201) {
        if (!NavData) {
          var formData = new FormData();
          formData.append("topic", "JOB" + json?.data?.job_post_id);
          formData.append("deviceToken", fcmToken);
          var notificationResponse = await fetch(
            `https://zingthing-app.ptechwebs.com/api/subscribeToTopic`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              body: formData,
            }
          );
          handleSendSMS({ type: 1 });
        } else {
          handleSendSMS({ type: 2 });
        }
        const data = new FormData();
        data.append("job_post_ids", json?.data?.job_post_id);

        const response1 = await fetch(
          `https://zingthing-app.ptechwebs.com/api/job-search-match`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: data,
          }
        );
        const json1 = await response1.json();
        if (json1.code == 200 && json1.data) {
          let ids = json1.data.map((item) => item.id).join(",");
          // Use a for...of loop to handle asynchronous operations inside the loop
          for (let id of ids.split(",")) {
            const subscribeData = new FormData();
            subscribeData.append("topic", "SEARCH" + id);
            subscribeData.append("title", "We found a Matching Job");
            subscribeData.append("body", "Open the app to view the details");

            try {
              const notificationResponse = await fetch(
                `https://zingthing-app.ptechwebs.com/api/sendNotificationToTopic`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                  },
                  body: subscribeData,
                }
              );
              // Handle the response if necessary
              const notificationJson = await notificationResponse.json();
              console.log(
                "Notification sent for topic:",
                "SEARCH" + id,
                notificationJson
              );
            } catch (error) {
              console.error(
                "Failed to send notification for topic:",
                "SEARCH" + id,
                error
              );
            }
          }
        }
        setisLoading(false);
        Alert.alert(
          "CONGRATULATIONS",
          `YOUR REQUEST FOR JOB POST WITH NUMBER ${
            NavData ? json?.data : json?.data?.job_post_id
          } IS POSTED SUCCESSFULLY.\n\n` +
            `YOU WILL RECEIVE THE UPDATE NOTIFICATION IN CASE ANY CANDIDATE FITS YOUR JOB POST.\n\n` +
            `YOUR JOB POST WILL REMAIN LIVE TILL ${sbscriptionDayes}.\n\n` +
            `FOR ANY FURTHER ASSISTANCE, PLEASE CONTACT US ON:\n` +
            `9723233194 / 9737333194 / 9824333194 / 9979333194\n\n` +
            `PLEASE REFER TO YOUR JOB POST NUMBER.`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate(SCREENS.MyJobs),
            },
          ]
        );
      } else {
        console.log("--Error-occurs--", json);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const setDropdownOpenFunction = (index) => {
    setOpen(index == 0 ? !open : false);
    setJobTitleOpen(index == 1 ? !JobTitleopen : false);
    setBusinnesTypeOpen(index == 2 ? !BusinnesTypeopen : false);
    setWorkingTimeOpen(index == 3 ? !WorkingTimeopen : false);
    setGenderListOpen(index == 4 ? !GenderListopen : false);
    setEducationLineOpen(index == 5 ? !EducationLineopen : false);
    setQualificationOpen(index == 6 ? !Qualificationopen : false);
    setAddSkillsOpen(index == 7 ? !AddSkillsopen : false);
    setWorkExperienceOpen(index == 8 ? !WorkExperienceopen : false);
    setVaccanciesOpen(index == 9 ? !Vaccanciesopen : false);
    setAgeListOpen(index == 10 ? !AgeListopen : false);
    setWorkPlaceOpen(index == 11 ? !WorkPlaceopen : false);
    setSalaryRangeOpen(index == 12 ? !SalaryRangeopen : false);
    setLocalityOpen(index == 13 ? !Localityopen : false);
    setAdditionalFacilityOpen(index == 14 ? !AdditionalFacilityopen : false);
    setStateOpen(index == 15 ? !Stateopen : false);
    setCityOpen(index == 16 ? !Cityopen : false);
  };

  const handleSendSMS = async ({ type }) => {
    try {
      const phoneNumber = mobileNumber;
      var message = "",
        templateId = "";
      if (Number(type) == 1) {
        message =
          "Thank You. Your post will remain live for 15 days and you will receive notifications for best match for your requirements- FROM ZINGTHING";
        templateId = "1407172224594660000";
      } else if (Number(type) == 2) {
        message =
          "Thank You for Renewing the Plan. Your post will remain Active for 15 days. You will receive notifications for the best match for your requirements-FROM ZINGTHING";
        templateId = "1407172224620560000";
      }
      const response = await sendSMS(phoneNumber, message, templateId);
      console.log("SMS sent successfully:", response);
    } catch (error) {
      console.error("Failed to send SMS:", error);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#EFFDFD", justifyContent: "center" }}
    >
      <OnBordingHeader
        label={NavData ? "UpdateJobPost" : "POSTJOB"}
        Back={false}
      />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: RFValue(40),
          backgroundColor: COLORS.White,
          paddingVertical: width * 0.034,
          marginVertical: width * 0.04,
          marginHorizontal: RFValue(12),
          paddingHorizontal: width * 0.04,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: COLORS.TextBlack, fontWeight: "600" }}>
          {translator("FullName", Language)} * :{" "}
        </Text>
        <TextInput
          value={fullName}
          onChangeText={(i) => setFullName(i.replace(/[^a-zA-Z\s.]/g, ""))}
          placeholderTextColor={COLORS.extraLightBlack}
          textAlignVertical="top"
          style={{
            width: "100%",
            height: RFValue(30),
            marginVertical: width * 0.02,
            borderWidth: 1,
            borderColor: COLORS.SperatorColor,
            borderRadius: 8,
            zIndex: 985,
            padding: RFValue(8),
            color: COLORS.Black,
          }}
          placeholder="Full Name"
        />

        <Text style={{ color: COLORS.TextBlack, fontWeight: "600" }}>
          {translator("MobileNumber", Language)} * :{" "}
        </Text>
        <TextInput
          value={mobileNumber}
          onChangeText={(i) => {
            let sanitizedNumber = i.replace(/[^0-9]/g, "");
            if (sanitizedNumber.length > 0 && sanitizedNumber[0] === "0") {
              sanitizedNumber = sanitizedNumber.substring(1);
            }
            setMobileNumber(sanitizedNumber.substring(0, 10));
          }}
          placeholderTextColor={COLORS.extraLightBlack}
          textAlignVertical="top"
          style={{
            width: "100%",
            height: RFValue(30),
            marginVertical: width * 0.02,
            borderWidth: 1,
            borderColor: COLORS.SperatorColor,
            borderRadius: 8,
            zIndex: 985,
            padding: RFValue(8),
            color: COLORS.Black,
          }}
          placeholder="Mobile Number"
          keyboardType="number-pad"
        />

        <Text
          style={{
            color: COLORS.TextBlack,
            marginTop: RFValue(10),
            fontWeight: "600",
          }}
        >
          {translator("State", Language)} * :{" "}
        </Text>
        <View style={{ zIndex: 1004 }}>
          <DropDownPicker
            open={Stateopen}
            listMode="MODAL"
            searchable
            scrollViewProps={{ nestedScrollEnabled: true }}
            placeholder="Select State (Select Only One)"
            placeholderStyle={{
              color: COLORS.SperatorColor,
              fontWeight: "500",
            }}
            value={Statevalue}
            onPress={() => {
              setCityValue(null);
            }}
            onChangeValue={(val) => {
              GetCityValue({ id: val });
            }}
            items={Stateitems}
            setOpen={() => setDropdownOpenFunction(15)}
            setValue={setStateValue}
            listItemLabelStyle={{
              color: COLORS.Black,
              backgroundColor: COLORS.White,
            }}
            style={{
              marginVertical: width * 0.02,
              borderWidth: 0,
              elevation: 4,
            }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            setItems={setStateItems}
          />
        </View>

        <Text
          style={{
            color: COLORS.TextBlack,
            marginTop: RFValue(10),
            fontWeight: "600",
          }}
        >
          {translator("City", Language)} * :{" "}
        </Text>
        <View style={{ zIndex: 1003 }}>
          <DropDownPicker
            open={Cityopen}
            multiple={false}
            searchable
            listMode="MODAL"
            scrollViewProps={{ nestedScrollEnabled: true }}
            placeholder="Select City"
            placeholderStyle={{
              color: COLORS.SperatorColor,
              fontWeight: "500",
            }}
            value={Cityvalue}
            items={Cityitems}
            setOpen={() => setDropdownOpenFunction(16)}
            setValue={setCityValue}
            listItemLabelStyle={{
              color: COLORS.Black,
              backgroundColor: COLORS.White,
            }}
            style={{
              marginVertical: width * 0.02,
              borderWidth: 0,
              elevation: 4,
            }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            setItems={setCityItems}
          />
        </View>

        <Text style={{ color: COLORS.TextBlack, fontWeight: "600" }}>
          {translator("JobType", Language)} * :{" "}
        </Text>
        <View style={{ zIndex: 1002 }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            scrollViewProps={{ nestedScrollEnabled: true }}
            open={open}
            value={value}
            placeholder="Select Job Type (Select Only One)"
            placeholderStyle={{
              color: COLORS.extraLightBlack,
              fontWeight: "500",
            }}
            items={items}
            dropDownDirection="BOTTOM"
            setOpen={() => setDropdownOpenFunction(0)}
            setValue={setValue}
            listItemLabelStyle={{
              color: COLORS.Black,
              backgroundColor: COLORS.White,
            }}
            style={{
              marginVertical: width * 0.02,
              borderWidth: 0,
              elevation: 4,
            }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            setItems={setItems}
          />
        </View>

        <Text
          style={{
            color: COLORS.TextBlack,
            marginTop: RFValue(10),
            fontWeight: "600",
          }}
        >
          {translator("JobTitle", Language)} * :
        </Text>
        <View style={{ zIndex: 1001 }}>
          <DropDownPicker
            searchable={true}
            listMode="MODAL"
            open={JobTitleopen}
            scrollViewProps={{ nestedScrollEnabled: true }}
            placeholder="Select Job Title (Select Only One)"
            placeholderStyle={{
              color: COLORS.extraLightBlack,
              fontWeight: "500",
            }}
            value={JobTitlevalue}
            items={JobTitleitems}
            setOpen={() => setDropdownOpenFunction(1)}
            setValue={setJobTitleValue}
            listItemLabelStyle={{
              color: COLORS.Black,
              backgroundColor: COLORS.White,
            }}
            style={{
              marginVertical: width * 0.02,
              borderWidth: 0,
              elevation: 4,
            }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            setItems={setItems}
          />
        </View>

        {value == 1 && (
          <>
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("Landmark", Language)} :{" "}
            </Text>
            <TextInput
              value={landmark}
              onChangeText={(i) => setLandmark(i.replace(/[^a-zA-Z\s.]/g, ""))}
              placeholderTextColor={COLORS.extraLightBlack}
              textAlignVertical="top"
              style={{
                width: "100%",
                height: RFValue(30),
                marginVertical: width * 0.02,
                borderWidth: 1,
                borderColor: COLORS.SperatorColor,
                borderRadius: 8,
                zIndex: 985,
                padding: RFValue(8),
                color: COLORS.Black,
              }}
              placeholder="Enter Landmark"
            />
          </>
        )}

        {value == 2 && (
          <>
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("BusinessType", Language)} :
            </Text>
            <DropDownPicker
              listMode="MODAL"
              searchable={true}
              max={5}
              multiple={true}
              onSelectItem={(i) =>
                i.length == 5
                  ? setBusinnesTypeOpen(false)
                  : i.length > 5
                  ? ToastAndroid.show(
                      "You can select maximum 5 items",
                      ToastAndroid.SHORT
                    )
                  : null
              }
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={BusinnesTypeopen}
              placeholder="Select Business Type ( Max 5)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              value={BusinnesTypevalue}
              items={BusinnesTypeitems}
              setOpen={() => setDropdownOpenFunction(2)}
              setValue={setBusinnesTypeValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 998,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setBusinnesTypeItems}
            />

            <FlatList
              data={BusinnesTypevalue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {BusinnesTypeitems.find((b) => b.value === item)?.label},{" "}
                </Text>
              )}
            />

            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("JobTime/WorkingTime", Language)} :
            </Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={WorkingTimeopen}
              value={WorkingTimevalue}
              placeholder="Select Time (Select Only One)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              items={WorkingTimeitems}
              setOpen={() => setDropdownOpenFunction(3)}
              setValue={setWorkingTimeValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 997,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("Gender", Language)} :
            </Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={GenderListopen}
              value={GenderListvalue}
              items={GenderListitems}
              setOpen={() => setDropdownOpenFunction(4)}
              placeholder="Select Gender (Select Only One)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setValue={setGenderListValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 996,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />

            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("LineofEducation", Language)} :
            </Text>
            <DropDownPicker
              max={3}
              onSelectItem={(i) =>
                i.length == 3
                  ? setEducationLineOpen(false)
                  : i.length > 3
                  ? ToastAndroid.show(
                      "You can select maximum 3 items",
                      ToastAndroid.SHORT
                    )
                  : null
              }
              multiple={true}
              searchable={true}
              listMode="MODAL"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={EducationLineopen}
              value={EducationLinevalue}
              dropDownDirection="BOTTOM"
              placeholder="Select Education ( Max 3)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              items={EducationLineitems}
              setOpen={() => setDropdownOpenFunction(5)}
              setValue={setEducationLineValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 995,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />

            <FlatList
              data={EducationLinevalue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {EducationLineitems.find((b) => b.value === item)?.label},{" "}
                </Text>
              )}
            />

            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("Qualification", Language)} :
            </Text>
            <DropDownPicker
              listMode="MODAL"
              searchable={true}
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={Qualificationopen}
              value={Qualificationvalue}
              items={Qualificationitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Qualification (Select Only One)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(6)}
              setValue={setQualificationValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 994,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("AdditionalSkills", Language)} :
            </Text>

            <DropDownPicker
              max={3}
              multiple={true}
              listMode="MODAL"
              searchable={true}
              onSelectItem={(i) =>
                i.length == 3
                  ? setAddSkillsOpen(false)
                  : i.length > 3
                  ? ToastAndroid.show(
                      "You can select maximum 3 items",
                      ToastAndroid.SHORT
                    )
                  : null
              }
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={AddSkillsopen}
              value={AddSkillsvalue}
              items={AddSkillsitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Skills ( Max 3)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(7)}
              setValue={setAddSkillsValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 993,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />

            <FlatList
              data={AddSkillsvalue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {AddSkillsitems.find((b) => b.value === item)?.label},{" "}
                </Text>
              )}
            />

            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("WorkExperienceYears", Language)} :
            </Text>
            <DropDownPicker
              listMode="MODAL"
              searchable={true}
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={WorkExperienceopen}
              value={WorkExperiencevalue}
              items={WorkExperienceitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Experience (Select Only One)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(8)}
              setValue={setWorkExperienceValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 992,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("NOofVacancies", Language)} :
            </Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={Vaccanciesopen}
              value={Vaccanciesvalue}
              items={Vaccanciesitems}
              dropDownDirection="BOTTOM"
              placeholder="10 (Select Only One)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(9)}
              setValue={setVaccanciesValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 991,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("AgeGroup", Language)} :
            </Text>
            <DropDownPicker
              listMode="MODAL"
              searchable={true}
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={AgeListopen}
              value={AgeListvalue}
              items={AgeListitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Age Group"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(10)}
              setValue={setAgeListValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 990,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("WorkPlace", Language)} :
            </Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={WorkPlaceopen}
              value={WorkPlacevalue}
              items={WorkPlaceitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Work Place"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(11)}
              setValue={setWorkPlaceValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 989,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("SalaryRange", Language)} :
            </Text>
            <DropDownPicker
              listMode="MODAL"
              searchable={true}
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={SalaryRangeopen}
              value={SalaryRangevalue}
              items={SalaryRangeitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Range"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(12)}
              setValue={setSalaryRangeValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 988,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("Locality", Language)} :
            </Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={Localityopen}
              value={Localityvalue}
              items={Localityitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Locality"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(13)}
              setValue={setLocalityValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 987,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />
            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("AdditionalFacilities", Language)} :
            </Text>
            <DropDownPicker
              searchable={true}
              listMode="MODAL"
              onSelectItem={(i) =>
                i.length == AdditionalFacilityitems.length &&
                setAdditionalFacilityOpen(false)
              }
              scrollViewProps={{ nestedScrollEnabled: true }}
              multiple={true}
              open={AdditionalFacilityopen}
              value={AdditionalFacilityvalue}
              items={AdditionalFacilityitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Additional Facilities (Multiple Allowed)"
              placeholderStyle={{
                color: COLORS.extraLightBlack,
                fontWeight: "500",
              }}
              setOpen={() => setDropdownOpenFunction(14)}
              setValue={setAdditionalFacilityValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: 986,
              }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />

            <FlatList
              data={AdditionalFacilityvalue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {AdditionalFacilityitems.find((b) => b.value === item)?.label}
                  ,{" "}
                </Text>
              )}
            />
          </>
        )}

        <Text
          style={{
            color: COLORS.TextBlack,
            marginTop: RFValue(10),
            fontWeight: "600",
          }}
        >
          {translator("AdditionalMessage", Language)} :
        </Text>
        <TextInput
          value={CandidateMessagevalue}
          onChangeText={(i) => setCandidateMessagevalue(i)}
          placeholderTextColor={COLORS.extraLightBlack}
          textAlignVertical="top"
          multiline={true}
          numberOfLines={10}
          style={{
            width: "100%",
            height: RFValue(130),
            marginVertical: width * 0.02,
            borderWidth: 1,
            borderColor: COLORS.SperatorColor,
            borderRadius: 8,
            zIndex: 985,
            padding: RFValue(8),
            color: COLORS.Black,
          }}
          placeholder="Enter Additional Message"
        />
        <Text
          style={{
            color: COLORS.TextBlack,
            marginTop: RFValue(6),
            fontSize: RFValue(10),
            textAlign: "left",
          }}
        >
          {`On Posting Job/Service and on making Payment, you agree to our terms and conditions to get the notifications for the best match available in our database. Your post will remain live for 15 days and you will receive the notifications for the candidate/service seeker  available  in our database. By sending notifications for the match as per your requirements, we are exchanging the data only and we do not undertake any responsibility of quality the candidate/service seeker will get". We advise you to verify the match before you work with them`}
        </Text>
        <TouchableOpacity
          onPress={() => CheckValidation()}
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
            {NavData
              ? "Pay & Update Job Post"
              : translator("Pay&SubmitJobPost", Language)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {isLoading && (
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            color={COLORS.White}
            size={Dimensions.get("window").width * 0.2}
          />
        </View>
      )}
    </View>
  );
};

export default PostJob;

const styles = StyleSheet.create({
  dropDownContainerStyle: {
    zIndex: 1000,
  },
  itemText: {
    color: COLORS.Black,
    fontWeight: "600",
    marginVertical: 4,
  },
});
