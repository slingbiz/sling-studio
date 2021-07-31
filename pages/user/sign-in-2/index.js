import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Signin = asyncComponent(() => import("../../../modules/userPages/StyledUserPages/Signin"));
export default AppPage(() => <Signin/>);
