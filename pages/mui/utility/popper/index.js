import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Popper = asyncComponent(() => import("../../../../modules/muiComponents/util/Popper"));
export default AppPage(() => <Popper/>);
