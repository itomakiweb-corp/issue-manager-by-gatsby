import ApolloClient from "apollo-boost"
import config from "../../gatsby-config"

const { options: { url, headers }} = config.plugins.find(
  (plugin) => plugin.options && plugin.options.fieldName === `github`
)

export const getClient = (token) => new ApolloClient({
  uri: url,
  request: (operation) => {
    operation.setContext({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
  },
})
