[1mdiff --git a/packages/grafana-data/src/themes/createComponents.ts b/packages/grafana-data/src/themes/createComponents.ts[m
[1mindex 2bd7c1d78fb..10ae5395d11 100644[m
[1m--- a/packages/grafana-data/src/themes/createComponents.ts[m
[1m+++ b/packages/grafana-data/src/themes/createComponents.ts[m
[36m@@ -22,7 +22,6 @@[m [mexport interface ThemeComponents {[m
   panel: {[m
     padding: number;[m
     headerHeight: number;[m
[31m-    borderColor: string;[m
     boxShadow: string;[m
     background: string;[m
   };[m
[36m@@ -56,10 +55,9 @@[m [mexport interface ThemeComponents {[m
 [m
 export function createComponents(colors: ThemeColors, shadows: ThemeShadows): ThemeComponents {[m
   const panel = {[m
[31m-    padding: 1,[m
[32m+[m[32m    padding: 5,[m
     headerHeight: 4,[m
     background: colors.background.primary,[m
[31m-    borderColor: colors.border.weak,[m
     boxShadow: 'none',[m
   };[m
 [m
[1mdiff --git a/packages/grafana-data/src/themes/createShape.ts b/packages/grafana-data/src/themes/createShape.ts[m
[1mindex 881633523f4..00d0c3c9ad0 100644[m
[1m--- a/packages/grafana-data/src/themes/createShape.ts[m
[1m+++ b/packages/grafana-data/src/themes/createShape.ts[m
[36m@@ -22,7 +22,7 @@[m [mexport function createShape(options: ThemeShapeInput): ThemeShape {[m
   const baseBorderRadius = options.borderRadius ?? 2;[m
 [m
   const radius = {[m
[31m-    default: '2px',[m
[32m+[m[32m    default: '15px',[m
     pill: '9999px',[m
     circle: '100%',[m
   };[m
[1mdiff --git a/packages/grafana-data/src/themes/createV1Theme.ts b/packages/grafana-data/src/themes/createV1Theme.ts[m
[1mindex a4754db37e6..0d80fc23301 100644[m
[1m--- a/packages/grafana-data/src/themes/createV1Theme.ts[m
[1m+++ b/packages/grafana-data/src/themes/createV1Theme.ts[m
[36m@@ -206,7 +206,6 @@[m [mexport function createV1Theme(theme: Omit<GrafanaTheme2, 'v1'>): GrafanaTheme {[m
 [m
       bodyBg: theme.colors.background.canvas,[m
       panelBg: theme.components.panel.background,[m
[31m-      panelBorder: theme.components.panel.borderColor,[m
       pageHeaderBg: theme.colors.background.canvas,[m
       pageHeaderBorder: theme.colors.background.canvas,[m
 [m
[1mdiff --git a/packages/grafana-ui/src/components/PanelChrome/PanelChrome.tsx b/packages/grafana-ui/src/components/PanelChrome/PanelChrome.tsx[m
[1mindex 4f4d690a42d..e70621e0943 100644[m
[1m--- a/packages/grafana-ui/src/components/PanelChrome/PanelChrome.tsx[m
[1m+++ b/packages/grafana-ui/src/components/PanelChrome/PanelChrome.tsx[m
[36m@@ -345,15 +345,15 @@[m [mconst getContentStyle = ([m
 };[m
 [m
 const getStyles = (theme: GrafanaTheme2) => {[m
[31m-  const { background, borderColor, padding } = theme.components.panel;[m
[32m+[m[32m  const { background, padding } = theme.components.panel;[m
 [m
   return {[m
     container: css({[m
       label: 'panel-container',[m
       backgroundColor: background,[m
[31m-      border: `1px solid ${borderColor}`,[m
       position: 'relative',[m
       borderRadius: theme.shape.radius.default,[m
[32m+[m[32m      padding: theme.components.panel.padding,[m
       height: '100%',[m
       display: 'flex',[m
       flexDirection: 'column',[m
[36m@@ -387,7 +387,6 @@[m [mconst getStyles = (theme: GrafanaTheme2) => {[m
       border: '1px solid transparent',[m
       boxSizing: 'border-box',[m
       '&:hover': {[m
[31m-        border: `1px solid ${borderColor}`,[m
       },[m
     }),[m
     loadingBarContainer: css({[m
[1mdiff --git a/packages/grafana-ui/src/components/PanelContainer/PanelContainer.tsx b/packages/grafana-ui/src/components/PanelContainer/PanelContainer.tsx[m
[1mindex fc7b8b5ff8c..6a0610572f2 100644[m
[1m--- a/packages/grafana-ui/src/components/PanelContainer/PanelContainer.tsx[m
[1m+++ b/packages/grafana-ui/src/components/PanelContainer/PanelContainer.tsx[m
[36m@@ -19,6 +19,5 @@[m [mexport const PanelContainer = ({ children, className, ...props }: Props) => {[m
 const getStyles = (theme: GrafanaTheme2) =>[m
   css({[m
     backgroundColor: theme.components.panel.background,[m
[31m-    border: `1px solid ${theme.components.panel.borderColor}`,[m
     borderRadius: theme.shape.radius.default,[m
   });[m
[1mdiff --git a/packages/grafana-ui/src/themes/GlobalStyles/page.ts b/packages/grafana-ui/src/themes/GlobalStyles/page.ts[m
[1mindex ba0446ab82b..76259410357 100644[m
[1m--- a/packages/grafana-ui/src/themes/GlobalStyles/page.ts[m
[1m+++ b/packages/grafana-ui/src/themes/GlobalStyles/page.ts[m
[36m@@ -66,7 +66,6 @@[m [mexport function getPageStyles(theme: GrafanaTheme2) {[m
     '.page-body': {[m
       padding: theme.spacing(1),[m
       background: theme.components.panel.background,[m
[31m-      border: `1px solid ${theme.components.panel.borderColor}`,[m
       marginBottom: '32px',[m
 [m
       [theme.breakpoints.up('md')]: {[m
[1mdiff --git a/public/app/features/dashboard/components/PanelEditor/OptionsPaneOptions.tsx b/public/app/features/dashboard/components/PanelEditor/OptionsPaneOptions.tsx[m
[1mindex db9039bb24d..e3c826e9b24 100644[m
[1m--- a/public/app/features/dashboard/components/PanelEditor/OptionsPaneOptions.tsx[m
[1m+++ b/public/app/features/dashboard/components/PanelEditor/OptionsPaneOptions.tsx[m
[36m@@ -196,9 +196,7 @@[m [mconst getStyles = (theme: GrafanaTheme2) => ({[m
   formBox: css`[m
     padding: ${theme.spacing(1)};[m
     background: ${theme.colors.background.primary};[m
[31m-    border: 1px solid ${theme.components.panel.borderColor};[m
     border-top-left-radius: ${theme.shape.borderRadius(1.5)};[m
[31m-    border-bottom: none;[m
   `,[m
   closeButton: css`[m
     margin-left: ${theme.spacing(1)};[m
[36m@@ -218,8 +216,6 @@[m [mconst getStyles = (theme: GrafanaTheme2) => ({[m
   `,[m
   mainBox: css`[m
     background: ${theme.colors.background.primary};[m
[31m-    border: 1px solid ${theme.components.panel.borderColor};[m
[31m-    border-top: none;[m
     flex-grow: 1;[m
   `,[m
   angularDeprecationWrapper: css`[m
[1mdiff --git a/public/app/features/dashboard/components/PanelEditor/PanelEditorTabs.tsx b/public/app/features/dashboard/components/PanelEditor/PanelEditorTabs.tsx[m
[1mindex a60f5bd5483..2150ff9feac 100644[m
[1m--- a/public/app/features/dashboard/components/PanelEditor/PanelEditorTabs.tsx[m
[1m+++ b/public/app/features/dashboard/components/PanelEditor/PanelEditorTabs.tsx[m
[36m@@ -128,9 +128,6 @@[m [mconst getStyles = (theme: GrafanaTheme2) => {[m
       flex: 1;[m
       min-height: 0;[m
       background: ${theme.colors.background.primary};[m
[31m-      border: 1px solid ${theme.components.panel.borderColor};[m
[31m-      border-left: none;[m
[31m-      border-bottom: none;[m
       border-top-right-radius: ${theme.shape.borderRadius(1.5)};[m
     `,[m
   };[m
[1mdiff --git a/public/app/features/explore/FlameGraph/FlameGraphExploreContainer.tsx b/public/app/features/explore/FlameGraph/FlameGraphExploreContainer.tsx[m
[1mindex 43d7ceb7e54..43179c44fbf 100644[m
[1m--- a/public/app/features/explore/FlameGraph/FlameGraphExploreContainer.tsx[m
[1m+++ b/public/app/features/explore/FlameGraph/FlameGraphExploreContainer.tsx[m
[36m@@ -42,7 +42,6 @@[m [mconst getStyles = (theme: GrafanaTheme2) => ({[m
     background: theme.colors.background.primary,[m
     display: 'flow-root',[m
     padding: theme.spacing(0, 1, 1, 1),[m
[31m-    border: `1px solid ${theme.components.panel.borderColor}`,[m
     borderRadius: theme.shape.radius.default,[m
   }),[m
 });[m
[1mdiff --git a/public/app/plugins/panel/datagrid/utils.ts b/public/app/plugins/panel/datagrid/utils.ts[m
[1mindex 83a0b79dc8b..854623e9c31 100644[m
[1m--- a/public/app/plugins/panel/datagrid/utils.ts[m
[1m+++ b/public/app/plugins/panel/datagrid/utils.ts[m
[36m@@ -280,8 +280,6 @@[m [mexport const getStyles = (theme: GrafanaTheme2, isResizeInProgress: boolean) =>[m
         font-size: 20px;[m
         background-color: ${theme.colors.background.primary};[m
         color: ${theme.colors.text.primary};[m
[31m-        border-right: 1px solid ${theme.components.panel.borderColor};[m
[31m-        border-bottom: 1px solid ${theme.components.panel.borderColor};[m
         transition: background-color 200ms;[m
         cursor: pointer;[m
         :hover {[m
[1mdiff --git a/public/sass/_variables.dark.generated.scss b/public/sass/_variables.dark.generated.scss[m
[1mindex 4917faecbf9..fa4dcc297a1 100644[m
[1m--- a/public/sass/_variables.dark.generated.scss[m
[1m+++ b/public/sass/_variables.dark.generated.scss[m
[36m@@ -134,7 +134,7 @@[m [m$hr-border-color: $dark-9;[m
 // Panel[m
 // -------------------------[m
 $panel-bg: #171B2E;[m
[31m-$panel-border: 1px solid rgba(204, 204, 220, 0.12);[m
[32m+[m[32m$panel-border: 1px solid undefined;[m
 $panel-header-hover-bg: rgba(204, 204, 220, 0.16);[m
 $panel-box-shadow: none;[m
 $panel-corner: $panel-bg;[m
[1mdiff --git a/public/sass/_variables.generated.scss b/public/sass/_variables.generated.scss[m
[1mindex 77f548cdfbb..f64febc7b0f 100644[m
[1m--- a/public/sass/_variables.generated.scss[m
[1m+++ b/public/sass/_variables.generated.scss[m
[36m@@ -132,9 +132,9 @@[m [m$headings-line-height: 1.5 !default;[m
 [m
 $border-width: 1px !default;[m
 [m
[31m-$border-radius: 2px !default;[m
[32m+[m[32m$border-radius: 15px !default;[m
 $border-radius-lg: 6px !default;[m
[31m-$border-radius-sm: 2px !default;[m
[32m+[m[32m$border-radius-sm: 15px !default;[m
 [m
 // Page[m
 [m
[36m@@ -196,7 +196,7 @@[m [m$navbar-padding: 20px;[m
 [m
 // dashboard[m
 $dashboard-padding: $space-md;[m
[31m-$panel-padding: 8px;[m
[32m+[m[32m$panel-padding: 40px;[m
 $panel-header-height: 32px;[m
 $panel-header-z-index: 10;[m
 [m
[1mdiff --git a/public/sass/_variables.light.generated.scss b/public/sass/_variables.light.generated.scss[m
[1mindex 34a3fa204c5..79fe32dbce3 100644[m
[1m--- a/public/sass/_variables.light.generated.scss[m
[1m+++ b/public/sass/_variables.light.generated.scss[m
[36m@@ -129,7 +129,7 @@[m [m$hr-border-color: $gray-4 !default;[m
 // Panel[m
 // -------------------------[m
 $panel-bg: #FFFFFF;[m
[31m-$panel-border: 1px solid rgba(36, 41, 46, 0.12);[m
[32m+[m[32m$panel-border: 1px solid undefined;[m
 $panel-header-hover-bg: rgba(36, 41, 46, 0.12);[m
 $panel-box-shadow: none;[m
 $panel-corner: $panel-bg;[m
[1mdiff --git a/public/sass/pages/_dashboard.scss b/public/sass/pages/_dashboard.scss[m
[1mindex 437894154fe..ad4b806ec11 100644[m
[1m--- a/public/sass/pages/_dashboard.scss[m
[1m+++ b/public/sass/pages/_dashboard.scss[m
[36m@@ -16,6 +16,7 @@[m
   width: 100%;[m
   display: flex;[m
   flex-direction: column;[m
[32m+[m[32m  align-items: center;[m
   flex: 1 1 0;[m
   box-shadow: $panel-box-shadow;[m
 [m
