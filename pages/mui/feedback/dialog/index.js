import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Dialogs = asyncComponent(() => import("../../../../modules/muiComponents/feedback/Dialogs"));
export default AppPage(() => <Dialogs/>);
