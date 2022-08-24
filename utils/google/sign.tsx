import crypto from "crypto";
import url from "url";

/**
 * Convert from 'web safe' base64 to true base64.
 */
function removeWebSafe(safeEncodedString: string): string {
  return safeEncodedString.replace(/-/g, "+").replace(/_/g, "/");
}

/**
 * Convert from true base64 to 'web safe' base64
 */
function makeWebSafe(encodedString: string): string {
  return encodedString.replace(/\+/g, "-").replace(/\//g, "_");
}

/**
 * Takes a base64 code and decodes it.
 */
function decodeBase64Hash(code: string): Buffer {
  return Buffer.from(code, "base64");
}

/**
 * Takes a key and signs the data with it.
 */
function encodeBase64Hash(key: Buffer, data: any): string {
  return crypto.createHmac("sha1", key).update(data).digest("base64");
}

/**
 * Sign a URL using a secret key.
 */
export function sign(path: string, secret: string) {
  const uri = url.parse(path);
  const safeSecret = decodeBase64Hash(removeWebSafe(secret));
  const hashedSignature = makeWebSafe(encodeBase64Hash(safeSecret, uri.path));
  return `${url.format(uri)}&signature=${hashedSignature}`;
}
