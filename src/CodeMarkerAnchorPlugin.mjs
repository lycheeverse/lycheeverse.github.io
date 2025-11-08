/**
 * [Expressive code plugin] for transforming [markers][] beginning with `#`
 * into anchor links. The marker text is replaced with only `#` and
 * the marker becomes a hyperlink to the anchor itself.
 *
 * This allows creating links to certain named positions within a code block.
 *
 * [markers]: https://expressive-code.com/key-features/text-markers/
 * [Expressive code plugin]: https://expressive-code.com/reference/plugin-hooks/
 */
export function pluginCodeMarkerAnchors() {
  /** @type {import('astro-expressive-code').ExpressiveCodePlugin} */
  const plugin = {
    name: "CodeMarkerAnchorPlugin",
    hooks: {
      // first, markers beginning with `#` are identified. the anchor ID is
      // stored, then the text is replaced with just `#`.
      postprocessAnnotations: async (x) => {
        for (const line of x.codeBlock.getLines()) {
          for (const annot of line.getAnnotations()) {
            if (annot.markerType !== "mark") continue;
            if (annot.label?.startsWith("#")) {
              // NOTE: this is kind of hacky, it's adding a new field into the
              // TextMarkerAnnotation class.
              annot.anchor = annot.label.replace("#", "");
              annot.label = "#";
            }
          }
        }
      },

      // secondly, rendered markers with recorded anchors are turned into
      // hyperlinks with id attributes.
      postprocessRenderedLine: async (x) => {
        const annot = x.line.getAnnotations().find((x) => !!x.anchor);
        if (!annot) return;

        const lineAst = x.renderData.lineAst;

        lineAst.tagName = "a";
        lineAst.properties.id = annot.anchor;
        lineAst.properties.href = `#${annot.anchor}`;
        lineAst.properties.style = `text-decoration-line: none;${lineAst.properties.style ?? ""}`;
      },
    },
  };

  return plugin;
}
