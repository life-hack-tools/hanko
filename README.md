# Hanko Package Candidate

This folder is intentionally isolated so it can later become a shared package such as `@life-hack-tools/hanko`.

## Current Export

- `HankoDateStamp`: React Native date stamp component
- `SealText`: SVG-masked distressed text primitive used by `HankoDateStamp`

## Shape

`HankoDateStamp` supports `shape="circle"` and `shape="square"`. The default is `circle` to preserve the current WordDiary UI.

`rotation` controls the stamp angle in degrees. The default is `0`; pass a negative or positive value to tilt the stamp.

Pass `distressed={false}` to disable broken rings, text flecks, and ink bleed.

Use `color` to override the stamp ink color and `backgroundColor` to override the stamp surface color.

## App-Specific Wrapper

`src/components/HankoDate.tsx` owns WordDiary-specific concerns:

- `react-i18next` language lookup
- app theme lookup
- app font token lookup

Keep those dependencies out of this folder so the package can be moved without carrying WordDiary contexts.

## Font

The component accepts `fontFamily`; it does not import or bundle fonts. The host app should load any font it wants to use.

## Peer Dependencies

- `react`
- `react-native`
- `react-native-svg`
