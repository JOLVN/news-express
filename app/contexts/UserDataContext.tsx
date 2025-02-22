import { createContext, useState } from 'react';

interface UserDataContextProps {
    userId: string;
    setUserId: (userId: string) => void;
    isSubscribed: boolean;
    setIsSubscribed: (isSubscribed: boolean) => void;
    isTrialEligible: boolean;
    setIsTrialEligible: (isTrialEligible: boolean) => void;
};

export const UserDataContext = createContext<UserDataContextProps>({
    userId: '',
    setUserId: () => {},
    isSubscribed: false,
    setIsSubscribed: () => {},
    isTrialEligible: false,
    setIsTrialEligible: () => {},
});

type Props = {
    children: React.ReactNode;
}

export function UserDataContextProvider({ children }: Props) {
    const [userId, setUserId] = useState<string>('');
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [isTrialEligible, setIsTrialEligible] = useState<boolean>(false);

    const values = {
        userId,
        setUserId,
        isSubscribed,
        setIsSubscribed,
        isTrialEligible,
        setIsTrialEligible,
    }

    return (
        <UserDataContext.Provider value={values}>
            {children}
        </UserDataContext.Provider>
    );
};
