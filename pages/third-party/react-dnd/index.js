import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const ReactDnd = asyncComponent(() => import("../../../modules/thirdParty/reactBeautifulDnd"));
export default AppPage(() => <ReactDnd />);
