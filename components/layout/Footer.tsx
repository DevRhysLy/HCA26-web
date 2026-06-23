import Link from "next/link";
import { getClasses } from "@/lib/contentful";
import { navItems } from "@/config/navigation";
import SectionDivider from "@/components/ui/SectionDivider";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

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
  const classes = await getClasses();

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#F8FAFC]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-br-full bg-[#C60C30]/5" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-tl-full bg-[#003478]/5" />
      </div>

      {/* Korean flag top accent */}
      <div className="relative z-10 flex h-1 w-full overflow-hidden">
        <div className="w-1/2 bg-[#C60C30]" />
        <div className="w-1/2 bg-[#003478]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
              Hapkido College of Australia
            </p>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#111111]">
              Traditional Martial Arts.
              <br />
              Family & Community Focused.
            </h2>

            <p className="mt-4 text-black/60 leading-relaxed">
              Building confidence, discipline, respect, and community through
              traditional Hapkido training for all ages.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#003478] px-6 py-3 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63] hover:-translate-y-0.5"
            >
              Book Free Trial
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#111111] mb-5">Quick Links</h3>

            <ul className="space-y-3">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black/65 transition-colors duration-200 hover:text-[#003478]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-black/65 transition-colors duration-200 hover:text-[#003478]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold text-[#111111] mb-5">Programs</h3>

            <ul className="space-y-3">
              {classes.map((program: any) => (
                <li key={program.sys.id}>
                  <Link
                    href={`/classes/${program.fields.slug}`}
                    className="text-black/65 transition-colors duration-200 hover:text-[#C60C30]"
                  >
                    {program.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-[#111111] mb-5">Contact</h3>

            <div className="space-y-4 text-black/65">
              <p>
                Email:
                <br />
                <a
                  href="mailto:train@hapkidocollege.com.au"
                  className="font-medium text-[#003478] hover:text-[#C60C30]"
                >
                  train@hapkidocollege.com.au
                </a>
              </p>

              <p>
                Phone:
                <br />
                <a
                  href="tel:+61297470822"
                  className="font-medium text-[#003478] hover:text-[#C60C30]"
                >
                  (02) 9747 0822
                </a>
              </p>

              <p>Follow us for updates, events, and training highlights.</p>

              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white text-[#003478] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C60C30]/30 hover:text-[#C60C30]"
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-black/10 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-black/50">
            © {new Date().getFullYear()} Hapkido College of Australia. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
