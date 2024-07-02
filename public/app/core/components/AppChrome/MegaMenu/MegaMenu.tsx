import { css } from '@emotion/css';
import { DOMAttributes } from '@react-types/shared';
import React, { forwardRef } from 'react';
import { useLocation } from 'react-router-dom';

import { GrafanaTheme2 } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { CustomScrollbar, Icon, IconButton, useStyles2, Stack, Dropdown, ToolbarButton } from '@grafana/ui';
import { useGrafana } from 'app/core/context/GrafanaContext';
import { t } from 'app/core/internationalization';
import { useSelector } from 'app/types';

import { contextSrv } from '../../../services/context_srv';
import { LoginLogo } from '../../Branding/Branding';
import { TopNavBarMenu } from '../TopBar/TopNavBarMenu';

import { MegaMenuItem } from './MegaMenuItem';
import { enrichWithInteractionTracking, getActiveItem } from './utils';

export const MENU_WIDTH = '300px';

export interface Props extends DOMAttributes {
  onClose: () => void;
}

export const MegaMenu = React.memo(
  forwardRef<HTMLDivElement, Props>(({ onClose, ...restProps }, ref) => {
    const navIndex = useSelector((state) => state.navIndex);
    const profileNode = navIndex['profile'];
    const navTree = useSelector((state) => state.navBarTree);
    const styles = useStyles2(getStyles);
    const location = useLocation();
    const { chrome } = useGrafana();
    const state = chrome.useState();

    // Remove profile + help from tree
    const navItems = navTree
      .filter((item) => item.id !== 'profile' && item.id !== 'help' && item.id !== 'dashboards/browse')
      .map((item) => enrichWithInteractionTracking(item, state.megaMenuDocked));

    const activeItem = getActiveItem(navItems, location.pathname);

    const handleDockedMenu = () => {
      chrome.setMegaMenuDocked(!state.megaMenuDocked);
      if (state.megaMenuDocked) {
        chrome.setMegaMenuOpen(false);
      }

      // refocus on undock/menu open button when changing state
      setTimeout(() => {
        document.getElementById(state.megaMenuDocked ? 'mega-menu-toggle' : 'dock-menu-button')?.focus();
      });
    };

    return (
      <div data-testid={selectors.components.NavMenu.Menu} ref={ref} {...restProps}>
        <div className={styles.flexColumn}>
          <div className={styles.mobileHeader}>
            <Icon name="bars" size="xl" />
            <IconButton
              tooltip={t('navigation.megamenu.close', 'Close menu')}
              name="times"
              onClick={onClose}
              size="xl"
              variant="secondary"
            />
          </div>
          <div className={styles.logoWrapper}>
            <LoginLogo className={styles.logo} />
            <p>
              cluster<strong>trends</strong>
            </p>
            {profileNode && (
              <>
                <Dropdown overlay={() => <TopNavBarMenu node={profileNode} />} placement="bottom">
                  <ToolbarButton
                    className={styles.profileButton}
                    imgSrc={contextSrv.user.gravatarUrl}
                    imgAlt="User avatar"
                    aria-label="Profile"
                  >
                    {contextSrv.user.name}
                  </ToolbarButton>
                </Dropdown>
              </>
            )}
          </div>
          <nav className={styles.content}>
            <CustomScrollbar showScrollIndicators hideHorizontalTrack>
              <ul className={styles.itemList} aria-label={t('navigation.megamenu.list-label', 'Navigation')}>
                {navItems.map((link, index) => (
                  <Stack key={link.text} direction={index === 0 ? 'row-reverse' : 'row'} alignItems="center">
                    <MegaMenuItem
                      link={link}
                      onClick={state.megaMenuDocked ? undefined : onClose}
                      activeItem={activeItem}
                    />
                  </Stack>
                ))}
              </ul>
            </CustomScrollbar>
          </nav>
        </div>
      </div>
    );
  })
);

MegaMenu.displayName = 'MegaMenu';

const getStyles = (theme: GrafanaTheme2) => ({
  content: css({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    minHeight: 0,
    position: 'relative',
  }),
  flexColumn: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
  mobileHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.colors.border.weak}`,
    paddingTop: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }),
  logoWrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '22px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    '& p': {
      fontWeight: '200',
      color: 'white',
    },
    '& strong': {
      fontWeight: '700',
    },
  }),
  logo: css({
    width: '100px',
  }),
  itemList: css({
    boxSizing: 'border-box',
    borderTop: `solid 1px ${theme.colors.background.secondary}`,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    [theme.breakpoints.up('md')]: {
      width: MENU_WIDTH,
    },
  }),
  dockMenuButton: css({
    display: 'none',
    alignSelf: 'flex-end',
    margin: theme.spacing(1),

    [theme.breakpoints.up('xl')]: {
      display: 'inline-flex',
    },
  }),
  profileButton: css({
    height: '2rem',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontSize: '1rem',
    color: theme.colors.text.primary,

    '& img': {
      borderRadius: '50%',
    },
  }),
});
