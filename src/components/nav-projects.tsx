import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useRouter } from 'next/router'

export function NavProjects({
  projects,
  name,
}: {
  projects: {
    name: string
    url?: string
    icon: LucideIcon
    onClick?: Function
  }[]
  name: string
}) {
  const { pathname } = useRouter()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{name}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a
                className={`cursor-pointer flex items-center p-2 rounded-md transition-colors ${
                  pathname === item.url ? 'bg-gray-200 text-black hover:bg-gray-200' : 'hover:bg-gray-150'
                }`}
                onClick={() => item.onClick && item.onClick()}
                href={item.url}
              >
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
