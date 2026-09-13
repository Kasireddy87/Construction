import type {
  Amenity,
  CompanyInfo,
  ConnectivityItem,
  FaqItem,
  GalleryImage,
  Project,
  Testimonial,
  UnitPlan,
} from "@/types/project";

// ---------------------------------------------------------------------------
// SAMPLE / SEED CONTENT
// ---------------------------------------------------------------------------
// This file stands in for the CMS until Sanity is connected (see
// src/sanity/schemas and NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local).
// src/lib/data.ts reads from here today and switches to live Sanity content
// automatically once that env var is set — no component changes needed.
// All imagery below is placeholder (picsum.photos) — replace with real
// project photography when content is entered in the CMS.
// ---------------------------------------------------------------------------

function img(seed: string, w = 1600, h = 1000) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const standardAmenities: Amenity[] = [
  { name: "Clubhouse", icon: "Building2", category: "Leisure" },
  { name: "Swimming Pool", icon: "Waves", category: "Leisure" },
  { name: "Gymnasium", icon: "Dumbbell", category: "Fitness" },
  { name: "Children's Play Area", icon: "Baby", category: "Family" },
  { name: "Landscaped Gardens", icon: "Trees", category: "Outdoor" },
  { name: "24x7 Security", icon: "ShieldCheck", category: "Safety" },
  { name: "Power Backup", icon: "Zap", category: "Utilities" },
  { name: "Covered Parking", icon: "Car", category: "Utilities" },
  { name: "Jogging Track", icon: "Footprints", category: "Fitness" },
  { name: "Multipurpose Hall", icon: "PartyPopper", category: "Leisure" },
];

const standardConnectivity: (city: string) => ConnectivityItem[] = (city) => [
  { label: "Metro Station", category: "transit", distanceKm: 1.2 },
  { label: `${city} International Airport`, category: "transit", timeMin: 35 },
  { label: "Ridgeview International School", category: "education", distanceKm: 2.1 },
  { label: "Apollo Multispeciality Hospital", category: "healthcare", distanceKm: 3.4 },
  { label: "Orion Mall", category: "retail", distanceKm: 2.8 },
  { label: "Tech Park / SEZ", category: "business", distanceKm: 4.5 },
];

const standardFaqs: FaqItem[] = [
  {
    question: "What is the RERA registration status of this project?",
    answer:
      "The project is RERA registered; the registration number is listed above. A copy of the certificate is available on request from our sales team.",
  },
  {
    question: "What is the payment plan?",
    answer:
      "We offer a construction-linked payment plan as well as a flexi/possession-linked plan for select configurations. Contact our sales desk for the current plan and any active offers.",
  },
  {
    question: "Can I book a site visit?",
    answer:
      "Yes — use the \"Book Site Visit\" button on this page to pick a convenient date, or reach us directly over WhatsApp or phone.",
  },
  {
    question: "Is home loan assistance available?",
    answer:
      "Yes, we have tie-ups with leading nationalised and private banks for home loans at preferential rates for buyers of this project.",
  },
];

function gallery(seed: string): GalleryImage[] {
  return [
    { url: img(`${seed}-elev-1`), category: "elevation", caption: "Tower elevation, twilight view" },
    { url: img(`${seed}-elev-2`), category: "elevation", caption: "Entrance facade" },
    { url: img(`${seed}-amenity-1`), category: "amenity", caption: "Clubhouse & pool deck" },
    { url: img(`${seed}-amenity-2`), category: "amenity", caption: "Landscaped central garden" },
    { url: img(`${seed}-interior-1`), category: "interior", caption: "Living room, show apartment" },
    { url: img(`${seed}-interior-2`), category: "interior", caption: "Master bedroom" },
    {
      url: img(`${seed}-progress-1`),
      category: "construction-progress",
      caption: "Structure work in progress",
      date: "2026-06-01",
    },
    {
      url: img(`${seed}-progress-2`),
      category: "construction-progress",
      caption: "Podium slab completed",
      date: "2026-08-01",
    },
  ];
}

