import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Lists = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Lists"));
export default AppPage(() => <Lists/>);
