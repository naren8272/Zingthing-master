import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext} from 'react'
import OnBordingHeader from '../../common/Components/OnBordingHeader'
const {width, height} = Dimensions.get('window');
import { translator } from '../../localization/I18n'
import { ContextProvider } from '../StateManagment/StateManagment'

const UploadResume = () => {
  const { Language, SetLanguage } = useContext(ContextProvider);
  return (
    <View style={{flex:1,backgroundColor:'#EFFDFD'}}>
        <View>
        <OnBordingHeader label={'JobID'} Back={true} />
        </View>
    </View>
  )
}

export default UploadResume

const styles = StyleSheet.create({})