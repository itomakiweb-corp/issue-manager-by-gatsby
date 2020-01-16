import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { graphql } from "gatsby"
import { gql } from "apollo-boost"

import { getClient } from "../lib/client";
import Layout from "../components/layout"
import SEO from "../components/seo"

/* eslint react/jsx-no-target-blank: ["error", { "allowReferrer": true }] */
const IndexPage = ({ data }) => {
  const [token, setToken] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("- [ ] \n- [ ] \n- [ ] \n")
  // https://www.apollographql.com/docs/react/data/mutations/
  const [createGithubIssue, recordCreateGithubIssue] = useMutation(mutationCreateGithubIssue, {
    client: getClient(token)
  })

  console.log(recordCreateGithubIssue)

  const handleSubmit = (e) => {
    // stop page transition after submit
    e.preventDefault()

    const input = {
      repositoryId: data.github.repository.id,
      title,
      body,
    }
    console.log(input)
    createGithubIssue({
      variables: {
        input,
      }
    })
  }

  return <Layout>
    <SEO title="Home" />

    <h2>New Issue</h2>
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <input
            className="input"
            type="password"
            name="token"
            placeholder="GitHub Token (Required)"
            required="required"
            size="72"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            />
        </li>
        <li>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Title (Required)"
            required="required"
            size="72"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </li>
        <li>
          <textarea
            className="input"
            name="body"
            placeholder="Body"
            cols="72"
            rows="3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            />
        </li>
        <li>
          <button
            className="input"
            type="submit"
            disabled={recordCreateGithubIssue.loading}
          >
            Create New Issue
          </button>
        </li>
      </ul>
    </form>

    <h2>Issues (open)</h2>
    <ul>
      {data.github.repository.issues.nodes.map((issue, i) => (
        <li key={issue.id}>
          <a href={issue.url} target="_blank" rel="noopener">{i + 1}: {issue.title}</a>
        </li>
      ))}
    </ul>
  </Layout>
}

export const query = graphql`
  query {
    github {
      repository(owner: "hidecharo", name: "issue-manager-by-gatsby") {
        id
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

const mutationCreateGithubIssue = gql`
  mutation($input: CreateIssueInput!) {
    createIssue(input: $input) {
      issue {
        id
        url
        title
      }
    }
  }
`

export default IndexPage
