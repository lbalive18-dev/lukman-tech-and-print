export const business = {
  name: 'LUKMAN TECH & PRINT',
  tagline: 'YOUR TECH & PRINT PARTNER',
  whatsappNumber: '256751703270',
  location: '', // Add a business location only when confirmed.
  coverage: 'Serving customers across Uganda',
  domain: '', // Add the production domain to enable canonical and local business metadata.
}

export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export const generalEnquiry = 'Hello Lukman Tech & Print. I would like to enquire about your services. Kindly provide more information and a quotation.'
