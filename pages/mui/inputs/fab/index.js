import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const FAB = asyncComponent(() => import("../../../../modules/muiComponents/inputs/FAB"));
export default AppPage(() => <FAB/>);
