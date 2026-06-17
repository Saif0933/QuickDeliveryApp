import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
    baseURL: "http://192.168.1.6:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to attach authentication token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error fetching token from AsyncStorage:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;