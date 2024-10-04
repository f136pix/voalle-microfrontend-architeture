// import { get } from "services/requests/requests"

export const getSlidesService = async (): Promise<any> => {
  // const { body } = await get({
  //   endpoint: `Login/Carousel`
  // })

  // if (!body.success) {
  //   throw body
  // }

  // return body.response

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: [
          "https://i.postimg.cc/1XdP7JL8/1x1-CRM-2.webp",
          "https://i.postimg.cc/8Cqrrmym/Property-1-Variant2.webp",
          "https://i.postimg.cc/kXq6P46w/412985634-1087771765527211-2254225067117320455-n.webp",
        ],
      })
    }, 1500)
  )
}
