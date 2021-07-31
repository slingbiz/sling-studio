import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const FAQ = asyncComponent(() => import("../../../modules/extraPages/FAQ"));
export default AppPage(() => <FAQ/>);
