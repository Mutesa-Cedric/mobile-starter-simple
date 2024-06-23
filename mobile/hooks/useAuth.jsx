/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "../lib/axios.config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const toast = useToast();
    const [loggingIn, setLoggingIn] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [user, setUser] = useState(null);

    const pathname = usePathname();

    useEffect(() => {
        if (user) {
            setInitialLoading(false);
            return;
        }
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) return;
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const { data } = await axios.get("/users/me");
                setUser(data.user);
            } catch (error) {
                setUser(null);
                if (!['/', '/login', '/signup'].includes(pathname)) {
                    router.push("/login");
                }
            } finally {
                setInitialLoading(false);
            }
        };
        fetchUser();
    }
        , [pathname, user]);

    const login = async (email, password) => {
        setLoggingIn(true);
        try {
            const { data } = await axios.post("/users/login", {
                email,
                password,
            });
            setUser(data.user);
            AsyncStorage.setItem("token", data.token);
            const token = await AsyncStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            toast.show("Logged in successfully", {
                type: "success",
            });
            router.push("/home");
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                toast.show("Invalid email or password", {
                    type: "danger",
                });
            } else {
                toast.show(error?.response?.data?.message ?? "An error occurred", {
                    type: "danger",
                });
            }
        } finally {
            setLoggingIn(false);
        }
    };

    const register = async (name, email, password) => {
        setRegistering(true);
        try {
            const { data } = await axios.post("/users/register", {
                name,
                email,
                password,
            });
            toast.show("Registered successfully", {
                type: "success",
            });
            router.push("/login");
        } catch (error) {
            toast.show(error?.response?.data?.message ?? "An error occurred", {
                type: "error",
            });
        } finally {
            setRegistering(false);
        }
    };


    const logout = async () => {
        setLoggingOut(true);
        try {
            setUser(null);
            AsyncStorage.removeItem("token");
            toast.show("Logged out successfully", {
                type: "success",
            });
            router.push("/login");
        } catch (error) {
            toast.show("An error occurred", {
                type: "error",
            });
        } finally {
            setLoggingOut(false);
        }
    };
    return (
        <AuthContext.Provider value={{ user, login, loggingIn, register, registering, logout, loggingOut, initialLoading }}>
            {children}
        </AuthContext.Provider>
    );

}

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

