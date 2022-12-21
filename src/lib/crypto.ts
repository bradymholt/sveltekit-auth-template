export async function hashString(string: string, salt: string) {
  const hashedArrayBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(string.toString())
  );
  const hashString = new TextDecoder().decode(hashedArrayBuffer);

  return hashString;
}
