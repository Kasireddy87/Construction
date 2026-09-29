import Link from "next/link";

import type { CompanyInfo } from "@/types/project";

export function Footer({ company }: { company: CompanyInfo }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- static local logo, no optimization needed */}
              <img src="/logo-mark.png" alt="" className="h-8 w-auto brightness-0 invert" />
              <p className="font-heading text-lg font-bold">{company.name}</p>
            </div>
            <p className="text-sm text-primary-foreground/70">{company.aboutTitle}</p>
            <div className="flex gap-3 pt-1">
              {company.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-foreground/70 underline-offset-4 hover:text-primary-foreground hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Explore</p>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link href="/projects" className="hover:text-primary-foreground">
                All Projects
              </Link>
              <Link href="/about" className="hover:text-primary-foreground">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-primary-foreground">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-3 md:col-span-2">
            <p className="text-sm font-semibold">Our Offices</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {company.offices.map((office) => (
                <div key={office.label} className="text-sm text-primary-foreground/70">
                  <p className="font-medium text-primary-foreground/90">{office.label}</p>
                  <p className="mt-1">{office.address}</p>
                  <p className="mt-1">{office.phone}</p>
                  <p>{office.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
