"use client";

import { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "@/lib/actions";

const isValidAmazonProduct = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const Searchbar = () => {
  const [searchPrompt, setsearchPrompt] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink = isValidAmazonProduct(searchPrompt);

    if (!isValidLink) return alert("Please enter a valid Amazon link");

    try {
      setisLoading(true);

      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setsearchPrompt(e.target.value)}
        placeholder="Paste product link here"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search..."}
      </button>
    </form>
  );
};

export default Searchbar;
