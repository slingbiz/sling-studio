import styles from "../styles/Home.module.css";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import React from "react";
import PageMeta from "../@sling/core/PageMeta";

export default function ContactUs(props) {
  console.log("todo data: ", props.todo);
  return (
    <div className={styles.container}>

      <PageMeta title="About Sling " />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Crema Next.js!</a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>pages/about-us.js</code>
        </p>

        <div className={styles.grid}>
         Sling - Dashboard Admin Demo
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
          <Box>Copy right @Sling 2021</Box>
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
