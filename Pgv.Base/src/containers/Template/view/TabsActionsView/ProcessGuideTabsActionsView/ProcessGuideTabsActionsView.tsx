import { DocumentFeedback } from "containers/Template/components/DocumentFeedback/DocumentFeedback"
import { useProcessGuideTabsActionsViewController } from "./useProcessGuideTabsActionsViewController"

export interface ProcessGuideTabsActionsViewProps {
  menuId: number | string
  content: JSX.Element
  withFeedback: boolean
}

export const ProcessGuideTabsActionsView: React.FC<
  ProcessGuideTabsActionsViewProps
> = ({ menuId, content, withFeedback }) => {
  const { loading, loadingSetFeedback, data, setFeedback } =
    useProcessGuideTabsActionsViewController(menuId, withFeedback)
  return (
    <div>
      {content}
      {withFeedback && (
        <DocumentFeedback
          setFeedback={setFeedback}
          feedback={data?.feedback}
          positiveFeedbacks={data?.positiveFeedbacks}
          loading={loading}
          loadingSetFeedback={loadingSetFeedback}
          menuId={menuId}
        />
      )}
    </div>
  )
}
