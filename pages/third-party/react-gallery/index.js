import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const ReactPhotoGallery = asyncComponent(() => import("../../../modules/thirdParty/reactPhotoGallery"));
export default AppPage(() => <ReactPhotoGallery/>);
