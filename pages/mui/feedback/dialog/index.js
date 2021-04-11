import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Dialogs = asyncComponent(() => import("../../../../modules/muiComponents/feedback/Dialogs"));
export default AppPage(() => <Dialogs/>);
