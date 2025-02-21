import { BookOpenCheck, LayoutDashboard, Database, MessageSquare, Menu, Wallet, CreditCard } from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    // color: "text-sky-500",
  },
  {
    title: "Tokens",
    icon: CreditCard,
    href: "/tokens",
    // color: "text-sky-500",
  },
  {
    title: "Subscription",
    icon: Database,
    href: "/subscription",
    // color: "text-sky-500",
  },
  {
    title: "ChatService",
    icon: MessageSquare,
    href: "/chat",
    // color: "text-sky-500",
  },
  {
    title: "Our Powerd Work",
    icon: Menu,
    href: "/powredwork",
    color: "text-orange-500",
    isChildren: true,
    children: [
      {
        title: "CryptoPortfolioManager",
        icon: Wallet,
        color: "text-red-500",
        href: "/example/employees",
      },
      {
        title: "CryptoSecurityScanner",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-02",
      },
      {
        title: "SmartContractAuditor",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
      {
        title: "BlockchainInvestigator",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
      {
        title: "TokenEconomyOptimizer",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
      {
        title: "NFT&CryptoCompuauion",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
      {
        title: "CryptoPayment&TaxCalculator",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
      {
        title: "Airdrop&YieldFarmingFinder",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
    ],
  },
];
