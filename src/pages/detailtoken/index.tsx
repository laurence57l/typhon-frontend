import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CardHeader, CardTitle, CardContent, CardDescription, Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Define image paths
const imgTyphonToken = "/images/typhon_token.png";
const imgCopy = "/images/copy.png";

interface Activity {
    block_id: number;
    trans_id: string;
    block_time: number;
    activity_type: string;
    from_address: string;
    sources: string[];
    platform: string[];
    value: number;
    routers: any;
    time: string;
}

const DetailToken: React.FC = () => {
    const router = useRouter();
    const { query } = router;
    const tokenId = typeof query.token === "string" ? query.token : "";

    const [tokenData, setTokenData] = useState<any>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const parseUSDCData = (data: any) => {
        if (!data || !data.metadata?.success || !data.prices?.success) {
            throw new Error("Invalid data structure");
        }
        console.log(data);

        const tokenInfo = {
            address: data.metadata.data.address,
            name: data.metadata.data.name,
            symbol: data.metadata.data.symbol,
            icon: data.metadata.data.icon,
            decimals: data.metadata.data.decimals,
            holderCount: data.metadata.data.holder,
            supply: data.metadata.data.supply,
            marketCap: data.metadata.data.market_cap,
            priceChange24h: data.metadata.data.price_change_24h,
            firstMintTx: data.metadata.data.first_mint_tx,
            mintAuthority: data.metadata.data.mint_authority,
            freezeAuthority: data.metadata.data.freeze_authority,
        };

        const priceHistory = data.prices.data.map((entry: any) => ({
            date: entry.date,
            price: entry.price,
        }));

        return { tokenInfo, priceHistory };
    };

    const getTokenData = async (tokenId: string): Promise<void> => {
        try {
            setLoading(true); // Start loading
            setError(null); // Reset error state
            const response = await fetch(`/api/token?address=${tokenId}`);
            if (!response.ok) {
                throw new Error("Token not found");
            }
            const data = await response.json();
            if (!data || data.length === 0) {
                throw new Error("Token data not found");
            }
            setTokenData(parseUSDCData(data[0]));
            setActivities(data[0].activities);
        } catch (error) {
            setError("Error fetching token data: " + error.message); // Set error state
            console.error("Error fetching token data:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (tokenId) {
            getTokenData(tokenId);
        }
    }, [tokenId]);

    const renderActivities = () => {
        if (activities.length === 0) {
            return <p>No recent activities found.</p>;
        }

        return (
            <ul className="list-disc pl-5">
                {activities.map((activity) => (
                    <li key={activity.trans_id} className="shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                            <strong className="text-lg text-white">
                                Transaction ID:{" "}
                                <a
                                    href={`https://solscan.io/tx/${activity.trans_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    {activity.trans_id}
                                </a>
                            </strong>
                        </div>
                        <div className="mb-2">
                            <strong className="text-white">Type:</strong>
                            <span className="text-sm text-white">{formatActivityType(activity.activity_type)}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-white">From Address:</strong>
                            <a
                                href={`https://solscan.io/tx/${activity.from_address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                {activity.from_address}
                            </a>
                        </div>
                        <div className="mb-2">
                            <strong className="text-white">Value:</strong>
                            <span className="text-sm text-white">{activity.value}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-white">Time:</strong>
                            <span className="text-sm text-white">{new Date(activity.time).toLocaleString()}</span>
                        </div>
                        <div className="mb-2">
                            <strong className="text-white">Platform:</strong>
                            <span className="text-sm text-white">{activity.platform.join(", ")}</span>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const formatActivityType = (activityType: string) => {
        const activityTypes: { [key: string]: string } = {
            ACTIVITY_AGG_TOKEN_SWAP: "Aggregated Token Swap",
            ACTIVITY_TOKEN_SWAP: "Token Swap",
            ACTIVITY_TOKEN_ADD_LIQ: "Token Added to Liquidity Pool",
            ACTIVITY_TOKEN_REMOVE_LIQ: "Token Removed from Liquidity Pool",
            ACTIVITY_SPL_TOKEN_STAKE: "Token Staked (SPL)",
            ACTIVITY_SPL_TOKEN_UNSTAKE: "Token Unstaked (SPL)",
            ACTIVITY_SPL_TOKEN_WITHDRAW_STAKE: "Withdrawn Staked Token (SPL)",
            ACTIVITY_SPL_INIT_MINT: "Initial Token Mint (SPL)",
            ACTIVITY_TOKEN_DEPOSIT_VAULT: "Token Deposited to Vault",
        };

        return activityTypes[activityType] || activityType;
    };

    // Function to format numbers with commas
    const formatNumberWithCommas = (number: number) => {
        return new Intl.NumberFormat().format(number);
    };

    if (loading) {
        return (
            <>
                <div className="flex justify-center items-center h-screen bg-gray-900">
                    <div className="text-2xl font-mono text-green-400 animate-pulse tracking-wide">
                        Loading token data...
                    </div>
                </div>
            </>
        );
    }


    if (error) {
        return <div>{error}</div>; // Error screen
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Welcome to {tokenData?.tokenInfo.symbol || tokenId || "Typhon"}
                    </h2>
                </div>

                <div className="w-full">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <div className="w-full flex items-center">
                                <Image
                                    src={tokenData?.tokenInfo.icon || imgTyphonToken}
                                    alt={tokenData?.tokenInfo.symbol || "mytoken"}
                                    width={100}
                                    height={100}
                                    className="mr-4"
                                />
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight mb-3">{tokenData?.tokenInfo.name || "Typhon"}</h2>
                                    <hr />
                                    <div className="flex p-2 items-center">
                                        <span className="text-lg">{tokenData?.tokenInfo.address || "N/A"}</span>
                                        <button
                                            className="ml-2"
                                            onClick={() => {
                                                navigator.clipboard.writeText(tokenData?.tokenInfo.address || "");
                                            }}
                                        >
                                            <Image src={imgCopy} alt="copy" width={20} height={20} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">Symbol: {tokenData?.tokenInfo.symbol || "N/A"}</p>
                                    <p className="text-sm text-gray-500">Supply: {tokenData?.tokenInfo.supply ? formatNumberWithCommas(tokenData.tokenInfo.supply) : "N/A"}</p>
                                    <p className="text-sm text-gray-500">Market Cap: {tokenData?.tokenInfo.marketCap ? formatNumberWithCommas(tokenData.tokenInfo.marketCap) : "N/A"}</p>
                                    <p className="text-sm text-gray-500">Price Change (24h): {tokenData?.tokenInfo.priceChange24h ? formatNumberWithCommas(tokenData.tokenInfo.priceChange24h) : "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Jupiter</TabsTrigger>
                        <TabsTrigger value="reports">Moby</TabsTrigger>
                        <TabsTrigger value="notifications">Block</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Token Information</CardTitle>
                                <CardDescription>Basic metadata of the selected token.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Name:</strong> {tokenData?.tokenInfo.name || "N/A"}</p>
                                <p><strong>Symbol:</strong> {tokenData?.tokenInfo.symbol || "N/A"}</p>
                                <p><strong>First Mint Transaction:</strong> {tokenData?.tokenInfo.firstMintTx || "N/A"}</p>
                                <p><strong>Mint Authority:</strong> {tokenData?.tokenInfo.mintAuthority || "N/A"}</p>
                                <p><strong>Freeze Authority:</strong> {tokenData?.tokenInfo.freezeAuthority || "N/A"}</p>
                                <p><strong>Price Change (24h):</strong> {tokenData?.tokenInfo.priceChange24h || "N/A"}</p>
                                <p><strong>Market Cap:</strong> {tokenData?.tokenInfo.marketCap ? formatNumberWithCommas(tokenData.tokenInfo.marketCap) : "N/A"}</p>
                                <p><strong>Holder Count:</strong> {tokenData?.tokenInfo.holderCount ? formatNumberWithCommas(tokenData.tokenInfo.holderCount) : "N/A"}</p>
                                <p><strong>Supply:</strong> {tokenData?.tokenInfo.supply ? formatNumberWithCommas(tokenData.tokenInfo.supply) : "N/A"}</p>
                            </CardContent>
                        </Card>

                        {/* Price History Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Price History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={tokenData?.priceHistory || []}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Display Activities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                                <CardDescription>Recent transactions involving this token.</CardDescription>
                            </CardHeader>
                            <CardContent>{renderActivities()}</CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics">
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default DetailToken;
