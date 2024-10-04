import { sortBy } from "lodash"

export const onSortMock = (values: any, orderBy: any) => {
  if (!orderBy || orderBy?.length < 1) return values
  const formatedValues = sortBy(values, orderBy[0]["PropertyName"])
  return orderBy[0]["Dir"] === "a" ? formatedValues : formatedValues.reverse()
}

export const onPaginateMock = (values: any, page: any, pageSize: any) => {
  if (!page || !pageSize) return values
  const start = page === 1 ? page - 1 : (page - 1) * pageSize
  const end = start + pageSize
  return values.slice(start, end)
}

export const onSearchMock = (values: any, filter: any) => {
  if (!filter || !filter?.Values || !filter?.Connector) return values
  const formatedValues = values.filter((value: any) => {
    const match: any = []
    filter.Values.forEach((filterValue: any) => {
      if (filterValue["Operation"] === "Equals") {
        if (typeof value[filterValue["PropertyName"]] === "boolean") {
          match.push(
            value[filterValue["PropertyName"]] === filterValue["Value"]
          )
        } else {
          match.push(
            `${value[filterValue["PropertyName"]]}`.toLocaleLowerCase() ===
              filterValue["Value"].toLocaleLowerCase()
          )
        }
      } else {
        match.push(
          `${value[filterValue["PropertyName"]]}`
            .toLocaleLowerCase()
            .includes(filterValue["Value"].toLocaleLowerCase())
        )
      }
    })
    if (filter.Connector === "Or") {
      return match.includes(true)
    } else {
      const trueFilters = match.filter((val: boolean) => val)
      return trueFilters.length === match.length
    }
  })

  return formatedValues
}

export const onFilterValuesMock = (values: any, params: any) => {
  let formatedData = onSearchMock(values, params?.Filter)
  formatedData = onSortMock(formatedData, params?.OrderBy)
  formatedData = onPaginateMock(formatedData, params?.Page, params?.PageSize)
  return formatedData
}
