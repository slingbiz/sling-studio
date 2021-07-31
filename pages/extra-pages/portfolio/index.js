import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Portfolio = asyncComponent(() => import("../../../modules/extraPages/Portfolio"));
export default AppPage(() => <Portfolio/>);
