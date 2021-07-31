import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Customers = asyncComponent(() => import("../../../modules/ecommerce/Customers"));
export default AppPage(() => <Customers/>);
