export interface CrmFormsResponseDataType {
  id: number
  code: number | string
  title: string
  description: string
  synsuiteCode: number | null
  created: string
  modified: string
  createdBy: number
  modifiedBy: number
  active: boolean
}
