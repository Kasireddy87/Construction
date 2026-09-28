import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The site's original free Vercel subdomain — now permanently redirected to
// the real custom domain so bookmarks/shares/search listings consolidate
// onto one URL instead of splitting SEO signal across two addresses.
const OLD_HOST = "sri-balaji-constructions.vercel.app";
const NEW_HOST = "sribalajiconstructionsbuildersanddevelopers.com";

export async function middleware(request: NextRequest) {
  if (request.headers.get("host") === OLD_HOST) {
    const redirectUrl = new URL(request.url);
    redirectUrl.protocol = "https:";
    redirectUrl.host = NEW_HOST;
    redirectUrl.port = "";
    return NextResponse.redirect(redirectUrl, 308);
  }

  const response = NextResponse.next({ request });

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";
  const isSetupRoute = request.nextUrl.pathname === "/admin/setup-required";

  if (!isAdminRoute || isSetupRoute) return response;

  if (!url || !anonKey) {
    return NextResponse.redirect(new URL("/admin/setup-required", request.url));
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginRoute) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (user && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  // Broad enough to catch the old-host redirect on every page, while still
  // skipping static assets/images for performance.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
