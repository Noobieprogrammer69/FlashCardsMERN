import { Navigate, Route, Routes } from "react-router-dom"
import { AuthPage, HomePage } from "./pages"
import { FlashCard, Headers } from "./components"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import CreateCard from "./components/CreateCard"
import UpdateFlashCard from "./components/UpdateFlashCards"

function App() {
  const user = useRecoilValue(userAtom)

  return (
    <div>
      { user && <Headers /> }
      <Routes>
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/create-card" element={user ? <CreateCard /> : <Navigate to="/auth" />} />
        <Route path="/study/:id" element={user ? <FlashCard /> : <Navigate to="/auth" />} />
        <Route path="/update/:id" element={user ? <UpdateFlashCard /> : <Navigate to="/auth" />} />

      </Routes>
    </div>
  )
}

export default App
