export function pluginCodeMarkerAnchors() {
  /** @type {import('astro-expressive-code').ExpressiveCodePlugin} */
  const plugin = {
    name: 'CodeMarkerAnchorPlugin',
    hooks: {
      postprocessAnnotations: async x => {
        for (const line of x.codeBlock.getLines()) {
          for (const annot of line.getAnnotations()) {
            if (annot.markerType !== 'mark') continue;
            if (annot.label?.startsWith('#')) {
              annot.anchor = annot.label.replace('#', '');
              annot.label = "#";
            }
          }
        }
      },
      postprocessRenderedLine: async x => {
        const annot = x.line.getAnnotations().find(x => x.markerType === 'mark' && !!x.anchor);
        if (!annot) return;

        const lineAst = x.renderData.lineAst;

        lineAst.tagName = 'a';
        lineAst.properties['id'] = annot.anchor;
        lineAst.properties['href'] = '#' + annot.anchor;
        lineAst.properties['style'] = 'text-decoration-line: none;' + (lineAst.properties['style'] ?? '');
      },
    }
  };

  return plugin;
}
