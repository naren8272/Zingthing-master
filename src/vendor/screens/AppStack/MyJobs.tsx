import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../common/Utils/Colors";
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import { IMAGE } from "../../common/Utils/image";
import { RFValue } from "react-native-responsive-fontsize";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../common/Utils/screenName";
import moment from "moment";
import Loader from "../../common/Components/Loader";
import { translator } from "../../localization/I18n";
import RNFetchBlob from "rn-fetch-blob";
import { FONTS } from "../../common/Utils/fonts";
import { FCMContext, VendorContext } from "../../../../App";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";
const { width, height } = Dimensions.get("window");

export default function MyJobs({ NavData }) {
  const [screenState, setscreenState] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [mainDataForFirst, setMainDataForFirst] = useState([]);
  const [mainDataForSecond, setMainDataForSecond] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const ScreenHeight = Dimensions.get("screen").height;
  const ScreenWidth = Dimensions.get("screen").width;
  const navigation = useNavigation();
  const focus = useIsFocused();
  const { Language } = useContext(ContextProvider);
  const fcmToken = useContext(FCMContext);
  const vendorId = useContext(VendorContext);

  const GetCandidateList = async (details) => {
    try {
      let ids = details.map((item) => item.id).join(",");
      var data = new FormData();
      data.append("job_post_ids", ids);
      const response = await fetch(
        `https://zingthing-app.ptechwebs.com/api/job-search-match`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: data,
        }
      );
      // const response = await fetch(
      //   `https://zingthing-app.ptechwebs.com/api/jobpost-search-list/4`,
      // );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
      }

      const json = await response.json();
      if (json.code == 200 && json.data) {
        setMainDataForSecond(json.data);
        setisLoading(false);
      }
      setisLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      console.error("Error details:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jobportal.zingthing.in/api/jobpost-list/" + vendorId
      );
      console.log("jirjiofjr",response)
      const json = await response.json();
      const reversedData = [...json.data].reverse();

      // Preload the checkedItems state with notification statuses
      const initialCheckedItems = reversedData.reduce((acc, item) => {
        if (Number(item.notification) === 1) {
          acc[item.id] = 1;
        } else {
          acc[item.id] = 0;
        }
        return acc;
      }, {});

      setCheckedItems(initialCheckedItems);
      setMainDataForFirst(reversedData);
      GetCandidateList(reversedData);
    } catch (error) {
      console.log("HERE");
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const toggleCheckbox = async (item, index) => {
    const currentCheckedState = checkedItems[item.id] || false;
    const newNotificationStatus = currentCheckedState ? 0 : 1;

    const dataForEncode = {
      notification: newNotificationStatus,
    };
    const UrlEncodedData = new URLSearchParams(dataForEncode);

    try {
      const response = await fetch(
        `https://zingthing-app.ptechwebs.com/api/jobpost-notificationt-update/${item.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: UrlEncodedData.toString(),
        }
      );

      if (newNotificationStatus) {
        var formData = new FormData();
        formData.append("topic", "JOB" + item.id);
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
      } else {
        var formData = new FormData();
        formData.append("topic", "JOB" + item.id);
        formData.append("deviceToken", fcmToken);
        var notificationResponse = await fetch(
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

      if (response.ok) {
        setCheckedItems((prevState) => ({
          ...prevState,
          [item.id]: !prevState[item.id],
        }));
      } else {
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [focus, vendorId]);

  const renderItemForFirst = ({ item, index }) => {
    const checkExpiration = (creationDate, expirationDays) => {
      const expirationDate = moment(creationDate).add(expirationDays, "days");
      const currentDate = moment();
      return currentDate.isAfter(expirationDate);
    };

    const isExpired = checkExpiration(item.job_post_date, item.job_post_days);

    return (
      <View style={styles.subBodyContainer}>
        <View style={styles.firstSubBodyContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: COLORS.SkyBlue,
              borderRadius: RFValue(2),
              paddingHorizontal: RFValue(12),
              paddingVertical: RFValue(5),
            }}
          >
            <Text
              style={{
                color: COLORS.White,
                fontSize: RFValue(14),
                fontWeight: "bold",
              }}
            >
              {translator("JOBPOST", Language)}
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: COLORS.TextBlack,
                fontSize: RFValue(12),
                fontWeight: "400",
              }}
            >
              {translator("Posted", Language)} :{" "}
              {moment(item.created_at).format("MMMM Do YYYY")}
            </Text>
            <Text
              style={{
                color: COLORS.Red,
                fontSize: RFValue(12),
                fontWeight: "400",
              }}
            >
              {translator("Expires", Language)} :{" "}
              {moment(item.job_post_date)
                .add(item.job_post_days, "days")
                .format("MMMM Do YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.Sprator} />
        <View
          style={[styles.firstSubBodyContainer, { marginTop: RFValue(15) }]}
        >
          <Text
            style={{
              color: COLORS.DarkTextBlack,
              fontSize: RFValue(16),
              fontWeight: "400",
              width: ScreenWidth * 0.45,
            }}
          >
            {translator("JOBID", Language)}
            {`: #${item.renewal_id ? item.renewal_id : "JOB" + item.id}`}
          </Text>
          <View style={styles.BlackSprator} />
          <Text
            style={{
              color: COLORS.Parpul,
              fontSize: RFValue(15),
              fontWeight: "800",
              width: ScreenWidth * 0.35,
              marginLeft: RFValue(10),
            }}
          >
            {item.localilty}
          </Text>
        </View>
        <View style={styles.Sprator} />
        <View
          style={[
            styles.firstSubBodyContainer,
            { marginTop: RFValue(15), flexDirection: "column" },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={IMAGE.Icon}
                style={{
                  resizeMode: "contain",
                  height: RFValue(18),
                  width: RFValue(18),
                }}
              />
              <Text
                style={{
                  color: COLORS.DarkTextBlack,
                  fontSize: RFValue(12),
                  fontWeight: "400",
                  marginLeft: RFValue(10),
                }}
              >
                {translator("JobTitle", Language)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => toggleCheckbox(item, index)}
                activeOpacity={0.5}
                style={{
                  height: RFValue(15),
                  width: RFValue(15),
                  backgroundColor: COLORS.SperatorColor,
                  borderRadius: RFValue(2),
                  marginRight: RFValue(4),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.PrimaryColor,
                    fontSize: RFValue(12),
                    fontWeight: "bold",
                  }}
                >
                  {checkedItems[item.id] ? "X" : ""}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.PrimaryColor,
                  fontSize: RFValue(10),
                }}
              >
                {checkedItems[item.id]
                  ? "Notifications Enabled"
                  : "Notifications Disabled"}
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: COLORS.Black,
              fontSize: RFValue(15),
              fontWeight: "400",
              marginTop: RFValue(4),
              width: "100%",
            }}
          >
            {item?.job_title}
          </Text>
          <Text
            style={{
              color: COLORS.Black,
              fontSize: RFValue(15),
              fontWeight: "400",
              marginTop: RFValue(4),
              width: "100%",
            }}
          >
            {translator("Message", Language)}: {item?.message}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: RFValue(10),
            paddingHorizontal: RFValue(15),
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.ViewJobPost, { MainItem: item.id })
            }
            style={{
              backgroundColor: COLORS.PrimaryColor,
              paddingHorizontal: RFValue(15),
              paddingVertical: RFValue(4),
              borderRadius: RFValue(4),
            }}
          >
            <Text
              style={{
                color: COLORS.White,
                fontSize: RFValue(12),
                fontWeight: "bold",
              }}
            >
              {translator("ViewDetails", Language)}
            </Text>
          </TouchableOpacity>
          {item?.status != 0 && (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(SCREENS.PostJob, { MainItem: item })
                }
                style={{
                  backgroundColor: isExpired ? COLORS.Red : COLORS.PrimaryColor,
                  paddingHorizontal: RFValue(15),
                  paddingVertical: RFValue(4),
                  borderRadius: RFValue(4),
                }}
              >
                <Text
                  style={{
                    color: COLORS.White,
                    fontSize: RFValue(12),
                    fontWeight: "bold",
                  }}
                >
                  {translator("Renew", Language)}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {item?.status == 0 && (
            <>
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.Red,
                  fontSize: RFValue(14),
                }}
              >
                {"Job Closed"}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  };

  const EmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: ScreenHeight * 0.35,
        }}
      >
        <Text
          style={{
            fontSize: RFValue(16),
            fontWeight: "500",
            color: COLORS.PrimaryColor,
          }}
        >
          No results found
        </Text>
      </View>
    );
  };

  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to your storage to download the file",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile();
        } else {
          Alert.alert(
            "Permission Denied",
            "Storage permission is required to download the file."
          );
        }
      } else {
        downloadFile();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const date = new Date();
    const fileName = `File-${Math.floor(
      date.getTime() + date.getSeconds() / 2
    )}.pdf`;
    const path = `${fs.dirs.DownloadDir}/${fileName}`;
    console.log("Download Path:", path);

    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        description: "Downloading file.",
      },
    })
      .fetch("GET", "https://www.orimi.com/pdf-test.pdf")
      .then((res) => {
        console.log("File downloaded to:", res.path());
        Alert.alert("Success", "File downloaded successfully");
      })
      .catch((error) => {
        console.error("Download error:", error);
        Alert.alert("Error", "An error occurred while downloading the file");
      });
  };

  const viewPDF = (url) => {
    console.log(url);
    const pdfUri = url; // Replace with your PDF URL
    navigation.navigate("ViewPdf", { pdfUri });
  };

  const renderItemForSecond = ({ item }) => (
    <View style={styles.item}>
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREENS.ViewJobPost, {
              MainItem: item.job_post_id,
            })
          }
          style={styles.jobIdContainer}
        >
          <Text style={styles.jobId}>
            Applied For {translator("JOBID", Language)}: {item.job_post_id}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textStyle}>
        {" "}
        <Text style={{ fontWeight: "bold" }}>
          {translator("CandidateName", Language)}{" "}
        </Text>
        : {item.name}
      </Text>
      <Text style={styles.textStyle}>
        {" "}
        <Text style={{ fontWeight: "bold" }}>
          {translator("MobileNumber", Language)}
        </Text>
        : {item?.mobile_number}
      </Text>
      <View style={styles.cityAndLandmarkContainer}>
        <Text style={styles.textStyle}>
          <Text style={{ fontWeight: "bold" }}>
            {translator("City", Language)}
          </Text>
          : {item?.city_name}
        </Text>
        {item?.landmark && (
          <>
            <Text style={{ marginHorizontal: 5 }}> , </Text>
            <Text style={styles.landmarkText}>
              {translator("Landmark", Language)}: {item.landmark}
            </Text>
          </>
        )}
      </View>
      <Text style={styles.textStyle}>
        {" "}
        <Text style={{ fontWeight: "bold" }}>
          {translator("State", Language)}
        </Text>
        : {item?.state_name}
      </Text>
      <Text style={styles.textStyle}>
        {" "}
        <Text style={{ fontWeight: "bold" }}>
          {translator("Message", Language)}
        </Text>
        : {item?.message}
      </Text>
      <Text style={styles.textStyle}>
        {" "}
        <Text style={{ fontWeight: "bold" }}>
          {translator("JobTitle", Language)}
        </Text>
        : {item?.job_title}
      </Text>
      <Text style={styles.textStyle}>
        {" "}
        <Text style={{ fontWeight: "bold" }}>
          {translator("JobType", Language)}
        </Text>
        : {item?.job_type}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREENS.ViewCandidateDetails, {
            MainItem: item.id,
          })
        }
      >
        <Text
          style={{
            color: COLORS.SkyBlue,
            fontSize: RFValue(12),
            paddingLeft: RFValue(4),
            fontWeight: "bold",
          }}
        >
          {translator("ViewDetails", Language)}
        </Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        <Text style={{ fontWeight: "bold" }}>
          {translator("Resume", Language)}
        </Text>
        :<Text> </Text>
        <TouchableOpacity
          onPress={() => viewPDF(item.resume)}
          activeOpacity={0.5}
          style={{
            backgroundColor: COLORS.Black,
            borderRadius: RFValue(4),
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.White,
              paddingHorizontal: RFValue(16),
              paddingVertical: RFValue(8),
            }}
          >
            {translator("DownloadResume", Language)}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );

  return (
    <View style={styles.mainBody}>
      <OnBordingHeader label={"MyJobs"} Back={false} isMyJob={true} />

      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.White,
          justifyContent: "space-between",
          borderRadius: RFValue(8),
        }}
      >
        <TouchableOpacity
          onPress={() => setscreenState(0)}
          style={{ padding: RFValue(15) }}
        >
          <Text
            style={{
              color:
                screenState === 0
                  ? COLORS.PrimaryColor
                  : COLORS.extraLightBlack,
              fontSize: RFValue(15),
              fontFamily: FONTS.ExtraBold,
              fontWeight: "bold",
            }}
          >
            {translator("JOBPOST", Language)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setscreenState(1)}
          style={{ padding: RFValue(15) }}
        >
          <Text
            style={{
              color:
                screenState === 1
                  ? COLORS.PrimaryColor
                  : COLORS.extraLightBlack,
              fontSize: RFValue(15),
              fontFamily: FONTS.ExtraBold,
              fontWeight: "bold",
            }}
          >
            {translator("AvailableCandidates", Language)}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.White,
          justifyContent: "space-between",
          borderRadius: RFValue(8),
        }}
      >
        {screenState === 0 && (
          <View
            style={{
              flex: 0.38,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: RFValue(5),
                width: RFValue(87),
                backgroundColor: COLORS.PrimaryColor,
              }}
            />
          </View>
        )}
        {screenState === 1 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: ScreenWidth * 0.58,
            }}
          >
            <View
              style={{
                height: RFValue(5),
                width: RFValue(87),
                backgroundColor: COLORS.PrimaryColor,
              }}
            />
          </View>
        )}
      </View>
      {!isLoading ? (
        screenState === 0 ? (
          <FlatList
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            data={mainDataForFirst}
            renderItem={renderItemForFirst}
            ListEmptyComponent={EmptyComponent}
          />
        ) : (
          <>
            <View style={styles.container}>
              {mainDataForSecond && mainDataForSecond.length > 0 ? (
                <FlatList
                  data={mainDataForSecond}
                  renderItem={renderItemForSecond}
                  keyExtractor={(item) => item.id.toString()}
                />
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.Black,
                paddingVertical: height * 0.014,
                borderRadius: width * 0.02,
                margin: RFValue(20),
                zIndex: -1,
              }}
              onPress={() => {
                navigation.navigate(SCREENS.CandidatesMatchingScreen);
              }}
            >
              <View>
                <Text
                  style={{
                    color: COLORS.White,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {translator("TotalAvailableCandidates", Language)}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )
      ) : (
        <Loader />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subBodyContainer: {
    backgroundColor: COLORS.White,
    borderWidth: 1,
    borderColor: COLORS.Gray,
    borderRadius: RFValue(8),
    paddingVertical: RFValue(15),
    marginTop: RFValue(15),
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  firstSubBodyContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(15),
  },
  Sprator: {
    height: 1,
    backgroundColor: COLORS.SperatorColor,
    marginTop: RFValue(15),
  },
  BlackSprator: {
    height: 18,
    width: 3,
    backgroundColor: COLORS.Black,
  },
  secoendListBoxText: {
    color: COLORS.ThemBlue,
    fontSize: RFValue(14),
    fontWeight: "500",
    paddingHorizontal: RFValue(15),
    marginTop: RFValue(2),
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.White,
    justifyContent: "space-between",
    borderRadius: RFValue(8),
  },
  topTabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.White,
    justifyContent: "space-between",
    borderRadius: RFValue(8),
  },
  indicatorContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.White,
    justifyContent: "space-between",
    borderRadius: RFValue(8),
  },
  indicatorLeft: {
    flex: 0.38,
    justifyContent: "center",
    alignItems: "center",
    height: RFValue(5),
    width: RFValue(87),
    backgroundColor: COLORS.PrimaryColor,
    marginLeft: RFValue(15),
  },
  indicatorRight: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RFValue(210),
    height: RFValue(5),
    width: RFValue(120),
    backgroundColor: COLORS.PrimaryColor,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  jobIdContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  jobId: {
    color: "#000",
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 16,
    color: "#000",
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00f",
    marginVertical: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  textStyle: {
    marginVertical: 3,
    color: "#000",
  },
  btn: {
    backgroundColor: COLORS.Black,
    paddingVertical: height * 0.014,
    borderRadius: width * 0.02,
    marginTop: 20,
    zIndex: -1,
  },
  landmarkText: {
    fontWeight: "bold",
    color: "#000",
  },
  cityAndLandmarkContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginVertical: 3,
  },
});
