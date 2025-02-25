export interface User {
    id: number;
    username: string;
    password: string;
    coins: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meme {
    id: number;
    userId: number;
    imageUrl: string;
    description: string;
    isModerated: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: number;
    memeId: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Bet {
    id: number;
    userId: number;
    memeId: number;
    amount: number;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}