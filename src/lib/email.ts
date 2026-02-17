import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "Matt from CourtRenter <matt@courtrenter.com>";

export async function sendRenterConfirmation({
  to,
  renterName,
  courtRequest,
  matchedCount,
}: {
  to: string;
  renterName: string;
  courtRequest: string;
  matchedCount: number;
}) {
  const courtLabel =
    courtRequest === "half"
      ? "Half Court"
      : courtRequest === "full"
        ? "Full Court"
        : "Multiple Courts";

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Your CourtRenter request has been submitted!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <img src="https://courtrenter.com/favicon-192.png" alt="CourtRenter" width="48" height="48" style="border-radius: 50%; margin-bottom: 16px;" />
          <h2 style="color: #111827; margin-bottom: 8px;">Your request is live!</h2>
          <p style="color: #6b7280; font-size: 15px; line-height: 1.6;">
            Hi ${renterName}, your request for a <strong>${courtLabel}</strong> basketball court has been sent to
            <strong>${matchedCount} venue${matchedCount !== 1 ? "s" : ""}</strong> in San Francisco.
          </p>
          <p style="color: #6b7280; font-size: 15px; line-height: 1.6;">
            Venues will reach out to you directly with availability and pricing. Most respond within 24-48 hours.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 13px;">
            CourtRenter &middot; Helping you find basketball courts in San Francisco
          </p>
        </div>
      `,
    });
    console.log(`[EMAIL SENT] Confirmation to ${to}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send confirmation to ${to}:`, err);
  }
}

export async function sendVenueNotification({
  to,
  venueName,
  courtRequest,
  courtsNeeded,
  dateOptions,
  leadId,
  venueId,
}: {
  to: string;
  venueName: string;
  courtRequest: string;
  courtsNeeded: number;
  dateOptions: string[];
  leadId: string;
  venueId: string;
}) {
  const courtLabel =
    courtRequest === "half"
      ? "Half Court"
      : courtRequest === "full"
        ? "Full Court"
        : `Multiple Courts (${courtsNeeded})`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://courtrenter.com";
  const unlockUrl = `${baseUrl}/lead/${leadId}?venue=${venueId}`;

  const dateList = dateOptions
    .map((d) => {
      const dt = new Date(d + "T00:00:00");
      return dt.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    })
    .join(", ");

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `New court rental request: ${courtLabel}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <img src="https://courtrenter.com/favicon-192.png" alt="CourtRenter" width="48" height="48" style="border-radius: 50%; margin-bottom: 16px;" />
          <h2 style="color: #111827; margin-bottom: 8px;">New rental lead for ${venueName}</h2>
          <p style="color: #6b7280; font-size: 15px; line-height: 1.6;">
            A renter is looking for a <strong>${courtLabel}</strong> basketball court on <strong>${dateList}</strong>.
          </p>
          <a href="${unlockUrl}" style="display: inline-block; background: #111827; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 15px; margin: 16px 0;">
            Unlock Lead &mdash; $2.99
          </a>
          <p style="color: #9ca3af; font-size: 13px; margin-top: 16px;">
            Unlock to see the renter&rsquo;s name, email, and phone number.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 13px;">
            CourtRenter &middot; Helping venues connect with basketball court renters
          </p>
        </div>
      `,
    });
    console.log(`[EMAIL SENT] Venue notification to ${to} for lead ${leadId}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send venue notification to ${to}:`, err);
  }
}
