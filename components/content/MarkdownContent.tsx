import ReactMarkdown from "react-markdown";
import {
  markdownComponents,
  markdownRemarkPlugins,
} from "@/components/content/markdownComponents";

interface MarkdownContentProps {
  body: string;
}

/** Server component — renders markdown to HTML on the server. */
export default function MarkdownContent({ body }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={markdownRemarkPlugins}
      components={markdownComponents}
    >
      {body}
    </ReactMarkdown>
  );
}
