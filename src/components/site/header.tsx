"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EnquiryDialog } from "@/components/site/enquiry-dialog";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { CompanyInfo } from "@/types/project";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({ company }: { company: CompanyInfo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          {company.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            onClick={() => trackEvent("call_click")}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-4" />
            {company.phone}
          </a>
          <EnquiryDialog trigger={<Button>Enquire Now</Button>} />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>{company.name}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted",
                    pathname === link.href && "bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                onClick={() => trackEvent("call_click")}
                className="mt-2 flex items-center gap-1.5 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                <Phone className="size-4" />
                {company.phone}
              </a>
              <div className="px-3 pt-3">
                <EnquiryDialog trigger={<Button className="w-full">Enquire Now</Button>} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
