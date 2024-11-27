import React from "react"
import {Container} from "./ExampleView.styles.ts"
import {Card, CardContent, CardHeader, Datagrid, DatagridToolbar, IconButton, InputSearch} from "pgv-lib/ui/components"
import exampleViewController from "./useExampleViewController.tsx"
import DatagridFilterView from "./DatagridFilterView/DatagridFilterView.tsx"
import {GridPaginationModel} from "@mui/x-data-grid"
import {Box} from "pgv-lib/ui/material"

function ExampleView(): React.ReactNode {
    const {
        t,
        columns,
        rows,
        loading,
        handleOnSearch,
        onSortModelChange,
        rowActions,
        page,
        onPageChange,
        params,
        addCrmForm
    } = exampleViewController()

    return (
        <Container>
            <Card>
                <CardHeader title={t("examples.title")}/>
                <CardContent>
                    <Datagrid
                        toolbar={
                            <DatagridToolbar className={"datagrid-toolbar"}>
                                <IconButton icon="Add" variant="contained" onClick={addCrmForm} tooltip="Adicionar"/>
                                <Box className={"datagrid-toolbar-filter"}>
                                    <InputSearch onChange={handleOnSearch} debounceMilliseconds={100}/>
                                    <DatagridFilterView/>
                                </Box>
                            </DatagridToolbar>
                        }
                        onSortModelChange={onSortModelChange}
                        columns={columns}
                        rows={rows.data}
                        rowActions={rowActions}
                        pagination={{
                            page: page,
                            pageSize: params?.PageSize ?? 10,
                            rowCount: rows.totalRecords,
                            onPaginationModelChange: (datagridParams: GridPaginationModel) => onPageChange(datagridParams.page)
                        }}
                        loading={loading}
                    />
                </CardContent>
            </Card>

        </Container>
    )
}

export default ExampleView