import { useTranslation } from "react-i18next"

import { Button } from "pgv-lib/ui/components"
import { DrawerFooter } from "pgv-lib/ui/drawer"
import { Stack } from "pgv-lib/ui/material"

import { useFormSupportDrawerFooterViewController } from "./useFormSupportDrawerFooterViewController"

export interface FormSupportDrawerFooterProps {
  formId?: string
  id?: string | number
  loading: boolean
}

export const FormSupportDrawerFooterView: React.FC<
  FormSupportDrawerFooterProps
> = ({ formId, loading, id }) => {
  const { t } = useTranslation()
  const { closeDrawer } = useFormSupportDrawerFooterViewController()

  const titleConfirmButton = id
    ? t(
        "crmMenus.registrations.registrationsTabContent.insignia.form.editLabel"
      )
    : t(
        "crmMenus.registrations.registrationsTabContent.insignia.form.createLabel"
      )

  return (
    <DrawerFooter>
      <Stack useFlexGap spacing={3} direction="row">
        <Button
          title={t("common.label.close")}
          variant="outlined"
          color="error"
          onClick={closeDrawer}
        >
          {t("common.label.close")}
        </Button>

        <Button
          title={titleConfirmButton}
          color="primary"
          variant="contained"
          loading={loading}
          type="submit"
          form={formId}
        >
          {titleConfirmButton}
        </Button>
      </Stack>
    </DrawerFooter>
  )
}
