import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import ActiveLink from '../Common/ActiveLink'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { TodoList } from '@/types/API.type'
import { LIST_ENDPOINT_PROTECTED } from '@/lib/constants/endpoints'

export const Incoming = async () => {
	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel className="font-bold">Incoming</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{/* {lists.map(data => ( */}
						{/* 	<SidebarMenuItem key={data.id}> */}
						{/* 		<SidebarMenuButton asChild> */}
						{/* 			<ActiveLink */}
						{/* 				classNameeActive="bg-sidebar-accent" */}
						{/* 				href={data.id} */}
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
