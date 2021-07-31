import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const KnowledgeBase = asyncComponent(() => import("../../../modules/extraPages/KnowledgeBase"));
export default AppPage(() => <KnowledgeBase/>);
