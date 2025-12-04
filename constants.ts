
import { Article, EditorialMember } from './types';

export const JOURNAL_NAME = "Delta State Polytechnic Ogwashi-Uku Journal of Academic Research";
export const JOURNAL_ACRONYM = "DSPG Journal";

export const EDITORIAL_BOARD: EditorialMember[] = [
  {
    id: 'eic-1',
    name: "Prof. Emmanuel U. Achu",
    role: "Editor-in-Chief",
    affiliation: "Rector, Delta State Polytechnic, Ogwashi-Uku",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=EA&backgroundColor=002147&textColor=D4AF37"
  },
  {
    id: 'ae-1',
    name: "Dr. Mrs. F. N. Ojei",
    role: "Managing Editor",
    affiliation: "Dept. of Computer Science, DSPG",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=FO&backgroundColor=002147&textColor=white"
  },
  {
    id: 'ae-2',
    name: "Engr. T. O. Bamidele",
    role: "Technical Editor",
    affiliation: "Dept. of Mechanical Engineering, UNIBEN",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=TB&backgroundColor=002147&textColor=white"
  },
  {
    id: 'mem-1',
    name: "Dr. S. K. Momoh",
    role: "Editorial Board Member",
    affiliation: "Lagos State Polytechnic",
  },
  {
    id: 'mem-2',
    name: "Prof. A. I. Ohimain",
    role: "International Advisor",
    affiliation: "Niger Delta University",
  }
];

export const INDEXING_PARTNERS = [
  "Google Scholar", "CrossRef", "ResearchGate", "Academia.edu", "DOAJ", "Scopus (Pending)"
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'dsp-2024-001',
    title: "The Impact of AI on Vocational Education in Nigeria: A Case Study of Ogwashi-Uku",
    abstract: "This study explores the integration of Artificial Intelligence tools in vocational training centers across Delta State. Using a mixed-method approach, we analyzed student performance metrics before and after AI adoption. Results indicate a 15% increase in practical skill acquisition but highlight significant infrastructure gaps. The paper concludes with policy recommendations for state-level intervention.",
    authors: ["Dr. A. Okonkwo", "J. E. Uche"],
    publicationDate: "2024-03-15",
    volume: 12,
    issue: 1,
    keywords: ["Artificial Intelligence", "Vocational Education", "Nigeria", "TVET"],
    doi: "10.1234/dspg.2024.12.1.001",
    views: 1240,
    downloads: 340,
    citations: 12,
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    references: [
      "Federal Ministry of Education. (2020). TVET Strategy for Nigeria.",
      "Smith, J. (2023). AI in Classroom. Journal of Ed Tech, 12(4).",
      "Okonkwo, A. (2022). Digital Divides in Delta State. DSPG Journal, 10(2)."
    ]
  },
  {
    id: 'dsp-2024-002',
    title: "Sustainable Engineering Practices in the Niger Delta Region",
    abstract: "Environmental degradation remains a critical issue in the Niger Delta. This paper proposes a framework for sustainable engineering practices specifically tailored for oil-producing communities. It reviews current legislation and proposes a new compliance model based on community engagement and green technology adoption.",
    authors: ["Engr. P. Dikeson"],
    publicationDate: "2024-02-10",
    volume: 12,
    issue: 1,
    keywords: ["Sustainability", "Engineering", "Niger Delta", "Environment"],
    doi: "10.1234/dspg.2024.12.1.002",
    views: 890,
    downloads: 210,
    citations: 5,
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    references: [
      "UNEP. (2011). Environmental Assessment of Ogoniland.",
      "Dikeson, P. (2020). Green Engineering. African Journal of Engineering."
    ]
  },
  {
    id: 'dsp-2023-045',
    title: "Cybersecurity Challenges in Nigerian Polytechnic Administration",
    abstract: "As polytechnics digitize records, cybersecurity becomes paramount. This paper identifies key vulnerabilities in current administrative systems and suggests robust cryptographic protocols suitable for low-bandwidth environments. A survey of 10 polytechnics reveals a lack of 2FA implementation.",
    authors: ["S. Ibrahim", "M. Cole"],
    publicationDate: "2023-11-20",
    volume: 11,
    issue: 4,
    keywords: ["Cybersecurity", "Administration", "Digital Records", "IT"],
    doi: "10.1234/dspg.2023.11.4.045",
    views: 1500,
    downloads: 450,
    citations: 28,
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    references: [
      "NIST. (2023). Cybersecurity Framework.",
      "Ibrahim, S. (2021). Database Management in Schools."
    ]
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Editorial Board', path: '/editorial-board' },
  { name: 'Archives', path: '/archives' },
  { name: 'Submission', path: '/submit' },
  { name: 'Plagiarism Check', path: '/check' },
];
