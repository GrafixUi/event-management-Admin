import {create } from 'zustand'


export const useStore = create((set) => ({
isAuthenticated: false,
jwt: null,
userData : null,
setIsAuthenticated: (data) => set({ isAuthenticated:data }),
setJwt: (data) => set({ jwt:data }),
setUserData : (data) => set({ userData:data })
}))