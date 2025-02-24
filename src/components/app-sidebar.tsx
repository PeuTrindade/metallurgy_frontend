import * as React from 'react'
import { Workflow, Bolt, BookOpen, CreditCard, CircleUserRound, Settings, LogOut } from 'lucide-react'
import { NavProjects } from '@/components/nav-projects'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { NavUser } from './nav-user'
import { clearLocalStorage } from '@/utils/storageManagerFunctions'
import { clearSessionStorage } from '@/utils/sessionStorageFunctions'
import { removeValueIntoCookies } from '@/utils/cookiesManagerFunctions'
import { useRouter } from 'next/router'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { push } = useRouter()

  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    projects: [
      {
        name: 'Peças',
        url: '/',
        icon: Bolt,
      },
      {
        name: 'Fluxos',
        url: '/flows',
        icon: Workflow,
      },
      {
        name: 'Relatórios',
        url: '/reports',
        icon: BookOpen,
      },
    ],
    personal: [
      {
        name: 'Pagamento',
        url: '/flows',
        icon: CreditCard,
      },
      {
        name: 'Minha conta',
        url: '/reports',
        icon: CircleUserRound,
      },
      {
        name: 'Configurações',
        url: '/parts',
        icon: Settings,
      },
      {
        name: 'Sair',
        onClick: () => {
          clearLocalStorage()
          clearSessionStorage()

          removeValueIntoCookies('loginData')

          push('/login')
        },
        icon: LogOut,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarContent>
        <NavProjects name="Produção" projects={data.projects} />
        <NavProjects name="Conta" projects={data.personal} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
