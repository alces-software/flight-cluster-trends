import { css, cx } from '@emotion/css';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

import { GrafanaTheme2, NavModelItem } from '@grafana/data';
import { useStyles2, Text, IconButton } from '@grafana/ui';
import { useGrafana } from 'app/core/context/GrafanaContext';

import { Indent } from '../../Indent/Indent';

import { MegaMenuItemText } from './MegaMenuItemText';
import { hasChildMatch } from './utils';

interface Props {
  link: NavModelItem;
  activeItem?: NavModelItem;
  onClick?: () => void;
  level?: number;
  isChild?: boolean;
}

const MAX_DEPTH = 2;

export function MegaMenuItem({ link, activeItem, level = 0, onClick, isChild = false }: Props) {
  const { chrome } = useGrafana();
  const state = chrome.useState();
  const menuIsDocked = state.megaMenuDocked;
  const location = useLocation();
  const hasActiveChild = hasChildMatch(link, activeItem);
  const isActive = link === activeItem || (level === MAX_DEPTH && hasActiveChild);
  const [sectionExpanded, setSectionExpanded] = useLocalStorage(
    `grafana.navigation.expanded[${link.text}]`,
    Boolean(hasActiveChild)
  );
  const showExpandButton = level < MAX_DEPTH && Boolean(linkHasChildren(link) || link.emptyMessage);
  const item = useRef<HTMLLIElement>(null);

  const styles = useStyles2(getStyles, isChild);

  // expand parent sections if child is active
  useEffect(() => {
    if (hasActiveChild) {
      setSectionExpanded(true);
    }
  }, [hasActiveChild, location, menuIsDocked, setSectionExpanded]);

  // scroll active element into center if it's offscreen
  useEffect(() => {
    if (isActive && item.current && isElementOffscreen(item.current)) {
      item.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [isActive]);

  if (!link.url) {
    return null;
  }

  return (
    <li ref={item} className={styles.listItem}>
      <div
        className={cx(styles.menuItem, {
          [styles.activeListItem]: Boolean(level === 0 && (isActive || hasActiveChild)),
          [styles.menuItemWithIcon]: Boolean(level === 0 && link.icon),
        })}
      >
        {level !== 0 && <Indent level={level === MAX_DEPTH ? level - 1 : level} spacing={3} />}
        {level === MAX_DEPTH && <div className={styles.itemConnector} />}
        <div className={styles.collapseButtonWrapper}>
          {showExpandButton && (
            <IconButton
              aria-label={`${sectionExpanded ? 'Collapse' : 'Expand'} section ${link.text}`}
              className={styles.collapseButton}
              onClick={() => setSectionExpanded(!sectionExpanded)}
              name={sectionExpanded ? 'angle-down' : 'angle-right'}
              size="md"
              variant="secondary"
            />
          )}
        </div>
        <div className={styles.collapsibleSectionWrapper}>
          <MegaMenuItemText
            isActive={isActive}
            isChild={isChild}
            onClick={() => {
              link.onClick?.();
              onClick?.();
            }}
            target={link.target}
            url={link.url}
          >
            <div
              className={cx(styles.labelWrapper, {
                [styles.hasActiveChild]: hasActiveChild,
                [styles.labelWrapperWithIcon]: Boolean(level === 0 && link.icon),
              })}
            >
              <Text truncate>{isChild ? link.text : link.text.toUpperCase()}</Text>
            </div>
          </MegaMenuItemText>
        </div>
      </div>
      {showExpandButton && sectionExpanded && (
        <ul className={styles.children}>
          {linkHasChildren(link) ? (
            link.children
              .filter((childLink) => !childLink.isCreateAction)
              .map((childLink) => (
                <MegaMenuItem
                  key={`${link.text}-${childLink.text}`}
                  link={childLink}
                  activeItem={activeItem}
                  onClick={onClick}
                  level={level + 1}
                  isChild={true}
                />
              ))
          ) : (
            <div className={styles.emptyMessage} aria-live="polite">
              {link.emptyMessage}
            </div>
          )}
        </ul>
      )}
    </li>
  );
}

const getStyles = (theme: GrafanaTheme2, isChild: Props['isChild']) => ({
  icon: css({
    width: theme.spacing(3),
  }),
  listItem: css({
    flex: 1,
    maxWidth: '100%',
  }),
  activeListItem: css({
    backgroundImage: `linear-gradient(to bottom right, ${theme.colors.text.secondary}, #D02CC0)`,
  }),
  menuItem: css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    height: theme.spacing(isChild ? 4 : 6),
    paddingLeft: theme.spacing(0.5),
    marginTop: isChild ? '0' : theme.spacing(2),
    position: 'relative',
  }),
  menuItemWithIcon: css({
    paddingLeft: theme.spacing(0),
  }),
  collapseButtonWrapper: css({
    display: 'flex',
    justifyContent: 'center',
    width: theme.spacing(3),
    flexShrink: 0,
  }),
  itemConnector: css({
    position: 'relative',
    height: '100%',
    width: theme.spacing(1.5),
    '&::before': {
      borderLeft: `1px solid ${theme.colors.border.medium}`,
      content: '""',
      height: '100%',
      right: 0,
      position: 'absolute',
      transform: 'translateX(50%)',
    },
  }),
  collapseButton: css({
    margin: 0,
  }),
  collapsibleSectionWrapper: css({
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    height: '100%',
    minWidth: 0,
  }),
  labelWrapper: css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    minWidth: 0,
    paddingLeft: theme.spacing(1),
  }),
  labelWrapperWithIcon: css({
    paddingLeft: theme.spacing(0.5),
  }),
  hasActiveChild: css({
    color: theme.colors.text.primary,
  }),
  children: css({
    display: 'flex',
    listStyleType: 'none',
    flexDirection: 'column',
  }),
  emptyMessage: css({
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
    padding: theme.spacing(1, 1.5, 1, 7),
  }),
});

function linkHasChildren(link: NavModelItem): link is NavModelItem & { children: NavModelItem[] } {
  return Boolean(link.children && link.children.length > 0);
}

function isElementOffscreen(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.bottom < 0 || rect.top >= window.innerHeight;
}
