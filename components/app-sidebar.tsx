"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Contact, SignpostBig, Home, Search, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Contact",
    url: "/contato",
    icon: Contact,
  },
  {
    title: "Search",
    url: "buscar",
    icon: Search,
  },
]

export function AppSidebar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const supabase = createClient()
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
            
    console.log("oi")

    redirect("/")
  }

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()

    console.log("This is user data ", data)

    if (data.user?.aud === "authenticated") setIsAuthenticated(true)
    else setIsAuthenticated(false)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <SignpostBig />
                <span className="text-base font-semibold">VIA de Acesso</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link className="text-gray-900" href={item.url}>
                        <item.icon />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div>Brahamahaj Development Centre</div>
            {isAuthenticated && (
              <Button onClick={handleLogout} className="bg-transparent text-black border-[1px] hover:bg-gray-100 border-[#0003]">
                <LogOut />
              </Button>
            )}
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