function configs2_3_4(seed: string): UnitPlan[] {
  return [
    {
      configLabel: "2 BHK",
      carpetAreaSqft: 950,
      builtUpAreaSqft: 1180,
      planImage: img(`${seed}-plan-2bhk`, 1200, 1400),
      facing: "East / West",
      towerInfo: "Towers B, C",
      variants: [
        { label: "Type A", carpetAreaSqft: 950, builtUpAreaSqft: 1180 },
        { label: "Type B", carpetAreaSqft: 985, builtUpAreaSqft: 1220 },
      ],
    },
    {
      configLabel: "3 BHK",
      carpetAreaSqft: 1350,
      builtUpAreaSqft: 1650,
      planImage: img(`${seed}-plan-3bhk`, 1200, 1400),
      facing: "North / East",
      towerInfo: "Towers A, B, C",
      variants: [
        { label: "Type A", carpetAreaSqft: 1350, builtUpAreaSqft: 1650 },
        { label: "Type B", carpetAreaSqft: 1410, builtUpAreaSqft: 1720 },
      ],
    },
    {
      configLabel: "4 BHK",
      carpetAreaSqft: 1890,
      builtUpAreaSqft: 2300,
      planImage: img(`${seed}-plan-4bhk`, 1200, 1400),
      facing: "Park facing",
      towerInfo: "Tower A (limited units)",
      variants: [{ label: "Penthouse", carpetAreaSqft: 1890, builtUpAreaSqft: 2300 }],
    },
  ];
}

interface SeedInput {
  slug: string;
  name: string;
  tagline: string;
  status: Project["status"];
  projectType: Project["projectType"];
  city: string;
  locality: string;
  geo: { lat: number; lng: number };
  reraNumber: string;
  possessionDate?: string;
  featured?: boolean;
  order: number;
  minPrice: number;
  maxPrice: number;
  perSqft?: number;
  landAreaAcres: number;
  towers: string;
  totalUnits: string;
  openSpacePct: string;
}

function buildProject(input: SeedInput): Project {
  const seed = input.slug;
  return {
    id: seed,
    slug: seed,
    name: input.name,
    tagline: input.tagline,
    status: input.status,
    projectType: input.projectType,
    city: input.city,
    locality: input.locality,
    address: `${input.locality}, ${input.city}`,
    geo: input.geo,
    reraNumber: input.reraNumber,
    possessionDate: input.possessionDate,
    featured: input.featured ?? false,
    order: input.order,
    heroImage: img(`${seed}-hero`, 1920, 1080),
    heroVideoUrl: undefined,
    gallery: gallery(seed),
    walkthroughVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tourEmbedUrl: undefined,
    overview: `${input.name} is a ${input.projectType} development set on ${input.landAreaAcres} acres in ${input.locality}, ${input.city}. Designed around light, ventilation and generous open space, it brings together considered architecture, resort-style amenities and everyday convenience for ${input.totalUnits} families across ${input.towers}.`,
    highlights: [
      `${input.landAreaAcres}-acre development with ${input.openSpacePct} open space`,
      "Earthquake-resistant RCC framed structure",
      "Vastu-compliant layouts across all configurations",
      "5-minute walk to the metro / major arterial road",
      "3-tier security with CCTV surveillance",
    ],
    keyFacts: [
      { label: "Land Area", value: `${input.landAreaAcres} acres` },
      { label: "Towers", value: input.towers },
      { label: "Total Units", value: input.totalUnits },
      { label: "Open Space", value: input.openSpacePct },
      { label: "Possession", value: input.possessionDate ?? "TBD" },
      { label: "RERA No.", value: input.reraNumber },
    ],
    configs: configs2_3_4(seed),
    masterPlanImage: img(`${seed}-master-plan`, 1600, 1200),
    sitePlanImage: img(`${seed}-site-plan`, 1600, 1200),
    amenities: standardAmenities,
    connectivity: standardConnectivity(input.city),
    priceRange: { min: input.minPrice, max: input.maxPrice, perSqft: input.perSqft },
    pricingTable: [
      { config: "2 BHK", carpetAreaSqft: 950, price: input.minPrice },
      { config: "3 BHK", carpetAreaSqft: 1350, price: Math.round((input.minPrice + input.maxPrice) / 2) },
      { config: "4 BHK", carpetAreaSqft: 1890, price: input.maxPrice },
    ],
    constructionTimeline: [
      { label: "Foundation", date: "2025-01-15", complete: true },
      { label: "Structure (till 10th floor)", date: "2026-03-01", complete: true },
      { label: "Structure completion", date: "2026-11-01", complete: input.status !== "new-launch" },
      { label: "Finishing & handover", date: input.possessionDate ?? "2027-12-01", complete: input.status === "completed" },
    ],
    brochureUrl: "/sample-brochure.pdf",
    faqs: standardFaqs,
    seo: {
      metaTitle: `${input.name} — ${input.locality}, ${input.city} | Project Details, Plans & Price`,
      metaDescription: `${input.name} in ${input.locality}, ${input.city}: floor plans, elevation, amenities, location connectivity and pricing for ${input.projectType} homes.`,
      ogImage: img(`${seed}-hero`, 1200, 630),
    },
  };
}

