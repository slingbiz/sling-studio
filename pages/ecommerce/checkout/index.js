import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Checkout = asyncComponent(() => import("../../../modules/ecommerce/Checkout"));
export default AppPage(() => <Checkout/>);
