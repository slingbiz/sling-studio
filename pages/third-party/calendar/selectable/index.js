import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Selectable = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Selectable"));
export default AppPage(() => <Selectable/>);
