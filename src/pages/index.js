import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("- [ ] \n- [ ] \n- [ ] \n")

  const handleSubmit = (e) => {
    // stop page transition after submit
    e.preventDefault()

    const payload = {
      title,
      body,
    }
    createGithubIssue(payload)
  }

  return <Layout>
    <SEO title="Home" />

    <h2>New Issue</h2>
    <form onSubmit={handleSubmit}>
      <ul>
        <li><input type="text" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} /></li>
        <li><textarea name="body" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} /></li>
        <li><button type="submit">create new issue</button></li>
      </ul>
    </form>
    <h2>Issues (open)</h2>
    <ul>
      {data.github.repository.issues.nodes.map((issue, i) => (
        <li key={issue.id}>
          <a href={issue.url} target="_blank" rel="noopener noreferrer">{i + 1}: {issue.title}</a>
        </li>
      ))}
    </ul>
  </Layout>
}

const createGithubIssue = (payload) => {
  console.log(payload)
}

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
