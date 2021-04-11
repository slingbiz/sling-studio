import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const FAQ = asyncComponent(() => import("../../../modules/extraPages/FAQ"));
export default AppPage(() => <FAQ/>);
