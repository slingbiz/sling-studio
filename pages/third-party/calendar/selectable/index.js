import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Selectable = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Selectable"));
export default AppPage(() => <Selectable/>);
