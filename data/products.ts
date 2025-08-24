// Product catalog with Stripe IDs
export const products = {
  'skool-video-downloader': {
    name: 'Skool Video Downloader',
    stripeProductId: 'prod_SvRh9BS7Bwi0tk',
    stripePriceId: 'price_1Rzao2DP7AOTRcvmjrDKR9tF',
    price: 17.00,
    description: 'Browser extension to download videos from Skool classrooms',
    ghlTag: 'purchase-skool-video-downloader-stripe', // Tag that triggers GHL automation
  },
  // Add more products here as you create them in Stripe
}

export type Product = typeof products[keyof typeof products];