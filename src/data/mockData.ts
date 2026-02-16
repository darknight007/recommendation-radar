export interface Source {
  id: string;
  name: string;
  type: 'BROKERAGE' | 'FINFLUENCER' | 'RESEARCH_HOUSE';
  hitRate: number;
  avgReturn: number;
  totalCalls: number;
  activeCalls: number;
  score: number;
  activeSince: string;
  consistency: number;
  return15d: number;
  return30d: number;
  return60d: number;
  sectors: { name: string; hitRate: number; calls: number }[];
}

export interface Recommendation {
  id: string;
  sourceId: string;
  sourceName: string;
  stock: string;
  exchange: string;
  direction: 'BUY' | 'SELL' | 'HOLD';
  entryPrice: number;
  targetPrice: number;
  currentPrice: number;
  returnPercent: number;
  issuedAt: string;
  daysActive: number;
  status: 'ACTIVE' | 'HIT' | 'MISS';
}

export const SOURCES: Source[] = [
  { id: 'hdfc', name: 'HDFC Securities', type: 'BROKERAGE', hitRate: 73.2, avgReturn: 18.4, totalCalls: 847, activeCalls: 124, score: 94.7, activeSince: 'Jan 2023', consistency: 87, return15d: 12.3, return30d: 15.8, return60d: 18.4, sectors: [{ name: 'Technology', hitRate: 81.2, calls: 42 }, { name: 'Finance', hitRate: 76.5, calls: 89 }, { name: 'Energy', hitRate: 68.3, calls: 31 }] },
  { id: 'motilal', name: 'Motilal Oswal', type: 'BROKERAGE', hitRate: 68.9, avgReturn: 15.2, totalCalls: 612, activeCalls: 98, score: 89.3, activeSince: 'Mar 2023', consistency: 82, return15d: 10.1, return30d: 13.5, return60d: 15.2, sectors: [{ name: 'Auto', hitRate: 74.1, calls: 56 }, { name: 'Pharma', hitRate: 69.8, calls: 44 }, { name: 'FMCG', hitRate: 63.2, calls: 38 }] },
  { id: 'icici', name: 'ICICI Direct', type: 'BROKERAGE', hitRate: 64.1, avgReturn: 12.7, totalCalls: 534, activeCalls: 87, score: 82.5, activeSince: 'Feb 2023', consistency: 76, return15d: 8.4, return30d: 10.9, return60d: 12.7, sectors: [{ name: 'Finance', hitRate: 71.3, calls: 67 }, { name: 'IT', hitRate: 62.4, calls: 45 }, { name: 'Metal', hitRate: 58.7, calls: 29 }] },
  { id: 'kotak', name: 'Kotak Securities', type: 'BROKERAGE', hitRate: 61.8, avgReturn: 11.3, totalCalls: 423, activeCalls: 72, score: 78.9, activeSince: 'Apr 2023', consistency: 73, return15d: 7.2, return30d: 9.8, return60d: 11.3, sectors: [{ name: 'Infra', hitRate: 67.4, calls: 34 }, { name: 'Power', hitRate: 63.1, calls: 28 }, { name: 'Chemicals', hitRate: 55.8, calls: 22 }] },
  { id: 'axis', name: 'Axis Direct', type: 'BROKERAGE', hitRate: 59.4, avgReturn: 10.1, totalCalls: 389, activeCalls: 64, score: 74.2, activeSince: 'Jun 2023', consistency: 69, return15d: 6.5, return30d: 8.7, return60d: 10.1, sectors: [{ name: 'Banking', hitRate: 65.2, calls: 41 }, { name: 'Telecom', hitRate: 58.9, calls: 23 }, { name: 'Realty', hitRate: 52.1, calls: 18 }] },
  { id: 'zerodha', name: 'Zerodha Varsity', type: 'RESEARCH_HOUSE', hitRate: 57.6, avgReturn: 9.4, totalCalls: 278, activeCalls: 45, score: 71.8, activeSince: 'Aug 2023', consistency: 67, return15d: 5.8, return30d: 7.9, return60d: 9.4, sectors: [{ name: 'Midcap', hitRate: 62.3, calls: 34 }, { name: 'Smallcap', hitRate: 54.1, calls: 28 }] },
  { id: 'akshat', name: 'Akshat Shrivastava', type: 'FINFLUENCER', hitRate: 54.3, avgReturn: 8.1, totalCalls: 234, activeCalls: 38, score: 66.4, activeSince: 'May 2023', consistency: 61, return15d: 4.2, return30d: 6.3, return60d: 8.1, sectors: [{ name: 'Growth', hitRate: 58.7, calls: 45 }, { name: 'Value', hitRate: 49.2, calls: 32 }] },
  { id: 'warikoo', name: 'Ankur Warikoo', type: 'FINFLUENCER', hitRate: 51.7, avgReturn: 6.8, totalCalls: 189, activeCalls: 31, score: 62.1, activeSince: 'Jul 2023', consistency: 58, return15d: 3.5, return30d: 5.1, return60d: 6.8, sectors: [{ name: 'Index', hitRate: 55.3, calls: 22 }, { name: 'ETF', hitRate: 48.9, calls: 18 }] },
  { id: 'pranjal', name: 'Pranjal Kamra', type: 'FINFLUENCER', hitRate: 49.2, avgReturn: 5.4, totalCalls: 312, activeCalls: 52, score: 58.7, activeSince: 'Jan 2024', consistency: 54, return15d: 2.8, return30d: 4.2, return60d: 5.4, sectors: [{ name: 'Largecap', hitRate: 53.1, calls: 38 }, { name: 'Thematic', hitRate: 44.7, calls: 26 }] },
  { id: 'edelweiss', name: 'Edelweiss Research', type: 'RESEARCH_HOUSE', hitRate: 66.5, avgReturn: 14.1, totalCalls: 467, activeCalls: 81, score: 85.3, activeSince: 'Feb 2023', consistency: 79, return15d: 9.2, return30d: 12.1, return60d: 14.1, sectors: [{ name: 'Defence', hitRate: 72.8, calls: 31 }, { name: 'Pharma', hitRate: 67.3, calls: 42 }, { name: 'IT', hitRate: 61.5, calls: 37 }] },
];

