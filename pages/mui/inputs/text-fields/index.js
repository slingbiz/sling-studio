import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const TextFields = asyncComponent(() => import("../../../../modules/muiComponents/inputs/TextFields"));
export default AppPage(() => <TextFields/>);
