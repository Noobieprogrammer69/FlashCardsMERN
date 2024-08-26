import { useRecoilValue } from "recoil"

import authScreenAtom from "../atoms/authAtom"
import { Login, SignUp } from "../components"

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom)
    console.log(authScreenState)
  return (
    <>
        {authScreenState === "login" ? <Login /> : <SignUp />}
    </>
  )
}

export default AuthPage