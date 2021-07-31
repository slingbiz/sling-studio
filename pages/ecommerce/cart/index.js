import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Carts = asyncComponent(() => import("../../../modules/ecommerce/Carts"));
export default AppPage(() => <Carts/>);
