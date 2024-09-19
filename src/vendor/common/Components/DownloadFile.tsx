import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Linking } from "react-native";
import RNFS from "react-native-fs";

const requestStoragePermission = async ({FileUrl}) => {

  const [downloadProgress, setDownloadProgress] = useState(0);

  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
  .then(async (result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          "This feature is not available (on this device / in this context)"
        );
        break;
      case RESULTS.DENIED:
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
          async () => {
            console.log("-beettttwweeennn-", RNFS.DocumentDirectoryPath);
            // setIsDownloading(true);

            const url = FileUrl; // Replace with your file URL
            const fileName = "File.pdf"; // Replace with your file name
            const destinationPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

            const options = {
              fromUrl: url,
              toFile: destinationPath,
              progress: (res) => {
                const progressPercent =
                  (res.bytesWritten / res.contentLength) * 100;
                setDownloadProgress(Math.floor(progressPercent));
              },
              begin: () => {
                console.log("Download started");
              },
              progressDivider: 1,
            };

            try {
              const downloadResult = await RNFS.downloadFile(options)
                .promise;
              if (downloadResult.statusCode === 200) {
                Alert.alert("Success", "File downloaded successfully");
              } else {
                Alert.alert("Error", "Failed to download file");
              }
            } catch (err) {
              console.error(err);
              Alert.alert(
                "Error",
                "An error occurred while downloading the file"
              );
            }

            // const { config, fs } = RNFetchBlob;
            // const downloads = fs.dirs.DownloadDir;
            // const fileName = "sample.pdf";

            // config({
            //   addAndroidDownloads: {
            //     useDownloadManager: true,
            //     notification: true,
            //     path: `${downloads}/${fileName}`,
            //     description: "Downloading PDF file",
            //   },
            // })
            //   .fetch("GET", FileUrl)
            //   .then((res) => {
            //     Alert.alert(
            //       "Download Success",
            //       "PDF file downloaded successfully."
            //     );
            //     // setIsDownloading(false);
            //   });
            // await launchCamera(Options, response => {
            //   if (response.didCancel) {
            //     console.log('User cancelled camera');
            //   } else if (response.error) {
            //     console.log('Camera Error: ', response.error);
            //   } else {
            //     let imageUri = response.uri || response.assets?.[0];
            //     SetAddProductImageUPLD(imageUri)
            //     console.log('Inside = ', imageUri);
            //   }
            // })
          }
        );
        break;
      case RESULTS.LIMITED:
        console.log("The permission is limited: some actions are possible");
        break;
      case RESULTS.GRANTED:
        console.log("GRANTED");

        console.log("-beettttwweeennn-");
        // setIsDownloading(true


        const url = FileUrl; // Replace with your file URL
        const fileName = "File.pdf"; // Replace with your file name
        const destinationPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

        const options = {
          fromUrl: url,
          toFile: destinationPath,
          progress: (res) => {
            const progressPercent =
              (res.bytesWritten / res.contentLength) * 100;
            setDownloadProgress(Math.floor(progressPercent));
          },
          begin: () => {
            console.log("Download started");
          },
          progressDivider: 1,
        };

        try {
          const downloadResult = await RNFS.downloadFile(options)
            .promise;
          if (downloadResult.statusCode === 200) {
            Alert.alert("Success", "File downloaded successfully");
          } else {
            Alert.alert("Error", "Failed to download file");
          }
        } catch (err) {
          console.error(err);
          Alert.alert(
            "Error",
            "An error occurred while downloading the file"
          );
        }


        // await launchCamera(Options, response => {
        //   if (response.didCancel) {
        //     console.log('User cancelled camera');
        //   } else if (response.error) {
        //     console.log('Camera Error: ', response.error);
        //   } else {
        //     let imageUri = response.uri || response.assets?.[0];
        //     SetAddProductImageUPLD(imageUri)
        //     console.log('Inside = ', imageUri);
        //   }
        // })
        break;
      case RESULTS.BLOCKED:
        console.log("The permission is denied and not requestable anymore");
        break;
    }
  })
  .catch((error) => {
    console.log("Inside Errorjj", error);
  });
  // if (Platform.OS === "android") {
  //   const status = await check(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
  //   if (status === RESULTS.GRANTED) {
  //     return true;
  //   }

  //   const result = await request(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
  //   if (result === RESULTS.GRANTED) {
  //     return true;
  //   }

  //   Alert.alert(
  //     "Permission Required",
  //     "Storage permission is required to download files. Please grant the permission in the app settings.",
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       { text: "Open Settings", onPress: () => Linking.openSettings() },
  //     ]
  //   );
  //   return false;
  // }
  // return true; // iOS doesn't require explicit storage permission for downloads.
};

const DownloadFile = async ({ FileUrl }) => {
  requestStoragePermission({FileUrl})
  // if (Platform.OS === "android") {
  //   const granted = await requestStoragePermission();
  //   if (!granted) {
  //     return;
  //   }
  }

  // setIsDownloading(true);

  // const { config, fs } = RNFetchBlob;
  // const downloads = fs.dirs.DownloadDir;
  // const fileName = "sample.pdf";

  // config({
  //   addAndroidDownloads: {
  //     useDownloadManager: true,
  //     notification: true,
  //     path: `${downloads}/${fileName}`,
  //     description: "Downloading PDF file",
  //   },
  // })
  //   .fetch("GET", FileUrl)
  //   .then((res) => {
  //     Alert.alert("Download Success", "PDF file downloaded successfully.");
  //     // setIsDownloading(false);
  //   })
  //   .catch((errorMessage, statusCode) => {
  //     Alert.alert("Download Failed", "Failed to download PDF file.");
  //     // setIsDownloading(false);
  //   });
// };

export default DownloadFile;
