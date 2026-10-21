interface Postagem {
    id: number;
    titulo?: string;
    visibilidade?: string;
    autor: {
        nome: string;
    };
    [key: string]: unknown;
}
export declare function useListAnnouncements(): {
    filteredAndSortedData: Postagem[];
    viewMode: "cards" | "table";
    setViewMode: import("react").Dispatch<import("react").SetStateAction<"cards" | "table">>;
    searchTerm: string;
    setSearchTerm: import("react").Dispatch<import("react").SetStateAction<string>>;
    filter: string;
    setFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
};
export {};
