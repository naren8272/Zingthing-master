import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../common/Utils/Colors";
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import { IMAGE } from "../../common/Utils/image";
import { RFValue } from "react-native-responsive-fontsize";
import { FONTS } from "../../common/Utils/fonts";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import RNFS from "react-native-fs";
import RazorpayCheckout from "react-native-razorpay";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Linking } from "react-native";
import moment from "moment";
import { translator } from "../../localization/I18n";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";

// Define types for the state and props
interface NewsFeedItem {
  create_date: string;
  expire_date: string;
  status: string;
  document: string;
  total_views: number;
}

export default function NewsFeed() {
  const [screenState, setscreenState] = useState<number>(0);
  const [documentPath, setdocumentPath] = useState<string>("");
  const [mainData, setMainData] = useState<NewsFeedItem[]>([]);
  const ScreenHeight = Dimensions.get("screen").height;
  const ScreenWidth = Dimensions.get("screen").width;
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const { Language } = useContext(ContextProvider) as {
    Language: string;
    SetLanguage: (lang: string) => void;
  };

  const handlePayment = () => {
    const options = {
      description: "Credits towards consultation",
      image: "https://zingthing.in/frontend_theme/assets/images/logo.png",
      currency: "INR",
      key: "rzp_test_1Y0isRtUawGbne", // Your API key
      amount: 100, // Amount in paise
      name: "ZingThing",
      prefill: {
        email: "example@razorpay.com",
        contact: "1234567890",
        name: "Razorpay User",
      },
      theme: { color: COLORS.PrimaryColor },
    };
    RazorpayCheckout.open(options)
      .then(() => {
        pickDocument();
      })
      .catch(() => {
        Alert.alert("Alert", `Something Wen't Wrong`);
      });
  };

  const requestStoragePermission = async ({ FileUrl }: { FileUrl: string }) => {
    try {
      const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        downloadFile(FileUrl);
      } else if (result === RESULTS.DENIED) {
        const requestResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        );
        if (requestResult === RESULTS.GRANTED) {
          downloadFile(FileUrl);
        } else {
          Alert.alert(
            "Permission Required",
            "Storage permission is required to download files. Please grant the permission in the app settings.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: () => Linking.openSettings() },
            ]
          );
        }
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          "Permission Blocked",
          "Storage permission is blocked. Please enable it in the app settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      console.log("Permission Error:", error);
    }
  };

  const downloadFile = async (FileUrl: string) => {
    const fileName = "File.pdf"; // Replace with your file name
    const destinationPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    const options = {
      fromUrl: FileUrl,
      toFile: destinationPath,
      progress: (res: { bytesWritten: number; contentLength: number }) => {
        const progressPercent = (res.bytesWritten / res.contentLength) * 100;
        setDownloadProgress(Math.floor(progressPercent));
      },
      begin: () => {
        console.log("Download started");
      },
      progressDivider: 1,
    };

    try {
      const downloadResult = await RNFS.downloadFile(options).promise;
      if (downloadResult.statusCode === 200) {
        Alert.alert("Success", "File downloaded successfully");
      } else {
        Alert.alert("Error", "Failed to download file");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "An error occurred while downloading the file");
    }
  };

  const pickDocument = async () => {
    try {
      const res: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });

      if (res && res[0]?.uri) {
        const path = await copyDocumentToAppDirectory(res[0]);
        console.log("--object--", res, path);
        setdocumentPath(path);
        postData(res[0], path);
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

  const copyDocumentToAppDirectory = async (
    document: DocumentPickerResponse
  ) => {
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://zingthing-app.ptechwebs.com/api/newsfeeds-list/1"
      );
      const json = await response.json();
      const reversedData = [...json.data].reverse();
      setMainData(reversedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postData = async (data: DocumentPickerResponse, path: string) => {
    try {
      const Fdata = new FormData();
      Fdata.append("document", {
        uri: data.uri,
        type: data.type,
        name: data.name,
      });
      Fdata.append("vendor_id", "1");
      Fdata.append("create_date", moment().format("DD/MM/YYYY"));
      Fdata.append("expire_date", moment().add(1, "days").format("DD/MM/YYYY"));
      Fdata.append("paid", "Yes");
      Fdata.append("news_feeds_subscription_id", "1");

      const response = await fetch(
        "https://zingthing-app.ptechwebs.com/api/newsfeeds-add",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: Fdata,
        }
      );

      if (!response.ok) {
        console.log("ERROR: ", response);
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log("object", json);
      fetchData();
      setscreenState(1);
    } catch (error) {
      console.log("--error--", error);
      Alert.alert("Error", JSON.stringify(error));
    }
  };

  const renderItem = ({ item }: { item: NewsFeedItem }) => (
    <View style={styles.feedItem}>
      <Text style={styles.feedText}>
        {translator("NewsFeedPosted", Language)} : {item.create_date}
      </Text>
      <Text style={styles.feedText}>
        {translator("NewsFeedExpires", Language)} : {item.expire_date}
      </Text>
      <Text style={styles.feedText}>
        {translator("Status", Language)} :
        <Text
          style={{
            color: item.status === "active" ? "green" : "red",
            textTransform: "uppercase",
          }}
        >
          {item.status}
        </Text>
      </Text>
      <TouchableOpacity
        onPress={() => requestStoragePermission({ FileUrl: item.document })}
        activeOpacity={0.7}
        style={styles.downloadButton}
      >
        <Text style={{ color: COLORS.White }}>Download PDF</Text>
      </TouchableOpacity>
      <View style={styles.viewCountContainer}>
        <Text style={styles.viewCountText}>
          {translator("TotalViews", Language)} : {item?.total_views}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainBody}>
      <OnBordingHeader label={"AddNewsFeed"} Back={false} />
      <ImageBackground
        source={IMAGE.BackgroundImg}
        resizeMode="contain"
        style={styles.backgroundImage}
      >
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setscreenState(0)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                screenState === 0 && styles.activeTabText,
              ]}
            >
              {translator("PostNewFeed", Language)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setscreenState(1)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                screenState === 1 && styles.activeTabText,
              ]}
            >
              {translator("ViewExistingFeed", Language)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activeTabIndicatorContainer}>
          {screenState === 0 && <View style={styles.activeTabIndicatorLeft} />}
          {screenState === 1 && <View style={styles.activeTabIndicatorRight} />}
        </View>
        {screenState === 0 ? (
          <View style={styles.uploadContainer}>
            <TouchableOpacity
              onPress={handlePayment}
              activeOpacity={0.7}
              style={styles.uploadButton}
            >
              <Text style={{ color: COLORS.White }}>
                {translator("UploadPDF", Language)}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ marginTop: RFValue(15) }}
            showsVerticalScrollIndicator={false}
            data={mainData}
            renderItem={renderItem}
          />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: RFValue(15),
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.White,
    justifyContent: "space-between",
    borderRadius: RFValue(8),
  },
  tabButton: {
    padding: RFValue(15),
  },
  tabText: {
    color: COLORS.extraLightBlack,
    fontSize: RFValue(15),
    fontFamily: FONTS.ExtraBold,
    fontWeight: "bold",
  },
  activeTabText: {
    color: COLORS.PrimaryColor,
  },
  activeTabIndicatorContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.White,
    justifyContent: "space-between",
    borderRadius: RFValue(8),
  },
  activeTabIndicatorLeft: {
    flex: 0.38,
    justifyContent: "center",
    alignItems: "center",
    height: RFValue(5),
    width: RFValue(87),
    backgroundColor: COLORS.PrimaryColor,
  },
  activeTabIndicatorRight: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Dimensions.get("window").width * 0.58,
    height: RFValue(5),
    width: RFValue(87),
    backgroundColor: COLORS.PrimaryColor,
  },
  uploadContainer: {
    backgroundColor: COLORS.White,
    width: Dimensions.get("window").width - 30,
    height: RFValue(420),
    marginTop: RFValue(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(8),
  },
  uploadButton: {
    backgroundColor: COLORS.Black,
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(8),
  },
  feedItem: {
    backgroundColor: COLORS.White,
    borderRadius: RFValue(2),
    padding: RFValue(15),
    marginTop: RFValue(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  feedText: {
    fontSize: RFValue(15),
    color: "#4B4E6380",
    fontWeight: "bold",
    marginTop: RFValue(10),
  },
  downloadButton: {
    backgroundColor: COLORS.Black,
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(8),
    marginTop: RFValue(20),
    width: RFValue(118),
  },
  viewCountContainer: {
    width: Dimensions.get("window").width - 60,
    alignItems: "flex-end",
  },
  viewCountText: {
    color: "#F58D3A",
    fontWeight: "bold",
  },
});
