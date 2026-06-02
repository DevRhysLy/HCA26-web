import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface MarkdownPageProps {
  title: string;
  body: string;

  profileImage?: {
    src: string;
    alt?: string;
  };

  heroImage?: {
    src: string;
    alt?: string;
  };
}

export default function MarkdownPage({
  title,
  body,
  profileImage,
  heroImage,
}: MarkdownPageProps) {
  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Banner Image - for locations/pages */}
      {heroImage && (
        <section className="relative overflow-hidden">
          <div className="relative h-[360px] md:h-[460px] w-full">
            <Image
              src={heroImage.src}
              alt={heroImage.alt ?? title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto w-full px-6 pb-12">
              <div
                className="
        max-w-3xl
        rounded-3xl
        border border-white/10
        bg-white/45
        backdrop-blur-md
        p-8 md:p-10
        shadow-2xl
      "
              >
                <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
                  Hapkido College of Australia
                </p>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                  {title}
                </h1>

                <div className="mt-5 flex h-1 w-40 overflow-hidden rounded-full">
                  <div className="w-1/2 bg-[#C60C30]" />
                  <div className="w-1/2 bg-[#003478]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Standard Header - only shown when there is no hero image */}
        {!heroImage && (
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
            {/* Profile Image - for instructors */}
            {profileImage && (
              <div className="flex justify-center md:justify-start flex-shrink-0">
                <div className="relative">
                  <div className="rounded-full bg-gradient-to-br from-[#C60C30] via-white to-[#003478] p-[4px] shadow-md">
                    <div className="rounded-full bg-white p-1">
                      <div className="relative h-40 w-40 overflow-hidden rounded-full">
                        <Image
                          src={profileImage.src}
                          alt={profileImage.alt ?? title}
                          fill
                          sizes="160px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-white bg-[#003478]" />
                </div>
              </div>
            )}

            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
                Hapkido College of Australia
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
                {title}
              </h1>

              <div className="mt-5 flex h-1 w-32 overflow-hidden rounded-full mx-auto md:mx-0">
                <div className="w-1/2 bg-[#C60C30]" />
                <div className="w-1/2 bg-[#003478]" />
              </div>
            </div>
          </div>
        )}

        <article className="prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-[#003478] mt-10 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-[#C60C30] mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-black/70 leading-relaxed mb-5">{children}</p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[#003478] underline hover:text-[#C60C30] transition-colors"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 text-black/70 space-y-2 mb-5">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 text-black/70 space-y-2 mb-5">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#003478] pl-4 italic text-black/60 my-6">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[#111111]">
                  {children}
                </strong>
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
