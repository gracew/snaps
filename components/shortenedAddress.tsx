import { useEffect, useState } from "react";
import { MAINNET_PROVIDER } from "../auth";

export function shortenAddress(address: string) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

const ShortenedAddress = ({ address }: { address: string }) => {
    const shortened = shortenAddress(address);
    const [text, setText] = useState(shortened);

    useEffect(() => {
        MAINNET_PROVIDER.lookupAddress(address)
            .then(resolved => {
                if (resolved) {
                    setText(resolved);
                }
            })

    }, [address]);

    return <>{text}</>
}

export default ShortenedAddress;
