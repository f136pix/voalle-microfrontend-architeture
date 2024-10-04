import { RoutineGuideResponseType } from "containers/Template/types/TabsActionsTypes/RoutineGuideTabsActionsTypes"

export const getRoutineGuideFeedback = async (
  menuId: number | string,
  userId: number | string
): Promise<{
  response: { data: RoutineGuideResponseType }
}> => {
  // const { body } = await get({
  //   endpoint: `rota/?menuId=${menuId}&userId={userId}`,
  //   showMessages: false,
  // })

  // if (!body.success) {
  //   throw body
  // }

  // return body
  if (!menuId && !userId) console.warn("")

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        response: {
          data: {
            feedback: undefined,
            positiveFeedbacks: 8,
          },
        },
      })
    }, 500)
  )
}

export const setRoutineGuideFeedback = async (
  menuId: number | string,
  userId: number | string,
  feedback: boolean
): Promise<{
  response: { data: RoutineGuideResponseType }
}> => {
  // const { body } = await post({
  //   endpoint: `rota/?menuId=${menuId}&userId={userId}`,
  //   data: { feedback }
  //   showMessages: true,
  // })

  // if (!body.success) {
  //   throw body
  // }

  // return body
  if (!menuId && !userId && !feedback) console.warn("")

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        response: {
          data: {
            feedback,
            positiveFeedbacks: feedback ? 9 : 8,
          },
        },
      })
    }, 500)
  )
}
