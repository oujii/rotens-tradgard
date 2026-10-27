/**
 * Stripes testläge (sandbox) ger betallänkar som ingen riktig kund kan betala med.
 * De ser nästan likadana ut som skarpa länkar - skillnaden är bara "test_" i sökvägen
 * eller att de ligger under en sandbox-subdomän.
 */
export function isStripeTestUrl(url: string): boolean {
  const value = url.trim().toLowerCase()
  if (!value.includes('stripe.com')) return false
  return (
    value.includes('/test_') ||
    value.includes('/b/test') ||
    value.includes('sandbox.stripe.com') ||
    value.includes('dashboard.stripe.com/test/')
  )
}
