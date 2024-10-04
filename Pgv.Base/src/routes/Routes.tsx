import React, {Suspense} from "react"
import {Route, Routes as RoutesRouterDom} from "react-router-dom"

import TemplateView from "containers/Template/view/TemplateView"
import {LoadingBrand} from "pgv-lib/ui/components"
import {Box} from "pgv-lib/ui/material"
import {Iframe} from "containers/Iframe/Iframe"
import {TabsView} from "../modules/Example/views/TabsView/TabsView.tsx";

const WorkspaceView = React.lazy(() =>
    import("containers/Workspace/view/WorkspaceView").then((module) => ({
        default: module.WorkspaceView,
    }))
)

export const Routes = () => (
    <RoutesRouterDom>
        <Route
            path="/"
            element={
                <Suspense fallback={<LoadingBrand/>}>
                    <Box display="flex" flexDirection="column">
                        <TemplateView>
                            <WorkspaceView/>
                        </TemplateView>
                    </Box>
                </Suspense>
            }
        />

        <Route
            path="/example"
            element={
                <TemplateView>
                    <div style={{
                        width: "100%",
                    }}>
                        <TabsView/>
                    </div>
                </TemplateView>
            }
        />

        <Route
            path="/php"
            element={
                <Suspense fallback={<LoadingBrand/>}>
                    <Box display="flex" flexDirection="column">
                        <TemplateView>
                            <Iframe/>
                        </TemplateView>
                    </Box>
                </Suspense>
            }
        />
    </RoutesRouterDom>
)
