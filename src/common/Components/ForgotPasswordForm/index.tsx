import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { Button, TextInput } from "react-native-paper";
import PasswordField from "../PasswordInput";
import { CheckBox } from "react-native-elements";
import { COLORS } from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { OtpInput } from "react-native-otp-entry";
import { IMAGE } from "../../Utils/image";
import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import api from "../../../apis/api";
import { SCREENS } from "../../Utils/screenName";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 characters")
    .max(10, "Mobile number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const navigation = useNavigation();
  const [isOtpSend, setIsOtpSend] = useState(false);
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: SendOtp } = useMutation({
    mutationKey: ["sendOtpSignUp"],
    mutationFn: (mobile: string) => api.sendOtpForForgotPassword(mobile),
    onSuccess: (data) => {
      Alert.alert("OTP has been sent");
      setIsOtpSend(true);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const { mutate: resetPassword } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (data: ForgotPasswordFormType) => api.resetPassword(data),
    onSuccess: (data) => {
      Alert.alert(data.message);
      navigation.navigate(SCREENS.LoginScreen);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const onSubmit = (data: ForgotPasswordFormType) => {
    resetPassword(data);
  };

  return (
    <View className="justify-between w-full">
      <View className="gap-5">
        <View>
          <Text className="text-xl text-black">Forget Password</Text>
          <Text className="text-gray-500">
            For Forget your password please enter your mobile number
          </Text>
        </View>
        <TextInput
          mode="outlined"
          keyboardType="numeric"
          placeholder="Mobile Number"
          className="border-gray-50"
          disabled={isOtpSend}
          outlineStyle={{ borderRadius: 50 }}
          onChangeText={(text) =>
            setValue("mobile", text, { shouldValidate: true })
          }
          value={watch("mobile")}
        />
        <Text className="text-red-500">{errors.mobile?.message}</Text>
        <TouchableOpacity
          className="self-end"
          disabled={isOtpSend}
          onPress={() => SendOtp(watch("mobile"))}
        >
          <Text
            className="font-bold"
            style={{ color: isOtpSend ? COLORS.Gray : COLORS.DeepGreen }}
          >
            verify
          </Text>
        </TouchableOpacity>
        <OtpInput
          numberOfDigits={6}
          disabled={!isOtpSend}
          autoFocus={false}
          theme={{
            pinCodeContainerStyle: {
              width: 40,
              height: 40,
            },
            containerStyle: {
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginLeft: 20,
              marginTop: 10,
            },
          }}
        />
        <PasswordField
          placeholder="New Password"
          disabled={!isOtpSend}
          onChangeText={(text) =>
            setValue("password", text, { shouldValidate: true })
          }
          value={watch("password")}
        />
        <Text className="text-red-500">{errors.password?.message}</Text>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          className="mt-10"
          disabled={!isOtpSend}
          contentStyle={{
            borderRadius: 50,
          }}
        >
          CONTINUE
        </Button>
      </View>
    </View>
  );
};

export default ForgotPasswordForm;
