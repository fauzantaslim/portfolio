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
  },
  {
    id: "postman-rest-api-testing",
    title: "Postman: The Complete Guide – REST API Testing",
    issuer: "Udemy",
    image: "/certificates/postman-rest-api-testing.png",
    issueDate: "Oct 2026",
    credentialUrl: "https://ude.my/UC-8c287401-eae6-4601-8a45-ccd19287f670",
  },
];

