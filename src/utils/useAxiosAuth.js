import {axiosAuth} from './axios';
import {useEffect} from 'react';
import   {useStore}  from './store';

const useAxiosAuth = () => {
    const jwt = useStore((state) => state.jwt);
    useEffect(() => {
        const reqIntercept = axiosAuth.interceptors.request.use((config) =>{
            if(!config.headers["Authorization"]){
                config.headers["Authorization"] = `Bearer ${jwt}`
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
        )
        return () => {
            axiosAuth.interceptors.request.eject(reqIntercept);
        }
    },[])
    return axiosAuth;

}

export default useAxiosAuth;