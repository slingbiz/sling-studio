import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const AboutUs = asyncComponent(() => import("../../../modules/extraPages/AboutUs"));
export default AppPage(() => <AboutUs/>);
