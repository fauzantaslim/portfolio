export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  issueDate?: string;
  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    id: "ccna-intro-networks",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    image: "/certificates/ccna-intro-networks.jpg",
    issueDate: "Sep 2025",
    credentialUrl: "https://www.credly.com/badges/ae6f38ef-082e-4630-9ac0-f2532f477c5a"
  },
  {
    id: "postman-rest-api-testing",
    title: "Postman: The Complete Guide – REST API Testing",
    issuer: "Udemy",
    image: "/certificates/postman-rest-api-testing.png",
    issueDate: "Oct 2026",
    credentialUrl: "https://ude.my/UC-8c287401-eae6-4601-8a45-ccd19287f670",
  },
  {
    id: "dicoding-backend-pemula-js",
    title: "Belajar Back-End Pemula dengan JavaScript",
    issuer: "Dicoding Indonesia",
    image: "/certificates/belajar-be-pemula-dengan-js.png",
    issueDate: "Apr 2025",
    credentialUrl: "https://www.dicoding.com/certificates/L4PQELDO2PO1",
  },
  {
    id: "dicoding-dasar-pemrograman-js",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    image: "/certificates/belajar-dasar-pemograman-javascript.png",
    issueDate: "Feb 2025",
    credentialUrl: "https://www.dicoding.com/certificates/L4PQEGQ94PO1",
  },
  {
    id: "hackerrank-javascript-basic",
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    image: "/certificates/javascript-basic.png",
    issueDate: "Jan 2025",
    credentialUrl: "https://www.hackerrank.com/certificates/fb7f8fdf61e8",
  },
];

