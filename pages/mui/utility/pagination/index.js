import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Pagination = asyncComponent(() => import("../../../../modules/muiComponents/util/Pagination"));
export default AppPage(() => <Pagination/>);
