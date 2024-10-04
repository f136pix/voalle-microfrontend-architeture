import {get} from "../../../services/requests/requests.ts"
import {toQueryParams} from "pgv-lib/functions"
import {DatagridParamsType, DatagridRequestReturnType} from "pgv-lib/patterns"
import {CrmFormsResponseDataType} from "../types/CrmFormsResponseType.ts"

export const getCrmForms = async (params: DatagridParamsType): Promise<DatagridRequestReturnType<CrmFormsResponseDataType>> => {
    const {body} = await get({
        endpoint: `Crm/CrmForms?${toQueryParams(params, [])}`,
        snackbarOptions: {
            anchorOrigin: {
                horizontal: "right",
                vertical: "top"
            }
        }
    })

    if (body.success) {
        throw body
    }

    return body
}