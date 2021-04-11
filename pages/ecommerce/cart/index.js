import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const Carts = asyncComponent(() => import("../../../modules/ecommerce/Carts"));
export default AppPage(() => <Carts/>);
