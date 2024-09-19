import React, { useEffect, useRef, useState, useContext } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  ToastAndroid,
} from "react-native";
import { COLORS } from "../../common/Utils/Colors";
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { SCREENS } from "../../common/Utils/screenName";
import RazorpayCheckout from "react-native-razorpay";
import moment from "moment";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { translator } from '../../localization/I18n';
import { ContextProvider } from '../StateManagment/StateManagment';
import { FCMContext, CustomerContext } from '../../../App';
import { sendSMS } from '../../apis/sendSMS';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

interface PostJobProps {
  route: any;
}

const PostJob: React.FC<PostJobProps> = ({ route }) => {
  const navigation = useNavigation();
  const { NavData } = route.params;
  const [FinalSubmissionPage, setFinalSubmissionPage] = useState(false);
  const [documentPath, setdocumentPath] = useState("");
  const { Language } = useContext(ContextProvider);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(NavData ? NavData.job_type_id : null);
  const [items, setItems] = useState([]);
  const fcmToken = useContext(FCMContext);
  const customerId = useContext(CustomerContext);

  const [JobTitleopen, setJobTitleOpen] = useState(false);
  const [JobTitlevalue, setJobTitleValue] = useState(
    NavData ? NavData.job_title_id : null
  );
  const [JobTitleitems, setJobTitleItems] = useState([]);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [landmark, setLandmark] = useState('');

  const [Stateopen, setStateOpen] = useState(false);
  const [Statevalue, setStateValue] = useState(
    NavData ? NavData.state_id : null
  );
  const [Stateitems, setStateItems] = useState([]);

  const [Cityopen, setCityOpen] = useState(false);
  const [Cityvalue, setCityValue] = useState(null);
  const [Cityitems, setCityItems] = useState([]);

  const [BusinnesTypeopen, setBusinnesTypeOpen] = useState(false);
  const [BusinessTypeValue, setBusinnesTypeValue] = useState(null);
  const [BusinessTypeItems, setBusinnesTypeItems] = useState([]);

  const [WorkingTimeopen, setWorkingTimeOpen] = useState(false);
  const [WorkingTimevalue, setWorkingTimeValue] = useState(
    NavData ? NavData.working_time_id : null
  );
  const [WorkingTimeitems, setWorkingTimeItems] = useState([]);

  const [GenderListopen, setGenderListOpen] = useState(false);
  const [GenderListvalue, setGenderListValue] = useState(
    NavData ? NavData.gender_id : null
  );
  const [GenderListitems, setGenderListItems] = useState([]);

  const [EducationLineopen, setEducationLineOpen] = useState(false);
  const [EducationLinevalue, setEducationLineValue] = useState(null);
  const [EducationLineitems, setEducationLineItems] = useState([]);

  const [Qualificationopen, setQualificationOpen] = useState(false);
  const [Qualificationvalue, setQualificationValue] = useState(
    NavData ? NavData.qualification_id : null
  );
  const [Qualificationitems, setQualificationItems] = useState([]);

  const [AddSkillsopen, setAddSkillsOpen] = useState(false);
  const [AddSkillsvalue, setAddSkillsValue] = useState(null);
  const [AddSkillsitems, setAddSkillsItems] = useState([]);

  const [WorkExperienceopen, setWorkExperienceOpen] = useState(false);
  const [WorkExperiencevalue, setWorkExperienceValue] = useState(
    NavData ? NavData.experience_id : null
  );
  const [WorkExperienceitems, setWorkExperienceItems] = useState([]);

  const [Vaccanciesopen, setVaccanciesOpen] = useState(false);
  const [Vaccanciesvalue, setVaccanciesValue] = useState(
    NavData ? NavData.quantity_id : null
  );
  const [Vaccanciesitems, setVaccanciesItems] = useState([]);

  const [AgeListopen, setAgeListOpen] = useState(false);
  const [AgeListvalue, setAgeListValue] = useState(
    NavData ? NavData.age_group_id : null
  );
  const [AgeListitems, setAgeListItems] = useState([]);

  const [WorkPlaceopen, setWorkPlaceOpen] = useState(false);
  const [WorkPlacevalue, setWorkPlaceValue] = useState(
    NavData ? NavData.environment_to_work_id : null
  );
  const [WorkPlaceitems, setWorkPlaceItems] = useState([]);

  const [SalaryRangeopen, setSalaryRangeOpen] = useState(false);
  const [SalaryRangevalue, setSalaryRangeValue] = useState(
    NavData ? NavData.salary_range_id : null
  );
  const [SalaryRangeitems, setSalaryRangeItems] = useState([]);


  const [AdditionalFacilityopen, setAdditionalFacilityOpen] = useState(false);
  const [AdditionalFacilityvalue, setAdditionalFacilityValue] = useState(null);
  const [AdditionalFacilityitems, setAdditionalFacilityItems] = useState([]);

  const [CandidateMessagevalue, setCandidateMessagevalue] = useState(
    NavData ? NavData?.message : ""
  );

  const [sbscriptionAmount, setSbscriptionAmount] = useState(50);
  const [sbscriptionDayes, setSubscriptionDays] = useState(10);
  const [sbscriptionInDayes, setSubscriptionInDays] = useState(10);

  const [isLoading, setisLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

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
      if (BusinessTypeValue == null) {
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
      if (AdditionalFacilityvalue == null) {
        Alert.alert("Please Select Additional Facility");
        return;
      }
    }

    handlePayment();
  };

  const handlePayment = () => {
    const options = {
      description: "Credits towards consultation",
      image: "https://zingthing.in/frontend_theme/assets/images/logo.png",
      currency: "INR",
      key: "rzp_test_1Y0isRtUawGbne", // Your API key
      amount: sbscriptionAmount * 100, // Amount in paise
      name: "ZingThing",
      prefill: {
        contact: mobileNumber,
        name: fullName,
      },
      theme: { color: COLORS.PrimeryColor },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        onSubmit();
      })
      .catch((error) => {
        Alert.alert(`Something Wen't Wrong`);
      });
  };

  const fetchData = async () => {
    try {
      setisLoading(true);
      const response = await fetch(
        "https://jobportal.zingthing.in/api/all-list"
      );
      const json = await response.json();
      const JobType = json.data["Job Type"].map((item: any) => {
        return { label: item?.job_type, value: item?.id };
      });
      setItems(JobType);
      const JobTitle = json.data["JobTitle Lists"].map((item: any) => {
        return { label: item?.job_title, value: item?.id };
      });
      setJobTitleItems(JobTitle);
      const BusinessType = json.data["Business Lists"].map((item: any) => {
        return { label: item?.business, value: item?.id };
      });
      setBusinnesTypeItems(BusinessType);
      const WorkingTime = json.data["WorkingTime Lists"].map((item: any) => {
        return { label: item?.working_time, value: item?.id };
      });
      setWorkingTimeItems(WorkingTime);
      const GenderList = [
        { label: "Male", value: 1 },
        { label: "Female", value: 2 },
      ];
      setGenderListItems(GenderList);
      const LineOfEductaion = json.data["LineOfEducation Lists"].map(
        (item: any) => {
          return { label: item?.line_of_education, value: item?.id };
        }
      );
      setEducationLineItems(LineOfEductaion);
      const QualificationList = json.data["Qualification Lists"].map(
        (item: any) => {
          return { label: item?.qualification, value: item?.id };
        }
      );
      setQualificationItems(QualificationList);
      const AdditionalSkills = json.data["Skills Lists"].map((item: any) => {
        return { label: item?.skills, value: item?.id };
      });
      setAddSkillsItems(AdditionalSkills);
      const Expirence = json.data["Experience Lists"].map((item: any) => {
        return { label: item?.experience, value: item?.id };
      });
      setWorkExperienceItems(Expirence);

      const VaccaniciesList = json.data["Quantity Lists"].map((item: any) => {
        return { label: item?.quantity, value: item?.id };
      });
      setVaccanciesItems(VaccaniciesList);

      const AgeGroup = json.data["AgeGroup Lists"].map((item: any) => {
        return { label: item?.age_group, value: item?.id };
      });
      setAgeListItems(AgeGroup);

      const WorkPlace = json.data["EnvironmentToWork Lists"].map(
        (item: any) => {
          return { label: item?.environment_to_work_with, value: item?.id };
        }
      );
      setWorkPlaceItems(WorkPlace);

      const SalaryRange = json.data["SalaryRange Lists"].map((item: any) => {
        return { label: item?.salary_range, value: item?.id };
      });
      setSalaryRangeItems(SalaryRange);

      const AdditionalFacility = json.data["Facilities Lists"].map(
        (item: any) => {
          return { label: item?.facilities, value: item?.id };
        }
      );
      setAdditionalFacilityItems(AdditionalFacility);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }

    try {
      const response = await fetch(
        "https://jobportal.zingthing.in/api/job-post-subscription-list"
      );
      const json = await response.json();
      setSbscriptionAmount(json.data[0].job_post_rupees);
      const expirationDate = moment(moment().format("YYYY-MM-DD")).add(
        Number(json.data[0].job_post_days),
        "days"
      );
      setSubscriptionDays(moment(expirationDate).format("DD-MM-YYYY"));
      setSubscriptionInDays(json.data[0].job_post_days);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        "https://jobportal.zingthing.in/api/state-list"
      );
      const json = await response.json();
      const JobTitle = json.data.map((item: any) => {
        return { label: item?.state_name, value: item?.id };
      });
      setStateItems(JobTitle);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }

    if (NavData) {
      setValue(NavData.job_type_id || null); // Job Type
      setJobTitleValue(NavData.job_title_id || null); // Job Title
      setStateValue(NavData.state_id || null); // State
      setCityValue(NavData.city_id ? NavData.city_id : null); // City
      setBusinnesTypeValue(NavData.business.map(b => b.business_id) || []); // Business Type
      setWorkingTimeValue(NavData.working_time_id || null); // Working Time
      setGenderListValue(NavData.gender_id || null); // Gender
      setEducationLineValue(NavData.line_of_educations.map(edu => edu.line_of_educations_id) || []); // Education Line
      setQualificationValue(NavData.qualification_id || null); // Qualification
      setAddSkillsValue(NavData.skills.map(skill => skill.skill_id) || []); // Skills
      setWorkExperienceValue(NavData.experience_id || null); // Work Experience
      setVaccanciesValue(NavData.quantity_id || null); // Quantity
      setAgeListValue(NavData.age_group_id || null); // Age Group
      setWorkPlaceValue(NavData.environment_to_work_id || null); // Work Place
      setSalaryRangeValue(NavData.salary_range_id || null); // Salary Range
      setAdditionalFacilityValue(NavData.facilities.map(fac => fac.facilities_id) || []); // Additional Facilities
      setCandidateMessagevalue(NavData.message || ""); // Message
      setFullName(NavData.name || "");
      setMobileNumber(NavData.mobile_number || "");
      setLandmark(NavData.landmark || "");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pickResume = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });
      if (res && res[0].uri) {
        setResumeData(res[0]); // Save the file data to resumeData state
        const path = await copyDocumentToAppDirectory(res[0]);
        setdocumentPath(path);
      } else {
        Alert.alert("Error", "Selected document URI is undefined");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled document picker");
      } else {
        Alert.alert("Error", "Something went wrong while picking the document");
        console.log(err);
      }
    }
  };

  const copyDocumentToAppDirectory = async (document: any) => {
    const fileName = document.name;
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      await RNFS.copyFile(document.uri, destPath);
      return destPath;
    } catch (error) {
      console.error("Error copying document to app directory", error);
      throw error;
    }
  };

  const handleSendSMS = async ({ type }: { type: number }) => {
    try {
      const phoneNumber = mobileNumber;
      let message = '';
      let templateId = '';
      if (Number(type) == 1) {
        message = 'Thank You for Posting with us. Your search will remain Active for 15 days. You will receive notifications for the best match- FROM ZINGTHING';
        templateId = '1407172224601350000';
      } else if (Number(type) == 2) {
        message = 'Thank You for Renewal. Your post will remain Active for 15 days. You will receive notifications for the best match for your requirements-FROM ZINGTHING';
        templateId = '1407172224615870000';
      }
      const response = await sendSMS(phoneNumber, message, templateId);
      console.log('SMS sent successfully:', response);
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
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

      setisLoading(true);
      const data = new FormData();
      data.append("job_post_date", moment().format("YYYY-MM-DD"));
      data.append("candidate_id", customerId);
      data.append("job_title_id", JobTitlevalue);
      data.append(
        "business_ids",
        BusinessTypeValue
          ? Array.isArray(BusinessTypeValue)
            ? BusinessTypeValue.join(",")
            : BusinessTypeValue
          : ""
      );
      data.append("working_time_id", WorkingTimevalue ? WorkingTimevalue : "");
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
      data.append(
        "environment_to_work_id",
        WorkPlacevalue ? WorkPlacevalue : ""
      );
      data.append("place_of_posting", "Ahmedabad");
      data.append("salary_range_id", SalaryRangevalue ? SalaryRangevalue : "");
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
      data.append("job_search_subscription_id", "1");
      data.append("state_id", Statevalue);
      data.append("name", fullName);
      data.append("mobile_number", mobileNumber);
      data.append("city_id", Cityvalue);
      data.append("locality_id", "");
      data.append("status", "1");
      data.append("landmark", landmark);


      if (NavData) {
        data.append("renewal_id", updatedRenewalId);
      }

      if (resumeData) {
        data.append("resume", {
          uri: resumeData.uri,
          type: resumeData.type,
          name: resumeData.name,
        });
      }

      const response = await fetch(
        NavData
          ? `https://jobportal.zingthing.in/api/jobpost-search-update/${NavData.id}?_method=PUT`
          : "https://jobportal.zingthing.in/api/jobpost-search-add",
        {
          method: "POST",
          headers: {
            Accept: "application/json,*/*",
            "Content-Type": "multipart/form-data",
          },
          body: data,
        }
      );

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      const json = await response.json();
      console.log(json);

      if (!NavData) {
        const formData = new FormData();
        formData.append("topic", "SEARCH" + json?.data?.job_post_search_id);
        formData.append("deviceToken", fcmToken);
        await fetch(
          `https://jobportal.zingthing.in/api/subscribeToTopic`,
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

      const searchData = new FormData();
      searchData.append('job_post_search_ids', json?.data?.job_post_search_id);

      const response1 = await fetch(
        `https://jobportal.zingthing.in/api/job-post-match`,
        {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: searchData
        }
      );
      const json1 = await response1.json();
      if (json1.code == 200 && json1.data) {
        let ids = json1.data.map(item => item.id).join(',');
        for (let id of ids.split(',')) {
          const subscribeData = new FormData();
          subscribeData.append("topic", "JOB" + id);
          subscribeData.append("title", "We found a Matching Candidate");
          subscribeData.append("body", "Open the app to view the details");

          try {
            const notificationResponse = await fetch(
              `https://jobportal.zingthing.in/api/sendNotificationToTopic`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: subscribeData,
              }
            );
            const notificationJson = await notificationResponse.json();
            console.log("Notification sent for topic:", "JOB" + id, notificationJson);
          } catch (error) {
            console.error("Failed to send notification for topic:", "JOB" + id, error);
          }
        }
      }
      setisLoading(false);
      Alert.alert(
        "CONGRATULATIONS",
        `YOUR REQUEST FOR JOB POST WITH NUMBER ${json.data.job_post_search_id} IS POSTED SUCCESSFULLY.\n\n` +
        `YOU WILL RECEIVE UPDATE NOTIFICATIONS IN CASE ANY CANDIDATE FITS YOUR JOB POST.\n\n` +
        `YOUR JOB POST WILL REMAIN LIVE TILL ${sbscriptionDayes}.\n\n` +
        `FOR ANY FURTHER ASSISTANCE, PLEASE CONTACT US AT:\n` +
        `9723233194 / 9737333194 / 9824333194 / 9979333194\n\n` +
        `WITH YOUR JOB POST NUMBER.`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate(SCREENS.DashBoard),
          },
        ]
      );
    } catch (err: any) {
      setisLoading(false);
      console.log("--Errorrorr--", err);
    }
  };

  const GetCityValue = async ({ id }: { id: number }) => {
    try {
      setisLoading(true);
      const response = await fetch(
        `https://jobportal.zingthing.in/api/city/${id}`
      );
      const json = await response.json();
      const JobTitle = json.data.map((item: any) => {
        return { label: item?.city_name, value: item?.id };
      });
      setisLoading(false);
      setCityItems(JobTitle);
    } catch (Err) {
      setisLoading(false);
      console.log("--Error-City-List--", Err);
    }
  };

  const setDropdownOpenFunction = (index: number) => {
    setOpen(index === 0 ? !open : false);
    setJobTitleOpen(index === 1 ? !JobTitleopen : false);
    setBusinnesTypeOpen(index === 2 ? !BusinnesTypeopen : false);
    setWorkingTimeOpen(index === 3 ? !WorkingTimeopen : false);
    setGenderListOpen(index === 4 ? !GenderListopen : false);
    setEducationLineOpen(index === 5 ? !EducationLineopen : false);
    setQualificationOpen(index === 6 ? !Qualificationopen : false);
    setAddSkillsOpen(index === 7 ? !AddSkillsopen : false);
    setWorkExperienceOpen(index === 8 ? !WorkExperienceopen : false);
    setVaccanciesOpen(index === 9 ? !Vaccanciesopen : false);
    setAgeListOpen(index === 10 ? !AgeListopen : false);
    setWorkPlaceOpen(index === 11 ? !WorkPlaceopen : false);
    setSalaryRangeOpen(index === 12 ? !SalaryRangeopen : false);
    setAdditionalFacilityOpen(index === 14 ? !AdditionalFacilityopen : false);
    setStateOpen(index === 15 ? !Stateopen : false);
    setCityOpen(index === 16 ? !Cityopen : false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EFFDFD", justifyContent: "center" }}>
      <OnBordingHeader
        label={NavData ? `Update Job Search #${NavData.id}` : "FindAJob"}
        Back={true}
      />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >

        <Text style={styles.label}>{translator("FullName", Language)}</Text>
        <TextInput
          value={fullName}
          onChangeText={(i) => setFullName(i.replace(/[^a-zA-Z\s.]/g, ''))}
          placeholderTextColor={COLORS.extraLightBlack}
          textAlignVertical="top"
          style={styles.textInput}
          placeholder="Full Name"
        />

        <Text style={styles.label}>{translator("MobileNumber", Language)}</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={(i) => {
            let sanitizedNumber = i.replace(/[^0-9]/g, '');
            if (sanitizedNumber.length > 0 && sanitizedNumber[0] === '0') {
              sanitizedNumber = sanitizedNumber.substring(1);
            }
            setMobileNumber(sanitizedNumber.substring(0, 10));
          }}
          placeholderTextColor={COLORS.extraLightBlack}
          textAlignVertical="top"
          style={styles.textInput}
          placeholder="Mobile Number"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>{translator("State", Language)}:</Text>
        <DropDownPicker
          open={Stateopen}
          listMode="MODAL"
          searchable
          scrollViewProps={{ nestedScrollEnabled: true }}
          placeholder="Select State (Select Only One)"
          placeholderStyle={styles.placeholderStyle}
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
          listItemLabelStyle={styles.listItemLabelStyle}
          style={styles.dropDownPicker}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          setItems={setStateItems}
        />

        <Text style={styles.label}>{translator("City", Language)} :</Text>
        <DropDownPicker
          open={Cityopen}
          multiple={false}
          searchable
          listMode="MODAL"
          scrollViewProps={{ nestedScrollEnabled: true }}
          placeholder="Select City"
          placeholderStyle={styles.placeholderStyle}
          value={Cityvalue}
          items={Cityitems}
          setOpen={() => setDropdownOpenFunction(16)}
          setValue={setCityValue}
          listItemLabelStyle={styles.listItemLabelStyle}
          style={styles.dropDownPicker}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          setItems={setCityItems}
        />

        <Text style={styles.label}>{translator("JobType", Language)} * :{" "}</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            scrollViewProps={{ nestedScrollEnabled: true }}
            open={open}
            value={value}
            placeholder="Select Job Type (Select Only One)"
            placeholderStyle={styles.placeholderStyle}
            items={items}
            dropDownDirection="BOTTOM"
            setOpen={() => setDropdownOpenFunction(0)}
            setValue={setValue}
            listItemLabelStyle={styles.listItemLabelStyle}
            style={styles.dropDownPicker}
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
          {translator("JobTitle", Language)} :
        </Text>
        <View style={{ zIndex: 999 }}>
          <DropDownPicker
            searchable={true}
            searchPlaceholder="Search Job Title"
            listMode="MODAL"
            open={JobTitleopen}
            scrollViewProps={{ nestedScrollEnabled: true }}
            placeholder="Select Job Title (Select Only One)"
            placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
            value={JobTitlevalue}
            items={JobTitleitems}
            setOpen={() => setDropdownOpenFunction(1)}
            setValue={setJobTitleValue}
            listItemLabelStyle={{ color: COLORS.Black, backgroundColor: COLORS.White }}
            style={{
              marginVertical: width * 0.02,
              borderWidth: 0,
              elevation: 4,
              zIndex: JobTitleopen ? 999 : 1,
            }}
            dropDownContainerStyle={{
              zIndex: 999,
              ...styles.dropDownContainerStyle,
            }}
            setItems={setItems}
          />

        </View>

        {value == 1 && (
          <>
            <Text style={{ color: COLORS.TextBlack, marginTop: RFValue(10), fontWeight: "600" }}>
              {translator("Landmark", Language)} :{" "}
            </Text>
            <TextInput
              value={landmark}
              onChangeText={(i) => setLandmark(i.replace(/[^a-zA-Z\s.]/g, ''))}
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


        {value === 2 && (
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
                i.length === 5
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
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              value={BusinessTypeValue}
              items={BusinessTypeItems}
              setOpen={() => setDropdownOpenFunction(2)}
              setValue={setBusinnesTypeValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 998 }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setBusinnesTypeItems}
            />

            <FlatList
              data={BusinessTypeValue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {BusinessTypeItems.find(el => el.value === item)?.label},{" "}
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
              {translator("JobTimeWorkingTime", Language)} :
            </Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={WorkingTimeopen}
              value={WorkingTimevalue}
              placeholder="Select Time (Select Only One)"
              placeholderStyle={{
                color: COLORS.SperatorColor,
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
                color: COLORS.SperatorColor,
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
              {translator("LineOfEducation", Language)} :
            </Text>
            <DropDownPicker
              max={3}
              onSelectItem={(i) =>
                i.length === 3
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
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              items={EducationLineitems}
              setOpen={() => setDropdownOpenFunction(5)}
              setValue={setEducationLineValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 995 }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />

            <FlatList
              data={EducationLinevalue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {EducationLineitems.find(el => el.value === item)?.label},{" "}
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
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              setOpen={() => setDropdownOpenFunction(6)}
              setValue={setQualificationValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 994 }}
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
                i.length === 3
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
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              setOpen={() => setDropdownOpenFunction(7)}
              setValue={setAddSkillsValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 993 }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />

            <FlatList
              data={AddSkillsvalue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {AddSkillsitems.find(el => el.value === item)?.label},{" "}
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
              {translator("WorkExperience", Language)} :
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
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              setOpen={() => setDropdownOpenFunction(8)}
              setValue={setWorkExperienceValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 992 }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
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
              searchable={true}
              listMode="MODAL"
              scrollViewProps={{ nestedScrollEnabled: true }}
              open={AgeListopen}
              value={AgeListvalue}
              items={AgeListitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Age Group"
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              setOpen={() => setDropdownOpenFunction(10)}
              setValue={setAgeListValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 990 }}
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
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              setOpen={() => setDropdownOpenFunction(11)}
              setValue={setWorkPlaceValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 989 }}
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
              {translator("Salary", Language)} :
            </Text>
            <DropDownPicker
              searchable={true}
              searchPlaceholder="Search Salary Range"
              listMode="MODAL"
              open={SalaryRangeopen}
              scrollViewProps={{ nestedScrollEnabled: true }}
              placeholder="Select Range"
              value={SalaryRangevalue}
              items={SalaryRangeitems}
              setOpen={() => setDropdownOpenFunction(12)}
              setValue={setSalaryRangeValue}
              listItemLabelStyle={{ color: COLORS.Black, backgroundColor: COLORS.White }}
              style={{
                marginVertical: width * 0.02,
                borderWidth: 0,
                elevation: 4,
                zIndex: SalaryRangeopen ? 999 : 1,
              }}
              dropDownContainerStyle={{
                zIndex: 999,
                ...styles.dropDownContainerStyle,
              }}
              setItems={setItems}
            />

            <Text
              style={{
                color: COLORS.TextBlack,
                marginTop: RFValue(10),
                fontWeight: "600",
              }}
            >
              {translator("AdditionalFacility", Language)} :
            </Text>
            <DropDownPicker
              searchable={true}
              listMode="MODAL"
              onSelectItem={(i) =>
                i.length === AdditionalFacilityitems.length &&
                setAdditionalFacilityOpen(false)
              }
              scrollViewProps={{ nestedScrollEnabled: true }}
              multiple={true}
              open={AdditionalFacilityopen}
              value={AdditionalFacilityvalue}
              items={AdditionalFacilityitems}
              dropDownDirection="BOTTOM"
              placeholder="Select Additional Facilities (Multiple Allowed)"
              placeholderStyle={{ color: COLORS.extraLightBlack, fontWeight: "500" }}
              setOpen={() => setDropdownOpenFunction(14)}
              setValue={setAdditionalFacilityValue}
              listItemLabelStyle={{ color: COLORS.Black }}
              style={{ marginVertical: width * 0.02, borderWidth: 0, elevation: 4, zIndex: 986 }}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              setItems={setItems}
            />

            <FlatList
              data={AdditionalFacilityvalue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.itemText}>
                  {AdditionalFacilityitems.find(el => el.value === item)?.label},{" "}
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
          {translator("UploadResume", Language)} :
        </Text>
        <TouchableOpacity
          onPress={() => pickResume()}
          style={{
            backgroundColor: COLORS.Orange,
            paddingVertical: height * 0.014,
            borderRadius: width * 0.02,
            width: "90%",
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
            {translator("UploadResumeOptional", Language)}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.TextBlack,
            marginTop: RFValue(10),
            fontWeight: "600",
          }}
        >
          {translator("Message", Language)} :
        </Text>
        <TextInput
          value={CandidateMessagevalue}
          onChangeText={(text) => setCandidateMessagevalue(text)}
          placeholderTextColor={COLORS.SperatorColor}
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
          placeholder="Enter Candidate Message"
        />
        <Text
          style={{
            color: COLORS.TextBlack,
            marginTop: RFValue(6),
            fontSize: RFValue(10),
            textAlign: "left",
          }}
        >
          {` On Posting Job Search/Service Search and on making Payment, you agree to our terms and conditions to get the notifications for the best match available in our database. Your post will remain live for 15 days and you will receive the notifications for the employer/service provider available in our database. By sending notifications for the match as per your requirements, we are exchanging the data only and we do not undertake any responsibility of quality the work/service the employer/service provider will give. We advise you to verify the match before you work with them`}
        </Text>
        <TouchableOpacity
          onPress={() => CheckValidation()}
          style={{
            backgroundColor: COLORS.Orange,
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
              ? "Pay & update job search"
              : "Pay and proceed to job search"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingContainer}>
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
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: RFValue(40),
    backgroundColor: COLORS.White,
    paddingVertical: width * 0.034,
    marginVertical: width * 0.04,
    marginHorizontal: RFValue(12),
    paddingHorizontal: width * 0.04,
    borderRadius: 4,
  },
  label: {
    color: COLORS.TextBlack,
    fontWeight: "600",
    fontSize: RFValue(12),
    marginVertical: RFValue(6),
  },
  textInput: {
    width: "100%",
    height: RFValue(40),
    marginVertical: RFValue(8),
    borderWidth: 1,
    borderColor: COLORS.SperatorColor,
    borderRadius: 8,
    padding: RFValue(10),
    color: COLORS.Black,
    fontSize: RFValue(14),
  },
  dropDownPicker: {
    marginVertical: RFValue(8),
    borderWidth: 0,
    elevation: 4,
    zIndex: 1000,
  },
  dropDownContainerStyle: {
    zIndex: 1000,
    elevation: 4,
  },
  placeholderStyle: {
    color: COLORS.extraLightBlack,
    fontWeight: "500",
    fontSize: RFValue(12),
  },
  listItemLabelStyle: {
    color: COLORS.Black,
    backgroundColor: COLORS.White,
    fontSize: RFValue(14),
  },
  itemText: {
    fontSize: RFValue(14),
    color: COLORS.Black,
    marginVertical: RFValue(2),
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
