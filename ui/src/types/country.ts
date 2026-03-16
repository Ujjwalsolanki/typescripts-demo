export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  currencies: Record<string, { name: string; symbol: string }>;
  flags: {
    png: string;
    svg: string;
  };
}

export type ViewState = 'all' | 'favorites' | 'ai-insights';