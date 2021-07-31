import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Cards = asyncComponent(() => import("../../../../modules/muiComponents/surfaces/Cards"));
export default AppPage(() => <Cards/>);
