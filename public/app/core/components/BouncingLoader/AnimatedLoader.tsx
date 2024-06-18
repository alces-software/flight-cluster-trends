import { css, keyframes } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { t } from '../../internationalization';

export function AnimatedLoader() {
  const styles = useStyles2(getStyles);

  return (
    <>
      <div
        className={styles.container}
        aria-live="polite"
        role="status"
        aria-label={t('bouncing-loader.label', 'Loading')}
      >
        <svg className={styles.spinner} viewBox="0 0 50 50">
          <circle className={styles.circle} cx="25" cy="25" r="20" fill="none"></circle>
          <circle className={styles.path} cx="25" cy="25" r="20" fill="none"></circle>
        </svg>
        <img alt="" src="public/img/moosebird.svg" className={styles.logo} />
      </div>
    </>
  );
}

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    animationTimingFunction: 'cubic-bezier(0, 0, 0.5, 1)',
  },
  '100%': {
    opacity: 1,
  },
});

const spinner = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const dash = keyframes({
  '0%': {
    strokeDasharray: '1, 150',
    strokeDashoffset: '0',
  },
  '50%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: '-35',
  },
  '100%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: '-124',
  },
});

const getStyles = (theme: GrafanaTheme2) => ({
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    opacity: 0,
    animationName: fadeIn,
    animationIterationCount: 1,
    animationDuration: '0.9s',
    animationDelay: '0.5s',
    animationFillMode: 'forwards',
  }),

  logo: css({
    position: 'relative',
    top: '-180px',
    height: '120px',
  }),

  spinner: css({
    animationName: spinner,
    animationDuration: '2.7s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    width: '240px',
    height: '240px',
  }),

  circle: css({
    stroke: `${theme.colors.background.tertiary}`,
    strokeWidth: '1px',
  }),

  path: css({
    stroke: `${theme.colors.text.secondary}`,
    strokeWidth: '1px',
    strokeLinecap: 'round',
    animationName: dash,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  }),
});
