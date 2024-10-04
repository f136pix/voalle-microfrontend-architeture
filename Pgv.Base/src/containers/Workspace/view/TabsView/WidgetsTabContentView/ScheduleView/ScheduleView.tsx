import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader } from "pgv-lib/ui/components"
import { Typography } from "pgv-lib/ui/material"

const ScheduleView = () => {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader
        title={t("workspace.tabs.widgets.schedule.title")}
        titleTypographyProps={{ variant: "body1", fontWeight: "bold" }}
        sx={{ borderBottom: 1, borderColor: "divider", height: "44px" }}
      />

      <CardContent>
        <Typography>ScheduleView</Typography>
      </CardContent>
    </Card>
  )
}

export default ScheduleView
