import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Radar = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Radar"));
export default AppPage(() => <Radar/>);
