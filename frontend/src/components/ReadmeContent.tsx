import type { AnchorHTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import readmeMarkdown from "virtual:readme";

const GITHUB_BLOB_BASE_URL = "https://github.com/guilhermenstorti/weather-monitor/blob/main/";

const isInPageAnchor = (href: string): boolean => href.startsWith("#");
const isExternalLink = (href: string): boolean => href.startsWith("http://") || href.startsWith("https://");

const resolveHref = (href: string): string =>
  isInPageAnchor(href) || isExternalLink(href) ? href : `${GITHUB_BLOB_BASE_URL}${href}`;

interface MarkdownLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  node?: unknown;
}

const MarkdownLink = ({ href, children, node: _node, ...nativeAnchorProps }: MarkdownLinkProps) => {
  if (!href || isInPageAnchor(href)) {
    return (
      <a href={href} {...nativeAnchorProps}>
        {children}
      </a>
    );
  }

  return (
    <a href={resolveHref(href)} target="_blank" rel="noopener noreferrer" {...nativeAnchorProps}>
      {children}
    </a>
  );
};

export const ReadmeContent = () => (
  <div className="prose prose-slate max-w-none prose-headings:scroll-mt-4">
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={{ a: MarkdownLink }}>
      {readmeMarkdown}
    </ReactMarkdown>
  </div>
);
