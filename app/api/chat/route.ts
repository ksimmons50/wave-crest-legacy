import { streamText, convertToModelMessages, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { Resend } from "resend";
import {
  PROFESSIONAL_NAME,
  PROFESSIONAL_EMAIL,
  PROFESSIONAL_PHONE,
  PROFESSIONAL_ADDRESS,
  PROFESSIONAL_TAGLINE,
} from "@/professionalConstants";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the friendly virtual assistant for ${PROFESSIONAL_NAME}, a real estate company based at ${PROFESSIONAL_ADDRESS}.

Company tagline: "${PROFESSIONAL_TAGLINE}."

The company operates three connected divisions:
- Wave Crest Legacy Group (The Foundation): business clarity & documentation, brand identity, mentorship & strategic guidance, investor-ready systems.
- Wave Crest Legacy Acquisitions (The Engine): real estate due diligence, market studies & analysis, deal structuring, owner-finance pathways.
- Wave Crest Legacy Holding (The Anchor): portfolio organization, clean title management, asset stewardship, legacy planning.

Flexible ownership pathways the company offers to residents:
- Lease-Option (L/O): lease today, lock in purchase terms, and buy within 12–24 months.
- Rent-to-Own (RTO): rent while building toward ownership, including an option fee and a clear purchase timeline.
- Support & Guidance: help residents understand their path, prepare for financing, and transition smoothly.

Your job:
- Answer visitor questions about the company, its divisions, services, and ownership pathways clearly and concisely.
- Be warm, professional, and helpful. Keep answers short (2-4 sentences) unless more detail is requested.
- You help families, investors, and entrepreneurs. You do NOT give legal, tax, or binding financial advice — encourage visitors to speak with the team for specifics.
- When a visitor expresses interest in working together, wants a callback, asks about a specific property, or wants to be contacted, collect their name and a contact method (email or phone) plus a short note about what they need, then use the "captureLead" tool to send the details to the team.
- After capturing a lead, confirm to the visitor that the team will reach out, and share the phone number ${PROFESSIONAL_PHONE} and email ${PROFESSIONAL_EMAIL} in case they prefer to reach out directly.
- Never invent specific property listings, prices, or availability. If you don't know, say so and offer to connect them with the team.`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "openai/gpt-5.4-mini",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      captureLead: tool({
        description:
          "Send the visitor's contact details to the Wave Crest Legacy team. Use this once you have collected the visitor's name and at least one contact method (email or phone).",
        inputSchema: z.object({
          name: z.string().describe("The visitor's full name"),
          email: z.string().nullable().describe("The visitor's email address, or null if not provided"),
          phone: z.string().nullable().describe("The visitor's phone number, or null if not provided"),
          message: z
            .string()
            .describe("A short summary of what the visitor is interested in or needs help with"),
        }),
        execute: async ({ name, email, phone, message }) => {
          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            console.log("[v0] RESEND_API_KEY not set — lead not emailed:", { name, email, phone, message });
            return {
              ok: false,
              note: "Lead captured but email delivery is not configured yet.",
            };
          }

          try {
            const resend = new Resend(apiKey);
            // Once you verify your domain in Resend, set LEAD_FROM_EMAIL to an
            // address on that domain (e.g. "Wave Crest Chat <leads@wavecrestlegacy.com>").
            // Until then we fall back to Resend's shared sandbox sender, which only
            // delivers to the Resend account owner's email.
            const fromAddress =
              process.env.LEAD_FROM_EMAIL || "Wave Crest Chat <onboarding@resend.dev>";
            await resend.emails.send({
              from: fromAddress,
              to: PROFESSIONAL_EMAIL,
              replyTo: email ?? undefined,
              subject: `New website chat lead: ${name}`,
              text: [
                `You have a new lead from the website chat assistant.`,
                ``,
                `Name: ${name}`,
                `Email: ${email ?? "—"}`,
                `Phone: ${phone ?? "—"}`,
                ``,
                `What they need:`,
                message,
              ].join("\n"),
            });
            return { ok: true };
          } catch (error) {
            console.log("[v0] Failed to send lead email:", (error as Error).message);
            return { ok: false, note: "Could not send the email right now." };
          }
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
