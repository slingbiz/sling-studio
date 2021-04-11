import Head from "next/head";
import PropTypes from "prop-types";

const PageMeta = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={props.title} />
    <meta name="og:description" property="og:description" content={props.desc} />
    <meta property="og:site_name" content="Proper Noun" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.desc} />
    <meta name="twitter:site" content="@propernounco" />
    <meta name="twitter:creator" content="@propernounco" />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" />

    {
      props.canonical&&
      <meta property="og:url" content={`${props.canonical}`} />
    }
    {
      props.css &&
      <link rel="stylesheet" href={`${props.css}`}/>
    }
    {
      props.image ? (
        <meta property="og:image" content={`${props.image}`} />
      ) : (
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/git-access.appspot.com/o/logo512.png?alt=media" />
      )
    }
    {
      props.image &&
      <meta name="twitter:image" content={`${props.image}`} />
    }
  </Head>
)
export default PageMeta
PageMeta.prototype = {
    title: PropTypes.string,
    description: PropTypes.string,
};

PageMeta.defaultProps={
  title:'Crema- React Material Admin Template',
  description:'Crema is purely based on Material UI components and follows Google’s Material Design guidelines'
}
