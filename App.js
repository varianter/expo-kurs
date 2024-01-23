import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchDeparturesFromName } from "../apiService";

export default function App({ navigation }) {
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onSearch(data?.name);
    } finally {
      setRefreshing(false);
    }
  }, [data]);

  const onSearch = async (input) => {
    Keyboard.dismiss();
    if (input === "") {
      return;
    }
    try {
      const res = await fetchDeparturesFromName(input);
      setData(res.data.stopPlace);
    } catch (err) {
      if (err.response.status === 404) {
        alert("Bussholdeplass ikke funnet");
        setData(null);
      }
    }
  };

  const Item = ({ item }) => {
    const time = Math.floor(
      (new Date(item.expectedDepartureTime) - Date.now()) / 1000 / 60
    );

    return (
      <Pressable onPress={() => navigation.navigate("Route", { item: item })}>
        <View style={styles.item}>
          <Text style={styles.itemText}>
            {item.destinationDisplay.frontText}
          </Text>
          <Text style={styles.itemText}>
            {time <= 0 ? "Nå" : time + " min"}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Søk etter en bussholdeplass</Text>

          <TextInput
            onBlur={Keyboard.dismiss}
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
            placeholder="Fyll inn holdeplassnavn"
            onSubmitEditing={(e) => {
              onSearch(e.nativeEvent.text);
            }}
          />

          <Pressable style={styles.button} onPress={() => onSearch(searchText)}>
            <Text style={styles.buttonText}>Søk</Text>
          </Pressable>

          {data !== null ? (
            <>
              <View style={styles.listHeaderWrapper}>
                <Text style={styles.stopNameHeader}>{data?.name}</Text>
                <Button
                  title="Fjern"
                  onPress={() => {
                    setData(null);
                    setSearchText("");
                  }}
                />
              </View>
              <FlatList
                scrollEnabled={true}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={data?.estimatedCalls}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) =>
                  item.destinationDisplay.frontText + item.expectedDepartureTime
                }
              />
            </>
          ) : null}

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
  },
  wrapper: {
    justifyContent: "center",
    width: "85%",
    alignSelf: "center",
  },
  text: {
    fontSize: 22,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
  },
  listHeaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stopNameHeader: {
    fontSize: 22,
    marginVertical: 12,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
  },
  itemText: {
    fontSize: 20,
  },
});
