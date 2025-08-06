import React, { createContext, useContext, useEffect, useState } from 'react'
const Context=createContext()
export const useUserContext=()=>useContext(Context)
export default function UserProvider({children}) {
    const[user,setUser]=useState(()=>{
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : { username: "", email: "", password: "" };})
    const addUser=(data)=>{
        setUser(data)
    }
    const logout=()=>{
        setUser({ username: "", email: "", password: "" })
    }
    useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <Context.Provider value={{user,addUser,logout}}>
      {children}
    </Context.Provider>
  )
}
