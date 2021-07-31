import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Radial = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Radial"));
export default AppPage(() => <Radial/>);
