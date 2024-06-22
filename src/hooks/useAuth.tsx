import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { AuthUser } from '../types/AuthUser';
import { AuthAPI } from '../helpers/auth';
import SplashScreen from 'react-native-splash-screen';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            setUser(await JSON.parse(user));
        }
        SplashScreen.hide();
    };
    const login = async (email: string, password: string) => {
        try {
            const data = await AuthAPI.login({ email, password });
            if (data?.data) {
                await AsyncStorage.setItem('user', JSON.stringify(data.data));
                setUser(data.data);
            }
        } catch (error: any) {
            console.log(error)
        }
    };
    const register = async (credentials: any) => {
        try {
            const data = await AuthAPI.register(credentials);
            if (data?.data) {
                await AsyncStorage.setItem('user', JSON.stringify(data.data));
                setUser(data.data);
            }
        } catch (error: any) {
            console.log(error)
        }
    };

    const logOut = async () => {
        try {
            await AsyncStorage.clear();
            setUser(null);
        } catch (error: any) {
            console.log(error);
        }
    };

    const memoedValue = useMemo(
        () => ({
            user,
            register,
            login,
            logOut
        }),
        [user]
    );

    return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    return useContext(AuthContext) as {
        user: AuthUser | null;
        login: (email: string, pass: string) => Promise<void>;
        register: (credentials: any) => Promise<void>;
        logOut: () => Promise<void>;
    };
};

export default useAuth;
