import { useTranslation } from "react-i18next"

import { DrawerHeaderTemplate } from "pgv-lib/ui/drawer"

import { useFormSupportDrawerHeaderViewController } from "./useFormSupportDrawerHeaderViewController"

export interface FormSupportDrawerHeaderViewProps {
  id?: string | number
}

export const FormSupportDrawerHeaderView: React.FC<
  FormSupportDrawerHeaderViewProps
> = ({ id }) => {
  const { t } = useTranslation()
  const { pageTitle } = useFormSupportDrawerHeaderViewController()

  return (
    <DrawerHeaderTemplate
      pageTitle={pageTitle}
      title={t(
        !id
          ? "crmMenus.registrations.registrationsTabContent.insignia.form.titleDrawer"
          : "crmMenus.registrations.registrationsTabContent.insignia.form.titleEditDrawer"
      )}
      description={t(
        !id
          ? "crmMenus.registrations.registrationsTabContent.insignia.form.descriptionDrawer"
          : "crmMenus.registrations.registrationsTabContent.insignia.form.descriptionEditDrawer"
      )}
    />
  )
}
