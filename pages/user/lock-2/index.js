import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const UnlockScreen = asyncComponent(() => import("../../../modules/userPages/StyledUserPages/UnlockScreen"));
export default AppPage(() => <UnlockScreen/>);
