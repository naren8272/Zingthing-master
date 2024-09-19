import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import PasswordField from "../PasswordInput";
import { COLORS } from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../Utils/screenName";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "../../../apis/api";
import useAuthState from "../../../store/AuthState/index";
const LoginFormSchema = z.object({
  mobile: z
    .string({ message: "Please enter valid mobile number" })
    .min(10, "Please enter valid mobile number")
    .max(10, "Please enter valid mobile number"),
  password: z.string(),
});
export type LoginFormType = z.infer<typeof LoginFormSchema>;
const LoginForm = () => {
  const navigation = useNavigation();
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { user, setUser } = useAuthState((state) => state);

  const { mutate: login, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormType) => api.login(data),
    onSuccess: (data) => {
      setUser(data.data);
    },
    onError: (error) => {
      console.log(error);
      Alert.alert(error.message);
    },
    onSettled(data, error, variables, context) {
      reset();
    },
  });

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
    login(data);
  };

  return (
    <View className="justify-between w-full">
      <View className="gap-5">
        <View>
          <Text className="text-xl text-black">Sign In</Text>
          <Text className="text-gray-500" style = {{fontSize: 16}}>
            Please sign in to your registered account
          </Text>
        </View>
        <TextInput
          mode="outlined"
          placeholder="Mobile number"
          keyboardType="numeric"
          className="border-gray-50"
          outlineStyle={{ borderRadius: 50 }}
          value={watch("mobile") as any}
          onChangeText={(text) =>
            setValue("mobile", text as any, { shouldValidate: true })
          }
          error={!!errors.mobile?.message}
        />
        {errors.mobile?.message && (
          <Text className="text-red-500">{errors.mobile?.message}</Text>
        )}
        <PasswordField
          placeholder="Password"
          value={watch("password")}
          onChangeText={(text) =>
            setValue("password", text, { shouldValidate: true })
          }
          error={!!errors.password?.message}
        />
        {errors.password?.message && (
          <Text className="text-red-500">{errors.password?.message}</Text>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          contentStyle={{
            borderRadius: 50,
            backgroundColor: COLORS.DeepPurple,
          }}
        >
          LOGIN
        </Button>
        <View className="flex-row gap-2 ">
          <Text style={{ fontSize: 17}}>Forgot your password?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.ForgotPasswordScreen)}
          >
            <Text
              style={{
                color: COLORS.DeepPurple,
                fontWeight: "bold",
                textDecorationLine: "underline",
                fontSize: 17
              }}
            >
              Reset here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-32 ">
        <Button
          mode="contained"
          onPress={() => navigation.navigate(SCREENS.SignUpScreen)}
          contentStyle={{
            borderRadius: 50,
            backgroundColor: COLORS.LightPurple,
          }}
          textColor={COLORS.DeepPurple}
          labelStyle = {{fontSize: 20,fontWeight: "bold",}}
        >
          CREATE ACCOUNT
        </Button>
      </View>
    </View>
  );
};

export default LoginForm;
