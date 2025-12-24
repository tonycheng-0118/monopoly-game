import { Space } from '../types/game';

export const BOARD_CONFIG: Space[] = [
    { id: 0, name: "起點", type: "GO" },
    {
        id: 1, name: "饒河夜市", type: "PROPERTY",
        property: { price: 60, rent: [2, 10, 30, 90, 160, 250], group: "BROWN", houseCost: 50 }
    },
    { id: 2, name: "機會", type: "COMMUNITY_CHEST" }, // Simplified as generic chest/chance for now
    {
        id: 3, name: "士林夜市", type: "PROPERTY",
        property: { price: 60, rent: [4, 20, 60, 180, 320, 450], group: "BROWN", houseCost: 50 }
    },
    { id: 4, name: "所得稅", type: "TAX", price: 200 },
    {
        id: 5, name: "台北車站", type: "PROPERTY",
        property: { price: 200, rent: [25], group: "STATION", houseCost: 0 }
    },
    {
        id: 6, name: "墾丁", type: "PROPERTY",
        property: { price: 100, rent: [6, 30, 90, 270, 400, 550], group: "LIGHT_BLUE", houseCost: 50 }
    },
    { id: 7, name: "命運", type: "CHANCE" },
    {
        id: 8, name: "阿里山", type: "PROPERTY",
        property: { price: 100, rent: [6, 30, 90, 270, 400, 550], group: "LIGHT_BLUE", houseCost: 50 }
    },
    {
        id: 9, name: "日月潭", type: "PROPERTY",
        property: { price: 120, rent: [8, 40, 100, 300, 450, 600], group: "LIGHT_BLUE", houseCost: 50 }
    },
    { id: 10, name: "監獄", type: "JAIL" },
    {
        id: 11, name: "赤崁樓", type: "PROPERTY",
        property: { price: 140, rent: [10, 50, 150, 450, 625, 750], group: "PINK", houseCost: 100 }
    },
    {
        id: 12, name: "台灣電力", type: "PROPERTY",
        property: { price: 150, rent: [0], group: "UTILITY", houseCost: 0 }
    },
    {
        id: 13, name: "安平古堡", type: "PROPERTY",
        property: { price: 140, rent: [10, 50, 150, 450, 625, 750], group: "PINK", houseCost: 100 }
    },
    {
        id: 14, name: "孔廟", type: "PROPERTY",
        property: { price: 160, rent: [12, 60, 180, 500, 700, 900], group: "PINK", houseCost: 100 }
    },
    {
        id: 15, name: "台中車站", type: "PROPERTY",
        property: { price: 200, rent: [25], group: "STATION", houseCost: 0 }
    },
    {
        id: 16, name: "駁二特區", type: "PROPERTY",
        property: { price: 180, rent: [14, 70, 200, 550, 750, 950], group: "ORANGE", houseCost: 100 }
    },
    { id: 17, name: "機會", type: "COMMUNITY_CHEST" },
    {
        id: 18, name: "蓮池潭", type: "PROPERTY",
        property: { price: 180, rent: [14, 70, 200, 550, 750, 950], group: "ORANGE", houseCost: 100 }
    },
    {
        id: 19, name: "85大樓", type: "PROPERTY",
        property: { price: 200, rent: [16, 80, 220, 600, 800, 1000], group: "ORANGE", houseCost: 100 }
    },
    { id: 20, name: "免費停車", type: "FREE_PARKING" },
    {
        id: 21, name: "高美濕地", type: "PROPERTY",
        property: { price: 220, rent: [18, 90, 250, 700, 875, 1050], group: "RED", houseCost: 150 }
    },
    { id: 22, name: "命運", type: "CHANCE" },
    {
        id: 23, name: "台中歌劇院", type: "PROPERTY",
        property: { price: 220, rent: [18, 90, 250, 700, 875, 1050], group: "RED", houseCost: 150 }
    },
    {
        id: 24, name: "逢甲夜市", type: "PROPERTY",
        property: { price: 240, rent: [20, 100, 300, 750, 925, 1100], group: "RED", houseCost: 150 }
    },
    {
        id: 25, name: "高雄車站", type: "PROPERTY",
        property: { price: 200, rent: [25], group: "STATION", houseCost: 0 }
    },
    {
        id: 26, name: "新竹科", type: "PROPERTY",
        property: { price: 260, rent: [22, 110, 330, 800, 975, 1150], group: "YELLOW", houseCost: 150 }
    },
    {
        id: 27, name: "美麗島站", type: "PROPERTY",
        property: { price: 260, rent: [22, 110, 330, 800, 975, 1150], group: "YELLOW", houseCost: 150 }
    },
    {
        id: 28, name: "自來水廠", type: "PROPERTY",
        property: { price: 150, rent: [0], group: "UTILITY", houseCost: 0 }
    },
    {
        id: 29, name: "奇美博物館", type: "PROPERTY",
        property: { price: 280, rent: [24, 120, 360, 850, 1025, 1200], group: "YELLOW", houseCost: 150 }
    },
    { id: 30, name: "入獄", type: "GO_TO_JAIL" },
    {
        id: 31, name: "國父紀念館", type: "PROPERTY",
        property: { price: 300, rent: [26, 130, 390, 900, 1100, 1275], group: "GREEN", houseCost: 200 }
    },
    {
        id: 32, name: "中正紀念堂", type: "PROPERTY",
        property: { price: 300, rent: [26, 130, 390, 900, 1100, 1275], group: "GREEN", houseCost: 200 }
    },
    { id: 33, name: "機會", type: "COMMUNITY_CHEST" },
    {
        id: 34, name: "大安森林公園", type: "PROPERTY",
        property: { price: 320, rent: [28, 150, 450, 1000, 1200, 1400], group: "GREEN", houseCost: 200 }
    },
    {
        id: 35, name: "花蓮車站", type: "PROPERTY",
        property: { price: 200, rent: [25], group: "STATION", houseCost: 0 }
    },
    { id: 36, name: "命運", type: "CHANCE" },
    {
        id: 37, name: "故宮博物院", type: "PROPERTY",
        property: { price: 350, rent: [35, 175, 500, 1100, 1300, 1500], group: "BLUE", houseCost: 200 }
    },
    { id: 38, name: "奢侈稅", type: "TAX", price: 100 },
    {
        id: 39, name: "台北101", type: "PROPERTY",
        property: { price: 400, rent: [50, 200, 600, 1400, 1700, 2000], group: "BLUE", houseCost: 200 }
    },
];
