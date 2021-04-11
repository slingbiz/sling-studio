import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Steppers = asyncComponent(() => import("../../../../modules/muiComponents/navigation/Steppers"));
export default AppPage(() => <Steppers/>);
