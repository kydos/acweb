/**
 * MDX rendering config shared by the blog and the Zenoh Book.
 * Both render Markdown through next-mdx-remote, so the table styling and the
 * syntax-highlighting options live here rather than being copied into each route.
 */

export const rehypePrettyCodeOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
  onVisitLine(node: { children: Array<unknown> }) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
    node.properties.className = ["highlighted-line"];
  },
};

/** Table styling, used verbatim by every MDX surface on the site. */
export const tableComponents = {
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-stone-100 dark:bg-ink-shell" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2 text-left font-semibold text-stone-700 dark:text-cream border border-stone-200 dark:border-ink-wire"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2 text-stone-700 dark:text-fog border border-stone-200 dark:border-ink-wire align-top"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="even:bg-stone-50 dark:even:bg-ink-shell/40" {...props} />
  ),
};

/** Heading and quote styling for long-form articles (blog posts). */
export const articleComponents = {
  ...tableComponents,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-serif font-bold mt-10 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-serif font-semibold mt-8 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-accent/40 pl-4 italic text-stone-600 dark:text-fog my-4"
      {...props}
    />
  ),
};
