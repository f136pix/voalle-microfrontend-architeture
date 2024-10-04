import { CrmFormsResponseDataType } from "modules/Example/types/CrmFormsResponseType"
import { Button } from "pgv-lib/ui/components"
import { AlertDialog } from "pgv-lib/ui/dialog"
import { Typography } from "pgv-lib/ui/material"
import { theme } from "pgv-lib/ui/themes"

import { useDeleteExampleViewController } from "./useDeleteExampleViewController"

interface DeleteExampleViewProps {
  item: CrmFormsResponseDataType
}

export const DeleteExampleView: React.FC<DeleteExampleViewProps> = ({
  item,
}) => {
  const { loading, closeDialog, deleteCrmForm, t } =
    useDeleteExampleViewController()

  return (
    <AlertDialog
      title={t("common.label.youSure")}
      icon="DeleteOutlinedPgv"
      iconColor={theme.palette.error.light}
      description={
        <Typography variant="subtitle1">
          Deseja realmente deletar o registro <strong>{item.title}</strong>?
        </Typography>
      }
      contentProps={{
        dividerTop: true,
      }}
      cancelBtn={
        <Button color="error" variant="outlined" onClick={closeDialog}>
          {t("common.label.cancel")}
        </Button>
      }
      confirmBtn={
        <Button
          variant="contained"
          onClick={() => deleteCrmForm(item.id)}
          loading={loading}
          autoFocus
        >
          {t("common.label.yes.wantDelete")}
        </Button>
      }
    />
  )
}
