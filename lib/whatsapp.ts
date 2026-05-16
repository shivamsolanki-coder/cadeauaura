/**
 * wa.me share link builder. No phone number → WhatsApp opens its
 * contact picker (mobile) or web share UI (desktop). The sender
 * chooses who to send to; we just prefill the message.
 *
 * Copy is intentionally quiet. No exclamation marks, no marketplace
 * adjectives, no growth-hacky framing.
 */

export function buildWhatsAppShare(
  url: string,
  recipientName?: string,
): string {
  const name = recipientName?.trim();
  const opener = name
    ? `For ${name}, when you have a moment.`
    : 'A small thing, for you.';
  const text = `${opener}\n\n${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
