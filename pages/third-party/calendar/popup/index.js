import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Popup = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Popup"));
export default AppPage(() => <Popup/>);
