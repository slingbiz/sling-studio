import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const UnlockScreen = asyncComponent(() => import("../../../modules/userPages/UserPages/UnlockScreen"));
export default AppPage(() => <UnlockScreen/>);
