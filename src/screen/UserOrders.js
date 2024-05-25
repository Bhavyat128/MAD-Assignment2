import { StyleSheet, Text, View, Alert, FlatList, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { loadOrdersOfUser, selectOrder } from '../redux/orderSlice';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { logDelail } from '../redux/signSlice';
import { ImageButton } from '../component/ImageButton';
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { updateOrdersByUser } from '../redux/orderSlice';
import { useNavigation } from "@react-navigation/native";

const Caret = {
    isMyCartExpanded: false,
    isPaidCartExpanded: false,
    isReceivedCartExpanded: false
}

const pOrders = {
    newOrders: [],
    paidOrders: [],
    deliveredOrders: []
}

const totCount = {
    newOrderCount: 0,
    paidOrderCount: 0,
    deliveredCount: 0

}
const cartScreen = [
    { title: 'New Order', type: 'NewOrders', data: [], count: 0, expand: false },
    { title: 'Paid Order', type: 'PaidOrders', data: [], count: 0, expand: false },
    { title: 'Delivered Order', type: 'RecievedOrders', data: [], count: 0, expand: false }
]
export default UserOrders = function ({ navigation }) {
    const { logData, token } = useSelector(logDelail);
    const { orderData, totalOrders } = useSelector(selectOrder);
    const [expand, setExpand] = useState(Caret);
    const [expandInnerId, setExpandInnerId] = useState({});
    const [counts, setCounts] = useState(totCount);
    const [fetchedOrders, cartOrders] = useState(pOrders);
    const [outer, setOuter] = useState(cartScreen);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigations = useNavigation();


    const processfetchedData = () => {

        let process = [...outer];

        let pass = process.map((x) => {
            if (x.type == 'NewOrders') {

                x.data = orderData.filter(x => x.isPaid == 0 && x.isDelivered == 0);
                x.count = x.data.length;
            }
            else if (x.type == 'PaidOrders') {
                x.data = orderData.filter(x => x.isPaid != 0 && x.isDelivered == 0);
                x.count = x.data.length
            }
            else {
                x.data = orderData.filter(x => x.isDelivered != 0);
                x.count = x.data.length;
            }
            return x;
        })


        setOuter(pass);
    }

    const dataUpdate = () => {
        cartOrders((iP) => ({
            ...iP,
            newOrders: orderData.filter(x => x.isPaid == 0 && x.isDelivered == 0),
        }));
        cartOrders((iP) => ({
            ...iP,
            paidOrders: orderData.filter(x => x.isPaid != 0 && x.isDelivered == 0),
        }));
        cartOrders((iP) => ({
            ...iP,
            deliveredOrders: orderData.filter(x => x.isDelivered != 0),
        }));

        setCounts({
            newOrderCount: orderData.filter(x => x.isPaid == 0 && x.isDelivered == 0).reduce((accumulator, currentOrder) => {
                const currentOrderItems = currentOrder.items;
                const orderQuantitySum = currentOrderItems.reduce((itemAccumulator, item) => {
                    return itemAccumulator + item.quantity;
                }, 0);
                return accumulator + orderQuantitySum;
            }, 0),
            paidOrderCount: orderData.filter(x => x.isPaid != 0 && x.isDelivered == 0).reduce((accumulator, currentOrder) => {
                const currentOrderItems = currentOrder.items;
                const orderQuantitySum = currentOrderItems.reduce((itemAccumulator, item) => {
                    return itemAccumulator + item.quantity;
                }, 0);
                return accumulator + orderQuantitySum;
            }, 0),
            deliveredCount: orderData.filter(x => x.isDelivered != 0).reduce((accumulator, currentOrder) => {
                const currentOrderItems = currentOrder.items;
                const orderQuantitySum = currentOrderItems.reduce((itemAccumulator, item) => {
                    return itemAccumulator + item.quantity;
                }, 0);
                return accumulator + orderQuantitySum;
            }, 0)
        })
    }

    useEffect(() => {
        // if (isFocused) {
        setExpand(Caret);
        setCounts(totCount);
        cartOrders(pOrders);
        setOuter(cartScreen);
        processfetchedData();
        // firstLoad();
        // }
    }, [isFocused]);



    const onCaretChangeOuter = (type) => {
        let change = [...outer];
        let pass = change.map((item) => {
            if (item.type == type) {
                item.expand = !item.expand;
            }
            return item;
        })
        setOuter(pass);

    }

    const caretexpanded = (id) => {
        let expandAndCollapse = { ...expandInnerId };
        (id in expandAndCollapse) ? (expandAndCollapse[id] = !expandAndCollapse[id]) : (expandAndCollapse[id] = true);
        setExpandInnerId(expandAndCollapse);
    }
    const action = (updatedOrders) => {
        let process = [...outer];
        let pass = process.map((x) => {
            if (x.type == 'NewOrders') {
 
                x.data = updatedOrders.filter(x => x.isPaid == 0 && x.isDelivered == 0);
                x.count = x.data.length;
            }
            else if (x.type == 'PaidOrders') {
                x.data = updatedOrders.filter(x => x.isPaid != 0 && x.isDelivered == 0);
                x.count = x.data.length
            }
            else {
                x.data = updatedOrders.filter(x => x.isDelivered != 0);
                x.count = x.data.length;
            }
            return x;
        })
        setOuter(pass);
    }
    const payment = async (id) => {

        let order = orderData.find(x => x.id == id);
        let object = {
            orderID: id,
            isPaid: 1,
            isDelivered: 0,
            token: token
        }
        let obj = { ...order, token: token, isPaid: 1, isDelivered: 0 }

        let res = await dispatch(updateOrdersByUser(object));
        if (res.payload.status == "OK") {
            setOuter(cartScreen);
            processfetchedData();
            let orderFiltered = orderData.map(order => order.id === id ? { ...order, isPaid: 1, isDelivered: 0 } : order);
            action(orderFiltered);
            alert("Your Order is Paid")
        }


    }

    const receivedOrder = async (id) => {

        let order = orderData.find(x => x.id == id);
        let object = {
            orderID: id,
            isPaid: 1,
            isDelivered: 1,
            token: token
        }
        let obj = { ...order, token: token, isPaid: 1, isDelivered: 1 }
        let res = await dispatch(updateOrdersByUser(object));
        if (res.payload.status == "OK") {
            setOuter(cartScreen);
            processfetchedData();
            let orderFiltered = orderData.map(order => order.id === id ? { ...order, isPaid: 1, isDelivered: 1 } : order);
            action(orderFiltered);
            alert("Your Order is Delivered")
        }
    }

    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: '700', color: 'black' }}>Shopping Cart</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={outer}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => onCaretChangeOuter(item.type)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, marginLeft: 17, borderWidth: 2, borderRadius: 0, borderColor: 'green', height: 40, }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={[{ fontWeight: '700', color: 'black', fontSize: 15, justifyContent: 'center', alignSelf: 'center' }]}>{item.title}: {item.count}</Text>
                                    </View>
                                    <View>
                                        {(item.expand) && <Ionicons
                                            name="caret-up"
                                            size={25}
                                            color="black"
                                        />}
                                        {!(item.expand) && <Ionicons
                                            name="caret-down"
                                            size={25}
                                            color="black"
                                        />}
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {item.expand && <FlatList
                                data={item.data}
                                renderItem={({ item }) => (
                                    <View>
                                        <Pressable
                                            style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
                                            onPress={() => caretexpanded(item.id)}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, borderBottomWidth: 1, height: 40, }}>
                                                <View >
                                                    <Text style={{ fontWeight: '700', fontSize: 15, marginLeft: 10 }}>Order Id: {item.id}</Text>
                                                </View>
                                                <View >
                                                    <Text style={{ fontWeight: '700', fontSize: 15, marginLeft: 10 }}>Items: {item.totalItems}</Text>
                                                </View>
                                                <View >
                                                    <Text style={{ fontWeight: '700', fontSize: 15, marginLeft: 10 }}>Total: {item.items[0].totalPrice}</Text>
                                                </View>
                                                <View>
                                                    {(expandInnerId[item.id]) && <Ionicons
                                                        name="caret-up"
                                                        size={15}
                                                        color="black"
                                                    />}
                                                    {!(expandInnerId[item.id]) && <Ionicons
                                                        name="caret-down"
                                                        size={15}
                                                        color="black"
                                                    />}
                                                </View>
                                            </View>
                                        </Pressable>
                                        {(expandInnerId[item.id]) && <FlatList
                                            data={item.items}
                                            renderItem={({ item }) => (
                                                <View style={{ margin: 10, flexDirection: 'row', width: 370, borderWidth: 1, borderColor: 'green', borderRadius: 10 }}>
                                                    <Image source={{ uri: item.image }} style={styles.image} />
                                                    <View style={{ margin: 10, flexDirection: 'column' }}>
                                                        <Text style={{ fontSize: 15, fontWeight: '700', width: 270 }}>{item.title}</Text>
                                                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Price: $ {item.price}</Text>
                                                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Quantity: {item.quantity}</Text>
                                                    </View>
                                                </View>
                                            )}
                                            keyExtractor={(item) => item.id}
                                        />}
                                        {(expandInnerId[item.id]) && (item.isPaid == 0 && item.isDelivered == 0) && <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginTop: 20, marginBottom: 20 }}>
                                            <ImageButton text="      Pay" icon="wallet" width={150} fun={payment.bind(this, item.id)} />
                                        </View>}
                                        {(expandInnerId[item.id]) && (item.isPaid != 0 && item.isDelivered == 0) && <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginTop: 20, marginBottom: 20 }}>
                                            <ImageButton text="       Received" icon="bag-check" width={150} fun={receivedOrder.bind(this, item.id)} />
                                        </View>}

                                    </View>
                                )}
                                keyExtractor={(item) => item.id}
                            />}
                        </View>
                    )}
                    keyExtractor={(item) => item.type}
                />





            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 0,
        // paddingTop: 0,
        marginTop: 60,
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        borderColor: 'green',
        // backgroundColor: 'green',
        borderWidth: 4,
        borderRadius: 0,
        shadowColor: 'black',
        shadowRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    pricing: {
        borderWidth: 2,
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between'
    },
    body: {
        flex: 8,
        width: 380,
        flexDirection: 'column'
    },
    image: {
        margin: 10,
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: 'lightgreen',
        borderRadius: 10
    },
    footer: {
        flex: 1,
        alignSelf: 'center',
        borderTopWidth: 2,
        width: '100%',
        alignSelf: 'center',
        alignContent: 'center',
        borderBottomColor: 'black'
    }
});