"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Loader2, User, Mail, Lock, MessageCircle } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  // Random profile avatars
  const profileLogos = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
  ]

  const getRandomProfileLogo = () => {
    return profileLogos[Math.floor(Math.random() * profileLogos.length)]
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        // Store token if provided in headers
        const token = response.headers.get("Authorization")
        if (token) {
          localStorage.setItem("authToken", token)
        }

        // Store user data
        const userWithLogo = {
          ...data.user,
          profileLogo: getRandomProfileLogo(),
        }
        setUserData(userWithLogo)
        localStorage.setItem("userData", JSON.stringify(userWithLogo))

        setLoginSuccess(true)

        // Redirect to chat after 2 seconds
        setTimeout(() => {
          navigate("/chat")
        }, 2000)
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("Network error. Please check if the server is running.")
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (loginSuccess && userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-purple-300/20">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <img
                src={userData.profileLogo || "/placeholder.svg"}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-purple-300"
              />
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
              <p className="text-purple-200">Hello, {userData.email}</p>
            </div>
            <div className="flex items-center justify-center text-purple-200">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Redirecting to chat...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-purple-300/20">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-purple-300 mr-2" />
            <CardTitle className="text-2xl font-bold text-white">Chat Login</CardTitle>
          </div>
          <p className="text-purple-200">Welcome back! Please sign in to continue.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password (min 6 characters)"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400"
                disabled={isLoading}
                minLength={6}
              />
            </div>

            {error && (
              <Alert className="bg-red-500/20 border-red-400/30 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-purple-300 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-purple-200 hover:text-white underline font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
