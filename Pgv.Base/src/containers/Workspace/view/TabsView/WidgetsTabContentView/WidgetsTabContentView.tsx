import { Grid } from "pgv-lib/ui/material"
import { Container } from "./WidgetsTabContentView.styles"
import FavoritesView from "./FavoritesView/FavoritesView"
import ScheduleView from "./ScheduleView/ScheduleView"
import ActivitiesView from "./ActivitiesView/ActivitiesView"
import PerformanceView from "./PerformanceView/PerformanceView"

const WidgetsTabContentView = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={3} xl={2}>
          <FavoritesView />
        </Grid>
        <Grid item md={3} xl={4}>
          <ScheduleView />
        </Grid>
        <Grid item md={3} xl={3}>
          <ActivitiesView />
        </Grid>
        <Grid item md={3} xl={3}>
          <PerformanceView />
        </Grid>
      </Grid>
    </Container>
  )
}

export default WidgetsTabContentView
