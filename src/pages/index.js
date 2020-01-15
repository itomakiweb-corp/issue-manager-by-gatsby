import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>New Issue</h2>
    <form>
      <ul>
        <li><input type="text" name="title" placeholder="title" /></li>
        <li><textarea name="body" placeholder="body"></textarea></li>
        <li><button type="submit">create new issue</button></li>
      </ul>
    </form>
    <h2>Issues</h2>
    <ul>
      <li>issue title</li>
    </ul>
  </Layout>
)

export default IndexPage
