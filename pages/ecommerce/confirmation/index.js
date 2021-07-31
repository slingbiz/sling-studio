import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Confirmation = asyncComponent(() => import("../../../modules/ecommerce/Confirmation"));
export default AppPage(() => <Confirmation/>);
