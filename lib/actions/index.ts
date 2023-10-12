"use server";

import { scrapeAmazonProduct } from "../scraper";

export const scrapeAndStoreProduct = async (productUrl: string) => {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    //DB here
  } catch (error: any) {
    throw new Error(`Failed to create product ${error.message}`);
  }
};