// ---------------------------------------------------------------------------
// Real project — a G+2 residence on a 30 ft road in Nagarjuna Colony,
// Vanasthalipuram: a watchman room + parking on the ground floor, the full
// family residence on the first floor, and two independent rental-ready
// units on the second floor. Floor plans are the actual drawings (rotated
// upright for readability); slab areas as printed. No elevation render was
// provided for this one — heroImage below is a placeholder, swap it out once
// a render exists. Pricing is a placeholder — confirm before publishing.
// ---------------------------------------------------------------------------
const nagarjunaColonyResidence: Project = {
  id: "nagarjuna-colony-residence",
  slug: "nagarjuna-colony-residence",
  name: "Nagarjuna Colony Residence — G+2",
  tagline: "A three-level home with a private residence and two rental-ready units",
  status: "new-launch",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Nagarjuna Colony, Vanasthalipuram",
  address: "Nagarjuna Colony, Vanasthalipuram, Hyderabad, Telangana 500070",
  geo: { lat: 17.32590675354004, lng: 78.5589828491211 },
  featured: true,
  order: 0.75,
  // Placeholder — no elevation render on hand yet for this project.
  heroImage: img("nagarjuna-colony-placeholder", 1920, 1080),
  gallery: [],
  overview:
    "A proposed North-facing G+2 residence on a 30 ft road in Nagarjuna Colony, Vanasthalipuram, designed by 8 Square Render Studio. The ground floor holds a watchman room, bedroom and covered parking; the first floor is the full family residence with three bedrooms, a hall, dining and drawing rooms, kitchen and puja room; and the second floor splits into two independent units — each with its own bedroom, hall and kitchen — for rental income or extended family.",
  highlights: [
    "Two independent rental-ready units on the second floor",
    "Ground-floor watchman room + covered parking",
    "Passenger lift connecting all floors",
    "Separate drawing and dining rooms on the first floor",
    "Puja room on every floor",
    "North-facing, on a 30 ft road",
  ],
  keyFacts: [
    { label: "Floors", value: "Ground + First + Second (G+2)" },
    { label: "Road Width", value: "30 ft" },
    { label: "Facing", value: "North" },
    { label: "Lift", value: "Yes, all floors" },
    { label: "Status", value: "Proposed / Design stage" },
    { label: "Designed by", value: "8 Square Render Studio" },
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 1350,
      builtUpAreaSqft: 1650,
      planImage: "/projects/nagarjuna-colony-pnr/ground-floor-plan.png",
      facing: "North",
      towerInfo: "Watchman Room + Bedroom + Hall + Kitchen + Puja + Covered Parking",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 1350,
      builtUpAreaSqft: 1650,
      planImage: "/projects/nagarjuna-colony-pnr/first-floor-plan.png",
      facing: "North",
      towerInfo: "3 Bedrooms + Hall + Dining + Drawing + Kitchen + Puja",
    },
    {
      configLabel: "Second Floor",
      carpetAreaSqft: 1350,
      builtUpAreaSqft: 1650,
      planImage: "/projects/nagarjuna-colony-pnr/second-floor-plan.png",
      facing: "North",
      towerInfo: "Two independent units — each with bedroom, hall and kitchen",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Covered Parking", icon: "Car", category: "Utilities" },
    { name: "Watchman Room", icon: "ShieldCheck", category: "Safety" },
    { name: "Independent Rental Units", icon: "Building2", category: "Investment" },
    { name: "Puja Room (every floor)", icon: "Flower2", category: "Family" },
  ],
  // Real landmarks nearest this project's actual coordinates (OpenStreetMap,
  // verified 2026-09-09). Airport time is a typical drive-time estimate, not
  // a live traffic figure.
  connectivity: [
    { label: "L B Nagar Metro Station", category: "transit", distanceKm: 2.9 },
    { label: "Rajiv Gandhi International Airport", category: "transit", timeMin: 50 },
    { label: "Loyola Montessori House", category: "education", distanceKm: 1.2 },
    { label: "Narayana Junior College", category: "education", distanceKm: 1.7 },
    { label: "Delta Hospitals", category: "healthcare", distanceKm: 0.2 },
    { label: "DMart", category: "retail", distanceKm: 2.9 },
  ],
  // Placeholder estimate — confirm real construction cost / pricing before publishing.
  priceRange: { min: 8500000, max: 10500000 },
  pricingTable: [
    { config: "Ground Floor", carpetAreaSqft: 1350, price: 3000000 },
    { config: "First Floor", carpetAreaSqft: 1350, price: 3200000 },
    { config: "Second Floor", carpetAreaSqft: 1350, price: 3300000 },
  ],
  faqs: [
    {
      question: "Is this project RERA registered?",
      answer:
        "As an individual residential plot below the applicable size threshold, this project does not require RERA registration.",
    },
    {
      question: "Can the floor plan be customized?",
      answer:
        "Yes — as with all our proposed designs, room sizes, layout and finishes can be tailored to your requirements before construction begins.",
    },
    {
      question: "Can the second floor units be rented out separately?",
      answer:
        "Yes — the second floor is designed as two independent units, each with its own bedroom, hall, kitchen and entrance, suited to rental income or extended family.",
    },
  ],
  seo: {
    metaTitle: "Nagarjuna Colony Residence, G+2 — Design by 8 Square Render Studio | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+2 residence with two rental-ready units in Nagarjuna Colony, Vanasthalipuram, Hyderabad — floor plans and design by Sri Balaji Constructions.",
  },
};

