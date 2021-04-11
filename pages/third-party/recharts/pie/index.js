import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Pie = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Pie"));
export default AppPage(() => <Pie/>);
