import EmailLead from "@/components/Email/EmailLead";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { contact, name } = body;

    if (!contact || !name) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["jgnaciogomez@gmail.com"],
      subject: `Nuevo Lead ${name} 📨`,
      react: EmailLead({ name, contact }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