// ---------------------------------------------------------------------------
// Real project — a G+1 residence on a 28' x 45' (140 sq.yds) plot in Dwaraka
// Nagar, designed by V. Haripriya Consultancy. Floor plans are the actual
// drawings; no elevation render was provided. Pricing/connectivity are
// placeholders — confirm before publishing.
// ---------------------------------------------------------------------------
const dwarakaNagarResidence: Project = {
  id: "dwaraka-nagar-residence",
  slug: "dwaraka-nagar-residence",
  name: "Dwaraka Nagar Residence",
  tagline: "A G+1 home on a 28' x 45' plot, designed by V. Haripriya Consultancy",
  status: "new-launch",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Dwaraka Nagar",
  address: "Dwaraka Nagar, Hayathnagar Mandal, Hyderabad, Telangana 500070",
  geo: { lat: 17.32159996032715, lng: 78.55521392822266 },
  featured: false,
  order: 0.85,
  // Placeholder — no elevation render on hand yet for this project.
  heroImage: img("dwaraka-nagar-placeholder", 1920, 1080),
  gallery: [],
  overview:
    "A proposed G+1 residence on a 28' x 45' (140 sq.yds) plot in Dwaraka Nagar, designed by V. Haripriya Consultancy. The ground floor holds a master bedroom, hall/dining, kitchen and puja room alongside two-car covered parking; the first floor adds a second bedroom and a larger dedicated hall and dining area, with a passenger lift connecting both levels.",
  highlights: [
    "Two-car covered parking (9'-11\" x 44'-1\")",
    "Passenger lift connecting both floors",
    "Puja room on both floors",
    "Separate hall and dining areas on the first floor",
    "2'-9\" wide balconies on both levels",
  ],
  keyFacts: [
    { label: "Floors", value: "Ground + First (G+1)" },
    { label: "Plot Size", value: "28' x 45' (140 sq.yds)" },
    { label: "Lift", value: "Yes, both floors" },
    { label: "Status", value: "Proposed / Design stage" },
    { label: "Designed by", value: "V. Haripriya Consultancy" },
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 930,
      builtUpAreaSqft: 1133,
      planImage: "/projects/dwaraka-nagar-28x45/ground-floor-plan.png",
      towerInfo: "Master Bedroom + Hall/Dining + Kitchen + Puja + 2-Car Parking",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 985,
      builtUpAreaSqft: 1201,
      planImage: "/projects/dwaraka-nagar-28x45/first-floor-plan.png",
      towerInfo: "2 Bedrooms + Hall + Dining + Kitchen + Puja",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Covered Parking (2 Cars)", icon: "Car", category: "Utilities" },
    { name: "Puja Room (both floors)", icon: "Flower2", category: "Family" },
    { name: "Balconies", icon: "DoorOpen", category: "Outdoor" },
  ],
  // Real landmarks nearest this project's actual coordinates (OpenStreetMap,
  // verified 2026-09-09). Airport time is a typical drive-time estimate, not
  // a live traffic figure.
  connectivity: [
    { label: "L B Nagar Metro Station", category: "transit", distanceKm: 3.2 },
    { label: "Rajiv Gandhi International Airport", category: "transit", timeMin: 50 },
    { label: "Loyola Montessori House", category: "education", distanceKm: 1.8 },
    { label: "Flytech Aviation Academy", category: "education", distanceKm: 1.9 },
    { label: "Shyam Hospital", category: "healthcare", distanceKm: 0.3 },
    { label: "DMart", category: "retail", distanceKm: 3.2 },
  ],
  // Placeholder estimate — confirm real construction cost / pricing before publishing.
  priceRange: { min: 5500000, max: 6800000 },
  pricingTable: [
    { config: "Ground Floor", carpetAreaSqft: 930, price: 2900000 },
    { config: "First Floor", carpetAreaSqft: 985, price: 3100000 },
  ],
  faqs: [
    {
      question: "Is this project RERA registered?",
      answer:
        "As an individual residential plot below the applicable size threshold, this project does not require RERA registration.",
    },
    {
      question: "Can the floor plan be customized?",
      answer:
        "Yes — room sizes, layout and finishes can be tailored to your requirements before construction begins.",
    },
  ],
  seo: {
    metaTitle: "Dwaraka Nagar Residence, G+1 — Design by V. Haripriya Consultancy | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+1 residence on a 140 sq.yds plot in Dwaraka Nagar, Hyderabad — floor plans and design by Sri Balaji Constructions.",
  },
};

