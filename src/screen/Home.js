import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import Categories from "./Categories";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Orders from "./Orders";
import UserOrders from "./UserOrders";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/shoppingCartSlice";
import { logDelail } from "../redux/signSlice";
import { selectOrder } from "../redux/orderSlice";
 
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
  const { cartData, total } = useSelector(selectCart);
  const { logData, token } = useSelector(logDelail);
  const { orderData, totalOrders } = useSelector(selectOrder);
  
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false, tabBarActiveTintColor: "green" }}>
        <Tabs.Screen
          name="ProductPage"
          component={ProductNavigator}
          options={{
            headerShown: false, tabBarLabel: "ProductList", tabBarIcon: ({ size, color }) => (
              <Ionicons name="layers" size={size} color={color} />
            )
          }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              if (token == "") {
                e.preventDefault();
                alert("Not Logged in. You must login to view this tab");
              }
            },
          }}
        />
        <Tabs.Screen name="Orders" component={Orders} options={{
          headerShown: false, tabBarBadge: total > 0 ? total : undefined, tabBarLabel: "My Cart", tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart" size={size} color={color} />
          )
        }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              if (token == "") {
                e.preventDefault();
                alert("Not Logged in. You must login to view this tab");
              }
            },
          }}
        />
        <Tabs.Screen name="UserOrders" component={UserOrders} options={{
          headerShown: false, tabBarBadge: totalOrders > 0 ? totalOrders : undefined, tabBarLabel: "My Orders", tabBarIcon: ({ size, color }) => (
            <Ionicons name="gift" size={size} color={color} />
          ),
        }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              if (token == "") {
                e.preventDefault();
                alert("Not Logged in. You must login to view this tab");
              }
            },
          }}
        />
        <Tabs.Screen name="Profile" component={Profile} options={{
          headerShown: false, tabBarLabel: "Profile", tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}