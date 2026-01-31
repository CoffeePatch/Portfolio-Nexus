import { AssetBucketCards } from "../components/widgets/AssetBucketCards";

/**
 * AssetBucketCards Demo
 * 
 * This component demonstrates the three asset bucket cards:
 * 1. Crypto Holdings (Green) - Live API data with 24h trend
 * 2. Gold & Silver (Gold/Yellow) - Grams × Live price with daily rate change
 * 3. Properties (Blue/Purple) - Manual estimates with YoY appreciation
 */

export const AssetBucketCardsDemo = () => {
  // Example 1: Default data (built into component)
  const handleCryptoClick = () => {
    console.log("Crypto card clicked - Navigate to crypto portfolio");
  };

  const handleMetalsClick = () => {
    console.log("Precious metals card clicked - Navigate to metals holdings");
  };

  const handleRealEstateClick = () => {
    console.log("Real estate card clicked - Navigate to properties");
  };

  // Example 2: Custom data from API
  const customVaultData = {
    crypto: {
      value: 2456789.25,
      trend24h: 8.45, // Positive trend
    },
    preciousMetals: {
      value: 1250000.0,
      dailyChange: -0.85, // Negative trend
      grams: 19850,
      pricePerGram: 63.0,
    },
    realEstate: {
      value: 5200000.0,
      yearlyAppreciation: 12.3, // Positive yearly growth
    },
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Asset Bucket Cards Demo
          </h1>
          <p className="mt-2 text-slate-400">
            Financial Record-inspired cards for Crypto, Precious Metals, and Real Estate
          </p>
        </div>

        {/* Example 1: Default Data */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Default Configuration
            </h2>
            <p className="text-sm text-slate-400">
              Using built-in dummy data
            </p>
          </div>
          <AssetBucketCards
            onCryptoClick={handleCryptoClick}
            onMetalsClick={handleMetalsClick}
            onRealEstateClick={handleRealEstateClick}
          />
        </section>

        {/* Example 2: Custom Data */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Custom Data (API Response)
            </h2>
            <p className="text-sm text-slate-400">
              Using custom vault data with different values
            </p>
          </div>
          <AssetBucketCards
            data={customVaultData}
            onCryptoClick={handleCryptoClick}
            onMetalsClick={handleMetalsClick}
            onRealEstateClick={handleRealEstateClick}
          />
        </section>

        {/* Example 3: Loading State */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Loading State</h2>
            <p className="text-sm text-slate-400">
              Skeleton loaders while fetching data
            </p>
          </div>
          <AssetBucketCards isLoading={true} />
        </section>

        {/* Data Explanation */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Card Details
          </h3>
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600">
                  <span className="material-symbols-outlined text-white">
                    currency_bitcoin
                  </span>
                </div>
                <h4 className="font-semibold text-emerald-400">
                  Card 1: Crypto Holdings (Green)
                </h4>
              </div>
              <ul className="ml-10 space-y-1 text-sm text-slate-300">
                <li>• Label: "Crypto Holdings"</li>
                <li>• Value: Live API-fetched total ($1,247,230.50)</li>
                <li>• Trend: 24h Change (+5.67%)</li>
                <li>• Icon: currency_bitcoin</li>
                <li>• Subtext: "Live API-fetched"</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600">
                  <span className="material-symbols-outlined text-white">
                    stacks
                  </span>
                </div>
                <h4 className="font-semibold text-yellow-400">
                  Card 2: Precious Metals (Gold/Yellow)
                </h4>
              </div>
              <ul className="ml-10 space-y-1 text-sm text-slate-300">
                <li>• Label: "Gold & Silver"</li>
                <li>• Value: Grams × Live Gold Price ($850,000)</li>
                <li>• Calculation: 13,500g × $62.96/g</li>
                <li>• Trend: Daily Gold Rate change (-1.23%)</li>
                <li>• Icon: stacks</li>
                <li>• Subtext: "13,500g × $62.96"</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <span className="material-symbols-outlined text-white">
                    home_work
                  </span>
                </div>
                <h4 className="font-semibold text-blue-400">
                  Card 3: Real Estate (Blue/Purple)
                </h4>
              </div>
              <ul className="ml-10 space-y-1 text-sm text-slate-300">
                <li>• Label: "Properties"</li>
                <li>• Value: Manual estimate ($3,750,000)</li>
                <li>• Trend: Year-over-Year appreciation (+9.8%)</li>
                <li>• Icon: home_work</li>
                <li>• Subtext: "Manual estimates"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">Features</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Color-coded by asset type (Green, Gold, Blue)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Trend indicators with up/down arrows
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Hover effects with scale and shadow
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Clickable with custom handlers
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Responsive grid layout (mobile to desktop)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Skeleton loading states
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Gradient backgrounds and decorative elements
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              <p className="text-sm text-slate-300">
                Contextual subtexts for data sources
              </p>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Usage Example
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-slate-300">
            <code>{`import { AssetBucketCards } from "./components/widgets/AssetBucketCards";

// With default data
<AssetBucketCards
  onCryptoClick={() => navigate('/crypto')}
  onMetalsClick={() => navigate('/metals')}
  onRealEstateClick={() => navigate('/real-estate')}
/>

// With custom data from API
const vaultData = {
  crypto: { value: 1247230.5, trend24h: 5.67 },
  preciousMetals: { 
    value: 850000, 
    dailyChange: -1.23,
    grams: 13500,
    pricePerGram: 62.96
  },
  realEstate: { value: 3750000, yearlyAppreciation: 9.8 }
};

<AssetBucketCards
  data={vaultData}
  onCryptoClick={handleCrypto}
  onMetalsClick={handleMetals}
  onRealEstateClick={handleRealEstate}
/>`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default AssetBucketCardsDemo;
