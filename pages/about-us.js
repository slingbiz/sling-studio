import styles from "../styles/Home.module.css";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import React from "react";
import PageMeta from "../@crema/core/PageMeta";

export default function ContactUs(props) {
  console.log("todo data: ", props.todo);
  return (
    <div className={styles.container}>

      <PageMeta title="About Crema React" />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Crema Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/about-us.js</code>
        </p>

        <div className={styles.grid}>
          Presenting Crema, the all in one package which uses React Hooks to write components more intuitively without
          using classes. Crema is purely based on Material UI components and follows Google’s Material Design
          guidelines. It is integrated with Redux and Context API for state management hence making it fast and
          reliable. It is fully RTL supported and multi-lingual. It uses fake API creator ‘axios-mock-adaptor’ to fetch
          Data hence making it very easy to integrate with real Server. Crema has integration of Storybook to write the
          story with Material-UI
        </div>
        <Box mt={4}>
         <strong>Todo Title :--- </strong>
           {props.todo.title}
        </Box>
      </main>
      <Box className={"footer"}>
        <Box
          className='footerContainer'
          alignItems='center'
          flexDirection='row'
          display='flex'>
          <Box>Copy right @crema 2020</Box>
          <Box ml='auto'>
            <Button color='primary'>
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  const todo = await res.json();

  // Pass data to the page via props
  return { props: { todo } };
}
