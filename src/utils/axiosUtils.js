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

    // const checkTokens = async () => {
    //     try {
    //         const response = await axios.post("https://neobook.online/lorby/authentication/login/refresh/", {refresh: tokens.refresh_token})
    //         localStorage.setItem("access_token", response.data.access)
    //     } catch (e) {
    //         localStorage.removeItem("access_token")
    //         localStorage.removeItem("refresh_token")
    //         // window.location.reload()
    //     }
    // }

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
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("refresh_token")
                    window.location.reload()
                }
            }
            return Promise.reject(error)
        }
    )

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
            const response = await axiosInstances.post("/authentication/email-confirm/", {code})
            const data = await response.data
            console.log(data)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    const logout = async () => {
        try {
            const response = await axiosInstances.post("/authentication/logout/", {refresh_token: tokens.refresh_token})
            let data = await response.data
            console.log(data)
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    return {login, logout, /*checkTokens,*/ signUp, confirm}
}


// const handleLogout = async () => {
//     const configs = {
//         headers: {
//             Authorization: "Bearer " + localStorage.getItem("access_token")
//         }
//     }
//
//     try {
//         setIsLoading(true)
//
//         if (response?.status >= 200 && response?.status <= 250) {
//             await localStorage.removeItem("access_token")
//             await localStorage.removeItem("refresh_token")
//             await navigate("/")
//         }
//     } catch (e) {
//         console.log(e)
//     } finally {
//         setIsLoading(false)
//     }
// }




// export const ApiClient = () => {
//     const api = axios.create({
//         baseURL: "https://neobook.online/lorby/",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         }
//     })
//
//     // Add a request interceptor to add the JWT token to the authorization header
//     api.interceptors.request.use(
//         (config) => {
//             const token = localStorage.getItem("access_token");
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         },
//         (error) => Promise.reject(error)
//     );
//
//     // Add a response interceptor to refresh the JWT token if it's expired
//     api.interceptors.response.use(
//         (response) => response,
//         (error) => {
//             const originalRequest = error.config;
//
//             // If the error is a 401 and we have a refresh token, refresh the JWT token
//             if (
//                 error.response.status === 401 &&
//                 localStorage.getItem("refresh_token")
//             ) {
//                 const refresh_token = localStorage.getItem("refresh_token");
//
//                 let data = JSON.stringify({
//                     refresh_token
//                 });
//
//                 post("/authentication/login/refresh/", data)
//                     .then((response) => {
//                         localStorage.setItem("access_token", response.access_token);
//                         localStorage.setItem("refresh_token", response.refresh_token);
//
//                         // Re-run the original request that was intercepted
//                         originalRequest.headers.Authorization = `Bearer ${response.token}`;
//                         api(originalRequest)
//                             .then((response) => {
//                                 return response.data;
//                             })
//                             .catch((error) => {
//                                 console.log(error);
//                             });
//                         // return api(originalRequest)
//                     })
//                     .catch((err) => {
//                         // If there is an error refreshing the token, log out the user
//                         console.log(err);
//                     });
//             }
//
//             // Return the original error if we can't handle it
//             return Promise.reject(error);
//         }
//     );
//
//     const login = (username, password) => {
//         return api
//             .post("/authentication/login/", { username, password })
//             .then(({ data }) => {
//                 // Store the JWT and refresh tokens in session storage
//                 console.log(data)
//                 localStorage.setItem("access_token", data.access);
//                 localStorage.setItem("refresh_token", data.refresh);
//             })
//             .catch((err) => {
//                 // Return the error if the request fails
//                 return err;
//             });
//     };
//
//
//
//     const get = (path) => {
//         return api.get(path).then((response) => response.data);
//     };
//
//     const post = (path, data) => {
//         return api.post(path, data).then((response) => response.data);
//     };
//
//     const put = (path, data) => {
//         return api.put(path, data).then((response) => response.data);
//     };
//
//     const del = (path) => {
//         return api.delete(path).then((response) => response);
//     };
//
//
//
//     return {
//         login,
//         get,
//         post,
//         put,
//         del,
//     };
// }
