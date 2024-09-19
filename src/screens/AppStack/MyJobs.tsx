import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState ,useContext} from "react";
import { COLORS } from "../../common/Utils/Colors";
import AuthHeader from "../../common/Components/AuthHeader";
import OnBordingHeader from "../../common/Components/OnBordingHeader";
import { IMAGE } from "../../common/Utils/image";
import { RFValue } from "react-native-responsive-fontsize";
import { FONTS } from "../../common/Utils/fonts";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../common/Utils/screenName";
import moment from "moment";
import { translator } from '../../localization/I18n'
import { ContextProvider } from '../StateManagment/StateManagment'
import { CustomerContext } from "../../../App";

export default function MyJobs() {
  const [screenState, setscreenState] = useState(0);
  const [mainDataForFirst, setMainDataForFirst] = useState([]);
  const [mainDataForSecoend, setMainDataForSecoend] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const ScreenHeight = Dimensions.get("screen").height;
  const ScreenWidth = Dimensions.get("screen").width;
  const navigation = useNavigation();
  const focus = useIsFocused();
  const { Language, SetLanguage } = useContext(ContextProvider)
  const customerId = useContext(CustomerContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        // "https://zingthing-app.ptechwebs.com/api/jobpost/1"
        "https://zingthing-app.ptechwebs.com/api/jobpost-search-list/"+customerId
      );
      const json = await response.json();
      const reversedData = [...json.data].reverse();
      setMainDataForFirst(reversedData);
      console.log("reversedData", reversedData);
    } catch (error) {
      // setError(error);
    } finally {
      // setLoading(false);
    }
    try {
      const response = await fetch(
        // "https://zingthing-app.ptechwebs.com/api/jobpost/1"
        "https://zingthing-app.ptechwebs.com/api/available-candiates-list/1"
      );
      const json = await response.json();

      setMainDataForSecoend(json.data);
    } catch (error) {
      // setError(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [focus]);
  const renderItemForFirst = ({ item }) => {
    const checkExpiration = (creationDate, expirationDays) => {
      const expirationDate = moment(creationDate).add(expirationDays, "days");
      const currentDate = moment();

      return currentDate.isAfter(expirationDate);
    };

    const isExpired = checkExpiration(item.job_post_date, item.job_post_days);

    return (
      <View style={styles.subBodyContainer}>
        <View style={styles.firstSubBodyContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: COLORS.SkyBlue,
              borderRadius: RFValue(2),
              paddingHorizontal: RFValue(12),
              paddingVertical: RFValue(5),
            }}
          >
            <Text
              style={{
                color: COLORS.White,
                fontSize: RFValue(14),
                fontWeight: "bold",
              }}
            >
              {translator("JobPost", Language)}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.TextBlack,
              fontSize: RFValue(12),
              fontWeight: "400",
            }}
          >
            {moment(item.created_at).format("MMMM Do YYYY, h:mmA")}
          </Text>
        </View>
        <View style={styles.Sprator} />
        <View
          style={[styles.firstSubBodyContainer, { marginTop: RFValue(15) }]}
        >
          <Text
            style={{
              color: COLORS.DarkTextBlack,
              fontSize: RFValue(16),
              fontWeight: "400",
              width: ScreenWidth * 0.45,
            }}
          >
            {/* JOB ID: #JOB23984 */}
            {`JOB ID: #JOB${item.id}`}
          </Text>
          <View style={styles.BlackSprator} />
          <Text
            style={{
              color: COLORS.Parpul,
              fontSize: RFValue(15),
              fontWeight: "800",
              width: ScreenWidth * 0.35,
              marginLeft: RFValue(10),
            }}
          >
            {item.localilty}
          </Text>
        </View>
        <View style={styles.Sprator} />
        <View
          style={[styles.firstSubBodyContainer, { marginTop: RFValue(15) }]}
        >
          <View>
            <Text
              style={{
                color: COLORS.DarkTextBlack,
                fontSize: RFValue(12),
                fontWeight: "400",
                width: ScreenWidth * 0.48,
              }}
            >
              {translator("JobStatus", Language)}
            </Text>
            <Text
              style={{
                color: isExpired ? COLORS.Red : COLORS.Green,
                fontSize: RFValue(16),
                fontWeight: "400",
                width: ScreenWidth * 0.48,
              }}
            >
              {isExpired ? "Expired" : "Active"}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.DarkTextBlack,
                fontSize: RFValue(12),
                fontWeight: "400",
                width: ScreenWidth * 0.48,
              }}
            >
              {translator("JobPostRenewal", Language)}
            </Text>
            <Text
              style={{
                color: COLORS.PrimeryColor,
                fontSize: RFValue(16),
                fontWeight: "700",
                width: ScreenWidth * 0.48,
              }}
            >
              {/* ₹ 15.00 */}
              {`₹ ${item.job_post_rupees}`}
            </Text>
          </View>
        </View>
        <View style={styles.Sprator} />
        <View
          style={[
            styles.firstSubBodyContainer,
            { marginTop: RFValue(15), flexDirection: "column" },
          ]}
        >
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Image
              source={IMAGE.Icon}
              style={{
                resizeMode: "contain",
                height: RFValue(18),
                width: RFValue(18),
              }}
            />
            <Text
              style={{
                color: COLORS.DarkTextBlack,
                fontSize: RFValue(12),
                fontWeight: "400",
                marginLeft: RFValue(10),
              }}
            >
              {translator("JobTitle", Language)}
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.Black,
              fontSize: RFValue(15),
              fontWeight: "400",
              marginTop: RFValue(4),
              width: "100%",
            }}
          >
            {/* Hiring a account manager with 2+ yrs exp */}
            {`Hiring a ${item.job_title.toLowerCase()} with ${
              item.experience
            } of exp`}
          </Text>
        </View>
      </View>
    );
  };
  const renderItemForSecoend = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.White,
          borderWidth: 1,
          borderColor: COLORS.Gray,
          borderRadius: RFValue(4),
          marginTop: RFValue(15),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={[styles.secoendListBoxText, { paddingTop: RFValue(8) }]}>
          {translator("CandidateName", Language)} : {item.name}
          </Text>
          <Text style={styles.secoendListBoxText}>Location : {item.city}</Text>
          <Text style={styles.secoendListBoxText}>
          {translator("Experience", Language)} : {(item?.job_posts?.experience).toLowerCase()} of Exp
          </Text>
          <Text
            style={[styles.secoendListBoxText, { paddingBottom: RFValue(8) }]}
          >
            {translator("SalaryExpected", Language)} :{"₹ "}
            {item.job_posts.salary_range
              ? item.job_posts.salary_range
              : "₹ 10000+"}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(SCREENS.JobDetailsScreen, { Job_Id: item.id })
          }
          style={{
            position: "absolute",
            top: RFValue(8),
            right: RFValue(8),
          }}
        >
          <Image
            source={IMAGE.InfoCircle}
            style={{
              resizeMode: "contain",
              height: RFValue(20),
              width: RFValue(20),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(SCREENS.JobDetailsScreen, { Job_Id: item.id })
          }
          style={{
            backgroundColor: COLORS.SkyBlue,
            paddingHorizontal: RFValue(12),
            paddingVertical: RFValue(5),
            position: "absolute",
            bottom: RFValue(0),
            right: RFValue(0),
          }}
        >
          <Text
            style={{
              color: COLORS.White,
              fontSize: RFValue(10),
              fontWeight: "bold",
            }}
          >
           {translator("JobId", Language)} : {item.id}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const EmptyComponent = ({}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: ScreenHeight * 0.35,
        }}
      >
        <Text
          style={{
            fontSize: RFValue(16),
            fontWeight: "500",
            color: COLORS.PrimeryColor,
          }}
        >
          No results found
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainBody}>
      <OnBordingHeader label={"My Jobs"} Back={false} isMyJob={true} />
      <ImageBackground
        source={IMAGE.BackgroundImg}
        resizeMode="contain"
        style={{
          flex: 1,
          paddingHorizontal: RFValue(15),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: COLORS.White,
            justifyContent: "space-between",
            borderRadius: RFValue(8),
          }}
        >
          <TouchableOpacity
            onPress={() => setscreenState(0)}
            style={{ padding: RFValue(15) }}
          >
            <Text
              style={{
                color:
                  screenState == 0
                    ? COLORS.PrimeryColor
                    : COLORS.extraLightBlack,
                fontSize: RFValue(15),
                fontFamily: FONTS.ExtraBold,
                fontWeight: "bold",
              }}
            >
              {"    Job Post"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setscreenState(1)}
            style={{ padding: RFValue(15) }}
          >
            <Text
              style={{
                color:
                  screenState == 1
                    ? COLORS.PrimeryColor
                    : COLORS.extraLightBlack,
                fontSize: RFValue(15),
                fontFamily: FONTS.ExtraBold,
                fontWeight: "bold",
              }}
            >
             {translator("AvailableCandidates", Language)}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: COLORS.White,
            justifyContent: "space-between",
            borderRadius: RFValue(8),
          }}
        >
          {screenState == 0 && (
            <View
              style={{
                flex: 0.38,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: RFValue(5),
                  width: RFValue(87),
                  backgroundColor: COLORS.PrimeryColor,
                }}
              />
            </View>
          )}
          {screenState == 1 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: ScreenWidth * 0.58,
              }}
            >
              <View
                style={{
                  height: RFValue(5),
                  width: RFValue(87),
                  backgroundColor: COLORS.PrimeryColor,
                }}
              />
            </View>
          )}
        </View>
        {screenState == 0 ? (
          <FlatList
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            data={mainDataForFirst}
            renderItem={renderItemForFirst}
            ListEmptyComponent={EmptyComponent}
          />
        ) : (
          <>
            <Text
              style={{
                fontSize: RFValue(17),
                color: COLORS.Gray,
                marginTop: RFValue(10),
                fontWeight: "500",
              }}
            >
              {translator("CanidatesMatchingJobPosts", Language)}
            </Text>
            <FlatList
              contentContainerStyle={{
                paddingBottom: RFValue(20),
              }}
              showsVerticalScrollIndicator={false}
              data={mainDataForSecoend}
              renderItem={renderItemForSecoend}
              ListEmptyComponent={EmptyComponent}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  subBodyContainer: {
    backgroundColor: COLORS.White,
    borderWidth: 1,
    borderColor: COLORS.Gray,
    borderRadius: RFValue(8),
    paddingVertical: RFValue(15),
    marginTop: RFValue(15),
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    // borderWidth: 1,
  },
  firstSubBodyContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(15),
  },
  Sprator: {
    height: 1,
    backgroundColor: COLORS.SperatorColor,
    marginTop: RFValue(15),
  },
  BlackSprator: {
    height: 18,
    width: 3,
    backgroundColor: COLORS.Black,
  },
  secoendListBoxText: {
    color: COLORS.ThemBlue,
    fontSize: RFValue(14),
    fontWeight: "500",
    paddingHorizontal: RFValue(15),
    marginTop: RFValue(2),
  },
});
