import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Scatter = asyncComponent(() => import("../../../../modules/thirdParty/recharts/Scatter"));
export default AppPage(() => <Scatter/>);
