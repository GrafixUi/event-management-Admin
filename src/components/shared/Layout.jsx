import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import   {useStore}  from '../../utils/store'
import useAxiosAuth from '../../utils/useAxiosAuth'
export default function Layout() {
    const isAuthenticated = useStore((state) => state.isAuthenticated)
	const userData = useStore((state) => state.userData)
	const setUserData = useStore((state) => state.setUserData)
	const axiosAuth = useAxiosAuth();
    if (isAuthenticated === false)  {
        window.location.href = '/';
    }

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axiosAuth.get('/users/me')
				if (response.status === 200) {
					setUserData(response.data)
				} else {
					console.error('user data fetch failed')
				}
			} catch (error) {
				console.error('Error during login:', error)
			}

		}

		if(userData === null){
			fetchData()
		}
		else{
			console.log("user data already exists")
		}
	}, []) 

	console.log(userData)
	
    return (
        <div className=" bg-gray-100 h-screen w-screen overflow-hidden flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
