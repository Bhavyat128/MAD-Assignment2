import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import Categories from "./Categories";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Orders from "./Orders";
 
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProductNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};
export default function Home() {
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName="ProductPage" screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="ProductPage"
          component={ProductNavigator}
          options={{
            headerShown: false, tabBarLabel: "ProductList", tabBarIcon: () => (
              <Ionicons name="layers" size={20} color="green" />
            ),
          }}
        />
        <Tabs.Screen name="Orders" component={Orders} options={{
          headerShown: false, tabBarLabel: "Cart", tabBarIcon: () => (
            <Ionicons name="cart" size={20} color="green" />
          ),
        }} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}