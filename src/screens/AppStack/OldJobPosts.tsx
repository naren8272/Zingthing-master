import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  Settings,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { COLORS } from "../../common/Utils/Colors";
import AuthHeader from "../../common/Components/AuthHeader";
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import { IMAGE } from "../../common/Utils/image";
import { RFValue } from "react-native-responsive-fontsize";
import { FONTS } from "../../common/Utils/fonts";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import DownloadFile from "../../common/Components/DownloadFile";
import RazorpayCheckout from "react-native-razorpay";
import RNFetchBlob from "rn-fetch-blob";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Linking } from "react-native";
import { SCREENS } from "../../common/Utils/screenName";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { translator } from "../../localization/I18n";
import { ContextProvider } from "../StateManagment/StateManagment";
import moment from "moment";
import { CustomerContext, FCMContext } from "../../../App";

export default function OldJobPosts() {
  const [screenState, setscreenState] = useState(0);
  const [documentPath, setdocumentPath] = useState("");
  const [CheckIndex, SetCheckIndex] = useState([]);
  const [mainData, setMainData] = useState([]);
  const ScreenHeight = Dimensions.get("screen").height;
  const ScreenWidth = Dimensions.get("screen").width;
  const { Language, SetLanguage } = useContext(ContextProvider);
  const navigation = useNavigation();
  const [checkedItems, setCheckedItems] = useState({});
  const customerId = useContext(CustomerContext);
  const fcmToken = useContext(FCMContext);
  const focus = useIsFocused();
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://zingthing-app.ptechwebs.com/api/jobpost-search-list/" +
          customerId
      );
      const json = await response.json();
      console.log(json);
      const reversedData = [...json.data].reverse();

      // Preload the checkedItems state with notification statuses
      const initialCheckedItems = reversedData.reduce((acc, item) => {
        if (Number(item.notification) === 1) {
          // Convert to number before comparison
          acc[item.id] = 1;
        } else {
          acc[item.id] = 0;
        }
        return acc;
      }, {});

      setCheckedItems(initialCheckedItems);
      setMainData(reversedData);
    } catch (error) {
      // setError(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [focus]);

  const toggleCheckbox = async (item, index) => {
    // Determine the new notification status based on the current state
    const currentCheckedState = checkedItems[item.id] || false;
    const newNotificationStatus = currentCheckedState ? 0 : 1; // Toggle between 0 and 1

    const dataForEncode = {
      notification: newNotificationStatus,
    };
    const UrlEncodedData = new URLSearchParams(dataForEncode);

    try {
      const response = await fetch(
        `https://zingthing-app.ptechwebs.com/api/jobpost-search-notificationt-update/${item.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: UrlEncodedData.toString(),
        }
      );
      console.log(response);
      if (response.ok) {
        if (!newNotificationStatus) {
          var formData = new FormData();
          formData.append("topic", "SEARCH" + item.id);
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
        } else {
          var formData = new FormData();
          formData.append("topic", "SEARCH" + item.id);
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
        }
        //     // Update the state with the new checked status
        setCheckedItems((prevState) => ({
          ...prevState,
          [item.id]: !prevState[item.id], // Toggle the state
        }));
      } else {
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    const isNotificationEnabled = item.notification === "1";
    return (
      // item.map((ele)=>{
      //   return(
      <View
        style={{
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
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: RFValue(15),
            paddingVertical: RFValue(10),
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: COLORS.DarkPrimeryColor,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ color: COLORS.Orange, fontWeight: "bold" }}>
                {translator("JobPostId", Language)} :{" "}
                {`#${item.renewal_id ? item.renewal_id : "JOB" + item.id}`}
              </Text>
              <Text
                style={{
                  color: COLORS.Red,
                  fontWeight: "500",
                  fontSize: RFValue(8),
                  marginTop: RFValue(2),
                }}
              >
                {translator("ExpiresIn", Language)} :{" "}
                {moment(item.job_search_date)
                  .add(item.job_search_days, "days")
                  .format("MMMM Do YYYY")}
              </Text>
            </View>
          </View>
          {moment().diff(moment(item.job_search_date), "days") <= 2 && (
            <View
              style={{
                backgroundColor: COLORS.ButtonPurpal,
                paddingHorizontal: 8,
                paddingVertical: RFValue(4),
                borderRadius: RFValue(4),
              }}
            >
              <Text style={{ fontSize: RFValue(10), color: COLORS.White }}>
                {translator("PostedRecently", Language)}
              </Text>
            </View>
          )}
        </View>
        <View style={{ padding: RFValue(15) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(12),
                width: RFValue(100),
              }}
            >
              {translator("JobTitle", Language)} :
            </Text>
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(9),
                width: RFValue(170),
              }}
            >
              {item.job_title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: RFValue(10),
            }}
          >
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(12),
                width: RFValue(100),
              }}
            >
              {translator("JobType", Language)} :
            </Text>
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(9),
                width: RFValue(170),
              }}
            >
              {item.job_type}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: RFValue(10),
            }}
          >
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(12),
                width: RFValue(100),
              }}
            >
              {translator("Message", Language)} :
            </Text>
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(9),
                width: RFValue(170),
                fontWeight: "bold",
              }}
            >
              {item.message}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: RFValue(10),
            }}
          >
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(12),
                width: RFValue(100),
              }}
            >
              {translator("JobPostedDate", Language)} :
            </Text>
            <Text
              style={{
                color: COLORS.Black,
                fontSize: RFValue(9),
              }}
            >
              {item.job_search_date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: RFValue(10),
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(SCREENS.ViewJobSearch, {
                  NavData: item,
                })
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.Orange,
                  fontSize: RFValue(10),
                  textAlign: "center",
                  marginTop: RFValue(3),
                }}
              >
                {translator("ViewDetails", Language)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
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
              {checkedItems[item.id] ? (
                <View
                  style={{
                    alignSelf: "center",
                    height: RFValue(8),
                    width: RFValue(8),
                    borderRadius: RFValue(8),
                    backgroundColor: COLORS.Orange,
                  }}
                />
              ) : null}
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.Black,
                fontSize: RFValue(10),
              }}
            >
              {checkedItems[item.id]
                ? "Notifications Enabled"
                : "Notifications Disabled"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.PostJob, {
                NavData: item,
              })
            }
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Number(item?.status) === 1 ? COLORS.Orange : "red",
                fontSize: RFValue(10),
                textAlign: "center",
                marginTop: RFValue(3),
              }}
            >
              {Number(item.status) === 1
                ? translator("Renew", Language)
                : translator("JobClosed", Language)}
            </Text>
            {/* <Text
              style={{
                fontWeight: "bold",
                color: COLORS.Orange,
                fontSize: RFValue(10),
                textAlign: "center",
                marginTop: RFValue(3),
              }}
            >
              {translator("Renew", Language)}
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
      // )
      // })
    );
  };

  return (
    <View style={styles.mainBody}>
      <View>
        <OnBordingHeader label={"OldJobSeaches"} Back={true} />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: RFValue(15),
        }}
      >
        <FlatList
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          data={mainData}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: COLORS.PrimeryColor,
  },
});
