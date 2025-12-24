export type PropertyGroup =
    | 'BROWN' | 'LIGHT_BLUE' | 'PINK' | 'ORANGE'
    | 'RED' | 'YELLOW' | 'GREEN' | 'BLUE'
    | 'STATION' | 'UTILITY';

export type SpaceType =
    | 'PROPERTY' | 'GO' | 'CHANCE' | 'COMMUNITY_CHEST'
    | 'TAX' | 'JAIL' | 'FREE_PARKING' | 'GO_TO_JAIL';

export interface Property {
    price: number;
    rent: number[]; // [base, 1house, 2house, 3house, 4house, hotel]
    group: PropertyGroup;
    houseCost: number;
}

export interface Space {
    id: number;
    name: string;
    type: SpaceType;
    property?: Property;
    price?: number; // For taxes or stations/utilities base price simplifications
}

export interface Player {
    id: number;
    name: string;
    money: number;
    position: number;
    color: string;
    isJailed: boolean;
    jailTurns: number;
    properties: number[]; // Array of space IDs
    avatarUrl: string; // Pokemon sprite URL
}

export interface PlayerConfig {
    name: string;
    avatarUrl: string;
    color: string;
}

export interface GameSettings {
    playerCount: number;
    initialMoney: number;
    victoryTarget: number;
    playerConfigs: PlayerConfig[];
}
