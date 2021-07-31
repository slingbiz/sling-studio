import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Steppers = asyncComponent(() => import("../../../../modules/muiComponents/navigation/Steppers"));
export default AppPage(() => <Steppers/>);
