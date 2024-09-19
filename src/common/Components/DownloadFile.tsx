import React from "react";
import { Alert, Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Linking } from "react-native";

const requestStoragePermission = async () => {
  if (Platform.OS === "android") {
    const status = await check(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
    if (status === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      return true;
    }

    Alert.alert(
      "Permission Required",
      "Storage permission is required to download files. Please grant the permission in the app settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
    return false;
  }
  return true; // iOS doesn't require explicit storage permission for downloads.
};

const DownloadFile = async ({ FileUrl }) => {
  if (Platform.OS === "android") {
    const granted = await requestStoragePermission();
    if (!granted) {
      return;
    }
  }

  // setIsDownloading(true);

  const { config, fs } = RNFetchBlob;
  const downloads = fs.dirs.DownloadDir;
  const fileName = "sample.pdf";

  config({
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: `${downloads}/${fileName}`,
      description: "Downloading PDF file",
    },
  })
    .fetch("GET", FileUrl)
    .then((res) => {
      Alert.alert("Download Success", "PDF file downloaded successfully.");
      // setIsDownloading(false);
    })
    .catch((errorMessage, statusCode) => {
      Alert.alert("Download Failed", "Failed to download PDF file.");
      // setIsDownloading(false);
    });
};

export default DownloadFile;
