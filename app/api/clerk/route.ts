import { db } from "@/lib/db/index"
import { book, user } from "@/lib/db/schema"
import type { UserJSON, UserWebhookEvent } from "@clerk/clerk-sdk-node"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"

const webhookSecret: string = process.env.WEBHOOK_SECRET || ""

export async function POST(req: Request) {
  const payload = await req.json()
  const payloadString = JSON.stringify(payload)
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixIdTimeStamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId)
    console.log("svixIdTimeStamp", svixIdTimeStamp)
    console.log("svixSignature", svixSignature)
    return new Response("Error occured", {
      status: 400,
    })
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  }

  const wh = new Webhook(webhookSecret)
  let evt: UserWebhookEvent | null = null

  try {
    evt = wh.verify(payloadString, svixHeaders) as UserWebhookEvent
  } catch (_) {
    console.log("error")
    return NextResponse.json("Error occured", {
      status: 400,
    })
  }

  const { id } = evt.data as UserJSON
  const eventType = evt.type

  try {
    if (eventType === "user.created") {
      await db.insert(user).values({ id })
      console.log(`User ${id} was created`)
    }

    if (eventType === "user.deleted") {
      await db.delete(user).where(eq(user.id, id))
      await db.delete(book).where(eq(book.ownerId, id))
      console.log(`User ${id} and its books were deleted`)
    }
  } catch (error) {
    console.log(error)
    const actionToken = eventType === "user.created" ? "create" : "delete"
    return NextResponse.json(`failed to ${actionToken} user in database`, {
      status: 500,
    })
  }

  const status = eventType === "user.created" ? 201 : 204

  return NextResponse.json({ status })
}
