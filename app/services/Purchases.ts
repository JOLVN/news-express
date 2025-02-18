import Purchases, { PurchasesPackage } from 'react-native-purchases';

const REVENUE_CAT_API_KEY = 'ton_api_key';

export class PurchasesService {

    static async initialize() {
        Purchases.configure({ apiKey: REVENUE_CAT_API_KEY });
    }

    static async getOfferings(): Promise<PurchasesPackage[]> {
        try {
            const offerings = await Purchases.getOfferings();
            return offerings.current?.availablePackages ?? [];
        } catch (error) {
            console.error('Error fetching offerings:', error);
            return [];
        }
    }

    static async purchasePackage(pkg: PurchasesPackage) {
        try {
            const { customerInfo } = await Purchases.purchasePackage(pkg);
            return customerInfo;
        } catch (error) {
            console.error('Error purchasing package:', error);
            throw error;
        }
    }

    static async checkSubscriptionStatus() {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
        return {
            isSubscribed: customerInfo.activeSubscriptions.length > 0,
            // Verify if the user is in a trial period
            isTrialing: customerInfo.entitlements.active['premium']?.periodType === 'TRIAL',
        };
        } catch (error) {
            console.error('Error checking subscription:', error);
        return { isSubscribed: false, isTrialing: false };
        }
    }
}