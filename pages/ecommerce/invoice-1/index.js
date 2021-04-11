import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const Invoice1 = asyncComponent(() => import("../../../modules/ecommerce/Invoice1"));
export default AppPage(() => <Invoice1/>);
