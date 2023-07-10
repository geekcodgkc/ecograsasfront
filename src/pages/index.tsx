import * as React from "react"
import type { PageProps, HeadFC } from "gatsby"
import Home from "../containers/home"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <Home />
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>EcoGrasas</title>
