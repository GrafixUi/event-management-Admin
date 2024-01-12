import {create } from 'zustand'


export const useStore = create((set) => ({
isAuthenticated: false,
jwt: null,
userData : null,
userRole : null,
setIsAuthenticated: (data) => set({ isAuthenticated:data }),
setJwt: (data) => set({ jwt:data }),
setUserData : (data) => set({ userData:data }),
setUserRole : (data) => set({ userRole:data })
}))