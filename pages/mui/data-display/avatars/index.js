import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Avatars = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Avatars"));
export default AppPage(() => <Avatars/>);
