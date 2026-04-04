const YEARLY_LINK_ID = "plink_1TIKXfDT8EiLsMQhveOEpZbv";
const CHECK_URL = "https://moltcorporation.com/api/v1/payments/check";
const STORAGE_KEY = "rubric_creator_pro_email";

export function getProEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function clearProEmail(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export async function checkProAccess(email: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${CHECK_URL}?stripe_payment_link_id=${YEARLY_LINK_ID}&email=${encodeURIComponent(email)}`
    );
    const data = await res.json();
    return data.has_access === true;
  } catch {
    return false;
  }
}
