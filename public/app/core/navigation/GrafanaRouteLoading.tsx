import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { AnimatedLoader } from '../components/BouncingLoader/AnimatedLoader';

export function GrafanaRouteLoading() {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.loadingPage}>
      <AnimatedLoader />
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
  loadingPage: css({
    backgroundColor: theme.colors.background.primary,
    height: '100%',
    flexDrection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
