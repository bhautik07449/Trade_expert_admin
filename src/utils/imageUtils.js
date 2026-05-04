import config from "../config";

/**
 * Returns the full image URL.
 * If the URL is already absolute (Cloudinary), returns it as is.
 * Otherwise, prepends the base image URL.
 */
export const getImageUrl = (url) => {
  if (!url) return "/placeholder.svg";
  
  // If it's already an absolute URL (starts with http or https), return it as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // Otherwise, prepend the base image URL
  const baseUrl = config.baseImage || "";
  
  // Ensure we don't have double slashes if url starts with /
  const sanitizedUrl = url.startsWith("/") ? url.substring(1) : url;
  const sanitizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  
  return `${sanitizedBase}${sanitizedUrl}`;
};
