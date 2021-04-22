import React from "react";
import AppPage from "../../@crema/hoc/AppPage";
import asyncComponent from "../../@crema/utility/asyncComponent";

const Products = asyncComponent(() => import("../../modules/ecommerce/Products"));
export async function getServerSideProps(context) {
    let response = {};
    try {
        response = await fetch('http://localhost:10001/v1/dummy/initConfig');
        response = await response.json();
    } catch (e) {
        console.log(
            '[MyApp.getInitialProps] - Using default theme. Error Message',
            e.message,
        );
    }
    console.log("@getServerSideProps")
    return {
        props: {response}, // will be passed to the page component as props
    }
}
export default AppPage(() => <Products/>);
