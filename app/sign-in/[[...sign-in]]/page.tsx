import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="mx-auto">
      <SignIn signUpUrl="/sign-up" />
    </div>
  )
}
