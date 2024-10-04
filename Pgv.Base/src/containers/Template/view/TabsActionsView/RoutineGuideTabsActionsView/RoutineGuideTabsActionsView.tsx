import { DocumentFeedback } from "containers/Template/components/DocumentFeedback/DocumentFeedback"
import { useRoutineGuideTabsActionsViewController } from "./useRoutineGuideTabsActionsViewController"

export interface RoutineGuideTabsActionsViewProps {
  menuId: number | string
  content: JSX.Element
  withFeedback: boolean
}

export const RoutineGuideTabsActionsView: React.FC<
  RoutineGuideTabsActionsViewProps
> = ({ menuId, content, withFeedback }) => {
  const { loading, loadingSetFeedback, data, setFeedback } =
    useRoutineGuideTabsActionsViewController(menuId, withFeedback)
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
