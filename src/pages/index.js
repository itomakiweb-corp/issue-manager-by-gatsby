import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
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
    <h2>Issues (open)</h2>
    <ul>
      {data.github.repository.issues.nodes.map((issue, i) => (
        <li key={issue.id}>
          <a href={issue.url} target="_blank">{i + 1}: {issue.title}</a>
        </li>
      ))}
    </ul>
  </Layout>
)

export const query = graphql`
  query {
    github {
      repository(owner: "hidecharo", name: "issue-manager-by-gatsby") {
        issues(first: 100, states: [OPEN], orderBy: { field: UPDATED_AT, direction: DESC }) {
          nodes {
            id
            url
            number
            title
          }
        }
      }
    }
  }
`

export default IndexPage
