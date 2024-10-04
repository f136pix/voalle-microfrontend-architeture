import { useDrawer } from "pgv-lib/ui/drawer"

export const useFormSupportDrawerFooterViewController = () => {
  const { closeDrawer } = useDrawer()

  return { closeDrawer }
}
