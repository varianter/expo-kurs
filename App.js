import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import { RouteScreen } from "./screens/RouteScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={HomeScreen}
          options={{ title: "Søk" }}
        />
        <Stack.Screen
          name="Route"
          component={RouteScreen}
          options={{ title: "Rute" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
