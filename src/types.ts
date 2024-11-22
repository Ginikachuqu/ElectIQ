export interface Candidate {
    id: number;
    name: string;
    votes: number;
}

export interface User {
    id: number;
    name: string;
    matricNo: number;

}

export interface Category {
    id: number;
    name: string;
    candidates: Candidate[]
    totalVotes: number
}