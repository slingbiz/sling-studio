import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ReactDropzone = asyncComponent(() => import("../../../modules/thirdParty/reactDropzone"));
export default AppPage(() => <ReactDropzone/>);
