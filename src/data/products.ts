import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: "ssr-gt-f01",
    name: "SSR GT F01 7.5x17/18 PCD5x114.3 ET44/45 DIA 73.1 Flat Black",
    description: "Легкосплавные диски SSR GT F01 с плоским черным покрытием",
    price: 25000,
    images: [
      "/wheels/ssr-gt-f01-1.jpg",
      "/wheels/ssr-gt-f01-2.jpg",
      "/wheels/ssr-gt-f01-3.jpg"
    ],
    specs: {
      diameter: ["17", "18"],
      width: "7.5",
      pcd: "5x114.3",
      et: ["44", "45"],
      dia: "73.1"
    },
    variants: [
      {
        id: "ssr-gt-f01-17-44",
        diameter: "17",
        et: "44",
        price: 25000,
        stock: 4
      },
      {
        id: "ssr-gt-f01-17-45",
        diameter: "17",
        et: "45",
        price: 25000,
        stock: 2
      },
      {
        id: "ssr-gt-f01-18-44",
        diameter: "18",
        et: "44",
        price: 27000,
        stock: 3
      },
      {
        id: "ssr-gt-f01-18-45",
        diameter: "18",
        et: "45",
        price: 27000,
        stock: 1
      }
    ]
  },
  {
    id: "work-emotion-cr-kiwami",
    name: "WORK Emotion CR Kiwami 8.5x18 PCD5x114.3 ET38 DIA 73.1 Matt Black",
    description: "Легкосплавные диски WORK Emotion CR Kiwami в матовом черном цвете",
    price: 32000,
    images: [
      "/wheels/work-emotion-1.jpg",
      "/wheels/work-emotion-2.jpg",
      "/wheels/work-emotion-3.jpg"
    ],
    specs: {
      diameter: ["18"],
      width: "8.5",
      pcd: "5x114.3",
      et: ["38"],
      dia: "73.1"
    },
    variants: [
      {
        id: "work-emotion-18-38",
        diameter: "18",
        et: "38",
        price: 32000,
        stock: 6
      }
    ]
  },
  {
    id: "rays-te37",
    name: "RAYS TE37 8.0x17 PCD5x114.3 ET35 DIA 73.1 Bronze",
    description: "Легендарные кованые диски RAYS TE37 в бронзовом цвете",
    price: 45000,
    images: [
      "/wheels/rays-te37-1.jpg",
      "/wheels/rays-te37-2.jpg",
      "/wheels/rays-te37-3.jpg"
    ],
    specs: {
      diameter: ["17"],
      width: "8.0",
      pcd: "5x114.3",
      et: ["35"],
      dia: "73.1"
    },
    variants: [
      {
        id: "rays-te37-17-35",
        diameter: "17",
        et: "35",
        price: 45000,
        stock: 2
      }
    ]
  }
]; 