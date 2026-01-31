import { VaultShell } from "../components/layout/VaultShell";
import { RightSidebarSection } from "../components/layout/RightSidebarSection";
import { RightSidebarItem } from "../components/layout/RightSidebarItem";

// Example data for properties
const exampleProperties = [
  {
    id: 1,
    name: "Sunset Villa",
    location: "Los Angeles, CA",
    value: "$1.2M",
    icon: "home",
  },
  {
    id: 2,
    name: "Downtown Loft",
    location: "New York, NY",
    value: "$850K",
    icon: "apartment",
  },
  {
    id: 3,
    name: "Beach House",
    location: "Miami, FL",
    value: "$2.5M",
    icon: "cottage",
  },
];

// Example data for coins
const exampleCoins = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    value: "$45,230",
    icon: "currency_bitcoin",
    iconBg: "bg-orange-500",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    value: "$2,340",
    icon: "currency_exchange",
    iconBg: "bg-blue-500",
  },
  {
    id: 3,
    name: "Cardano",
    symbol: "ADA",
    value: "$0.45",
    icon: "toll",
    iconBg: "bg-green-500",
  },
];

export const VaultExample = () => {
  const rightSidebarContent = (
    <>
      <RightSidebarSection
        title="Properties"
        action={{ label: "Add New", onClick: () => console.log("Add property") }}
      >
        {exampleProperties.map((property) => (
          <RightSidebarItem
            key={property.id}
            title={property.name}
            subtitle={property.location}
            value={property.value}
            icon={property.icon}
            iconBg="bg-indigo-500"
            onClick={() => console.log(`Selected ${property.name}`)}
          />
        ))}
      </RightSidebarSection>

      <RightSidebarSection
        title="Cryptocurrencies"
        action={{ label: "View All", onClick: () => console.log("View all coins") }}
      >
        {exampleCoins.map((coin) => (
          <RightSidebarItem
            key={coin.id}
            title={coin.name}
            subtitle={coin.symbol}
            value={coin.value}
            icon={coin.icon}
            iconBg={coin.iconBg}
            onClick={() => console.log(`Selected ${coin.name}`)}
          />
        ))}
      </RightSidebarSection>
    </>
  );

  return (
    <VaultShell rightSidebarContent={rightSidebarContent}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Vault Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Manage your properties and crypto assets
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-sm font-medium text-slate-400">Total Value</h3>
            <p className="mt-2 text-3xl font-bold text-white">$4.6M</p>
            <p className="mt-1 text-sm text-green-400">+12.5% this month</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-sm font-medium text-slate-400">Properties</h3>
            <p className="mt-2 text-3xl font-bold text-white">3</p>
            <p className="mt-1 text-sm text-slate-400">Real estate holdings</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-sm font-medium text-slate-400">Crypto Assets</h3>
            <p className="mt-2 text-3xl font-bold text-white">12</p>
            <p className="mt-1 text-sm text-slate-400">Different coins</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-slate-800 p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-400">
                  trending_up
                </span>
                <div>
                  <p className="font-medium text-white">Bitcoin Purchase</p>
                  <p className="text-sm text-slate-400">0.5 BTC</p>
                </div>
              </div>
              <p className="font-semibold text-white">$22,615</p>
            </div>
          </div>
        </div>
      </div>
    </VaultShell>
  );
};

export default VaultExample;
