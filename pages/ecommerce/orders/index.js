import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Orders = asyncComponent(() => import("../../../modules/ecommerce/Orders"));
export default AppPage(() => <Orders/>);
