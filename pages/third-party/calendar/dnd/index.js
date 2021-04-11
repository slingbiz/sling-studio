import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Dnd = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Dnd"));
export default AppPage(() => <Dnd/>);
