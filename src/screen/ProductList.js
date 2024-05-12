import { StyleSheet, Text, View, Alert, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ImageButton } from '../component/ImageButton';
import { useDispatch, useSelector } from "react-redux";
import { loadProductData, selectProduct } from '../redux/productSlice';
 
export default ProductList = function ({ navigation, route }) {
    const { category } = route.params;
    const dispatch = useDispatch();
    const { productData, loading, error } = useSelector(selectProduct);
    useEffect(() => {
        dispatch(loadProductData(category));
    }, []);
    const onProductDetail = (category, id) => {
        navigation.navigate('ProductDetails', { category: category, id: id })
    }
    const onBack = () => navigation.navigate('Categories');
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>Products</Text>
            </View>
            <View style={styles.body}>
                {loading ? (
                    <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />
                ) : (
                    <FlatList
                        data={productData}
                        renderItem={({ item }) => (
                            <Pressable
                                style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
                                onPress={() => onProductDetail(item.category, item.id)}
                            >
                                <View style={{ margin: 10, flexDirection: 'row', width: 370, borderWidth: 1, borderColor: 'green', borderRadius: 10 }}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
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
            <View style={[styles.footer]}>
                <View style={{ margin: 10, justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <ImageButton text="Back" icon="backspace" width={100} fun={onBack} />
                </View>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        paddingTop: 0,
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        borderColor: 'green',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 40,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 10
    },
    body: {
        flex: 8,
        width: 380
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