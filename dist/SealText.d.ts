import { StyleProp, ViewStyle } from 'react-native';
export interface SealTextProps {
    text: string;
    fontFamily?: string;
    size: number;
    color: string;
    backgroundColor: string;
    distress?: number;
    bleed?: number;
    roughness?: number;
    seed?: string;
    lineHeight?: number;
    letterSpacing?: number;
    widthScale?: number;
    textOffsetX?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: unknown;
}
export declare function SealText({ text, fontFamily, size, color, distress, bleed, roughness, seed, lineHeight, letterSpacing, widthScale, textOffsetX, style, }: SealTextProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SealText.d.ts.map