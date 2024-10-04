import { useState, useLayoutEffect } from "react"
import useAuthStore from "./services/auth/auth"
import { Routes } from "routes/Routes"

const App = () => {
  const { mockLogin, populateAuthStore } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const isDevelopment = !!(process.env.NODE_ENV === "development")
    setLoading(true)
    if (isDevelopment) {
      mockLogin(
        `${process.env.REACT_APP_SYSTEM_PATH}`,
        `${process.env.REACT_APP_USERNAME}`,
        `${process.env.REACT_APP_PASSWORD}`,
        `${process.env.REACT_APP_SYNDATA}`
      )
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    } else {
      populateAuthStore()
      setLoading(false)
    }
  }, [])

  if (loading) return <></>

  return <Routes />
}

export default App