const STOCKS = [
  { symbol: 'RELIANCE', price: 2934 },
  { symbol: 'TCS', price: 4120 },
  { symbol: 'INFY', price: 1876 },
  { symbol: 'HDFCBANK', price: 1654 },
  { symbol: 'TATASTEEL', price: 142 },
  { symbol: 'ICICIBANK', price: 1287 },
  { symbol: 'WIPRO', price: 534 },
  { symbol: 'BAJFINANCE', price: 7234 },
  { symbol: 'SBIN', price: 812 },
  { symbol: 'LT', price: 3456 },
  { symbol: 'ADANIENT', price: 2876 },
  { symbol: 'ITC', price: 467 },
  { symbol: 'MARUTI', price: 12340 },
  { symbol: 'SUNPHARMA', price: 1823 },
  { symbol: 'TITAN', price: 3567 },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateRecommendations(): Recommendation[] {
  const recs: Recommendation[] = [];
  let id = 1;

  for (const source of SOURCES) {
    const count = Math.min(8, Math.ceil(source.totalCalls / 80));
    for (let i = 0; i < count; i++) {
      const r = seededRandom(id * 137);
      const stock = STOCKS[Math.floor(r * STOCKS.length)];
      const direction: Recommendation['direction'] = r > 0.15 ? 'BUY' : r > 0.05 ? 'SELL' : 'HOLD';
      const entryVariance = (seededRandom(id * 53) - 0.5) * 0.1;
      const entryPrice = Math.round(stock.price * (1 + entryVariance));
      const targetMult = direction === 'BUY' ? 1 + seededRandom(id * 79) * 0.2 + 0.05 : 1 - seededRandom(id * 79) * 0.15 - 0.03;
      const targetPrice = Math.round(entryPrice * targetMult);
      const daysActive = Math.floor(seededRandom(id * 31) * 90) + 1;
      const currentVariance = (seededRandom(id * 97) - 0.4) * 0.12;
      const currentPrice = Math.round(entryPrice * (1 + currentVariance));
      const returnPercent = parseFloat(((currentPrice - entryPrice) / entryPrice * 100).toFixed(1));
      const statusRoll = seededRandom(id * 113);
      const status: Recommendation['status'] = statusRoll < 0.4 ? 'HIT' : statusRoll < 0.7 ? 'MISS' : 'ACTIVE';

      const day = Math.floor(seededRandom(id * 41) * 28) + 1;
      const month = Math.floor(seededRandom(id * 67) * 3);
      const months = ['Dec 2025', 'Jan 2026', 'Feb 2026'];

      recs.push({
        id: `rec-${id}`,
        sourceId: source.id,
        sourceName: source.name,
        stock: stock.symbol,
        exchange: 'NSE',
        direction,
        entryPrice,
        targetPrice,
        currentPrice,
        returnPercent,
        issuedAt: `${months[month]} ${day}`,
        daysActive,
        status,
      });
      id++;
    }
  }
  return recs;
}

export const RECOMMENDATIONS = generateRecommendations();

export const PLATFORM_STATS = {
  totalRecommendations: 47234,
  totalSources: 312,
  marketsTracked: 1,
  avgResponseTime: '< 24hrs',
};
