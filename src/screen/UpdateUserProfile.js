import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ImageButton } from '../component/ImageButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectLoggedUser } from '../redux/logUserSlice';
import { useNavigation } from "@react-navigation/native";
 
const initialValues = {
    username: { value: '', invalid: false },
    email: { value: '', invalid: false },
    password: { value: '', invalid: false },
}
export default UpdateUserProfile = function () {
    const [input, setInput] = useState(initialValues);
    const { logData, token } = useSelector(selectLoggedUser);
    const navigation = useNavigation();
    const dispatch = useDispatch();
 
    useEffect(() => {
        setInput((prevInput) => ({
            ...prevInput,
            username: { value: logData.name, invalid: false },
        }));
    }, []);
 
    const setUser = (text) => {
        setInput((prevInput) => ({
            ...prevInput,
            username: { value: text, invalid: false },
        }));
    }
    const setPassword = (text) => {
        setInput((prevInput) => ({
            ...prevInput,
            password: { value: text, invalid: false },
        }));
    }
    const goBack = () => {
        navigation.navigate('UserProfile');
    }
    const updateProfile = async () => {
        let userDetails = {
            name: input.username.value,
            password: input.password.value,
            tok:token
        }

        const response = await dispatch(updateUser(userDetails,token));

        if (response.payload.status == "OK") {
            alert(response.payload.message);
            navigation.navigate('UserProfile');
        }
    }
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>Update Profile</Text>
            </View>
            <View style={styles.body}>
                <View style={[styles.inputContainer]}>
                    <View style={[styles.input]}>
                        <Text style={[styles.label, input.username.invalid && styles.invalidLabel]}>
                            New User Name
                        </Text>
                        <TextInput
                            style={[styles.inputStyles, input.username.invalid && styles.invalidBackground]}
                            placeholder="Please enter User Name"
                            value={input.username.value}
                            onChangeText={setUser}
                        />
                    </View>
                    <View style={[styles.input]}>
                        <Text style={[styles.label, input.password.invalid && styles.invalidLabel]}>
                            New Password
                        </Text>
                        <TextInput
                            style={[styles.inputStyles, input.password.invalid && styles.invalidBackground]}
                            placeholder="Please enter new Password"
                            value={input.password.value}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <ImageButton text=" Confirm" icon="checkmark" width={100} fun={updateProfile} />
                        <ImageButton text=" Cancel" icon="close" width={100} fun={goBack} />
                    </View>
 
                </View>
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
        // borderColor: 'green',
        backgroundColor: 'green',
        // borderWidth: 4,
        borderRadius: 30,
        shadowColor: 'black',
        shadowRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    body: {
        flex: 8,
        width: 380,
        // justifyContent: 'center',
        // alignSelf: 'center',
 
    },
    inputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: 'green',
        marginLeft: 10
    },
    input: {
        margin: 8
    },
    label: {
        marginLeft: 5,
        marginBottom: 4,
        fontWeight: '600',
        color: 'white'
    },
    inputStyles: {
        marginLeft: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        paddingLeft: 10
    },
    invalidBackground: {
        borderColor: 'red',
        borderWidth: 2
    },
    invalidLabel: {
        color: 'red'
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