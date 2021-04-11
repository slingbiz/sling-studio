import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const Confirmation = asyncComponent(() => import("../../../modules/ecommerce/Confirmation"));
export default AppPage(() => <Confirmation/>);
