import { TabActionPabx } from "containers/Template/components/TabActionPabx/TabActionPabx"

import { useTabActionPabxViewController } from "./useTabActionPabxViewController"

const TabActionPabxView = () => {
  const { open, setOpen } = useTabActionPabxViewController()

  return (
    <TabActionPabx open={open} setOpen={setOpen}>
      <></>
    </TabActionPabx>
  )
}

export default TabActionPabxView