// ---------------------------------------------------------------------------
// Real project — a G+1 residence on a 45' x 32' (160 sq.yds) corner plot
// (dual 25' road frontage) in Dwaraka Nagar, designed by V. Haripriya
// Consultancy. Floor plans are the actual drawings; no elevation render was
// provided. Pricing/connectivity are placeholders — confirm before
// publishing.
// ---------------------------------------------------------------------------
const dwarakaNagarCornerResidence: Project = {
  id: "dwaraka-nagar-corner-residence",
  slug: "dwaraka-nagar-corner-residence",
  name: "Dwaraka Nagar Corner Residence",
  tagline: "A G+1 corner-plot home with dual road frontage, designed by V. Haripriya Consultancy",
  status: "new-launch",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Dwaraka Nagar",
  address: "Dwaraka Nagar, Hayathnagar Mandal, Hyderabad, Telangana 500070",
  geo: { lat: 17.32159996032715, lng: 78.55521392822266 },
  featured: false,
  order: 0.95,
  // Placeholder — no elevation render on hand yet for this project.
  heroImage: img("dwaraka-nagar-corner-placeholder", 1920, 1080),
  gallery: [],
  overview:
    "A proposed G+1 residence on a 45' x 32' (160 sq.yds) corner plot with frontage on two 25'-wide roads, in Dwaraka Nagar, designed by V. Haripriya Consultancy. The ground floor holds a master bedroom, hall/dining and kitchen alongside generous covered parking; the first floor is a full 3-bedroom family layout with a dedicated puja room, wash area and multiple balconies.",
  highlights: [
    "Corner plot with dual 25' road frontage for extra light and access",
    "Passenger lift connecting both floors",
    "3-bedroom first floor with dedicated puja room",
    "Generous covered parking (44'-4\" x 15'-1\")",
    "Multiple balconies across both floors",
  ],
  keyFacts: [
    { label: "Floors", value: "Ground + First (G+1)" },
    { label: "Plot Size", value: "45' x 32' (160 sq.yds, corner plot)" },
    { label: "Lift", value: "Yes, both floors" },
    { label: "Status", value: "Proposed / Design stage" },
    { label: "Designed by", value: "V. Haripriya Consultancy" },
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 1090,
      builtUpAreaSqft: 1329,
      planImage: "/projects/dwaraka-nagar-corner-45x32/ground-floor-plan.png",
      towerInfo: "Master Bedroom + Hall/Dining + Kitchen + Covered Parking",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 1090,
      builtUpAreaSqft: 1329,
      planImage: "/projects/dwaraka-nagar-corner-45x32/first-floor-plan.png",
      towerInfo: "3 Bedrooms + Hall/Living + Dining + Kitchen + Puja + Wash Area",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Covered Parking", icon: "Car", category: "Utilities" },
    { name: "Puja Room", icon: "Flower2", category: "Family" },
    { name: "Balconies", icon: "DoorOpen", category: "Outdoor" },
  ],
  // Real landmarks nearest this project's actual coordinates (OpenStreetMap,
  // verified 2026-09-09). Airport time is a typical drive-time estimate, not
  // a live traffic figure.
  connectivity: [
    { label: "L B Nagar Metro Station", category: "transit", distanceKm: 3.2 },
    { label: "Rajiv Gandhi International Airport", category: "transit", timeMin: 50 },
    { label: "Loyola Montessori House", category: "education", distanceKm: 1.8 },
    { label: "Flytech Aviation Academy", category: "education", distanceKm: 1.9 },
    { label: "Shyam Hospital", category: "healthcare", distanceKm: 0.3 },
    { label: "DMart", category: "retail", distanceKm: 3.2 },
  ],
  // Placeholder estimate — confirm real construction cost / pricing before publishing.
  priceRange: { min: 6500000, max: 8000000 },
  pricingTable: [
    { config: "Ground Floor", carpetAreaSqft: 1090, price: 3400000 },
    { config: "First Floor", carpetAreaSqft: 1090, price: 3600000 },
  ],
  faqs: [
    {
      question: "Is this project RERA registered?",
      answer:
        "As an individual residential plot below the applicable size threshold, this project does not require RERA registration.",
    },
    {
      question: "What are the advantages of a corner plot?",
      answer:
        "Frontage on two roads means more natural light and cross-ventilation, plus flexibility for a second entrance or gate.",
    },
  ],
  seo: {
    metaTitle: "Dwaraka Nagar Corner Residence, G+1 — Design by V. Haripriya Consultancy | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+1 corner-plot residence on a 160 sq.yds plot in Dwaraka Nagar, Hyderabad — floor plans and design by Sri Balaji Constructions.",
  },
};

