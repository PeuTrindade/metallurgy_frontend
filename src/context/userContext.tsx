import React, { createContext, ReactNode, useContext, useState } from 'react'

interface ILoginContext {
  userData: any
  setUserData: React.Dispatch<any>
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext<ILoginContext>({} as ILoginContext)

UserContext.displayName = 'UserContext'

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>({})
  const [accessToken, setAccessToken] = useState<string>('')

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  return context
}
