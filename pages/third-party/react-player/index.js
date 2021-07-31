import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ReactPlayer = asyncComponent(() => import("../../../modules/thirdParty/reactPlayer"));
export default AppPage(() => <ReactPlayer/>);
