import axios from "axios";

export const baseURL = "https://neobook.online/lorby"


export const ApiClient = () => {


    const tokens = (localStorage.getItem("access_token") && localStorage.getItem("refresh_token"))
    ?
    {
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token")
    }
    : null


    const axiosInstances = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Authorization: tokens ? `Bearer ${tokens.access_token}` : null
        }
    })
    

    // Обновление access токена с refresh токеном. Перекидываем в логин страницу, если не получится обновить
    axiosInstances.interceptors.response.use(
        (config) => config,
        async (error) => {
            if (error.response.status === 401) {
                // Обновление токена
                try {
                    const response = await axios.post("https://neobook.online/lorby/authentication/login/refresh/", {refresh: tokens.refresh_token})
                    localStorage.setItem("access_token", response.data.access)
                    return error.config
                // Перекидывание на страницу логина
                } catch (e) {
                    console.log("interceptor");
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("refresh_token")
                    window.location.replace("/")
                }
            }
            return Promise.reject(error)
        }
    )

    const getTokens = () => {
        return tokens
    }

    const login = async (username, password) => {
        try {
            const response = await axiosInstances.post("/authentication/login/", {username, password})
            const data = await response.data
            localStorage.setItem("access_token", data.access)
            localStorage.setItem("refresh_token", data.refresh)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    const signUp = async (email, username, password, password_confirm) => {
        try {
            await axiosInstances.post("/authentication/register/", {email, username, password, password_confirm})
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    const confirm = async (code) => {
        try {
            await axiosInstances.post("/authentication/email-confirm/", {code})
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    const logout = async () => {
        try {
            await axiosInstances.post("/authentication/logout/", {refresh_token: tokens?.refresh_token})
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    return {login, logout, signUp, confirm, getTokens}
}