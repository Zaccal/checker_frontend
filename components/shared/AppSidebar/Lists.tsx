import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import ActiveLink from '../Common/ActiveLink'

const Lists = () => {
	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel className="font-bold">Lists</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{/* {SIDEBAR_ITEMS.map(data => ( */}
						{/* 	<SidebarMenuItem key={data.id}> */}
						{/* 		<SidebarMenuButton asChild> */}
						{/* 			<ActiveLink */}
						{/* 				classNameeActive="bg-sidebar-accent" */}
						{/* 				href={data.url} */}
						{/* 			> */}
						{/* 				<data.icon /> */}
						{/* 				<span>{data.title}</span> */}
						{/* 			</ActiveLink> */}
						{/* 		</SidebarMenuButton> */}
						{/* 	</SidebarMenuItem> */}
						{/* ))} */}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</>
	)
}

export default Lists
