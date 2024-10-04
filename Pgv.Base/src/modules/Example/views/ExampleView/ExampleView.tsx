import React from "react"
import {Container} from "./ExampleView.styles.ts"
import {Card, CardContent, CardHeader, Datagrid} from "pgv-lib/ui/components"
import exampleViewController from "./ExampleViewController.tsx";

function ExampleView(): React.ReactNode {
    const {t} = exampleViewController()

    return (
        <Container>
            <Card>
                <CardHeader title={t("examples.title")}/>
                <CardContent>
                    <Datagrid
                        columns={[]}
                        rows={[]}
                    />
                </CardContent>
            </Card>

        </Container>
    )
}

export default ExampleView