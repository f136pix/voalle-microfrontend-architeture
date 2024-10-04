import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Container } from "./Iframe.styles"

export const Iframe: React.FC = () => {
  const [url, setUrl] = useState("")
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const url = searchParams.get("url")
    if (url) {
      setUrl(url)
    }
  }, [])

  return (
    <Container>
      <iframe src={url}></iframe>
    </Container>
  )
}
