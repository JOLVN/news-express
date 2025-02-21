import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PurchasesService } from '../services/Purchases';
import { getUserDataFromFirebase, refreshCreditsInFirebase, setCreditsInFirebase } from '@/functions/API';

interface CreditsContextType {
    credits: number;
    setCredits: (credits: number) => void;
    useCredit: () => Promise<boolean>;
    refreshCredits: () => Promise<void>;
    buyCredits: () => Promise<void>;
}

const DEFAULT_CREDITS = 10;
const SUBSCRIPTION_CREDITS = 200;

export const CreditsContext = createContext<CreditsContextType>({
    credits: 0,
    setCredits: () => {},
    useCredit: async () => false,
    refreshCredits: async () => {},
    buyCredits: async () => {},
});

export function CreditsContextProvider({ children }: {children: React.ReactNode}) {

    const [credits, setCredits] = useState(0);

    // Refresh credits every month
    const refreshCredits = async () => {
        const lastRefresh = await AsyncStorage.getItem('lastCreditsRefresh');
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;

        if (lastRefresh !== currentMonth) {
            const userId = await PurchasesService.getRCUserId();
            const userData = await getUserDataFromFirebase(userId);
            if (userData.lastCreditRefresh !== currentMonth) {
                const { isSubscribed } = await PurchasesService.checkSubscriptionStatus();
                const newCredits = credits + (isSubscribed ? SUBSCRIPTION_CREDITS : DEFAULT_CREDITS);
                setCredits(newCredits);
                await AsyncStorage.setItem('credits', String(newCredits));
                await AsyncStorage.setItem('lastCreditsRefresh', currentMonth);
                await refreshCreditsInFirebase(userId, currentMonth, newCredits);
            } else {
                await AsyncStorage.setItem('lastCreditsRefresh', currentMonth);
            }
        }
    };

    // Use a credit
    const useCredit = async () => {
        const userId = await PurchasesService.getRCUserId();
        if (credits > 0) {
            const newCredits = credits - 1;
            setCredits(newCredits);
            await AsyncStorage.setItem('credits', String(newCredits));
            await setCreditsInFirebase(userId, newCredits);
            return true;
        }
        return false;
    };

    const buyCredits = async () => {
        const newCredits = credits + SUBSCRIPTION_CREDITS;
        setCredits(newCredits);
        await AsyncStorage.setItem('credits', String(newCredits));
        const userId = await PurchasesService.getRCUserId();
        await setCreditsInFirebase(userId, newCredits);
    }

    const values = {
        credits,
        setCredits,
        useCredit,
        refreshCredits,
        buyCredits,
    }

    return (
        <CreditsContext.Provider value={values}>
            {children}
        </CreditsContext.Provider>
    );
};