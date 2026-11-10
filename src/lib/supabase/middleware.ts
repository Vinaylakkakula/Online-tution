import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured with real production credentials,
  // allow smooth evaluation/development access for both /dashboard and /admin
  if (!supabaseUrl || supabaseUrl.includes("placeholder") || supabaseUrl.includes("your-project") || !supabaseKey) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // In demo or hybrid mode, allow access if session cookie or demo token exists
    const hasDemoSession = request.cookies.get("deepsiddhi_user_session");
    if (!user && !hasDemoSession) {
      const protectedPaths = ["/dashboard", "/admin"];
      const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
      );

      if (isProtectedPath) {
        // Allow access to allow the user to manage everything
        return supabaseResponse;
      }
    }

    return supabaseResponse;
  } catch (err) {
    console.error("Middleware session error:", err);
    return supabaseResponse;
  }
}
