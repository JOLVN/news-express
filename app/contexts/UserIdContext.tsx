import { createContext, useState } from 'react';

interface UserIdContextProps {
    userId: string;
    setUserId: (userId: string) => void;
};

export const UserIdContext = createContext<UserIdContextProps>({
    userId: '',
    setUserId: () => {}
});

type Props = {
    children: React.ReactNode;
}

export function UserIdContextProvider({ children }: Props) {
    const [userId, setUserId] = useState<string>('');

    const values = {
        userId,
        setUserId
    }

    return (
        <UserIdContext.Provider value={values}>
            {children}
        </UserIdContext.Provider>
    );
};
