import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

const SidebarMenuBtn = () => {
  return (
    <div className="fixed bottom-2 right-2">
      <Button asChild size={'icon'} variant={'outline'}>
        <SidebarTrigger />
      </Button>
    </div>
  )
}

export default SidebarMenuBtn
