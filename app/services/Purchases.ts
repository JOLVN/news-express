import { Platform } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

const REVENUE_CAT_API_KEY = 'ton_api_key';

const MOCK_PACKAGES = [
    {
        identifier: 'monthly',
        packageType: 'MONTHLY',
        product: {
            price: 2.99,
            priceString: '€2.99',
            identifier: 'monthly_sub'
        }
    },
    {
        identifier: 'annual',
        packageType: 'ANNUAL',
        product: {
            price: 28.99,
            priceString: '€28.99',
            identifier: 'annual_sub'
        }
    }
] as  PurchasesPackage[];

export class PurchasesService {

    static isExpoGo = Platform.select({
        ios: typeof Purchases === 'undefined',
        android: typeof Purchases === 'undefined',
        default: true,
    });

    static async initialize() {
        if (this.isExpoGo) return;
        try {
            Purchases.configure({ apiKey: REVENUE_CAT_API_KEY });
        } catch (error) {
            console.error('Error initializing Purchases:', error);
        }
    }

    static async getOfferings(): Promise<PurchasesPackage[]> {
        if (this.isExpoGo) {
            return MOCK_PACKAGES;
        }
        try {
            const offerings = await Purchases.getOfferings();
            return offerings.current?.availablePackages ?? [];
        } catch (error) {
            console.error('Error fetching offerings:', error);
            return [];
        }
    }

    static async purchasePackage(pkg: PurchasesPackage) {
        if (this.isExpoGo) {
            console.log('Purchase simulation in Expo Go:', pkg);
            return {
                entitlements: {
                    active: {
                        premium: {
                            isActive: true
                        }
                    }
                }
            };
        }
        try {
            const { customerInfo } = await Purchases.purchasePackage(pkg);
            return customerInfo;
        } catch (error) {
            console.error('Error purchasing package:', error);
            throw error;
        }
    }

    static async checkSubscriptionStatus() {
        if (this.isExpoGo) {
            return { isSubscribed: false, isTrialing: false };
        }
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