import { ChangeEvent, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { CrmFormsResponseDataType } from "modules/Example/types/CrmFormsResponseType"
import { useExampleViewModel } from "modules/Example/viewmodel/useExampleViewModel"
import { DatagridActionProps, DatagridColDef } from "pgv-lib/ui/components"
import { useDialog } from "pgv-lib/ui/dialog"
import { useDrawer } from "pgv-lib/ui/drawer"
import { Cancel, CheckCircle } from "pgv-lib/ui/icons"

import { DeleteExampleView } from "./DeleteExampleView/DeleteExampleView"
import { FormExampleView } from "./FormExampleView/FormExampleView"

export const useExampleViewController = () => {
  const {
    fetchData,
    params,
    page,
    values,
    onSortModelChange,
    loading,
    onParamsSearch,
    onPageChange,
  } = useExampleViewModel()

  const { t } = useTranslation()
  const { openDrawer } = useDrawer()
  const { openDialog } = useDialog()

  const columns: DatagridColDef<CrmFormsResponseDataType>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "code",
      headerName: t("examples.datagridColumns.code"),
      width: 90,
      sortable: true,
      searchable: true,
      searchOperation: "Contains",
    },
    {
      field: "title",
      headerName: t("examples.datagridColumns.title"),
      sortable: true,
      searchable: true,
      searchOperation: "Contains",
    },
    {
      field: "description",
      headerName: t("examples.datagridColumns.description"),
    },
    {
      field: "active",
      headerName: t("examples.datagridColumns.active"),
      headerAlign: "center",
      align: "center",
      width: 70,
      renderCell: ({ value }) => {
        const icon = value ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        )
        return icon
      },
    },
  ]

  const handleOnSearch = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onParamsSearch(event.target.value, columns)
  }

  const addCrmForm = () => {
    openDrawer({
      drawerContent: <FormExampleView />,
      drawerProps: {
        PaperProps: {
          sx: {
            width: "600px",
          },
        },
      },
    })
  }

  const rowActions = (
    row: CrmFormsResponseDataType
  ): DatagridActionProps<CrmFormsResponseDataType>[] => [
    {
      icon: "EditOutlined",
      color: "secondary",
      disabled: !!row.synsuiteCode,
      onClick: () => {
        openDrawer({
          drawerContent: <FormExampleView id={row.id} />,
          drawerProps: {
            PaperProps: {
              sx: {
                width: "600px",
              },
            },
          },
        })
      },
    },
    {
      icon: "DeleteOutlinedPgv",
      color: "secondary",
      disabled: !!row.synsuiteCode,
      onClick: () => {
        openDialog({
          dialogContent: <DeleteExampleView item={row} />,
        })
      },
    },
  ]

  useEffect(() => {
    if (fetchData) {
      fetchData()
    }
  }, [params, page])

  return {
    t,
    columns,
    values,
    onSortModelChange,
    handleOnSearch,
    loading,
    addCrmForm,
    params,
    page,
    onPageChange,
    rowActions,
  }
}
