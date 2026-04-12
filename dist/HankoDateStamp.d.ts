import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export type HankoDateStampTone = 'paper' | 'overlay';
export type HankoDateStampSize = 'regular' | 'small';
export type HankoDateStampShape = 'circle' | 'square';
export interface HankoDateStampTheme {
    isDark?: boolean;
    sealColor?: string;
}
export interface HankoDateStampProps {
    date: string | Date;
    language?: string;
    tone?: HankoDateStampTone;
    size?: HankoDateStampSize;
    shape?: HankoDateStampShape;
    rotation?: number;
    distressed?: boolean;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    theme?: HankoDateStampTheme;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}
export declare function HankoDateStamp({ date, language, tone, size, shape, rotation, distressed, color: colorProp, backgroundColor: backgroundColorProp, fontFamily, theme, style, textStyle, }: HankoDateStampProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HankoDateStamp.d.ts.map