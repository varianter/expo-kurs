import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { fetchServiceJourney } from "../apiService";

export const RouteScreen = ({ navigation, route }) => {
  const [journeyData, setjourneyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchServiceJourney(
          route.params.item.serviceJourney.id
        );
        setjourneyData(res);
      } catch (error) {
        console.error("Api responded with: ", error.response.status);
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const Item = ({ item }) => {
    const time = new Date(item.expectedDepartureTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      <View style={styles.journeyWrapper}>
        <Text style={styles.journeyInfo}>{item.quay.name}</Text>
        <Text style={styles.journeyInfo}>{time <= 0 ? "Nå" : `${time}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.routeHeader}>
        Ruteinformasjon buss {route.params.item.serviceJourney.line.publicCode}
      </Text>
      <FlatList
        data={journeyData}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.quay.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "100%",
  },
  journeyWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingVertical: 10,
    width: "85%",
  },
  routeHeader: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
  },
  journeyInfo: {
    fontSize: 16,
  },
});
