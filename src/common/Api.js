import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL,   } from "./Utils/constant";



const Access  = async () => {
  let token = await AsyncStorage.getItem("auth_token");
  console.log("object", token)
  return token;
};

const ApiCall = async (endPoint, Method, headers, params) => {
  console.log("=====================API Call=======================");
  console.log(`APICALL ==>>>`, `${BASE_URL + endPoint}`, {
    method: Method,
    headers: headers,
    ...(params && { body: params }),
  });
  console.log("======================================================");
  return fetch(`${BASE_URL + endPoint}`, {
    method: Method,
    headers: headers,
    ...(params && { body: params }),
  }).then(async (response) => {
    return [await response.json(), response.status];
  }).catch((error) => {
    console.log("Error: ", error);
  });
};

module.exports = {
  async Login(params) {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': Token
    };

    return ApiCall("auth/token/login/", "POST", headers, params);
  },
  async SignUp(params) {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': Token
    };

    return ApiCall("auth/users/", "POST", headers, params);
  },

  async SignUpVerification(params) {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': Token
    };

    return ApiCall("authentication/signup-verification/", "POST", headers, params);
  },

  async LogOut(params) {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': Token
    };

    return ApiCall("auth/token/logout/", "POST", headers, params);
  },

  async GetJobs(params) {
    const token = await AccessToken();
    console.log("token", token)
    let headers = {
      'Accept': 'application/json',
      'Authorization': token
    };

    return ApiCall("recruitment/job/", "GET", headers);
  },

  async GetResume(params) {
    const token = await AccessToken();
    console.log("token", token)
    let headers = {
      'Accept': 'application/json',
      'Authorization': token
    };

    return ApiCall("recruitment/resume/", "GET", headers);
  },

  async PostJobApplication(params) {
    const token = await AccessToken();
    let headers = {
      'Accept': 'application/json',
      'Authorization': token
    };

    return ApiCall("recruitment/job-application/", "POST", headers, params);
  },

  async PostResume(params) {
    const token = await AccessToken();
    let headers = {
      'Accept': 'application/json',
      'Authorization': token
    };

    return ApiCall("recruitment/resume/", "POST", headers, params);
  },
};
