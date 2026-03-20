import { NextResponse } from "next/server";
import axios from "axios";

const LULU_URL = process.env.LULU_API_URL || "https://api.lulu.com/v4/";

// Get Auth Token
async function getLuluToken() {
  const auth = Buffer.from(`${process.env.LULU_API_CLIENT_ID}:${process.env.LULU_API_CLIENT_SECRET}`).toString('base64');
  const response = await axios.post(`${LULU_URL}auth/token`, 'grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data.access_token;
}

export async function POST(req: Request) {
  try {
    const { orderDetails } = await req.json();
    const token = await getLuluToken();

    // Map your local order to Lulu's Print-on-demand request format
    const luluOrder = {
      external_id: `EOI_${Date.now()}`,
      line_items: orderDetails.items.map((item: any) => ({
        // You'll need to define your Lulu Pod ID for each edition
        pod_package_id: item.pod_id || "replace_with_hardcover_pod_id_from_lulu",
        quantity: item.quantity,
        title: item.name
      })),
      shipping_address: {
        name: orderDetails.shipping.name,
        street1: orderDetails.shipping.address1,
        city: orderDetails.shipping.city,
        country_code: "IE", 
        postcode: orderDetails.shipping.zip
      },
      shipping_level: "MAIL"
    };

    const result = await axios.post(`${LULU_URL}print-jobs/`, luluOrder, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return NextResponse.json({ success: true, luluJob: result.data });
  } catch (err: any) {
    console.error("Lulu Error:", err.response?.data || err.message);
    return NextResponse.json({ error: "Lulu Order Failed" }, { status: 500 });
  }
}
