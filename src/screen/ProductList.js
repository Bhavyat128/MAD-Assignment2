import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, FlatList, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ImageButton } from '../component/ImageButton';
import {ActivityIndicator} from 'react-native';


export default function ProductList({ navigation, route }) {
    const { category } = route.params;
    const [ListofProducts, setListofProducts] = useState([]);
    const [isLoading, setLoading]=useState(false);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const url = 'https://fakestoreapi.com/products/category/' + category;
            const res = await fetch(url)
            const data = await res.json();
            setListofProducts(data);
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
    const onProductDetails = (category, id) => {
        // console.log("show", category, id);
        navigation.navigate('ProductDetails', { category: category, id: id })
    }
    useEffect(() => {
        if (category) {
            loadProducts();
        }
    }, [category]);
    const onBack = () => navigation.navigate('Categories');
    return (

        <View style={styles.container}>
        
            <View style={styles.Title}>
                <Text style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 5, fontSize: 35, fontWeight: '800' }}> Product List</Text>
            </View>
        
            <View style={styles.Inner}>
            {isLoading ?(<ActivityIndicator size='large' style={{flex:1}} color='#0000ff'/>):(
                <FlatList
                    data={ListofProducts}
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
                            onPress={() => onProductDetails(item.category, item.id)}
                        >
                            <View style={{ margin: 10, flexDirection: 'row', width: 370, borderWidth: 1, borderColor: 'steelblue', borderRadius: 10 }}>
                                <Image source={{ uri: item.image }} style={styles.imageStyle} />
                                <View style={{ margin: 10, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '700', width: 270 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: '700' }}>Price: $ {item.price}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
            </View>
            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <ImageButton text="Back" icon="backspace" width={100} fun={onBack} />
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
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10
    }
});
