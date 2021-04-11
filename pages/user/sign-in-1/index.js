import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const Signin = asyncComponent(() => import("../../../modules/userPages/UserPages/Signin"));
export default AppPage(() => <Signin/>);
