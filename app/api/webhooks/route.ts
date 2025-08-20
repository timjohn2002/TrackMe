// import { waitUntil } from "@vercel/functions";
// import { makeWebhookValidator } from "@whop/api";
import type { NextRequest } from "next/server";

// const validateWebhook = makeWebhookValidator({
// 	webhookSecret: process.env.WHOP_WEBHOOK_SECRET ?? "fallback",
// });

export async function POST(request: NextRequest): Promise<Response> {
	// Temporarily simplified for build
	console.log("Webhook received");
	
	// Make sure to return a 2xx status code quickly. Otherwise the webhook will be retried.
	return new Response("OK", { status: 200 });
}

// async function potentiallyLongRunningHandler(
// 	_user_id: string | null | undefined,
// 	_amount: number,
// 	_currency: string,
// 	_amount_after_fees: number | null | undefined,
// ) {
// 	// This is a placeholder for a potentially long running operation
// 	// In a real scenario, you might need to fetch user data, update a database, etc.
// }
