import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Scatter = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Scatter"));
export default AppPage(() => <Scatter/>);