export const projects: Project[] = [
  nagarjunaColonyResidence,
  dwarakaNagarResidence,
  dwarakaNagarCornerResidence,
  buildProject({
    slug: "skyline-meridian",
    name: "Skyline Meridian",
    tagline: "Elevated living above the city skyline",
    status: "under-construction",
    projectType: "apartment",
    city: "Bengaluru",
    locality: "Sarjapur Road",
    geo: { lat: 12.9008, lng: 77.6858 },
    reraNumber: "PRM/KA/RERA/1251/446/PR/030124/006543",
    possessionDate: "2027-12-01",
    featured: true,
    order: 1,
    minPrice: 8500000,
    maxPrice: 21000000,
    perSqft: 8200,
    landAreaAcres: 5.2,
    towers: "4 towers, G+24",
    totalUnits: "560",
    openSpacePct: "72%",
  }),
  buildProject({
    slug: "palm-grove-villas",
    name: "Palm Grove Villas",
    tagline: "Private villas around a landscaped commons",
    status: "new-launch",
    projectType: "villa",
    city: "Hyderabad",
    locality: "Kokapet",
    geo: { lat: 17.4065, lng: 78.3273 },
    reraNumber: "P02400006789",
    possessionDate: "2029-06-01",
    featured: true,
    order: 2,
    minPrice: 21000000,
    maxPrice: 45000000,
    perSqft: 9800,
    landAreaAcres: 12,
    towers: "128 independent villas",
    totalUnits: "128",
    openSpacePct: "65%",
  }),
  buildProject({
    slug: "riverfront-residency",
    name: "Riverfront Residency",
    tagline: "Homes with a view, moments from the water",
    status: "ready-to-move",
    projectType: "apartment",
    city: "Pune",
    locality: "Kharadi",
    geo: { lat: 18.5515, lng: 73.9349 },
    reraNumber: "P52100029876",
    possessionDate: "2026-03-01",
    featured: true,
    order: 3,
    minPrice: 7200000,
    maxPrice: 15500000,
    perSqft: 7600,
    landAreaAcres: 4.1,
    towers: "3 towers, G+20",
    totalUnits: "312",
    openSpacePct: "68%",
  }),
  buildProject({
    slug: "orchid-business-park",
    name: "Orchid Business Park",
    tagline: "Grade-A commercial spaces built for growth",
    status: "under-construction",
    projectType: "commercial",
    city: "Chennai",
    locality: "OMR",
    geo: { lat: 12.8996, lng: 80.2209 },
    reraNumber: "TN/29/Building/0456/2024",
    possessionDate: "2028-01-01",
    featured: false,
    order: 4,
    minPrice: 6500000,
    maxPrice: 42000000,
    perSqft: 11500,
    landAreaAcres: 3.4,
    towers: "2 towers, G+15",
    totalUnits: "180 units / offices",
    openSpacePct: "40%",
  }),
  buildProject({
    slug: "emerald-county",
    name: "Emerald County",
    tagline: "Gated plots for the home you'll design yourself",
    status: "new-launch",
    projectType: "plot",
    city: "Bengaluru",
    locality: "Devanahalli",
    geo: { lat: 13.2437, lng: 77.7085 },
    reraNumber: "PRM/KA/RERA/1251/447/PR/010224/006611",
    possessionDate: "2027-06-01",
    featured: false,
    order: 5,
    minPrice: 4200000,
    maxPrice: 12000000,
    perSqft: 5400,
    landAreaAcres: 22,
    towers: "310 residential plots",
    totalUnits: "310",
    openSpacePct: "55%",
  }),
  buildProject({
    slug: "willow-park-residences",
    name: "Willow Park Residences",
    tagline: "Family-first homes around a central park",
    status: "under-construction",
    projectType: "apartment",
    city: "Hyderabad",
    locality: "Tellapur",
    geo: { lat: 17.4599, lng: 78.2792 },
    reraNumber: "P02400007123",
    possessionDate: "2027-09-01",
    featured: false,
    order: 6,
    minPrice: 6800000,
    maxPrice: 16500000,
    perSqft: 6900,
    landAreaAcres: 6.5,
    towers: "5 towers, G+18",
    totalUnits: "620",
    openSpacePct: "70%",
  }),
  buildProject({
    slug: "coral-heights",
    name: "Coral Heights",
    tagline: "High-rise living with panoramic city views",
    status: "ready-to-move",
    projectType: "apartment",
    city: "Mumbai",
    locality: "Thane West",
    geo: { lat: 19.2183, lng: 72.9781 },
    reraNumber: "P51700028765",
    possessionDate: "2026-01-01",
    featured: false,
    order: 7,
    minPrice: 11500000,
    maxPrice: 28000000,
    perSqft: 15200,
    landAreaAcres: 2.8,
    towers: "2 towers, G+35",
    totalUnits: "410",
    openSpacePct: "58%",
  }),
  buildProject({
    slug: "cedar-crest-villas",
    name: "Cedar Crest Villas",
    tagline: "Boutique villa community in the hills",
    status: "completed",
    projectType: "villa",
    city: "Pune",
    locality: "Baner",
    geo: { lat: 18.5679, lng: 73.7767 },
    reraNumber: "P52100022345",
    possessionDate: "2024-11-01",
    featured: false,
    order: 8,
    minPrice: 18500000,
    maxPrice: 32000000,
    perSqft: 9200,
    landAreaAcres: 8,
    towers: "64 independent villas",
    totalUnits: "64",
    openSpacePct: "60%",
  }),
  buildProject({
    slug: "lakeside-commercia",
    name: "Lakeside Commercia",
    tagline: "Retail and office spaces on the lake promenade",
    status: "new-launch",
    projectType: "commercial",
    city: "Chennai",
    locality: "ECR",
    geo: { lat: 12.8406, lng: 80.2477 },
    reraNumber: "TN/29/Building/0501/2026",
    possessionDate: "2029-03-01",
    featured: false,
    order: 9,
    minPrice: 5200000,
    maxPrice: 38000000,
    perSqft: 10800,
    landAreaAcres: 2.1,
    towers: "1 tower, G+12",
    totalUnits: "96 units / offices",
    openSpacePct: "35%",
  }),
];

