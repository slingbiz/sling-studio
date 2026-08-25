import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useRouter, withRouter} from 'next/router';
import AppsContainer from '../../@sling/core/AppsContainer';
import RoutesList from './RoutesDetail/List';
import {routesCopy} from '../../@sling/core/AppsContainer/pageIntro';

const Index = (props) => {
  const router = useRouter();
  const all = props.router.query?.all;

  useEffect(() => {
    const key = all?.[0];
    if (key === 'guide' || key === 'routes-list') {
      router.replace('/routes');
    }
  }, [all, router]);

  return (
    <AppsContainer title={routesCopy.title} description={routesCopy.description} fullView>
      <RoutesList />
    </AppsContainer>
  );
};

export default withRouter(Index);

Index.defaultProps = {
  match: null,
};

Index.prototype = {
  match: PropTypes.node,
};
