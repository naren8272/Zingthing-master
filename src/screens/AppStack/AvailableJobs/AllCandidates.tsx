import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SCREENS } from '../../../common/Utils/screenName';
import { translator } from '../../../localization/I18n';
import { ContextProvider } from '../../StateManagment/StateManagment';
import { COLORS } from "../../../common/Utils/Colors";

interface CandidateData {
  id: string;
  title: string;
  count: string;
}

const AllCandidates: React.FC = () => {
  const { Language } = useContext(ContextProvider);
  const navigation = useNavigation();
  const [data, setData] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://zingthing-app.ptechwebs.com/api/total-job-posts-based-on-job-title');
        if (response.status === 200 && response.data.status) {
          const fetchedData = response.data.data.map((item: any) => ({
            id: item.id.toString(),
            title: item.job_title,
            count: item.total_job_posts.toString(),
          }));
          setData(fetchedData);
          
          // Calculate the total count
          const total = fetchedData.reduce((sum, item) => sum + parseInt(item.count), 0);
          setTotalCount(1501 + total);
        } else {
          console.error('Failed to fetch data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: CandidateData }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemCount}>{item.count}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.Orange} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.header}>
            {translator("TOTALNUMBEROFJOBMATCHEDTILLDATE", Language)}
          </Text>
          <Text style={styles.headerCount}>
            {totalCount.toLocaleString()}+
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Orange,
  },
  headerCount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.Orange,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Orange,
  },
  itemText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    width: '50%',
    textAlign: 'left',
  },
  itemCount: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    width: '50%',
    textAlign: 'right',
  },
});

export default AllCandidates;
