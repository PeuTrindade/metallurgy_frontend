import { Separator } from '@radix-ui/react-separator'
import { SidebarTrigger } from '../ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '../ui/breadcrumb'

const PageContainer = ({
  children,
  linksList,
}: { children: React.ReactNode; linksList: { name: string; href: string }[] }) => {
  return (
    <div className="w-full h-full flex flex-col pt-16">
      <div className="fixed z-50 top-0 flex w-full items-center gap-4 p-4 border-b bg-white shadow-sm">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4 w-px bg-gray-300" />

        {linksList.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {linksList.map((l, key) => (
                <BreadcrumbItem key={key} className="hidden md:block">
                  <BreadcrumbLink href={l.href}>{l.name}</BreadcrumbLink>
                </BreadcrumbItem>
              ))}
              {/* 
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      <div className="w-full h-full flex flex-col p-6 text-gray-900">{children}</div>
    </div>
  )
}

export default PageContainer
