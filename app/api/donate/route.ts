import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sourceId, amount } = await req.json();

  if (!sourceId || !amount || amount <= 0) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

  if (!accessToken || !locationId) {
    return NextResponse.json({ success: false, error: "Payment not configured" }, { status: 500 });
  }

  try {
    const isSandbox = process.env.NEXT_PUBLIC_SQUARE_APP_ID?.startsWith("sandbox-");
    const squareUrl = isSandbox
      ? "https://connect.squareupsandbox.com/v2/payments"
      : "https://connect.squareup.com/v2/payments";

    const response = await fetch(squareUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Square-Version": "2024-01-17",
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: crypto.randomUUID(),
        amount_money: {
          amount: Math.round(amount * 100),
          currency: "USD",
        },
        location_id: locationId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.errors?.[0]?.detail || "Payment failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, paymentId: data.payment?.id });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
