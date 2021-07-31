import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Products = asyncComponent(() => import("../../../modules/ecommerce/Products"));
export default AppPage(() => <Products/>);
