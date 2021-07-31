import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';
import PageMeta from '../../@sling/core/PageMeta';

const HealthCare = asyncComponent(() =>
  import('../../modules/dashboard/HealthCare'),
);
export default AppPage((props) => {
  console.log('props: ', props);
  return (
    <React.Fragment>
      <PageMeta title='Health Care | Sling ' />
      <HealthCare data={props.todo} />
    </React.Fragment>
  );
});

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  const todo = await res.json();

  // Pass data to the page via props
  return {props: {todo}};
}
