import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const Signup = asyncComponent(() => import("../../../modules/userPages/StyledUserPages/Signup"));
export default AppPage(() => <Signup/>);
