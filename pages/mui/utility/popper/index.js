import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Popper = asyncComponent(() => import("../../../../modules/muiComponents/util/Popper"));
export default AppPage(() => <Popper/>);
