import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const Modal = asyncComponent(() => import("../../../../modules/muiComponents/util/Modal"));
export default AppPage(() => <Modal/>);
