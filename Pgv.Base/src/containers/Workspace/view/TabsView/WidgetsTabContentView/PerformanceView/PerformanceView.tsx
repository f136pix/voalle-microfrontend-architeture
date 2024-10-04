import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader } from "pgv-lib/ui/components"
import { Typography } from "pgv-lib/ui/material"

const PerformanceView = () => {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader
        title={t("workspace.tabs.widgets.performance.title")}
        titleTypographyProps={{ variant: "body1", fontWeight: "bold" }}
        sx={{ borderBottom: 1, borderColor: "divider", height: "44px" }}
      />
      <CardContent>
        <Typography>PerformanceView</Typography>
      </CardContent>
    </Card>
  )
}

export default PerformanceView
