import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { COLORS } from "../../../common/Utils/Colors";
import OnBordingHeader from "../../../common/Components/OnBordingHeader";
import { RFValue } from "react-native-responsive-fontsize";
import RazorpayCheckout from "react-native-razorpay";
import RNFetchBlob from "rn-fetch-blob";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import { translator } from "../../../localization/I18n";
import { ContextProvider } from "../../StateManagment/StateManagment";
import moment from "moment";
import { CustomerContext } from "../../../../App";
import { SCREENS } from "../../../common/Utils/screenName";

const AvailableJob: React.FC = () => {
  const [screenState, setscreenState] = useState(0);
  const [documentPath, setdocumentPath] = useState("");
  const [CheckIndex, SetCheckIndex] = useState<number[]>([]);
  const [mainData, setMainData] = useState<any[]>([]);
  const [mainFullDetails, SetmainFullDetails] = useState<any | null>(null);
  const [jobSearchIds, setJobSearchIds] = useState<string | null>(null);
  const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("screen");
  const [SectionSelect, SetSectionSelect] = useState<string>("local");
  const { Language, SetLanguage } = useContext(ContextProvider);
  const navigation = useNavigation();
  const customerId = useContext(CustomerContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://zingthing-app.ptechwebs.com/api/jobpost-search-list/${customerId}`
      );
      const json = await response.json();
      const item = json.data;

      if (json.code === 200 && item) {
        // Filter items where status is "1"
        const filteredItems = item.filter((item: any) => item.status === "1");

        // Map the filtered items to get their IDs
        const ids = filteredItems.map((item: any) => item.id).join(",");
        console.log(ids);
        const data = new FormData();
        data.append("job_post_search_ids", ids);

        const response1 = await fetch(
          `https://zingthing-app.ptechwebs.com/api/job-post-match`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: data,
          }
        );
        const json1 = await response1.json();
        console.log(json1);
        if (json1.code === 200 && json1.data) {
          console.log(json1.data);
          const reversedData = [...json1.data].reverse();
          setMainData(reversedData);
        }
      } else {
        console.error("Failed to fetch job posts");
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate(SCREENS.JobDetails, {
            details: item,
            fulldetails: mainFullDetails,
          })
        }
        style={styles.itemContainer}
      >
        <View style={styles.itemHeader}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.jobPostId}>
                {translator("JobPostId", Language)}
              </Text>
              <Text style={styles.expiresIn}>
                {translator("ExpiresIn", Language)}:{" "}
                {moment(item.job_post_date)
                  .add(15, "days")
                  .format("MMMM Do YYYY")}
              </Text>
            </View>
            <Text style={styles.jobId}>{item.id}</Text>
          </View>
          <View style={styles.postedRecently}>
            <Text style={styles.postedRecentlyText}>
              {translator("PostedRecently", Language)}
            </Text>
          </View>
        </View>
        <View style={styles.itemBody}>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("JobTitle", Language)}:</Text>
            <Text style={styles.value}>{item.job_title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("JobType", Language)}:</Text>
            <Text style={styles.value}>{item.job_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("EmployerName", Language)}:</Text>
            <Text style={styles.value}>{item.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("MobileNumber", Language)}:</Text>
            <Text style={styles.value}>{item.mobile_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("State", Language)}:</Text>
            <Text style={styles.value}>{item.state_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{translator("City", Language)}:</Text>
            <Text style={styles.value}>{item.city_name}</Text>
          </View>
          {item.job_type_id === 1 && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>{translator("Landmark", Language)}</Text>
                <Text style={styles.value}>: {item.landmark}</Text>
              </View>
            </>
          )}
          {item.salary_range && (
            <View style={styles.row}>
              <Text style={styles.label}>{translator("Salary", Language)}:</Text>
              <Text style={styles.valueBold}>{item.salary_range}</Text>
            </View>
          )}
          {item.job_post_date && (
            <View style={styles.row}>
              <Text style={styles.label}>Job Posted Date:</Text>
              <Text style={styles.value}>{item.job_post_date}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainBody}>
      <View>
        <OnBordingHeader label={"MatchingJobs"} Back={true} />
      </View>
      {/* <View style={styles.sectionHeader}>
        <TouchableOpacity
          style={[
            styles.sectionButton,
            SectionSelect === "local" && styles.selectedSection,
          ]}
          onPress={() => SetSectionSelect("local")}
        >
          <Text style={styles.sectionText}>Local Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sectionButton,
            SectionSelect === "all" && styles.selectedSection,
          ]}
          onPress={() => SetSectionSelect("all")}
        >
          <Text style={styles.sectionText}>All Jobs</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          data={mainData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate(SCREENS.AllCandidates);
        }}
      >
        <Text style={styles.floatingButtonText}>Total Jobs Posted</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvailableJob;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: COLORS.PrimeryColor,
  },
  sectionHeader: {
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    justifyContent: "space-between",
    paddingTop: RFValue(30),
    paddingBottom: RFValue(10),
    width: "100%",
    backgroundColor: COLORS.White,
  },
  sectionButton: {
    paddingBottom: RFValue(5),
  },
  selectedSection: {
    borderBottomColor: "orange",
    borderBottomWidth: 4,
  },
  sectionText: {
    color: "black",
    fontWeight: "600",
    fontSize: RFValue(14),
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: RFValue(15),
  },
  listContent: {
    paddingVertical: RFValue(15),
  },
  itemContainer: {
    borderRadius: RFValue(2),
    backgroundColor: COLORS.White,
    marginTop: RFValue(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.DarkPrimeryColor,
  },
  jobPostId: {
    color: COLORS.Orange,
    fontWeight: "bold",
  },
  expiresIn: {
    color: COLORS.Red,
    fontWeight: "500",
    fontSize: RFValue(8),
    marginTop: RFValue(2),
  },
  jobId: {
    color: COLORS.SkyBlueText,
    fontWeight: "bold",
    marginLeft: RFValue(10),
  },
  postedRecently: {
    backgroundColor: COLORS.ButtonPurpal,
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(4),
    borderRadius: RFValue(4),
  },
  postedRecentlyText: {
    fontSize: RFValue(10),
    color: COLORS.White,
  },
  itemBody: {
    padding: RFValue(15),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(10),
  },
  label: {
    color: COLORS.Black,
    fontSize: RFValue(12),
    width: RFValue(100),
  },
  value: {
    color: COLORS.Black,
    fontSize: RFValue(10),
    flex: 1,
  },
  valueBold: {
    color: COLORS.Black,
    fontSize: RFValue(10),
    fontWeight: "bold",
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: RFValue(20),
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width / 4 }],
    width: Dimensions.get('window').width / 2,
    backgroundColor: COLORS.Orange,
    paddingVertical: RFValue(10),
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  floatingButtonText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: RFValue(14),
  },
});
