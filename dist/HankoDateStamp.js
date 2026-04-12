import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SealText } from './SealText';
const ENGLISH_WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const JAPANESE_WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
const VIETNAMESE_WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
function toDate(value) {
    return value instanceof Date ? value : new Date(`${value}T00:00:00`);
}
function getStampWeekday(day, language = 'en') {
    const normalized = language.toLowerCase();
    if (normalized.startsWith('ja'))
        return JAPANESE_WEEKDAYS[day];
    if (normalized.startsWith('vi'))
        return VIETNAMESE_WEEKDAYS[day];
    return ENGLISH_WEEKDAYS[day];
}
function withAlpha(hexColor, alphaHex) {
    return /^#[0-9a-fA-F]{6}$/.test(hexColor) ? `${hexColor}${alphaHex}` : null;
}
export function HankoDateStamp({ date, language = 'en', tone = 'paper', size = 'regular', shape = 'circle', rotation = 0, distressed = true, color: colorProp, backgroundColor: backgroundColorProp, fontFamily, theme, style, textStyle, }) {
    const parsed = toDate(date);
    const parts = useMemo(() => {
        const month = String(parsed.getMonth() + 1).padStart(2, '0');
        const day = String(parsed.getDate()).padStart(2, '0');
        return {
            month,
            day,
            weekday: getStampWeekday(parsed.getDay(), language),
            year: String(parsed.getFullYear()),
        };
    }, [language, parsed]);
    const isOverlay = tone === 'overlay';
    const sealColor = theme?.sealColor ?? (theme?.isDark ? '#D7A36B' : '#A94735');
    const color = colorProp ?? (isOverlay ? 'rgba(255,244,232,0.92)' : sealColor);
    const borderColor = isOverlay
        ? colorProp ? color : 'rgba(255,244,232,0.62)'
        : withAlpha(color, '8F') ?? color;
    const faintBorderColor = isOverlay
        ? colorProp ? color : 'rgba(255,244,232,0.30)'
        : withAlpha(color, '33') ?? color;
    const backgroundColor = backgroundColorProp ?? (isOverlay
        ? 'rgba(18,12,8,0.18)'
        : theme?.isDark ? 'rgba(215,163,107,0.08)' : 'rgba(169,71,53,0.035)');
    const distressColor = isOverlay
        ? 'rgba(255,244,232,0.34)'
        : theme?.isDark ? '#17100B' : '#FAF6F1';
    const seedBase = `${parts.year}-${parts.month}-${parts.day}`;
    const shapeStyles = shape === 'square' ? styles.squareShape : styles.circleShape;
    const innerShapeStyles = shape === 'square' ? styles.squareInnerShape : styles.circleShape;
    const textDistressScale = distressed ? (isOverlay ? 0.34 : 0.58) : 0;
    const rotationStyle = useMemo(() => ({ transform: [{ rotate: `${rotation}deg` }] }), [rotation]);
    return (_jsxs(View, { style: [
            styles.stamp,
            size === 'small' ? styles.stampSmall : styles.stampRegular,
            shapeStyles,
            rotationStyle,
            { backgroundColor },
            style,
        ], children: [distressed ? (_jsxs(_Fragment, { children: [_jsx(BrokenStampRing, { color: borderColor, seed: `${seedBase}-outer-ring`, shape: shape, size: size, inset: 0, opacity: 1 }), _jsx(BrokenStampRing, { color: faintBorderColor, seed: `${seedBase}-echo-ring`, shape: shape, size: size, inset: shape === 'square' ? 5 : 3, opacity: 0.76 })] })) : (_jsxs(_Fragment, { children: [_jsx(View, { pointerEvents: "none", style: [styles.solidOuterRing, shapeStyles, { borderColor }] }), _jsx(View, { pointerEvents: "none", style: [
                            styles.solidInsetRing,
                            shape === 'square' ? styles.squareRingInset : styles.circleRingInset,
                            innerShapeStyles,
                            { borderColor: faintBorderColor },
                        ] })] })), _jsxs(View, { style: [styles.innerRing, innerShapeStyles], children: [distressed ? (_jsx(BrokenStampRing, { color: faintBorderColor, seed: `${seedBase}-inner-ring`, shape: shape, size: size, inset: shape === 'square' ? 10 : 8, opacity: 0.86 })) : (_jsx(View, { pointerEvents: "none", style: [
                            styles.solidInsetRing,
                            shape === 'square' ? styles.squareInnerRingInset : styles.circleInnerRingInset,
                            innerShapeStyles,
                            { borderColor: faintBorderColor },
                        ] })), _jsx(SealText, { text: parts.year, fontFamily: fontFamily, size: size === 'small' ? 5.5 : 8.5, color: color, backgroundColor: distressColor, distress: 0.12 * textDistressScale, bleed: distressed ? (isOverlay ? 0.025 : 0.05) : 0, roughness: 0.34, seed: `${seedBase}-year`, letterSpacing: -0.8, widthScale: 0.66, lineHeight: size === 'small' ? 6.3 : 9.5, style: [styles.yearSeal, size === 'small' ? styles.yearSealSmall : styles.yearSealRegular], textStyle: textStyle }), _jsx(View, { style: [styles.divider, { backgroundColor: faintBorderColor }] }), _jsx(SealText, { text: parts.day, fontFamily: fontFamily, size: size === 'small' ? 20 : 30, color: color, backgroundColor: distressColor, distress: 0.18 * textDistressScale, bleed: distressed ? (isOverlay ? 0.04 : 0.08) : 0, roughness: 0.48, seed: `${seedBase}-day`, letterSpacing: size === 'small' ? -5.2 : -8.6, widthScale: size === 'small' ? 0.36 : 0.30, textOffsetX: size === 'small' ? 1.6 : 1.2, lineHeight: size === 'small' ? 21 : 31, textStyle: textStyle }), _jsx(View, { style: [styles.divider, { backgroundColor: faintBorderColor }] }), _jsx(SealText, { text: `${parts.month}.${parts.weekday}`, fontFamily: fontFamily, size: size === 'small' ? 6 : 8.5, color: color, backgroundColor: distressColor, distress: 0.1 * textDistressScale, bleed: distressed ? (isOverlay ? 0.025 : 0.05) : 0, roughness: 0.32, seed: `${seedBase}-month`, letterSpacing: -0.8, widthScale: 0.66, lineHeight: size === 'small' ? 6.8 : 9.5, style: [styles.monthSeal, size === 'small' ? styles.monthSealSmall : styles.monthSealRegular], textStyle: textStyle })] })] }));
}
function createRandom(seed) {
    let state = 2166136261;
    for (let i = 0; i < seed.length; i += 1) {
        state ^= seed.charCodeAt(i);
        state = Math.imul(state, 16777619);
    }
    return () => {
        state = Math.imul(1664525, state) + 1013904223;
        return (state >>> 0) / 4294967296;
    };
}
function createCircleSegments(seed, count, inset) {
    const random = createRandom(seed);
    const radius = 50 - inset;
    return Array.from({ length: count }, (_, index) => {
        const angle = ((index + random() * 0.48) / count) * Math.PI * 2;
        const arcLength = 5 + random() * 8;
        return {
            left: 50 + Math.cos(angle) * radius,
            top: 50 + Math.sin(angle) * radius,
            width: random() > 0.18 ? arcLength : arcLength * 0.42,
            height: 1 + random() * 1.2,
            rotate: `${Math.round((angle * 180) / Math.PI + 90 + random() * 8 - 4)}deg`,
            opacity: 0.42 + random() * 0.48,
        };
    });
}
function createSquareSegments(seed, count, inset) {
    const random = createRandom(seed);
    return Array.from({ length: count }, () => {
        const side = Math.floor(random() * 4);
        const along = inset + 2 + random() * (96 - inset * 2);
        const jitter = random() * 1.8 - 0.9;
        const positions = [
            { left: along, top: inset + jitter, rotate: '0deg' },
            { left: 100 - inset + jitter, top: along, rotate: '90deg' },
            { left: along, top: 100 - inset + jitter, rotate: '0deg' },
            { left: inset + jitter, top: along, rotate: '90deg' },
        ];
        return {
            ...positions[side],
            width: random() > 0.18 ? 5 + random() * 10 : 2 + random() * 4,
            height: 1 + random() * 1.2,
            opacity: 0.42 + random() * 0.48,
        };
    });
}
function BrokenStampRing({ color, seed, size, shape, inset, opacity, }) {
    const segmentCount = size === 'small' ? 18 : 30;
    const segments = useMemo(() => shape === 'square'
        ? createSquareSegments(seed, segmentCount, inset)
        : createCircleSegments(seed, segmentCount, inset), [inset, seed, segmentCount, shape]);
    return (_jsx(View, { pointerEvents: "none", style: [styles.brokenRing, { opacity }], children: segments.map((segment, index) => (_jsx(View, { style: [
                styles.ringSegment,
                {
                    left: `${segment.left}%`,
                    top: `${segment.top}%`,
                    width: segment.width,
                    height: segment.height,
                    backgroundColor: color,
                    opacity: segment.opacity,
                    transform: [{ translateX: -segment.width / 2 }, { rotate: segment.rotate }],
                },
            ] }, `${seed}-${index}`))) }));
}
const styles = StyleSheet.create({
    stamp: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#5C1F16',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
    },
    circleShape: {
        borderRadius: 999,
    },
    squareShape: {
        borderRadius: 12,
    },
    squareInnerShape: {
        borderRadius: 9,
    },
    stampRegular: {
        width: 82,
        height: 82,
        padding: 5,
    },
    stampSmall: {
        width: 56,
        height: 56,
        padding: 4,
    },
    innerRing: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    solidOuterRing: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 1.45,
    },
    solidInsetRing: {
        position: 'absolute',
        borderWidth: StyleSheet.hairlineWidth,
        opacity: 0.85,
    },
    circleRingInset: {
        left: 3,
        right: 3,
        top: 3,
        bottom: 3,
    },
    squareRingInset: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
    },
    circleInnerRingInset: {
        left: 8,
        right: 8,
        top: 8,
        bottom: 8,
    },
    squareInnerRingInset: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
    },
    monthSeal: {
        width: '90%',
    },
    divider: {
        width: '58%',
        height: StyleSheet.hairlineWidth,
        marginVertical: 1,
    },
    yearSeal: {
        width: '90%',
    },
    yearSealRegular: {
        marginBottom: -1.5,
    },
    yearSealSmall: {
        marginBottom: -0.8,
    },
    monthSealRegular: {
        marginTop: -1.5,
    },
    monthSealSmall: {
        marginTop: -0.8,
    },
    brokenRing: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    ringSegment: {
        position: 'absolute',
        borderRadius: 999,
    },
});
//# sourceMappingURL=HankoDateStamp.js.map