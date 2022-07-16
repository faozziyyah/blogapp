
import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;


export default async function comments(req, res) {

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: [Comment!]!, $slug: String!, id: ID!) {
      createComment(data: { name: "$name", email: "$email", comment: "$comment", post: { connect: { slug: $slug } } }) {
        name
        email
        comment
        post
      }
    }
  `

    try {
      const result = await graphQLClient.request(query, req.body);

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

}
