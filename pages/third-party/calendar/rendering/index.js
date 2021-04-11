import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Rendering = asyncComponent(() => import("../../../../modules/thirdParty/calendar/Rendering"));
export default AppPage(() => <Rendering/>);
