import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Timeslots = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Timeslots"));
export default AppPage(() => <Timeslots/>);