// Real business. logoUrl, office street address, email and social links are
// still placeholders (no real logo/address/socials on hand yet) — replace
// before this goes live. Phone/WhatsApp number is real, from the project
// drawings above.
export const companyInfo: CompanyInfo = {
  name: "Sri Balaji Constructions",
  logoUrl: img("sri-balaji-constructions", 1200, 630),
  aboutTitle: "End-to-end design and construction in Hyderabad",
  aboutBody:
    "Sri Balaji Constructions designs and builds homes and small commercial spaces across Hyderabad — from the first floor plan to handover. We work closely with design partners like 8 Square Render Studio to get every layout, elevation and render right before a single brick is laid, so clients know exactly what they're building.",
  stats: [
    { label: "Years of Experience", value: "5+" },
    { label: "Projects Delivered", value: "25+" },
    { label: "Services", value: "Design + Build" },
    { label: "Based In", value: "Hyderabad" },
  ],
  offices: [
    {
      label: "Hyderabad Office",
      address: "Vanastalipuram, Hyderabad, Telangana",
      phone: "+91 90322 20742",
      email: "info@sribalajiconstructions.example",
    },
  ],
  whatsappNumber: "919032220742",
  phone: "+91 90322 20742",
  email: "info@sribalajiconstructions.example",
  socials: [],
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya & Karthik Rao",
    role: "Owners, Skyline Meridian",
    quote:
      "From the first site visit to handover, the team was transparent about timelines and quality. Our 3BHK looks exactly like what was promised in the sample flat.",
    photoUrl: img("testimonial-1", 200, 200),
    projectSlug: "skyline-meridian",
  },
  {
    id: "t2",
    name: "Farhan Sheikh",
    role: "Owner, Palm Grove Villas",
    quote:
      "We compared four builders before booking. Meridian's construction quality and the clarity of their payment schedule made the decision easy.",
    photoUrl: img("testimonial-2", 200, 200),
    projectSlug: "palm-grove-villas",
  },
  {
    id: "t3",
    name: "Priya Menon",
    role: "Owner, Riverfront Residency",
    quote:
      "Moved in six months ago — the clubhouse and the riverside walking track have genuinely changed how our family spends evenings.",
    photoUrl: img("testimonial-3", 200, 200),
    projectSlug: "riverfront-residency",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
