/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { defineConfig, defineGlobalStyles, definePattern } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  '*:focus': {
    outline: 'none',
  },
  '*:focus-visible': {
    outline: '{sizes.1} solid #fbbf24',
  },
  html: {
    fontSize: { base: '18px', sm: '24px' },
    fontFamily: '"EB Garamond Variable", ui-serif, serif',
  },
  body: {
    minH: 'dvh',
    bg: 'stone.100',
    color: 'stone.800',
  },
  a: {
    '&:link': {
      textDecoration: 'underline',
    },
  },
});

const center = definePattern({
  properties: {
    inline: { type: 'boolean' },
  },
  blocklist: ['display'],
  transform(props) {
    const { inline, ...rest } = props;
    return {
      display: inline ? 'inline-flex' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...rest,
    };
  },
});

const grid = definePattern({
  properties: {
    template: { type: 'property', value: 'gridTemplate' },
    rows: { type: 'property', value: 'gridTemplateRows' },
    columns: { type: 'property', value: 'gridTemplateColumns' },
    areas: { type: 'property', value: 'gridTemplateAreas' },
  },
  blocklist: ['display', 'gridTemplate', 'gridTemplateRows', 'gridTemplateColumns', 'gridTemplateAreas'],
  transform({ template, rows, columns, areas, ...rest }) {
    return {
      display: 'grid',
      gridTemplate: template,
      gridTemplateRows: rows,
      gridTemplateColumns: columns,
      gridTemplateAreas: areas,
      ...rest,
    };
  },
});

const gridItem = definePattern({
  properties: {
    area: { type: 'property', value: 'gridArea' },
    row: { type: 'property', value: 'gridRow' },
    column: { type: 'property', value: 'gridColumn' },
  },
  blocklist: ['gridArea', 'gridRow', 'gridColumn'],
  transform({ area, row, column, ...rest }) {
    return {
      gridArea: area,
      gridRow: row,
      gridColumn: column,
      ...rest,
    };
  },
});

const vstack = definePattern({
  properties: {
    gap: { type: 'property', value: 'gap' },
  },
  blocklist: ['display', 'flexDirection'],
  transform(props) {
    const { gap, ...rest } = props;
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap,
      ...rest,
    };
  },
});

const hstack = definePattern({
  properties: {
    gap: { type: 'property', value: 'gap' },
  },
  blocklist: ['display', 'flexDirection'],
  transform(props) {
    const { gap, ...rest } = props;
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap,
      ...rest,
    };
  },
});

export default defineConfig({
  preflight: true,
  strictPropertyValues: true,
  strictTokens: true,
  include: ['./src/**/*.{astro,ts}', './pages/**/*.{astro,ts}'],
  exclude: [],
  outdir: 'src/styled-system',
  importMap: 'src/styled-system',
  globalCss,
  patterns: {
    center,
    grid,
    gridItem,
    vstack,
    hstack,
  },
});
