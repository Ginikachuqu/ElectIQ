import { Category } from "../types";

const categories: Category[] = [
    {
      id: 1,
      name: "President",
      candidates: [
        { id: 100, name: "John Doe", votes: 120 },
        { id: 101, name: "Jane Smith", votes: 95 },
        { id: 112, name: "Okoroafor Samuel", votes: 60 },
      ],
      totalVotes: 215,
    },
    {
      id: 2,
      name: "Vice President",
      candidates: [
        { id: 102, name: "Michael Brown", votes: 150 },
        { id: 103, name: "Sarah Johnson", votes: 110 },
        { id: 113, name: "Chukwu Jessica", votes: 110 },
        { id: 114, name: "Gbemisola Aderinde", votes: 221 },
      ],
      totalVotes: 260,
    },
    {
      id: 3,
      name: "General Secretary",
      candidates: [
        { id: 104, name: "David Clark", votes: 130 },
        { id: 105, name: "Emily Davis", votes: 140 },
      ],
      totalVotes: 270,
    },
    {
      id: 4,
      name: "Financial Secretary",
      candidates: [
        { id: 106, name: "Sophia Wilson", votes: 180 },
        { id: 107, name: "James Miller", votes: 170 },
      ],
      totalVotes: 350,
    },
    {
      id: 5,
      name: "Public Relations Officer",
      candidates: [
        { id: 108, name: "Ethan Martinez", votes: 90 },
        { id: 109, name: "Olivia Lopez", votes: 85 },
      ],
      totalVotes: 175,
    },
    {
      id: 6,
      name: "Director of Socials",
      candidates: [
        { id: 110, name: "Charlotte Anderson", votes: 200 },
        { id: 111, name: "Liam Thompson", votes: 180 },
        { id: 115, name: "Gabriel Jennifer", votes: 40 },
      ],
      totalVotes: 380,
    },
  ];

export default {
    categories
}