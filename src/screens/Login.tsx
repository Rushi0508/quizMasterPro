import { View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import BGView from "../components/BGView";
import { loginStyles } from "../styles/login";
import CustomText from "../components/CustomText";
import { generalStyles } from "../styles/general";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const handleChange = (name: string, value: string) => {
        setCredentials({ ...credentials, [name]: value });
    }
    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(credentials.email, credentials.password);
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
                    <CustomText variant="headlineLarge" font="medium" style={generalStyles.textCenter} >Login</CustomText>
                    <CustomTextInput placeholder="Enter email" mode="outlined" onChangeText={(text) => handleChange("email", text)} label={"Email"} value={credentials.email} />
                    <CustomTextInput placeholder="Enter password" mode="outlined" onChangeText={(text) => handleChange("password", text)} label={"Password"} secureTextEntry value={credentials.password} />
                    <CustomButton loading={loading} mode="contained" onPress={handleLogin} >
                        Login
                    </CustomButton>
                </View>
            </View>
        </BGView >
    );
};

export default Login;
