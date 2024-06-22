import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";
import { AuthAPI } from "../helpers/auth";
import BGView from "../components/BGView";
import { Appbar } from "react-native-paper";
import CustomText from "../components/CustomText";

const Profile = () => {
    const { logOut, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<any>(null);
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
        <BGView>
            <View style={{ flex: 1 }}>
                <Appbar.Header mode="center-aligned">
                    <Appbar.Content titleStyle={{ fontFamily: "Poppins-Medium" }} title="Profile" />
                </Appbar.Header>
                <View style={{ padding: 20, gap: 10, flex: 1 }}>
                    <View>
                        <CustomText>Name:</CustomText>
                        <CustomText font="medium" style={{ fontSize: 20 }} >{userData?.name}</CustomText>
                    </View>
                    <View>
                        <CustomText>Email:</CustomText>
                        <CustomText font="medium" style={{ fontSize: 20 }} >{userData?.email}</CustomText>
                    </View>
                    <View>
                        <CustomText>Username:</CustomText>
                        <CustomText font="medium" style={{ fontSize: 20 }} >{userData?.username}</CustomText>
                    </View>
                    <View>
                        <CustomText>Total Quizzes Attended:</CustomText>
                        <CustomText font="medium" style={{ fontSize: 20 }} >{userData?.quizzes.length}</CustomText>
                    </View>
                </View>
                <View style={{ padding: 20, gap: 10 }}>
                    <CustomButton onPress={logOut} mode="contained" >
                        Logout
                    </CustomButton>
                    <CustomButton loading={loading} onPress={handleDelete} mode="contained" style={{ backgroundColor: "red" }} >Delete Account</CustomButton>
                </View>
            </View>
        </BGView>
    );
};

export default Profile;
