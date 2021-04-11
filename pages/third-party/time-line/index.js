import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const TimeLine = asyncComponent(() => import("../../../modules/thirdParty/timeLine"));
export default AppPage(() => <TimeLine/>);
