"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SealText = SealText;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_svg_1 = __importStar(require("react-native-svg"));
function hashSeed(seed) {
    let hash = 2166136261;
    for (let i = 0; i < seed.length; i += 1) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}
function createRandom(seed) {
    let state = hashSeed(seed) || 1;
    return () => {
        state = Math.imul(1664525, state) + 1013904223;
        return (state >>> 0) / 4294967296;
    };
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function createHoles(seed, count, roughness, width, height) {
    const random = createRandom(seed);
    return Array.from({ length: count }, () => {
        const scratch = random() > 0.72;
        const base = 0.7 + random() * 2.8 * roughness;
        const rx = scratch ? base * (1.8 + random() * 2.6) : base * (0.7 + random() * 1.2);
        const ry = scratch ? base * (0.28 + random() * 0.8) : base * (0.55 + random() * 1.1);
        return {
            cx: random() * width,
            cy: random() * height,
            rx,
            ry,
            rotate: Math.round(random() * 160 - 80),
        };
    });
}
function SealText({ text, fontFamily, size, color, distress = 0.28, bleed = 0.12, roughness = 0.5, seed = text, lineHeight, letterSpacing, widthScale = 0.48, textOffsetX = 0, style, }) {
    const rawId = (0, react_1.useId)();
    const maskId = `sealTextMask-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const normalizedDistress = clamp(distress, 0, 1);
    const normalizedBleed = clamp(bleed, 0, 1);
    const normalizedRoughness = clamp(roughness, 0.1, 1);
    const resolvedLineHeight = lineHeight ?? size * 1.06;
    const estimatedWidth = Math.max(size, text.length * size * widthScale + Math.abs(letterSpacing ?? 0) * Math.max(text.length - 1, 0));
    const holes = (0, react_1.useMemo)(() => {
        if (normalizedDistress === 0)
            return [];
        const count = Math.round(8 + normalizedDistress * 30);
        return createHoles(seed, count, normalizedRoughness, estimatedWidth, resolvedLineHeight);
    }, [estimatedWidth, normalizedDistress, normalizedRoughness, resolvedLineHeight, seed]);
    const baselineY = resolvedLineHeight * 0.82;
    return ((0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: estimatedWidth, height: resolvedLineHeight, style: style, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Defs, { children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.Mask, { id: maskId, x: "0", y: "0", width: estimatedWidth, height: resolvedLineHeight, maskUnits: "userSpaceOnUse", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Rect, { x: "0", y: "0", width: estimatedWidth, height: resolvedLineHeight, fill: "#FFFFFF" }), holes.map((hole, index) => ((0, jsx_runtime_1.jsx)(react_native_svg_1.Ellipse, { cx: hole.cx, cy: hole.cy, rx: hole.rx, ry: hole.ry, fill: "#000000", transform: `rotate(${hole.rotate} ${hole.cx} ${hole.cy})` }, `${seed}-${index}`)))] }) }), normalizedBleed > 0 && ((0, jsx_runtime_1.jsx)(react_native_svg_1.Text, { x: estimatedWidth / 2 + textOffsetX + 0.7, y: baselineY + 0.45, fill: color, opacity: normalizedBleed * 0.38, fontFamily: fontFamily, fontSize: size * 1.025, letterSpacing: letterSpacing, textAnchor: "middle", mask: `url(#${maskId})`, children: text })), (0, jsx_runtime_1.jsx)(react_native_svg_1.G, { mask: `url(#${maskId})`, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.Text, { x: estimatedWidth / 2 + textOffsetX, y: baselineY, fill: color, fontFamily: fontFamily, fontSize: size, letterSpacing: letterSpacing, textAnchor: "middle", children: text }) })] }));
}
//# sourceMappingURL=SealText.js.map