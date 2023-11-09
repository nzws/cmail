// ref: https://developer.mozilla.org/ja/docs/Web/API/SubtleCrypto/digest
const digestMessage = async (message: string) => {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

export const getGravatarUrl = async (email: string) => {
  const hash = await digestMessage(email.trim().toLowerCase());

  return `https://www.gravatar.com/avatar/${hash}?d=mp`;
};
