import * as React from 'react'
import { Workflow, Bolt, BookOpen, CreditCard, CircleUserRound, Settings, LogOut } from 'lucide-react'
import { NavProjects } from '@/components/nav-projects'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { NavUser } from './nav-user'
import { clearLocalStorage } from '@/utils/storageManagerFunctions'
import { clearSessionStorage } from '@/utils/sessionStorageFunctions'
import { removeValueIntoCookies } from '@/utils/cookiesManagerFunctions'
import { useRouter } from 'next/router'
import { useUser } from '@/context/userContext'
import { NavMain } from './nav-main'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { push } = useRouter()
  const { userData } = useUser()

  const data = {
    user: {
      name: userData.fullName,
      email: userData.email,
      avatar: '/avatars/shadcn.jpg',
    },
    projects: [
      {
        title: 'Peças',
        url: '/',
        icon: Bolt,
        items: [
          {
            title: 'Listar peças',
            url: '/',
          },
          {
            title: 'Cadastrar peça',
            url: '/parts/createPart',
          },
        ],
      },
      {
        title: 'Fluxos',
        url: '/flows',
        icon: Workflow,
        items: [
          {
            title: 'Listar fluxos',
            url: '/flows',
          },
          {
            title: 'Cadastrar fluxo',
            url: '/flows/create',
          },
        ],
      },
    ],
    AI: [
      {
        name: 'Relatórios',
        url: '/reports',
        icon: BookOpen,
      },
    ],
    personal: [
      {
        name: 'Pagamento',
        url: '/payment',
        icon: CreditCard,
      },
      {
        name: 'Minha conta',
        url: '/reports',
        icon: CircleUserRound,
      },
      {
        name: 'Configurações',
        url: '/settings',
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
        <NavMain items={data.projects} />
        <NavProjects name="Gerados por IA" projects={data.AI} />
        <NavProjects name="Conta" projects={data.personal} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
