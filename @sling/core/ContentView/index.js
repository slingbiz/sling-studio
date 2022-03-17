import React, { useContext } from "react";
import { useRouter } from 'next/router'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AppSuspense } from "../../index";
import Scrollbar from "../Scrollbar";
import AppContext from "../../utility/AppContext";
import PropTypes from "prop-types";
import AppFooter from "../AppLayout/AppFooter";
import Box from "@material-ui/core/Box";
import { RouteTransition } from "../../../shared/constants/AppEnums";
import AppErrorBoundary from "../AppErrorBoundary";

const TransitionWrapper = ({children}) => {
  const {rtAnim} = useContext(AppContext);
  const {pathname} = useRouter();
  if (rtAnim === RouteTransition.NONE) {
    return <>{children}</>;
  }
  return (
    <TransitionGroup appear enter exit>
      <CSSTransition
        key={pathname}
        timeout={{enter: 300, exit: 300}}
        classNames={rtAnim}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

TransitionWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

const ContentView = (props) => {
  return (
    <Scrollbar>
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        className='main-content-view'>
        <AppSuspense>
          <AppErrorBoundary>
            <TransitionWrapper>{props.children}</TransitionWrapper>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </Scrollbar>
  );
};

export default ContentView;
