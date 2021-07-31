import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Radar = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Radar"));
export default AppPage(() => <Radar/>);
