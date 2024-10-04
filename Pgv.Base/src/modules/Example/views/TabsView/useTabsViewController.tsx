import {TabsProps} from "pgv-lib/ui/components"
import {theme} from "pgv-lib/ui/themes"
import ExampleView from "../ExampleView/ExampleView.tsx"

const UseTabsViewController = () => {
    const tabs: TabsProps["tabs"] = [
        {
            tabContent: "Example",
            panelContent: <ExampleView/>,
            tabTextActiveColor: theme.palette.primary.contrastText,
            tabTextColor: theme.palette.primary.contrastText,
            tabIndicatorColor: theme.palette.accent.crm,
            hash: "example"
        },
        // {
        //     tabContent: "teste",
        //     panelContent: <h2>Datagrid</h2>,
        //     tabTextActiveColor: theme.palette.primary.contrastText,
        //     tabTextColor: theme.palette.primary.contrastText,
        //     tabIndicatorColor: theme.palette.accent.crm,
        //     hash: "teste"
        // }
    ]

    return {
        tabs
    }
}

export default UseTabsViewController