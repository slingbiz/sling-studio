import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Rating = asyncComponent(() => import("../../../../modules/muiComponents/util/Rating"));
export default AppPage(() => <Rating/>);
