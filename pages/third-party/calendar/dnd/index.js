import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Dnd = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Dnd"));
export default AppPage(() => <Dnd/>);
