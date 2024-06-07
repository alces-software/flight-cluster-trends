import { css, cx } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { Icon, Link, useTheme2 } from '@grafana/ui';

export interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  target?: HTMLAnchorElement['target'];
  url: string;
  isChild?: boolean;
}

export function MegaMenuItemText({ children, isActive, onClick, target, url, isChild = false }: Props) {
  const theme = useTheme2();
  const styles = getStyles(theme, isActive, isChild);
  const LinkComponent = !target && url.startsWith('/') ? Link : 'a';

  const linkContent = (
    <div className={styles.linkContent}>
      {children}

      {
        // As nav links are supposed to link to internal urls this option should be used with caution
        target === '_blank' && <Icon data-testid="external-link-icon" name="external-link-alt" />
      }
    </div>
  );

  return (
    <LinkComponent
      data-testid={selectors.components.NavMenu.item}
      className={cx(styles.container, {
        [styles.containerActive]: isActive,
      })}
      href={url}
      target={target}
      onClick={onClick}
    >
      {linkContent}
    </LinkComponent>
  );
}

MegaMenuItemText.displayName = 'MegaMenuItemText';

const getStyles = (theme: GrafanaTheme2, isActive: Props['isActive'], isChild: Props['isChild']) => ({
  container: css({
    alignItems: 'center',
    color: (isActive && !isChild) || (!isActive && isChild) ? theme.colors.text.primary : theme.colors.text.secondary,
    height: '100%',
    position: 'relative',
    width: '100%',

    '&:hover, &:focus-visible': {
      color: !isActive || isChild ? theme.colors.text.hover : theme.colors.text.primary,
    },

    '&:focus-visible': {
      boxShadow: 'none',
      outline: `2px solid ${theme.colors.primary.main}`,
      outlineOffset: '-2px',
      transition: 'none',
    },
  }),
  containerActive: css({
    borderTopRightRadius: theme.shape.radius.default,
    borderBottomRightRadius: theme.shape.radius.default,
    position: 'relative',
  }),
  linkContent: css({
    alignItems: 'center',
    display: 'flex',
    gap: '0.5rem',
    height: '100%',
    width: '100%',
  }),
});
