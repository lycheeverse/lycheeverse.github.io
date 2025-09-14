import { pluginCodeMarkerAnchors } from './src/CodeMarkerAnchorPlugin.mjs';

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
  plugins: [pluginCodeMarkerAnchors()],
}
