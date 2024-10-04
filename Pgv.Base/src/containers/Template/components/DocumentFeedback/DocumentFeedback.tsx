import React from "react"
import { Container } from "./DocumentFeedback.styles"
import { Typography } from "pgv-lib/ui/material"
import { Trans, useTranslation } from "react-i18next"
import { CircularProgress } from "pgv-lib/ui/components"

export interface DocumentFeedbackProps {
  feedback?: boolean
  setFeedback: (menuId: number | string, feedback: boolean) => void
  loading?: boolean
  loadingSetFeedback?: boolean
  positiveFeedbacks?: number
  menuId: number | string
}

export const DocumentFeedback: React.FC<DocumentFeedbackProps> = ({
  loading = false,
  loadingSetFeedback = false,
  setFeedback,
  feedback,
  positiveFeedbacks,
  menuId,
}) => {
  const { t } = useTranslation()
  return (
    <Container>
      {!loading && (
        <div className="question-box">
          {feedback === undefined || feedback === null ? (
            <>
              <Typography>{t("header.documentFeedback.question")}</Typography>
              <div className="feedback-box">
                {!loadingSetFeedback ? (
                  <>
                    <Typography
                      className="feedback-button"
                      color="primary"
                      onClick={() => setFeedback(menuId, true)}
                    >
                      {t("header.documentFeedback.yes")}
                    </Typography>
                    <Typography
                      className="feedback-button"
                      color="primary"
                      onClick={() => setFeedback(menuId, false)}
                    >
                      {t("header.documentFeedback.no")}
                    </Typography>
                  </>
                ) : (
                  <CircularProgress size={20} />
                )}
              </div>
            </>
          ) : (
            <Typography>
              {t("header.documentFeedback.feedback")}{" "}
              <strong>
                {feedback
                  ? t("header.documentFeedback.yes")
                  : t("header.documentFeedback.no")}
              </strong>
            </Typography>
          )}
        </div>
      )}
      {positiveFeedbacks && (
        <Typography>
          <Trans
            i18nKey="header.documentFeedback.positiveFeedbacks"
            values={{ count: positiveFeedbacks }}
          >
            <strong></strong> Users responded <strong>YES</strong>
          </Trans>
        </Typography>
      )}
    </Container>
  )
}
