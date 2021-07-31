import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ReactDnd = asyncComponent(() => import("../../../modules/thirdParty/reactBeautifulDnd"));
export default AppPage(() => <ReactDnd />);
