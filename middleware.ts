import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/", "/books"],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
}
