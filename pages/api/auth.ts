export function signatureInput(nonce: string) {
    return `Sign this message to prove you have access to this wallet and we will sign you in.

This won't cost you any Ether.

Nonce: ${nonce}`;
}