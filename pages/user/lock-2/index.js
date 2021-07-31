import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const UnlockScreen = asyncComponent(() => import("../../../modules/userPages/StyledUserPages/UnlockScreen"));
export default AppPage(() => <UnlockScreen/>);
