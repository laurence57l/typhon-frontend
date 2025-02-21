import { config } from "dotenv";

config();

export const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || "https://wiser-summer-lake.solana-mainnet.quiknode.pro/33ce97085fd8e112069832f5fd92acac91f2e3c0";
export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
export const NEXT_PUBLIC_CREDIT_PURCHASE_WALLET = process.env.NEXT_PUBLIC_CREDIT_PURCHASE_WALLET || "Hy2wm4AmEKaeHTiRB15W5i1ceWzr36F72Ks7YnAHgvUA";