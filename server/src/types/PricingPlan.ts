type RegionalPrice = {
    countryCode: string;
    currency: string;
    price: string;
};

type PricingPlan = {
    _id: string;
    billingFrequency: "monthly" | "yearly";
    trialPeriodDays?: number;
    isRecommended?: boolean;
    regionalPrices: RegionalPrice[];
};

export default PricingPlan;
