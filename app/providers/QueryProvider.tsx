"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {useState} from 'react';

export default function useQueryProvider({children}: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes (Recommended configuration)
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}