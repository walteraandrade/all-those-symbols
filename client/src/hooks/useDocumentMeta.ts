import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const BASE_URL = "https://questinable.space";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export function useDocumentMeta({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
}: DocumentMeta) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
      setMeta("twitter:description", description);
    }

    setMeta("og:title", title, true);
    setMeta("twitter:title", title);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("twitter:image", ogImage);

    if (canonical) {
      setMeta("og:url", `${BASE_URL}${canonical}`, true);
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", `${BASE_URL}${canonical}`);
    }
  }, [title, description, canonical, ogType, ogImage]);
}
