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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "../../../apis/api";
import useAuthState from "../../../store/AuthState";

const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  mobile: z.string().regex(/^\d{1,10}$/, {
    message: "Invalid phone number. It should be in international format.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Employee", "Job Seeker"]),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;

const SignUpForm = () => {
  const navigation = useNavigation();
  const [isSendOtp, setIsSendOtp] = useState(false);
  const setUser = useAuthState((state) => state.setUser);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate: SendOtp } = useMutation({
    mutationKey: ["sendOtpSignUp"],
    mutationFn: (mobile: string) => api.sendOtp(mobile),
    onSuccess: (data) => {
      Alert.alert("OTP has been sent");
      setIsSendOtp(true);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const { mutate: registerUser } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterFormType) => api.register(data),
    onSuccess: (data) => {
      setUser(data.data);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const onSubmit = (data: RegisterFormType) => {
    registerUser(data);
  };

  return (
    <View className="justify-between w-full">
      <View className="gap-5">
        <View>
          <Text className="text-xl text-black"  style = {{fontSize: 24,fontWeight : 700}}>Create an Account</Text>
          <Text className="text-gray-500"  style = {{fontSize: 17}}>
            Please fill registration form below
          </Text>
        </View>
        <TextInput
          mode="outlined"
          placeholder="Full Name"
          value={watch("name")}
          onChangeText={(text) => setValue("name", text)}
          className="border-gray-50"
          disabled={isSendOtp}
          outlineStyle={{ borderRadius: 50 }}
        />
        <View>
          <TextInput
            mode="outlined"
            placeholder="Email Id"
            value={watch("email")}
            onChangeText={(text) =>
              setValue("email", text, { shouldValidate: true })
            }
            error={!!errors.email?.message}
            className="border-gray-50"
            disabled={isSendOtp}
            outlineStyle={{ borderRadius: 50 }}
          />
          {<Text className="text-red-500">{errors.email?.message}</Text>}
        </View>
        <View>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            disabled={isSendOtp}
            placeholder="Mobile Number"
            className="border-gray-50"
            outlineStyle={{ borderRadius: 50 }}
            value={watch("mobile")}
            onChangeText={(text) =>{
              const numericValue = text.replace(/[^0-9]/g, "");
              setValue("mobile", numericValue, { shouldValidate: true })}
            }
          />
          <Text className="text-red-500">{errors.mobile?.message}</Text>
        </View>
        <TouchableOpacity
          className="self-end"
          disabled={isSendOtp}
          onPress={() => {
            SendOtp(watch("mobile"));
          }}
        >
          <Text
            className="font-bold"
            style={{ color: isSendOtp ? COLORS.Gray : COLORS.DeepPurple }}
          >
            verify
          </Text>
        </TouchableOpacity>
        <OtpInput
          numberOfDigits={6}
          disabled={!isSendOtp}
          autoFocus={false}
          theme={{
            pinCodeContainerStyle: {
              width: 40,
              height: 40,
              borderColor : COLORS.Gray
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
          disabled={!isSendOtp}
          value={watch("password")}
          onChangeText={(text) => setValue("password", text)}
        />
        <View>
          <Text className="mb-2 font-bold" style = {{fontSize: 17}}>Choose Role</Text>
          <View className="flex-row ">
            <View className="flex-row  justify-center items-center">
              <CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={watch("role") === "Job Seeker"}
                onPress={() => setValue("role", "Job Seeker")}
              />
              <Image
                source={IMAGE.JonSeeker}
                width={20}
                height={20}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <View className="flex-row  justify-center items-center">
              <CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={watch("role") === "Employee"}
                onPress={() => setValue("role", "Employee")}
              />
              <Image
                source={IMAGE.Employee}
                width={20}
                height={20}
                style={{ width: 80, height: 80 }}
              />
            </View>
          </View>
        </View>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          disabled={!isSendOtp}
          className="mt-10"
          contentStyle={{
            borderRadius: 50,
            backgroundColor: COLORS.btnV1,
          }}
          labelStyle={{
            color : COLORS.BtnextColor,
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          CREATE
        </Button>
      </View>
    </View>
  );
};

export default SignUpForm;
