import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageFlipper from 'react-native-page-flipper';

const ViewPDF = () => {
    return (
    <PageFlipper
      data={[
          'https://up.mangadudes.com/bleach/18/bleach-9337-e60a76a126bc6ecd3211aeaad51a7dba.jpg',
          'https://up.mangadudes.com/bleach/18/bleach-9338-89fcdb98b22c94781ba2846ea2e562c3.jpg',
          'https://up.mangadudes.com/bleach/18/bleach-9339-5d0e73373eb814d65b18bfa4ca533be8.jpg',
          'https://up.mangadudes.com/bleach/18/bleach-9340-c1220292956ae4cc1df0676e2d01c2e1.jpg',
          'https://up.mangadudes.com/bleach/18/bleach-9341-159bcbae27446cd1d6c964b4b70af020.jpg',
          'https://up.mangadudes.com/bleach/18/bleach-9342-024e1db41ff0ea6e6bc47574b209fda4.jpg',
          'https://up.mangadudes.com/bleach/18/bleach-9344-b14e956a08b6998dd00a61f89db84238.jpg',
      ]}
      pageSize={{
        height: 334, // the size of the images I plan to render (used simply to calculate ratio)
        width: 210,
      }}
      portrait={true}
      renderPage={(data) => <Image source={{ uri: data }} style={{ height: '100%', width: '100%' }} />}
    />
  )
}

export default ViewPDF

const styles = StyleSheet.create({})