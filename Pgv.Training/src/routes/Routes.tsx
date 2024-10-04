import React from "react"
import { Routes as RoutesRouterDom, Route } from "react-router-dom"

import { TabsView } from "modules/Example/view/TabsView/TabsView"

const Template = React.lazy(() => import("pgv-mfe-base/Template"))

const Routes = () => {
  return (
    <RoutesRouterDom>
      <Route
        path="/"
        element={
          <Template>
            <div
              style={{
                width: "100%",
              }}
            >
              <TabsView />
            </div>
          </Template>
        }
      />
    </RoutesRouterDom>
  )
}

export default Routes
