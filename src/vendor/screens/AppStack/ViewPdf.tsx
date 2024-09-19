import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';

const ViewPdf = ({ route }) => {
  const { pdfUri } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfUri}` }}
        style={styles.webView}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ViewPdf;
