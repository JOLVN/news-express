import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PurchasesService } from '../services/Purchases';
import { getCreditsFromFirebase, refreshCreditsInFirebase, setCreditsInFirebase } from '@/functions/API';

interface CreditsContextType {
    credits: number;
    useCredit: () => Promise<boolean>;
    refreshCredits: () => Promise<void>;
    buyCredits: () => Promise<void>;
}

const DEFAULT_CREDITS = 10;
const SUBSCRIPTION_CREDITS = 200;

export const CreditsContext = createContext<CreditsContextType>({
    credits: 0,
    useCredit: async () => false,
    refreshCredits: async () => {},
    buyCredits: async () => {},
});

export function CreditsContextProvider({ children }: {children: React.ReactNode}) {

    const [credits, setCredits] = useState(DEFAULT_CREDITS);

    // Refresh credits every month
    const refreshCredits = async () => {
        const lastRefresh = await AsyncStorage.getItem('lastCreditsRefresh');
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;

        if (lastRefresh !== currentMonth) {
            const userId = await PurchasesService.getRCUserId();
            const firebaseCredits = await getCreditsFromFirebase(userId);
            if (firebaseCredits.lastCreditRefresh !== currentMonth) {
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

    // Load saved credits at startup
    useEffect(() => {        
        const loadCredits = async () => {
            const savedCredits = await AsyncStorage.getItem('credits');
            if (savedCredits) {
                setCredits(Number(savedCredits));
            } else {
                await PurchasesService.initialize();
                const userId = await PurchasesService.getRCUserId();
                const firebaseCredits = await getCreditsFromFirebase(userId);
                if (firebaseCredits) {
                    setCredits(firebaseCredits.credits);
                    await AsyncStorage.setItem('credits', String(firebaseCredits.credits));
                }
            }
            await refreshCredits();
        };

        loadCredits();
    }, []);

    const values = {
        credits,
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