import { Container, BoxLogin } from "./LoginView.styles"
import { Box, Typography } from "pgv-lib/ui/material"
import { ExportComponentsWrapperProvider } from "providers/ExportComponentsWrapperProvider/ExportComponentsWrapperProvider"
import FormLogin from "./FormLoginView/FormLoginView"
import CarouselView from "./CarouselView/CarouselView"
import { ErpVoalleLogoSVG, GrupoVoalleLogoSVG } from "pgv-lib/ui/logos"

const LoginView = () => {
  return (
    <ExportComponentsWrapperProvider>
      <Container>
        <BoxLogin>
          <div className="form-login">
            <img src={ErpVoalleLogoSVG} />
            <Typography variant="h6" sx={{ fontWeight: 400 }} mt={10} mb={2}>
              Login
            </Typography>
            <FormLogin />
            <Box mt={8}>
              <img src={GrupoVoalleLogoSVG} />
            </Box>
          </div>
        </BoxLogin>
        <Box width={"60%"} position={"relative"}>
          <CarouselView />
        </Box>
      </Container>
    </ExportComponentsWrapperProvider>
  )
}

export default LoginView
