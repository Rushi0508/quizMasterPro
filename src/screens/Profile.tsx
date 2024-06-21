import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";
import { AuthAPI } from "../helpers/auth";

const Profile = () => {
    const { logOut, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await AuthAPI.delete(user?.id);
            if (res) {
                logOut();
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    const fetchUser = async () => {
        const res = await AuthAPI.getUser(user?.id);
        if (res) {
            setUserData(res?.data);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <View>
            <CustomButton onPress={logOut} mode="contained" >Logout</CustomButton>
            <CustomButton loading={loading} onPress={handleDelete} mode="contained" style={{ backgroundColor: "red" }} >Delete Account</CustomButton>
        </View>
    );
};

export default Profile;
