import { css, cx } from '@emotion/css';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import { GrafanaTheme2 } from '@grafana/data';

import { useStyles2 } from '../../themes';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const PanelContainer = ({ children, className, ...props }: Props) => {
  const styles = useStyles2(getStyles);
  return (
    <div className={cx(styles, className)} {...props}>
      {children}
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) =>
  css({
    backgroundColor: theme.components.panel.background,
    borderRadius: theme.shape.radius.default,
  });
