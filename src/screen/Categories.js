import { StyleSheet, Text, View, Alert, FlatList, Button, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadCategoryData, selectCategory } from "../redux/categorySlice";
 
export default Categories = function ({ navigation }) {
    const dispatch = useDispatch();
    const { categoryData, loading, error } = useSelector(selectCategory);
    useEffect(() => {
        dispatch(loadCategoryData());
    }, []);
    const showProducts = (category) => {
        navigation.navigate('ProductList', { category })
    }
    return (
        <View style={[styles.container,  { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>Categories</Text>
            </View>
            <View style={styles.body}>
                {loading ? (
                    <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />
                ) : (
                    <FlatList
                        data={categoryData}
                        renderItem={({ item }) => (
                            <View style={{ margin: 20 }}>
                                <Button title={item} onPress={() => showProducts(item)} color="green" />
                            </View>
                        )}
                        keyExtractor={(item) => item}
                    />
                )}
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
    }
});
 