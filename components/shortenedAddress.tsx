import { useEffect, useState } from "react";
import { MAINNET_PROVIDER } from "../auth";

const ShortenedAddress = ({ address }: { address: string }) => {
    const shortened = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
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
