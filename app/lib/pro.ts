const MONTHLY_LINK_ID = "plink_1THz65DT8EiLsMQhQF5xdzji";
const YEARLY_LINK_ID = "plink_1THz67DT8EiLsMQhfTiGCSeY";
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
    const [monthlyRes, yearlyRes] = await Promise.all([
      fetch(
        `${CHECK_URL}?stripe_payment_link_id=${MONTHLY_LINK_ID}&email=${encodeURIComponent(email)}`
      ),
      fetch(
        `${CHECK_URL}?stripe_payment_link_id=${YEARLY_LINK_ID}&email=${encodeURIComponent(email)}`
      ),
    ]);
    const [monthlyData, yearlyData] = await Promise.all([
      monthlyRes.json(),
      yearlyRes.json(),
    ]);
    return monthlyData.has_access || yearlyData.has_access;
  } catch {
    return false;
  }
}
