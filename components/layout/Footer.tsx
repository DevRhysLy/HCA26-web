import Link from "next/link";
import { getClasses } from "@/lib/contentful";
import { navItems } from "@/config/navigation";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { ButtonLink } from "@/components/ui/Button";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hapkido_college_of_australia/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/HapkidoCollegeofAustralia/",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@HapkidoCollegeofAustralia",
    icon: FaYoutube,
  },
];

export default async function Footer() {
  const classesData = await getClasses();

  return (
    <footer className="relative overflow-hidden border-t border-hca-border bg-hca-cream">
      <div className="flex h-1 w-full overflow-hidden" aria-hidden="true">
        <div className="w-1/2 bg-hca-red" />
        <div className="w-1/2 bg-hca-blue" />
      </div>

      <div className="hca-container relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-hca-red">
              Hapkido College of Australia
            </p>

            <h2 className="font-serif text-2xl font-semibold tracking-tight text-hca-ink">
              Traditional martial arts.
              <br />
              Family and community focused.
            </h2>

            <p className="mt-4 leading-relaxed text-hca-ink/60">
              Building confidence, discipline, respect, and community through
              traditional Hapkido training for all ages.
            </p>

            <ButtonLink href="/contact" className="mt-6">
              Book Free Trial
            </ButtonLink>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-hca-ink">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hca-color-shift text-hca-ink/65 hover:text-hca-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/calendar"
                  className="hca-color-shift text-hca-ink/65 hover:text-hca-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hca-color-shift text-hca-ink/65 hover:text-hca-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-hca-ink">
              Classes
            </h3>

            <ul className="space-y-4">
              {classesData.items.map((program: any) => (
                <li key={program.sys.id}>
                  <Link
                    href={`/classes/${program.fields.slug}`}
                    className="hca-color-shift text-hca-ink/65 hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                  >
                    {program.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-hca-ink">
              Contact
            </h3>

            <div className="space-y-4 text-hca-ink/65">
              <p>
                Email:
                <br />
                <a
                  href="mailto:train@hapkidocollege.com.au"
                  className="font-medium text-hca-blue hover:text-hca-red"
                >
                  train@hapkidocollege.com.au
                </a>
              </p>

              <p>
                Phone:
                <br />
                <a
                  href="tel:+61297470822"
                  className="font-medium text-hca-blue hover:text-hca-red"
                >
                  (02) 9747 0822
                </a>
              </p>

              <p>Follow us for updates, events, and training highlights.</p>

              <div className="flex items-center gap-4 pt-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hca-icon flex h-11 w-11 items-center justify-center rounded-2xl border border-hca-border bg-hca-surface text-hca-blue hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hca-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-hca-ink/50">
            © {new Date().getFullYear()} Hapkido College of Australia. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
