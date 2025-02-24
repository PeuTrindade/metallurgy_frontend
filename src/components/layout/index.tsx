import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { me } from '@/requestFunctions/login'
import { getValueIntoCookies, removeValueIntoCookies } from '@/utils/cookiesManagerFunctions'
import { clearSessionStorage, insertIntoSessionStorage } from '@/utils/sessionStorageFunctions'
import { clearLocalStorage } from '@/utils/storageManagerFunctions'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function Layout({ children }: any) {
  const { push } = useRouter()
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  const validateToken = useCallback(async (token: string) => {
    try {
      const response = (await me(token)) as Response

      if (response.ok) {
        const data = await response.json()

        insertIntoSessionStorage('userInfo', data.user, true)
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }, [])

  const logoutUser = useCallback(() => {
    clearLocalStorage()
    clearSessionStorage()

    removeValueIntoCookies('loginData')

    push('/login')
  }, [])

  const verifyUserAuth = useCallback(async () => {
    setIsLoadingAuth(true)

    const tokenInfo = getValueIntoCookies('loginData', true)
    const now = new Date().getTime()

    if (!tokenInfo) {
      return logoutUser()
    }

    if (now > tokenInfo.expiresIn) {
      return logoutUser()
    }

    const isTokenValid = await validateToken(tokenInfo.token)

    if (!isTokenValid) {
      return logoutUser()
    }

    setIsLoadingAuth(false)
  }, [])

  useEffect(() => {
    verifyUserAuth()
  }, [verifyUserAuth])

  if (!isLoadingAuth)
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            {children}
          </header>
        </SidebarInset>
      </SidebarProvider>
    )
}
