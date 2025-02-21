import { VersionedTransaction, Connection } from "@solana/web3.js";

const connection = new Connection("https://wiser-summer-lake.solana-mainnet.quiknode.pro/33ce97085fd8e112069832f5fd92acac91f2e3c0");

const performSwap = async (
    mintAddress: string,
    sale: "buy" | "sell",
    amount: number,
    publicKey: any,
    signTransaction: any
) => {
    const solMintAddress = "So11111111111111111111111111111111111111112";

    // Define input and output tokens based on buy/sell
    const inputMint = sale === "buy" ? solMintAddress : mintAddress;
    const outputMint = sale === "buy" ? mintAddress : solMintAddress;

    try {
        // Fetch swap quote from Jupiter API
        const quoteResponse = await fetch(
            `https://api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50&restrictIntermediateTokens=true`
        ).then(response => response.json());

        // Execute swap
        const swapResponse = await fetch("https://api.jup.ag/swap/v1/swap", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'x-api-key': '' // Enter API key here if required
            },
            body: JSON.stringify({
                quoteResponse,
                userPublicKey: publicKey.toString(),

                // Additional parameters to optimize for transaction landing
                dynamicComputeUnitLimit: true,
                dynamicSlippage: true,
                prioritizationFeeLamports: {
                    priorityLevelWithMaxLamports: {
                        maxLamports: 1000000,
                        priorityLevel: "veryHigh",
                    },
                },
            }),
        }).then(response => response.json());

        // Deserialize the transaction from base64
        const transactionBase64 = swapResponse.swapTransaction;
        const transaction = VersionedTransaction.deserialize(
            Buffer.from(transactionBase64, "base64")
        );

        console.log("Deserialized transaction:", transaction);

        // Sign the transaction
        signTransaction(transaction);

        // Serialize the transaction
        const transactionBinary = transaction.serialize();
        console.log("Serialized transaction binary:", transactionBinary);

        // Send raw transaction
        const signature = await connection.sendRawTransaction(transactionBinary, {
            maxRetries: 2,
            skipPreflight: true,
        });

        // Confirm transaction
        const confirmation = await connection.confirmTransaction(
            { signature },
            "finalized"
        );

        // Check for errors
        if (confirmation.value.err) {
            throw new Error(
                `Transaction failed: ${JSON.stringify(
                    confirmation.value.err
                )}\nhttps://solscan.io/tx/${signature}/`
            );
        } else {
            console.log(`Transaction successful: https://solscan.io/tx/${signature}/`);
            return signature;
        }
    } catch (error) {
        console.error("Swap execution failed:", error);
        throw error;
    }
};

export default performSwap;
