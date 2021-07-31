import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const UnlockScreen = asyncComponent(() => import("../../../modules/userPages/UserPages/UnlockScreen"));
export default AppPage(() => <UnlockScreen/>);
