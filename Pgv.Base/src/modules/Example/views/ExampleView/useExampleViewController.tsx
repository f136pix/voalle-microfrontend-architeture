import {useTranslation} from "react-i18next"
import {DatagridActionProps, DatagridColDef,} from "pgv-lib/ui/components"
import {CrmFormsResponseDataType} from "../../types/CrmFormsResponseType.ts"
import {GridCheckIcon, GridCloseIcon} from "@mui/x-data-grid"
import {useExampleViewModel} from "../../viewmodel/useExampleViewModel.ts";
import {ChangeEvent, useEffect} from "react"
import {useDrawer} from "pgv-lib/ui/drawer";
import FormExampleView from "../FormExampleView/FormExampleView.tsx";


function UseExampleViewController() {
    const {
        fetchData,
        params,
        values,
        loading,
        onSortModelChange,
        onParamsSearch,
        page,
        onPageChange
    } = useExampleViewModel()
    const {openDrawer} = useDrawer()
    const {t} = useTranslation()

    const columns: DatagridColDef<CrmFormsResponseDataType>[] = [
        {
            field: "id",
            headerName: "Id",
            width: 70,
        },
        {
            field: "code",
            headerName: t("examples.datagridColumns.code"),
            width: 90,
            sortable: true,
            searchable: true,
            searchOperation: "Contains"
        },
        {
            field: "title",
            headerName: t("examples.datagridColumns.title"),
            sortable: true,
            searchable: true,
            searchOperation: "Contains"
        },
        {
            field: "description",
            headerName: t("examples.datagridColumns.description")
        },
        {
            field: "active",
            headerName: t("examples.datagridColumns.active"),
            headerAlign: "center",
            align: "center",
            width: 70,
            renderCell: ({value /*,row*/}) => {
                // const icon = row.active ? (
                const icon = value ? (
                    <GridCheckIcon color={"success"}/>
                ) : (
                    <GridCloseIcon color={"error"}/>
                )
                return icon
            }
        }
    ]

    const handleOnSearch = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onParamsSearch(e.target.value, columns)
    }

    const addCrmForm = () => {
        openDrawer({
            drawerContent: <FormExampleView/>,
            drawerProps: {
                PaperProps: {
                    sx: {
                        width: "600px"
                    }
                }
            }
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
                                width: "600px"
                            }
                        }
                    }
                })
            }
        }
    ]


    useEffect(() => {
        if (fetchData) {
            fetchData()
        }
    }, [params, page])

    return ({
        t,
        columns,
        rows: values,
        params,
        addCrmForm,
        onSortModelChange,
        handleOnSearch,
        rowActions,
        loading,
        page,
        onPageChange
    })
}

export default UseExampleViewController