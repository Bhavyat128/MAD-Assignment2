import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import Categories from "./Categories";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/shoppingCartSlice";
 
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProductNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};
export default function Home() {
  const { cartData, sum } = useSelector(selectCart);
  
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName="ProductPage" screenOptions={{ headerShown: false, tabBarActiveTintColor: "green" }}>
        <Tabs.Screen
          name="ProductPage"
          component={ProductNavigator}
          options={{
            headerShown: false, tabBarLabel: "Products", tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="Orders" component={Orders} options={{
          headerShown: false, tabBarBadge: sum > 0 ? sum : undefined, tabBarLabel: "My Cart", tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}