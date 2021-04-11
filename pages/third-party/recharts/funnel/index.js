import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Funnel = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Funnel"));
export default AppPage(() => <Funnel/>);
