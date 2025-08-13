
import io from "socket.io-client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { LogOut, MessageCircle } from "lucide-react"


const socket = io.connect("http://localhost:3000") // Connect to the server
export default function ChatPage() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const storedUserData = localStorage.getItem("userData")
    const token = localStorage.getItem("authToken")

    if (!storedUserData || !token) {
      navigate("/login")
      return
    }

    setUserData(JSON.parse(storedUserData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("authToken")
    navigate("/login")
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-md border-purple-300/20 mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={userData.profileLogo || "/placeholder.svg"}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-purple-300"
              />
              <div>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat Room
                </CardTitle>
                <p className="text-purple-200">Welcome, {userData.nickname}!</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-purple-300/30 text-purple-200 hover:bg-purple-600/20 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center text-purple-200 py-8">
              <p className="text-lg mb-2">🎉 Login successful!</p>
              <p>Your chat application is ready to use.</p>
              <p className="text-sm mt-4 text-purple-300">Email: {userData.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <script src="/socket.io/socket.io.js"></script>
      <script src="../socket.js"></script>
    </div>
  )
}
