import { DatagridFilter, TextField } from "pgv-lib/ui/components"
import { Box } from "pgv-lib/ui/material"

import { useDatagridFilterViewController } from "./useDatagridFilterViewController"

export const DatagridFilterView = () => {
  const {
    internalFilters,
    handleOnChange,
    open,
    toggleOpen,
    resetFilters,
    handleSetFilters,
    filtersCount,
    t,
  } = useDatagridFilterViewController()
  return (
    <DatagridFilter
      open={open}
      toggleOpen={toggleOpen}
      resetFilters={resetFilters}
      filtersCount={filtersCount}
      setFilters={handleSetFilters}
    >
      <Box>
        <TextField
          label={t("examples.datagridColumns.code")}
          value={internalFilters.Values[0]?.Value}
          onChange={(e) => handleOnChange(0, e.target.value)}
          fullWidth
        />
      </Box>
      <Box mt={1}>
        <TextField
          label={t("examples.datagridColumns.title")}
          value={internalFilters.Values[1]?.Value}
          onChange={(e) => handleOnChange(1, e.target.value)}
          fullWidth
        />
      </Box>
      <Box mt={2}>
        <TextField
          label={t("examples.datagridColumns.description")}
          value={internalFilters.Values[2]?.Value}
          onChange={(e) => handleOnChange(2, e.target.value)}
          fullWidth
        />
      </Box>
    </DatagridFilter>
  )
}
