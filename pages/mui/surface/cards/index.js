import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Cards = asyncComponent(() => import("../../../../modules/muiComponents/surfaces/Cards"));
export default AppPage(() => <Cards/>);
