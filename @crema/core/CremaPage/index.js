import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://crema-next.herokuapp.com';

const defaultTitle = 'Crema React Admin Template';
const defaultDescription =
  'Pure React hooks base admin template with material-ui.';
const defaultImage = `/images/logo-with-name.jpg`;
const defaultSep = ' | ';

const CremaPage = ({children, id, className, ...rest}) => {
  const {pathname} = useRouter();

  const {title, description, image, contentType} = rest;

  const theTitle = title
    ? (title + defaultSep + defaultTitle).substring(0, 60)
    : defaultTitle;
  const theDescription = description
    ? description.substring(0, 155)
    : defaultDescription;
  const theImage = image ? `${SITE_URL}${image}` : defaultImage;
  return (
    <>
      <Head>
        <title>
          {rest.title ? rest.title + defaultSep + defaultTitle : defaultTitle}
        </title>
        <meta property='name' content={theTitle} key='name' />
        <meta
          property='description'
          content={theDescription}
          key='description'
        />
        <meta property='og:title' content={theTitle} key='title' />
        <meta property='og:title' content={theTitle} key='title' />
        <meta property='og:type' content={contentType} key='type' />
        <meta property='og:url' content={SITE_URL + pathname} key='url' />
        <meta property='og:image' content={theImage} key='v' />
        <meta
          property='og:description'
          content={theDescription}
          key='description'
        />
        <meta property='og:site_name' content={defaultTitle} key='site_name' />
      </Head>

      {children}
    </>
  );
};

export default CremaPage;
