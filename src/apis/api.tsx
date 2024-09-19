import { ForgotPasswordFormType } from "../common/Components/ForgotPasswordForm";
import { LoginFormType } from "../common/Components/LoginForm";
import { RegisterFormType } from "../common/Components/SingUpForm";
import apiClient from "./Apiclient";

const login = async (data: LoginFormType) => {
  const res = await apiClient.post("/login", data);
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  return res.data;
};

const sendOtp = async (mobile: string) => {
  const res = await apiClient.post("/sentOtp", {
    mobile: mobile,
  });
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  return res.data;
};
const register = async (data: RegisterFormType) => {
  const res = await apiClient.post("/signup", data);
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  return res.data;
};

const sendOtpForForgotPassword = async (mobile: string) => {
  const res = await apiClient.post("/sentOtpForForgetPass", {
    mobile: mobile,
  });
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  return res.data;
};
const resetPassword = async (data: ForgotPasswordFormType) => {
  const res = await apiClient.post("/UpdateChangePassword", data);
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  return res.data;
};

export default {
  login,
  sendOtp,
  register,
  sendOtpForForgotPassword,
  resetPassword,
};
