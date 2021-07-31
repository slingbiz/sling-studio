import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { initialUrl } from "../../../shared/constants/AppConst";
import { useSelector } from "react-redux";
import Loader from "../../core/Loader";

const withData= (ComposedComponent) => (props) => {
  const { user, loading } = useSelector(({ auth }) => auth);
  const { asPath } = useRouter();
  const queryParams = asPath.split("?")[1];
  useEffect(() => {
    if (user) {
      Router.push(initialUrl + (queryParams ? "?" + queryParams : ""));
    }
  }, [user]);
  if (loading) return <Loader />;
  if (user) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData