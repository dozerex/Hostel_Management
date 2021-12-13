import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebaseConfig"
import axios from "axios"
import Cookies from "js-cookie"
import { useHistory } from "react-router"


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const history = useHistory();

  async function login(email, password) {
    // return auth.signInWithEmailAndPassword(email, password)
    const response = await axios({
      method: 'post',
      url: "http://127.0.0.1:4000/login",
      data: {
        email,
        password
      }
    })
    Cookies.set("token", response.data.token);
    setCurrentUser(response.data.user);
    setLoading(false);

  }

  async function logout() {
    const token = Cookies.get('token');
    console.log(token);
    const response = await axios({
      method: 'post',
      url: "http://127.0.0.1:4000/logout",
      data: {
        token
      }
    });
    Cookies.remove('token');
    setCurrentUser(undefined);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(async () => {
    
    try {
      console.log(Cookies.get('token'));
      const response = await axios({
        method: 'post',
        url: "http://127.0.0.1:4000/isLogined",
        data: {
          token: Cookies.get('token')
        }
      });
      setCurrentUser(response.data);
    } catch (e) {

    } 
    setLoading(false);
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
