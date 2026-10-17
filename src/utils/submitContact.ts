export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string };

const web3formsKey = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined)?.trim();
const customEndpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim();
/** Web3Forms (public access key, made for browser forms) or any endpoint that accepts a JSON POST. */
const endpoint = web3formsKey ? 'https://api.web3forms.com/submit' : customEndpoint;

export const isContactConfigured = () => !!endpoint;

/**
 * Sends the form as JSON to VITE_CONTACT_ENDPOINT (Formspree, Getform, a serverless function…).
 * Never claims success unless the endpoint responded OK.
 */
export async function submitContact(data: ContactPayload): Promise<SubmitResult> {
  if (!endpoint) return { status: 'not-configured' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(
        web3formsKey
          ? { ...data, access_key: web3formsKey, subject: `Portfolio enquiry: ${data.service}`, from_name: 'Portfolio website' }
          : { ...data, _subject: `Portfolio enquiry: ${data.service}` },
      ),
      signal: controller.signal,
    });
    if (!res.ok) return { status: 'error', message: `The form service responded with ${res.status}.` };
    const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (json && json.success === false) return { status: 'error', message: json.message || 'The form service rejected the message.' };
    return { status: 'sent' };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === 'AbortError';
    return { status: 'error', message: aborted ? 'The request timed out.' : 'The message could not be sent. Please check your connection.' };
  } finally {
    clearTimeout(timer);
  }
}

export function mailtoFor(email: string, data: ContactPayload) {
  const lines = [`Name: ${data.name}`, `Email: ${data.email}`];
  if (data.company) lines.push(`Company: ${data.company}`);
  lines.push(`Service: ${data.service}`);
  if (data.budget) lines.push(`Budget: ${data.budget}`);
  const body = `${lines.join('\n')}\n\n${data.message}`;
  return `mailto:${email}?subject=${encodeURIComponent(`Project enquiry: ${data.service || 'New project'}`)}&body=${encodeURIComponent(body)}`;
}
