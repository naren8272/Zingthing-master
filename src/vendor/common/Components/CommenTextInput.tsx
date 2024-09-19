import React, { useRef, useImperativeHandle, forwardRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { IMAGE } from "../Utils/image";
import { COLORS } from "../Utils/Colors";
import { FONTS } from "../Utils/fonts";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const CommonTextInput = forwardRef(
  (
    {
      mainContainerStye,
      placeholder,
      value,
      onChangeText,
      textInputStyle,
      mainIcon,
      isPassword = false,
      onSubmitEditing,
      returnKeyType,
      keyboardType,
      autoCapitalize
    },
    ref
  ) => {
    const textInputRef = useRef(null);

    const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      },
    }));

    return (
      <View style={[styles.inputContainer, mainContainerStye]}>
      <Image source={mainIcon} style={styles.icon} />
      <TextInput
            ref={textInputRef}
            style={[styles.input, textInputStyle]}
            placeholder={placeholder}
            value={value.toString()}
            onChangeText={onChangeText}
            placeholderTextColor={COLORS.Black}
            secureTextEntry={isPassword && passwordVisible}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
      {isPassword && <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
        <Image
          source={
            !passwordVisible
              ? IMAGE.OpenEye
              : IMAGE.ClosedEye
          }
          style={styles.eyeIcon}
        />
      </TouchableOpacity>}
    </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor:COLORS.White,
    width: SCREEN_WIDTH * 0.88,
    marginTop:RFValue(8,SCREEN_HEIGHT),
    borderRadius:RFValue(8),
    height:RFValue(62,SCREEN_HEIGHT),
  },
  icon: {
    width: RFValue(24),
    height: RFValue(24),
    marginHorizontal: RFValue(14),
  },
  input: {
    flex: 1,
    height: RFValue(62,SCREEN_HEIGHT),
    color:COLORS.Black,
    fontFamily:FONTS.Medium,
    fontSize:RFValue(14,SCREEN_HEIGHT),
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  eyeIcon: {
    width: RFValue(24),
    height: RFValue(24),
  },
});

export default CommonTextInput;

