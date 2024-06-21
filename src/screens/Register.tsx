import { ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import BGView from "../components/BGView";
import { loginStyles } from "../styles/login";
import CustomText from "../components/CustomText";
import { generalStyles } from "../styles/general";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";
import { navigationRef } from "../App";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        name: "",
        username: "",
    });
    const handleChange = (name: string, value: string) => {
        setCredentials({ ...credentials, [name]: value });
    }
    const handleRegister = async () => {
        setLoading(true);
        try {
            if (credentials.email === "" || credentials.password === "" || credentials.name === "" || credentials.username === "") {
                return ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
            }
            await register(credentials);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <BGView>
            <View style={loginStyles.container}>
                <View style={loginStyles.innerContainer}>
                    <CustomText variant="headlineLarge" font="medium" style={[generalStyles.textCenter, { marginBottom: 20 }]} >Register</CustomText>
                    <CustomTextInput placeholder="Enter name" onChangeText={(text) => handleChange("name", text)} label={"Name"} value={credentials.name} />
                    <CustomTextInput placeholder="Enter username" onChangeText={(text) => handleChange("username", text)} label={"Username"} value={credentials.username} />
                    <CustomTextInput placeholder="Enter email" onChangeText={(text) => handleChange("email", text)} label={"Email"} value={credentials.email} />
                    <CustomTextInput placeholder="Enter password" onChangeText={(text) => handleChange("password", text)} label={"Password"} secureTextEntry value={credentials.password} />
                    <CustomButton style={{ marginTop: 12 }} loading={loading} mode="contained" onPress={handleRegister} >
                        Register
                    </CustomButton>
                    <CustomText style={[generalStyles.textCenter]}>Alredy Registered? <CustomText onPress={() => navigationRef.navigate("Login" as never)} font="medium" color={'indigo'}>Login Here</CustomText></CustomText>
                </View>
            </View>
        </BGView >
    );
};

export default Register;
