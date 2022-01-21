import { staticRequest } from 'tinacms'
import { Layout } from '../../components/Layout'
import {TinaMarkdown} from "tinacms/dist/rich-text";
import {Codeblock} from "../../components/Codeblock"
export default function Home(props) {

  const components = {
    code_block: props => {
      return <Codeblock children={props.children} language={props.lang}/>
    }
  }

  return (
    <Layout>
      <TinaMarkdown content={props.data.getPostDocument.data.body} components={components}/>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const tinaProps = await staticRequest({
    query: `{
        getPostList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  })
  const paths = tinaProps.getPostList.edges.map((x) => {
    return { params: { slug: x.node.sys.filename } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps = async (ctx) => {
  const query = `query getPost($relativePath: String!) {
    getPostDocument(relativePath: $relativePath) {
      data {
        title
        body
      }
    }
  }
  `
  const variables = {
    relativePath: ctx.params.slug + '.md',
  }
  let data = {}
  try {
    data = await staticRequest({
      query,
      variables,
    })
  } catch (error) {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      query,
      variables,
    },
  }
}
