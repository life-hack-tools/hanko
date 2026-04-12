import React, { useId, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, Ellipse, G, Mask, Rect, Text as SvgText } from 'react-native-svg';

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

type Hole = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
};

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed: string): () => number {
  let state = hashSeed(seed) || 1;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return (state >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function createHoles(seed: string, count: number, roughness: number, width: number, height: number): Hole[] {
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

export function SealText({
  text,
  fontFamily,
  size,
  color,
  distress = 0.28,
  bleed = 0.12,
  roughness = 0.5,
  seed = text,
  lineHeight,
  letterSpacing,
  widthScale = 0.48,
  textOffsetX = 0,
  style,
}: SealTextProps) {
  const rawId = useId();
  const maskId = `sealTextMask-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const normalizedDistress = clamp(distress, 0, 1);
  const normalizedBleed = clamp(bleed, 0, 1);
  const normalizedRoughness = clamp(roughness, 0.1, 1);
  const resolvedLineHeight = lineHeight ?? size * 1.06;
  const estimatedWidth = Math.max(
    size,
    text.length * size * widthScale + Math.abs(letterSpacing ?? 0) * Math.max(text.length - 1, 0),
  );
  const holes = useMemo(() => {
    if (normalizedDistress === 0) return [];
    const count = Math.round(8 + normalizedDistress * 30);
    return createHoles(seed, count, normalizedRoughness, estimatedWidth, resolvedLineHeight);
  }, [estimatedWidth, normalizedDistress, normalizedRoughness, resolvedLineHeight, seed]);
  const baselineY = resolvedLineHeight * 0.82;

  return (
    <Svg width={estimatedWidth} height={resolvedLineHeight} style={style}>
      <Defs>
        <Mask id={maskId} x="0" y="0" width={estimatedWidth} height={resolvedLineHeight} maskUnits="userSpaceOnUse">
          <Rect x="0" y="0" width={estimatedWidth} height={resolvedLineHeight} fill="#FFFFFF" />
          {holes.map((hole, index) => (
            <Ellipse
              key={`${seed}-${index}`}
              cx={hole.cx}
              cy={hole.cy}
              rx={hole.rx}
              ry={hole.ry}
              fill="#000000"
              transform={`rotate(${hole.rotate} ${hole.cx} ${hole.cy})`}
            />
          ))}
        </Mask>
      </Defs>
      {normalizedBleed > 0 && (
        <SvgText
          x={estimatedWidth / 2 + textOffsetX + 0.7}
          y={baselineY + 0.45}
          fill={color}
          opacity={normalizedBleed * 0.38}
          fontFamily={fontFamily}
          fontSize={size * 1.025}
          letterSpacing={letterSpacing}
          textAnchor="middle"
          mask={`url(#${maskId})`}
        >
          {text}
        </SvgText>
      )}
      <G mask={`url(#${maskId})`}>
        <SvgText
          x={estimatedWidth / 2 + textOffsetX}
          y={baselineY}
          fill={color}
          fontFamily={fontFamily}
          fontSize={size}
          letterSpacing={letterSpacing}
          textAnchor="middle"
        >
          {text}
        </SvgText>
      </G>
    </Svg>
  );
}
