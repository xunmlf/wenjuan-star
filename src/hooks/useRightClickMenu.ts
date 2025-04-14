// hooks/useRightClickMenu.ts
import { useContextMenu } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'

const MENU_ID = 'right_click_menu'

export const useRightClickMenu = () => {
  const { show } = useContextMenu({
    id: MENU_ID
  })

  const handleContextMenu = (e: React.MouseEvent, data: any) => {
    e.preventDefault()
    show({
      event: e,
      props: data // ✅ 自定义要传入菜单的数据，如组件id等
    })
  }

  return {
    MENU_ID,
    handleContextMenu
  }
}
