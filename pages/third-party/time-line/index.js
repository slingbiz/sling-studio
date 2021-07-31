import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const TimeLine = asyncComponent(() => import("../../../modules/thirdParty/timeLine"));
export default AppPage(() => <TimeLine/>);
