import React from "react"

import {
  Card,
  CardContent,
  CardHeader,
  Datagrid,
  DatagridToolbar,
  IconButton,
  InputSearch,
} from "pgv-lib/ui/components"
import { Box } from "pgv-lib/ui/material"

import { DatagridFilterView } from "./DatagridFilterView/DatagridFilterView"
import { Container } from "./ExampleView.styles"
import { useExampleViewController } from "./useExampleViewController"

export const ExampleView: React.FC = () => {
  const {
    t,
    values,
    columns,
    onSortModelChange,
    loading,
    handleOnSearch,
    addCrmForm,
    onPageChange,
    params,
    page,
    rowActions,
  } = useExampleViewController()
  return (
    <Container>
      <Card>
        <CardHeader title={t("examples.title")} />
        <CardContent>
          <Datagrid
            toolbar={
              <DatagridToolbar className="datagrid-toolbar">
                <IconButton
                  icon="Add"
                  variant="contained"
                  onClick={addCrmForm}
                />
                <Box className="datagrid-toolbar-filters">
                  <InputSearch onChange={handleOnSearch} />
                  <DatagridFilterView />
                </Box>
              </DatagridToolbar>
            }
            columns={columns}
            rows={values.data}
            pagination={{
              page,
              pageSize: params?.PageSize ?? 10,
              rowCount: values.totalRecords,
              onPaginationModelChange: ({ page }) => onPageChange(page),
            }}
            rowActions={rowActions}
            onSortModelChange={onSortModelChange}
            loading={loading}
          />
        </CardContent>
      </Card>
    </Container>
  )
}
