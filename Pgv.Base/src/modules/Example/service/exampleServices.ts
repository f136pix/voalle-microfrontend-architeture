import {get, post, put} from "../../../services/requests/requests.ts"
import {toQueryParams} from "pgv-lib/functions"
import {DatagridParamsType, DatagridRequestReturnType} from "pgv-lib/patterns"
import {CrmFormsResponseDataType} from "../types/CrmFormsResponseType.ts"
import {FormExampleValidator} from "../validators/FormExampleValidator.ts"

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

    if (!body.success) {
        throw body
    }

    return body
}

export const postCrmForms = async (controls: FormExampleValidator) => {
    const {body} = await post({
        endpoint: "CRM/CrmForms",
        data: controls
    })

    if (!body.success) {
        throw body
    }

    return body
}

export const putCrmForms = async (controls: FormExampleValidator) => {
    const {id} = controls
    const {body} = await put({
        endpoint: `Crm/CrmForms/${id}`,
        data: controls
    })

    if (!body) {
        throw body
    }

    return body
}

export const getCrmFormById = async (id: string | number) : Promise<DatagridRequestReturnType<CrmFormsResponseDataType>> => {
    const {body} = await get({
        endpoint: `Crm/CrmForms/${id}`,
    })

    if(!body.success) {
        throw body
    }

    console.log(body)
    return body
}
