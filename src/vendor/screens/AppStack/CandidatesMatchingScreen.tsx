import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../common/Utils/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { translator } from "../../localization/I18n";
import axios from "axios";
import { ContextProvider } from "../../../screens/StateManagment/StateManagment";

// Define types for the fetched data
interface JobPost {
  id: string;
  title: string;
  count: string;
}

const CandidatesMatchingScreen: React.FC = () => {
  const [data, setData] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const { Language } = useContext(ContextProvider);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://zingthing-app.ptechwebs.com/api/total-job-based-on-job-title"
        );
        console.log(response);
        if (response.status === 200 && response.data.status) {
          const fetchedData: JobPost[] = response.data.data.map(
            (item: any) => ({
              id: item.id.toString(),
              title: item.job_title,
              count: item.total_candidates.toString(),
            })
          );
          setData(fetchedData);

          // Calculate the total count
          const total = fetchedData.reduce(
            (sum, item) => sum + parseInt(item.count),
            0
          );
          setTotalCount(1209 + total);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Language]);

  const renderItem = ({ item }: { item: JobPost }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemCount}>{item.count}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00b4d8" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.header}>
            {translator("TotalAvailableCandidates", Language)}
          </Text>
          <Text style={styles.headerCount}>{totalCount.toLocaleString()}+</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00b4d8",
  },
  headerCount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00b4d8",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#00b4d8",
  },
  itemText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    width: "50%",
    textAlign: "left",
  },
  itemCount: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    width: "50%",
    textAlign: "right",
  },
});

export default CandidatesMatchingScreen;
