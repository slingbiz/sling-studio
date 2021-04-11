import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const Invoice2 = asyncComponent(() => import("../../../modules/ecommerce/Invoice2"));
export default AppPage(() => <Invoice2/>);
