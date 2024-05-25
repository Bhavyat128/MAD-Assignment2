import { StyleSheet, Text, View, TextInput, Pressable, } from 'react-native';
import { useState, useEffect } from 'react';
import { ImageButton } from '../component/ImageButton';
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signUpUser, logDelail } from '../redux/signSlice';
import { fetchsignInUserCart } from '../redux/shoppingCartSlice';
import UserProfile from './UserProfile';
import UpdateUserProfile from './UpdateUserProfile';
import { createStackNavigator } from "@react-navigation/stack";
import { loadOrdersOfUser } from '../redux/orderSlice';
 
const Stack = createStackNavigator();
 
const initialValues = {
    username: { value: '', invalid: false },
    email: { value: '', invalid: false },
    password: { value: '', invalid: false },
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
 
const LogInProfile = function ({ navigation }) {
    const [input, setInput] = useState(initialValues);
    const [isSignup, setisSignup] = useState(false);
    const [isformSubmit, setisformSubmit] = useState(false);
    const dispatch = useDispatch();
    const { logData, token } = useSelector(logDelail);
    const onClear = () => {
        setInput(initialValues);
        setisformSubmit(false);
    }
    useEffect(() => {
        onClear();
    }, []);
    const setUser = (text) => {
        setInput((prevInput) => ({
            ...prevInput,
            username: { value: text, invalid: false },
        }));
    }
    const setEmail = (text) => {
        const isValidEmail = isSignup ? emailRegex.test(text) : true;
        setInput((prevInput) => ({
            ...prevInput,
            email: { value: text, invalid: !isValidEmail },
        }));
    }
    const setPassword = (text) => {
        const isValidPassword = isSignup ? passwordRegex.test(text) : true;
        setInput((prevInput) => ({
            ...prevInput,
            password: { value: text, invalid: !isValidPassword },
        }));
    }
    const onSignin = async () => {
        setisformSubmit(true);
        let userDetails = {
            email: input.email.value,
            password: input.password.value
        }
        
        const response = await dispatch(signInUser(userDetails));
        
        if (response.payload.status == "OK") {
            let data = {
                tok: response.payload.token
            }
            dispatch(fetchsignInUserCart(data));
            dispatch(loadOrdersOfUser(data));
            navigation.navigate('UserProfile')
        }
    }
    const onSignup = async () => {
        setisformSubmit(true);
        let userDetails = {
            name: input.username.value,
            email: input.email.value,
            password: input.password.value
        }
        const response = await dispatch(signUpUser(userDetails));
        
        if (response.payload.status == "OK") {
            let data = {
                tok: response.payload.token
            }
            dispatch(fetchsignInUserCart(data));
            dispatch(loadOrdersOfUser(data));
            navigation.navigate('UserProfile')
        }
 
    }
    const onSwitchUser = () => {
        onClear();
        setisSignup(!isSignup);
    }
    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <View style={styles.body}>
                <View style={[styles.inputContainer]}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', justifyContent: 'center', alignSelf: 'center' }}>
                        Sign in with Email and Password
                    </Text>
                    {isSignup && <View style={[styles.input]}>
                        <Text style={[styles.label, input.username.invalid && styles.invalidLabel]}>
                            User Name
                        </Text>
                        <TextInput
                            style={[styles.inputStyles, input.username.invalid && styles.invalidBackground]}
                            placeholder="Please enter User Name"
                            value={input.username.value}
                            onChangeText={setUser}
                        />
                        {isformSubmit && input.username.value == "" && <Text style={{ color: 'red', fontStyle: 'italic', fontSize: 15, marginLeft: 10 }}>
                            Please enter your User Name.
                        </Text>}
                    </View>}
                    <View style={[styles.input]}>
                        <Text style={[styles.label, input.email.invalid && styles.invalidLabel]}>
                            Email
                        </Text>
                        <TextInput
                            style={[styles.inputStyles, input.email.invalid && styles.invalidBackground]}
                            placeholder="Please enter Email"
                            value={input.email.value}
                            onChangeText={setEmail}
                        />
                        {input.email.invalid && <Text style={{ color: 'red', fontStyle: 'italic', fontSize: 15, marginLeft: 10 }}>
                            Please enter a valid email.
                        </Text>}
                        {isformSubmit && input.email.value == "" && <Text style={{ color: 'red', fontStyle: 'italic', fontSize: 15, marginLeft: 10 }}>
                            Please enter your email.
                        </Text>}
                    </View>
                    <View style={[styles.input]}>
                        <Text style={[styles.label, input.password.invalid && styles.invalidLabel]}>
                            Password
                        </Text>
                        <TextInput
                            style={[styles.inputStyles, input.password.invalid && styles.invalidBackground]}
                            placeholder="Please enter Password"
                            value={input.password.value}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        {input.password.invalid && <Text style={{ color: 'red', fontStyle: 'italic', fontSize: 15, marginLeft: 10 }}>
                            Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, and one number.
                        </Text>}
                        {isformSubmit && input.password.value == "" && <Text style={{ color: 'red', fontStyle: 'italic', fontSize: 15, marginLeft: 10 }}>
                            Please enter your password.
                        </Text>}
                    </View>
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <ImageButton text=" Clear" icon="remove-circle" width={100} fun={onClear} />
                        {isSignup ? (
                            <ImageButton text=" Sign Up" icon="happy" width={100} fun={onSignup} />
                        ) : (
                            <ImageButton text=" Sign In" icon="happy" width={100} fun={onSignin} />
                        )}
 
                    </View>
                    <Pressable
                        style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
                        onPress={onSwitchUser}
                    >
                        {isSignup ? (
                            <Text style={{ color: 'white', fontSize: 15, justifyContent: 'center', alignSelf: 'center' }}>
                                Switch to: Sign in with the existing user
                            </Text>
                        ) : (
                            <Text style={{ color: 'white', fontSize: 15, justifyContent: 'center', alignSelf: 'center' }}>
                                Switch to: Sign up a new user
                            </Text>
                        )}
                    </Pressable>
 
                </View>
 
            </View>
        </View>
    );
}
export default Profile = function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LogInProfile"
                component={LogInProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpdateUserProfile"
                component={UpdateUserProfile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
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
        justifyContent: 'center',
        alignSelf: 'center',
 
    },
    inputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: 'green',
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