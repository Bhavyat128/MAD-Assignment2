import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, FlatList, Pressable, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ImageButton } from '../component/ImageButton';
import {ActivityIndicator} from 'react-native';

export default function ProductDetails({ navigation, route }) {
    const [detailedprod, setdetailedprod] = useState({});
    const [rate, setrate] = useState({});
    const [isLoading, setLoading]=useState(false);

    const isFocused = useIsFocused();
    const loadProductDetails = async () => {
        setLoading(true);
        try {
            //console.log("Param", route.params?.id, route.params?.category)
            const url = 'https://fakestoreapi.com/products/' + route.params?.id;
            const res = await fetch(url)
            const data = await res.json();
            setdetailedprod(data);
            setrate(data.rating);
            // console.log("data", data);
        }
        catch (e) {
            console.error('error fetch address ', e)
            Alert.alert("Error", e?.message ?? "unknown error ",
                [{ text: 'OK', }]);
        }
        finally {
            setLoading(false);
           // console.log('after fetch address')

        }

    }
    const onBack = () => {
        navigation.navigate('ProductList', { category: route.params?.category })
    }
    useEffect(() => {
        if (isFocused) {
            loadProductDetails();
        }
    }, [isFocused]);

    const onAddCart = () => { console.log("Added to Cart") };
    return (

        <View style={styles.container}>
         
            <View style={styles.Title}>
                <Text style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 5, fontSize: 35, fontWeight: '800' }}> Product Details</Text>
            </View>
       
            <View style={styles.Inner}>
            {isLoading ?(<ActivityIndicator size='large' style={{flex:1}} color='#0000ff'/>):(
                <ScrollView>
                    <View style={{ margin: 10, flexDirection: 'column', width: 370, borderWidth: 1, borderColor: 'steelblue', borderRadius: 10 }}>
                        <Image source={{ uri: detailedprod.image }} style={styles.imageStyle} />
                        <Text style={{ fontSize: 20, fontWeight: '700', margin: 5 }}>{detailedprod.title}</Text>
                        <View style={{ margin: 10, height: 40, borderWidth: 1, borderColor: 'steelblue', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 10 }}>Rate: {rate.rate}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 10 }}>Sold: {rate.count}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '700', marginTop: 10 }}>Price: $ {detailedprod.price}</Text>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <ImageButton text="Back" icon="backspace" width={100} fun={onBack} />
                            <ImageButton text="Add To Cart" icon="cart" width={150} fun={onAddCart} />
                        </View>
                        <View style={{ margin: 10, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>Description:</Text>
                            <Text style={{ fontSize: 15, fontWeight: '700' }}>{detailedprod.description}</Text>
                        </View>
                    </View>
                </ScrollView>
            )}
            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 110,
    },
    buttonSpacer: {
        width: 20,
    },
    Title: {
        flex: 1,
        borderWidth: 4,
        borderColor: 'green',
        width: 300,
        alignSelf: 'center',
        margin: 20,

    },
    Inner: {
        flex: 9,

    },
    imageStyle: {
        margin: 10,
        width: 350,
        height: 350,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10
    }
});
