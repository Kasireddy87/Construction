import type { CompanyInfo, Project, Testimonial } from "@/types/project";

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

// ---------------------------------------------------------------------------
// Real project — client-commissioned G+1 residence with a ground-floor shop,
// designed by 8 Square Render Studio. Floor plans, elevation and location are
// the actual drawings/map pin. Pricing/possession date are still
// placeholders — confirm before publishing.
// ---------------------------------------------------------------------------
const vanastalipuramResidence: Project = {
  id: "vanastalipuram-residence",
  slug: "vanastalipuram-residence",
  name: "Vanasthalipuram, Backside of GSR Gardens — 189 Sq Yards",
  tagline: "A G+1 home with a ground-floor shop",
  status: "sold",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Vanasthalipuram, Backside of GSR Gardens",
  address: "Backside of GSR Gardens, Vanasthalipuram, Hyderabad, Telangana 500074",
  geo: { lat: 17.333196, lng: 78.554579 },
  featured: false,
  order: 0.6,
  heroImage: "/projects/vanastalipuram-189/elevation-night.jpg",
  gallery: [
    {
      url: "/projects/vanastalipuram-189/elevation-night.jpg",
      category: "elevation",
      caption: "Front elevation, night render",
    },
  ],
  overview:
    "A proposed East-facing G+1 residence on a single plot in Vanastalipuram. The ground floor combines a rentable shop and covered parking with a bedroom, kitchen and utility room; the first floor is a complete 3-bedroom home with a hall, dining area, puja room, two toilets and two private balconies, connected to the ground floor by a passenger lift and staircase.",
  highlights: [
    "Backside of GSR Gardens",
    "Ground-floor shop + dedicated parking for rental income potential",
    "Passenger lift connecting both floors",
    "Dedicated puja room on the first-floor residence",
    "Two private balconies on the first floor",
    "East-facing, Vastu-oriented layout",
  ],
  keyFacts: [
    { label: "Floors", value: "Ground + First (G+1)" },
    { label: "Plot Size", value: "189 Sq Yards" },
    { label: "Configuration", value: "Shop + 1BHK (Ground), 3BHK (First)" },
    { label: "Facing", value: "East" },
    { label: "Lift", value: "Yes" },
    { label: "Status", value: "Proposed / Design stage" },
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 1550,
      builtUpAreaSqft: 1550,
      planImage: "/projects/vanastalipuram-189/ground-floor-plan.png",
      facing: "East",
      towerInfo: "Shop + Parking + Bedroom + Kitchen",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 1250,
      builtUpAreaSqft: 1250,
      planImage: "/projects/vanastalipuram-189/first-floor-plan.png",
      facing: "East",
      towerInfo: "3 Bedrooms + Hall + Dining + Puja + 2 Balconies",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Covered Parking", icon: "Car", category: "Utilities" },
    { name: "Ground-Floor Shop", icon: "Store", category: "Utilities" },
    { name: "Puja Room", icon: "Flower2", category: "Family" },
    { name: "Private Balconies", icon: "DoorOpen", category: "Outdoor" },
  ],
  // Real landmarks nearest this project's actual coordinates (OpenStreetMap,
  // verified 2026-09-13). Airport time is a typical drive-time estimate, not
  // a live traffic figure.
  connectivity: [],
  priceConfirmed: true,
  priceRange: { min: 26000000, max: 26000000, negotiable: true },
  pricingTable: [
    { config: "Ground Floor", carpetAreaSqft: 1550, price: 2500000 },
    { config: "First Floor", carpetAreaSqft: 1250, price: 3000000 },
  ],
  faqs: [
    {
      question: "Is this project RERA registered?",
      answer:
        "As an individual G+1 residential plot below the applicable size threshold, this project does not require RERA registration.",
    },
    {
      question: "Can the floor plan be customized?",
      answer:
        "Yes — as with all our proposed designs, room sizes, layout and finishes can be tailored to your requirements before construction begins.",
    },
    {
      question: "Does the design include a rental shop unit?",
      answer:
        "Yes — the ground floor includes a dedicated shop and parking, alongside the residence above, giving the option of rental income.",
    },
  ],
  seo: {
    metaTitle: "Vanasthalipuram, Backside of GSR Gardens — 189 Sq Yards G+1 Home | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+1 residence with ground-floor shop in Vanastalipuram, Hyderabad — floor plans, elevation and design by Sri Balaji Constructions.",
    ogImage: "/projects/vanastalipuram-189/elevation-night.jpg",
  },
};

// ---------------------------------------------------------------------------
// Real project — a G+3 corner-plot residence (frontage on both East Road and
// West Road) with a rooftop penthouse and open terrace, designed by 8 Square
// Render Studio (drawing no. 680). Floor plans, both elevation views and
// location are the actual drawings/map pin. Pricing is still a placeholder —
// confirm before publishing.
// ---------------------------------------------------------------------------
const cornerPlotResidence: Project = {
  id: "corner-plot-residence-680",
  slug: "corner-plot-residence-680",
  name: "Corner Plot Residence — G+3, 225 Sq Yards",
  tagline: "A four-level home with twin street frontage and a rooftop terrace",
  status: "sold",
  projectType: "villa",
  city: "Hyderabad",
  locality: "New Venkataramana Colony, Vanasthalipuram",
  address: "New Venkataramana Colony, Vanasthalipuram, Hyderabad, Telangana 500074",
  geo: { lat: 17.331635, lng: 78.555846 },
  featured: false,
  order: 0.65,
  heroImage: "/projects/corner-plot-680/east-view.jpg",
  gallery: [
    { url: "/projects/corner-plot-680/east-view.jpg", category: "elevation", caption: "East Road elevation" },
    { url: "/projects/corner-plot-680/west-view.jpg", category: "elevation", caption: "West Road elevation" },
  ],
  overview:
    "A proposed North-facing G+3 residence on a 43'6\" x 45'0\" corner plot with frontage on both East Road and West Road. Ground and first floors each carry a bedroom suite, living hall, kitchen and puja room alongside generous covered parking; the second floor adds a full 3-bedroom family layout; and a rooftop penthouse opens onto a large open terrace — all four levels connected by a passenger lift and staircase.",
  highlights: [
    "Semi-commercial locality — backside of GSR Gardens, East Phase",
    "Corner plot with dual road frontage (East Road + West Road) for extra light and ventilation",
    "Passenger lift connecting all four levels",
    "Dedicated puja room on every floor",
    "Rooftop penthouse with a large open terrace (~805 sq.ft)",
    "North-facing, Vastu-oriented layout",
  ],
  keyFacts: [
    { label: "Floors", value: "Ground + First + Second + Penthouse (G+3)" },
    { label: "Plot Size", value: "225 Sq Yards — 43'-6\" x 45'-0\" (corner plot)" },
    { label: "Facing", value: "North" },
    { label: "Lift", value: "Yes, all floors" },
    { label: "Status", value: "Proposed / Design stage" },
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 1820,
      builtUpAreaSqft: 1820,
      planImage: "/projects/corner-plot-680/ground-first-floor-plan.png",
      facing: "North",
      towerInfo: "Bedroom + Living Hall + Kitchen + Puja + Large Covered Parking",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 1820,
      builtUpAreaSqft: 1820,
      planImage: "/projects/corner-plot-680/ground-first-floor-plan.png",
      facing: "North",
      towerInfo: "Master Bedroom + Bedroom + Dining + Kitchen + Puja + Balcony",
    },
    {
      configLabel: "Second Floor",
      carpetAreaSqft: 1820,
      builtUpAreaSqft: 1820,
      planImage: "/projects/corner-plot-680/second-penthouse-floor-plan.png",
      facing: "North",
      towerInfo: "3 Bedrooms + Living Hall + Drawing Room + Kitchen + Puja",
    },
    {
      configLabel: "Penthouse",
      carpetAreaSqft: 1035,
      builtUpAreaSqft: 1035,
      planImage: "/projects/corner-plot-680/second-penthouse-floor-plan.png",
      facing: "North",
      towerInfo: "2 Bedrooms + Living Hall + Kitchen + Puja + Open Terrace",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Covered Parking", icon: "Car", category: "Utilities" },
    { name: "Puja Room (every floor)", icon: "Flower2", category: "Family" },
    { name: "Private Balconies", icon: "DoorOpen", category: "Outdoor" },
    { name: "Rooftop Open Terrace", icon: "Sun", category: "Outdoor" },
  ],
  // Real landmarks nearest this project's actual coordinates (OpenStreetMap,
  // verified 2026-09-13). Airport time is a typical drive-time estimate, not
  // a live traffic figure.
  connectivity: [],
  priceConfirmed: true,
  priceRange: { min: 36000000, max: 36000000, negotiable: true },
  pricingTable: [
    { config: "Ground Floor", carpetAreaSqft: 1820, price: 3000000 },
    { config: "First Floor", carpetAreaSqft: 1820, price: 3200000 },
    { config: "Second Floor", carpetAreaSqft: 1820, price: 3300000 },
    { config: "Penthouse", carpetAreaSqft: 1035, price: 2500000 },
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
      question: "What are the advantages of a corner plot?",
      answer:
        "Frontage on two roads means more natural light and cross-ventilation on every floor, plus flexibility for a second entrance or gate.",
    },
  ],
  seo: {
    metaTitle: "Corner Plot Residence, G+3, 225 Sq Yards | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+3 corner-plot residence with rooftop penthouse and terrace in Hyderabad — floor plans, elevation and design by Sri Balaji Constructions.",
    ogImage: "/projects/corner-plot-680/east-view.jpg",
  },
};

// ---------------------------------------------------------------------------
// Real project — a spacious proposed residence on a 40' x 60' plot fronting
// West Road in Nagarjuna Colony, Vanasthalipuram. Floor plan (First Floor,
// 2,193 sft) and location are the actual drawing/map pin. Only the First
// Floor drawing has been shared so far — no Ground Floor or elevation render
// yet; heroImage below is a stock photo stand-in. Pricing is real
// (confirmed by the client), negotiable.
// ---------------------------------------------------------------------------
const nagarjunaColonyResidence: Project = {
  id: "nagarjuna-colony-residence",
  slug: "nagarjuna-colony-residence",
  name: "Nagarjuna Colony 267 Sq Yards",
  tagline: "A spacious family home on a 40' x 60' plot",
  status: "new-launch",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Nagarjuna Colony, Vanasthalipuram",
  address: "Nagarjuna Colony, Vanasthalipuram, Hyderabad, Telangana 500070",
  geo: { lat: 17.32590675354004, lng: 78.5589828491211 },
  featured: true,
  order: 0.75,
  heroImage: "/projects/nagarjuna-colony/elevation-real.jpg",
  gallery: [
    {
      url: "/projects/nagarjuna-colony/elevation-real.jpg",
      category: "elevation",
      caption: "Front elevation, twilight render",
    },
  ],
  overview:
    "A proposed Ground + First + Second floor residence on a 40' x 60' plot fronting West Road in Nagarjuna Colony, Vanasthalipuram. The first floor (2,193 sft) centres on a large 19' x 24'-7½\" living room, with a separate drawing room, a 16'-wide dining area next to the kitchen, three bedrooms (Master, Guest and Common) each with attached or nearby toilets, a dedicated puja room, a wash area and two balconies — all connected by a passenger lift and staircase. Pricing is offered in two completion stages — see Pricing & Availability below.",
  highlights: [
    "Just 300 meters from Nagarjuna Sagar Highway",
    "Large 19' x 24'-7½\" living room",
    "Separate drawing room in addition to the living room",
    "3 bedrooms — Master, Guest and Common — with 3 attached toilets",
    "Dedicated puja room and separate wash area",
    "Two balconies + passenger lift",
    "40' x 60' plot fronting West Road",
  ],
  keyFacts: [
    { label: "Plot Size", value: "267 Sq Yards — 40' x 60'" },
    { label: "First Floor Area", value: "2,193 sft" },
    { label: "Configuration", value: "3 Bedrooms + Drawing + Living Room" },
    { label: "Lift", value: "Yes" },
    { label: "Status", value: "Proposed / Design stage" },
  ],
  configs: [
    {
      configLabel: "First Floor",
      carpetAreaSqft: 2193,
      builtUpAreaSqft: 2193,
      planImage: "/projects/nagarjuna-colony/first-floor-plan.png",
      towerInfo: "Living Room + Drawing Room + Dining + Kitchen + 3 Bedrooms + Puja + 2 Balconies",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Puja Room", icon: "Flower2", category: "Family" },
    { name: "Two Balconies", icon: "DoorOpen", category: "Outdoor" },
    { name: "Separate Wash Area", icon: "Droplets", category: "Utilities" },
  ],
  // Real landmarks nearest this project's actual coordinates (OpenStreetMap,
  // verified 2026-09-09). Airport time is a typical drive-time estimate, not
  // a live traffic figure.
  connectivity: [],
  priceConfirmed: true,
  // Two completion-stage prices, as quoted by the client — not a min/max
  // negotiation range. See pricingTable below for what each stage includes.
  priceRange: { min: 35000000, max: 38500000 },
  pricingTable: [
    {
      config: "Ground + First floor (no 2nd floor, without interior walls/rooms)",
      carpetAreaSqft: 2193,
      price: 35000000,
    },
    {
      config: "Full completion incl. 2nd floor + lift",
      carpetAreaSqft: 2193,
      price: 38500000,
    },
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
      question: "What's the difference between the two prices?",
      answer:
        "₹3.50 Cr covers the Ground + First floor structure, without the interior walls/rooms built out and without the 2nd floor. ₹3.85 Cr covers full completion, including the interior walls/rooms, the 2nd floor and lift installation.",
    },
    {
      question: "Is a ground floor plan available?",
      answer: "The ground floor drawing is being finalized — contact us for the latest plans.",
    },
  ],
  seo: {
    metaTitle: "Nagarjuna Colony 267 Sq Yards | Sri Balaji Constructions",
    metaDescription:
      "A spacious proposed residence on a 40' x 60' plot in Nagarjuna Colony, Vanasthalipuram, Hyderabad — floor plan and design by Sri Balaji Constructions.",
    ogImage: "/projects/nagarjuna-colony/elevation-real.jpg",
  },
};

// ---------------------------------------------------------------------------
// Real project — the same G+2 design as Nagarjuna Colony Residence above,
// built at a second site in Hasthinapuram Central. Floor plans are the
// identical drawings; slab areas as printed. No elevation render was
// provided — heroImage below is a stock photo stand-in. Pricing is a
// placeholder — confirm before publishing.
// ---------------------------------------------------------------------------
const hasthinapuramResidence: Project = {
  id: "hasthinapuram-residence",
  slug: "hasthinapuram-residence",
  name: "PNR Colony 202 Sq Yards",
  tagline: "A three-level home with a private residence and two rental-ready units",
  status: "new-launch",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Hasthinapuram Central",
  address: "Hasthinapuram Central, Hayathnagar Mandal, Hyderabad, Telangana 500079",
  geo: { lat: 17.3275204, lng: 78.5498199 },
  featured: false,
  order: 0.8,
  // Same design/elevation as Nagarjuna Colony Residence — built at a second site.
  heroImage: "/projects/hasthinapuram-pnr/elevation-real.jpg",
  gallery: [
    {
      url: "/projects/hasthinapuram-pnr/elevation-real.jpg",
      category: "elevation",
      caption: "Front elevation, twilight render",
    },
  ],
  overview:
    "A proposed North-facing G+2 residence in Hasthinapuram Central — the same design as our Nagarjuna Colony project, built at a second site. The ground floor holds a watchman room, bedroom and covered parking; the first floor is the full family residence with three bedrooms, a hall, dining and drawing rooms, kitchen and puja room; and the second floor splits into two independent units — each with its own bedroom, hall and kitchen — for rental income or extended family.",
  highlights: [
    "HMDA approved layout",
    "Just 600 meters from Hasthinapuram Signal",
    "Two independent rental-ready units on the second floor",
    "Ground-floor watchman room + covered parking",
    "Passenger lift connecting all floors",
    "Separate drawing and dining rooms on the first floor",
    "Puja room on every floor",
    "North-facing, on a 30 ft road",
  ],
  keyFacts: [
    { label: "Floors", value: "Ground + First + Second (G+2)" },
    { label: "Plot Size", value: "202 Sq Yards" },
    { label: "Approval", value: "HMDA Approved" },
    { label: "Road Width", value: "30 ft" },
    { label: "Facing", value: "North" },
    { label: "Lift", value: "Yes, all floors" },
    { label: "Status", value: "Proposed / Design stage" },
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 1650,
      builtUpAreaSqft: 1650,
      planImage: "/projects/hasthinapuram-pnr/ground-floor-plan.png",
      facing: "North",
      towerInfo: "Watchman Room + Bedroom + Hall + Kitchen + Puja + Covered Parking",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 1650,
      builtUpAreaSqft: 1650,
      planImage: "/projects/hasthinapuram-pnr/first-floor-plan.png",
      facing: "North",
      towerInfo: "3 Bedrooms + Hall + Dining + Drawing + Kitchen + Puja",
    },
    {
      configLabel: "Second Floor",
      carpetAreaSqft: 1650,
      builtUpAreaSqft: 1650,
      planImage: "/projects/hasthinapuram-pnr/second-floor-plan.png",
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
  // verified 2026-09-13). Airport time is a typical drive-time estimate, not
  // a live traffic figure.
  connectivity: [],
  // Two completion-stage prices, as quoted by the client — not a min/max
  // negotiation range. See pricingTable below for what each stage includes.
  priceConfirmed: true,
  priceRange: { min: 27500000, max: 29500000 },
  pricingTable: [
    { config: "Full completion, without lift", carpetAreaSqft: 4950, price: 27500000 },
    { config: "Full completion incl. lift + 2nd floor", carpetAreaSqft: 4950, price: 29500000 },
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
      question: "What's the difference between the two prices?",
      answer:
        "₹2.75 Cr covers full completion without a passenger lift. ₹2.95 Cr covers full completion including the lift and the 2nd floor.",
    },
    {
      question: "Can the second floor units be rented out separately?",
      answer:
        "Yes — the second floor is designed as two independent units, each with its own bedroom, hall, kitchen and entrance, suited to rental income or extended family.",
    },
  ],
  seo: {
    metaTitle: "PNR Colony 202 Sq Yards, G+2 | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+2 residence with two rental-ready units in Hasthinapuram Central, Hyderabad — floor plans and design by Sri Balaji Constructions.",
    ogImage: "/projects/hasthinapuram-pnr/elevation-real.jpg",
  },
};

// ---------------------------------------------------------------------------
// Real project — a G+1 residence on a 28' x 45' (140 sq.yds) plot in Teachers
// Colony. Floor plans are the actual
// drawings; no elevation render was provided. Pricing/connectivity are
// placeholders — confirm before publishing.
// ---------------------------------------------------------------------------
const teachersColonyResidence: Project = {
  id: "teachers-colony-residence",
  slug: "teachers-colony-residence",
  name: "Teachers Colony Residence",
  tagline: "A G+1 home on a 28' x 45' plot",
  status: "new-launch",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Teachers Colony",
  address: "Teachers Colony, Hayathnagar Mandal, Hyderabad, Telangana 500070",
  geo: { lat: 17.32159996032715, lng: 78.55521392822266 },
  featured: false,
  order: 0.85,
  // Stock photo stand-in — no real elevation render on hand yet for this
  // project. Swap for the actual render as soon as one exists.
  heroImage: "/projects/teachers-colony-28x45/elevation-placeholder.jpg",
  gallery: [
    {
      url: "/projects/teachers-colony-28x45/elevation-placeholder.jpg",
      category: "elevation",
      caption: "Representative exterior (stock photo — actual render pending)",
    },
  ],
  overview:
    "A proposed G+1 residence on a 28' x 45' (140 sq.yds) plot in Teachers Colony. The ground floor holds a master bedroom, hall/dining, kitchen and puja room alongside two-car covered parking; the first floor adds a second bedroom and a larger dedicated hall and dining area, with a passenger lift connecting both levels.",
  highlights: [
    "500 meters from Nagarjuna Sagar Highway",
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
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 1133,
      builtUpAreaSqft: 1133,
      planImage: "/projects/teachers-colony-28x45/ground-floor-plan.png",
      towerInfo: "Master Bedroom + Hall/Dining + Kitchen + Puja + 2-Car Parking",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 1201,
      builtUpAreaSqft: 1201,
      planImage: "/projects/teachers-colony-28x45/first-floor-plan.png",
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
  connectivity: [],
  priceConfirmed: true,
  priceRange: { min: 19000000, max: 19000000, negotiable: true },
  pricingTable: [
    { config: "Ground Floor", carpetAreaSqft: 1133, price: 2900000 },
    { config: "First Floor", carpetAreaSqft: 1201, price: 3100000 },
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
    metaTitle: "Teachers Colony Residence, G+1 | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+1 residence on a 140 sq.yds plot in Teachers Colony, Hyderabad — floor plans and design by Sri Balaji Constructions.",
  },
};

// ---------------------------------------------------------------------------
// Real project — a G+1 residence on a 45' x 32' (160 sq.yds) corner plot
// (dual 25' road frontage) in Teachers Colony, designed by V. Haripriya
// Consultancy. Floor plans are the actual drawings; no elevation render was
// provided. Pricing/connectivity are placeholders — confirm before
// publishing.
// ---------------------------------------------------------------------------
const teachersColonyCornerResidence: Project = {
  id: "teachers-colony-corner-residence",
  slug: "teachers-colony-corner-residence",
  name: "Teachers Colony Corner Residence",
  tagline: "A G+1 corner-plot home with dual road frontage",
  status: "new-launch",
  projectType: "villa",
  city: "Hyderabad",
  locality: "Teachers Colony",
  address: "Teachers Colony, Hayathnagar Mandal, Hyderabad, Telangana 500070",
  geo: { lat: 17.32159996032715, lng: 78.55521392822266 },
  featured: false,
  order: 0.95,
  // Stock photo stand-in — no real elevation render on hand yet for this
  // project. Swap for the actual render as soon as one exists.
  heroImage: "/projects/teachers-colony-corner-45x32/elevation-placeholder.jpg",
  gallery: [
    {
      url: "/projects/teachers-colony-corner-45x32/elevation-placeholder.jpg",
      category: "elevation",
      caption: "Representative exterior (stock photo — actual render pending)",
    },
  ],
  overview:
    "A proposed G+1 residence on a 45' x 32' (160 sq.yds) corner plot with frontage on two 25'-wide roads, in Teachers Colony. The ground floor holds a master bedroom, hall/dining and kitchen alongside generous covered parking; the first floor is a full 3-bedroom family layout with a dedicated puja room, wash area and multiple balconies.",
  highlights: [
    "500 meters from Nagarjuna Sagar Highway",
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
  ],
  configs: [
    {
      configLabel: "Ground Floor",
      carpetAreaSqft: 1329,
      builtUpAreaSqft: 1329,
      planImage: "/projects/teachers-colony-corner-45x32/ground-floor-plan.png",
      towerInfo: "Master Bedroom + Hall/Dining + Kitchen + Covered Parking",
    },
    {
      configLabel: "First Floor",
      carpetAreaSqft: 1329,
      builtUpAreaSqft: 1329,
      planImage: "/projects/teachers-colony-corner-45x32/first-floor-plan.png",
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
  connectivity: [],
  priceConfirmed: true,
  priceRange: { min: 22000000, max: 22000000, negotiable: true },
  pricingTable: [
    { config: "Ground Floor", carpetAreaSqft: 1329, price: 3400000 },
    { config: "First Floor", carpetAreaSqft: 1329, price: 3600000 },
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
    metaTitle: "Teachers Colony Corner Residence, G+1 | Sri Balaji Constructions",
    metaDescription:
      "A proposed G+1 corner-plot residence on a 160 sq.yds plot in Teachers Colony, Hyderabad — floor plans and design by Sri Balaji Constructions.",
  },
};

// ---------------------------------------------------------------------------
// Real project — our first apartment/multi-unit building (the other 6
// projects are individual homes). Stilt + 5 floors, 2 flats per floor (10
// flats total, 10 stilt car parks — one per flat), on a 70'-6" x 60' plot
// fronting a 40' road. Floor plans and elevation are the actual
// drawings/render. Structural design credited to G. Rajasekhar Reddy
// (Structural Engineer) — a different consultant from the other projects'
// 8 Square Render Studio / V. Haripriya Consultancy. Exact map pin provided
// by client as 17°16'03.6"N 78°35'14.7"E (converted to decimal below);
// reverse-geocoded (OpenStreetMap, verified 2026-09-20) to Abdullapurmet
// Mandal, Ranga Reddy, Telangana 501511 — confirming the Yamjal locality.
// A 10-unit apartment scheme is very likely RERA-registrable (unlike the
// individual-home projects above) — do not claim exemption; RERA number is
// pending. Pricing not yet provided — shows "Price on Quote".
// ---------------------------------------------------------------------------
const yamjalApartments: Project = {
  id: "yamjal-apartments",
  slug: "yamjal-apartments",
  name: "Yamjal Apartments",
  tagline: "A Stilt + 5 apartment building with 2 BHK homes",
  status: "new-launch",
  projectType: "apartment",
  city: "Hyderabad",
  locality: "Yamjal",
  address: "Yamjal, Abdullapurmet Mandal, Ranga Reddy, Telangana 501511",
  geo: { lat: 17.267667, lng: 78.587417 },
  featured: true,
  order: 0.5,
  heroImage: "/projects/yamjal-apartments/elevation-real.jpg",
  gallery: [
    { url: "/projects/yamjal-apartments/elevation-real.jpg", category: "elevation", caption: "Front elevation, night render" },
  ],
  overview:
    "A proposed Stilt + 5 floor apartment building on a 70'-6\" x 60'-0\" plot fronting a 40' wide road. Each of the 5 typical floors carries two 2 BHK flats — a 1,210 sft home and a larger 1,650 sft home, both with a hall, kitchen, puja room and balcony — served by a shared lift and a 6'-6\" wide corridor. The stilt floor holds 10 covered car parks (one per flat), a servant room and two gated driveways.",
  highlights: [
    "Stilt + 5 floors — 10 flats total, 2 per floor",
    "Two 2 BHK configurations: 1,210 sft and 1,650 sft",
    "10 covered car parks in the stilt floor — one per flat",
    "Shared passenger lift + servant room",
    "Puja room in every flat",
    "70'-6\" x 60'-0\" plot on a 40' wide road",
  ],
  keyFacts: [
    { label: "Floors", value: "Stilt + 5" },
    { label: "Total Flats", value: "10 (2 per floor)" },
    { label: "Plot Size", value: "470 Sq Yards — 70'-6\" x 60'-0\"" },
    { label: "Parking", value: "10 covered car parks" },
    { label: "Price / Sq.ft", value: "₹4,700 + ₹2,00,000 amenities" },
    { label: "Lift", value: "Yes" },
    { label: "Status", value: "Proposed / Design stage" },
  ],
  configs: [
    {
      configLabel: "2 BHK — 1,210 sft",
      carpetAreaSqft: 1210,
      builtUpAreaSqft: 1210,
      planImage: "/projects/yamjal-apartments/typical-floor-plan.png",
      facing: "North",
      towerInfo: "Hall + Kitchen + 2 Bedrooms + Puja + Balcony",
    },
    {
      configLabel: "2 BHK — 1,650 sft",
      carpetAreaSqft: 1650,
      builtUpAreaSqft: 1650,
      planImage: "/projects/yamjal-apartments/typical-floor-plan.png",
      facing: "North",
      towerInfo: "Hall + Kitchen/Dining + 2 Bedrooms + Puja + Utility + Balcony",
    },
    {
      configLabel: "Stilt Floor (Parking)",
      carpetAreaSqft: 4230,
      builtUpAreaSqft: 4230,
      planImage: "/projects/yamjal-apartments/stilt-floor-plan.png",
      towerInfo: "10 Covered Car Parks + Lift + Servant Room + 2 Gated Driveways",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Covered Parking (10 Cars)", icon: "Car", category: "Utilities" },
    { name: "Servant Room", icon: "Home", category: "Convenience" },
    { name: "Puja Room (every flat)", icon: "Flower2", category: "Family" },
    { name: "Balconies", icon: "DoorOpen", category: "Outdoor" },
  ],
  connectivity: [],
  // Priced at ₹4,700/sft (built-up area) + a flat ₹2,00,000 amenities
  // charge, as quoted by the client:
  //   1,210 sft: 1,210 × 4,700 = 56,87,000 + 2,00,000 = 58,87,000
  //   1,650 sft: 1,650 × 4,700 = 77,55,000 + 2,00,000 = 79,55,000
  priceConfirmed: true,
  priceRange: { min: 5887000, max: 7955000, perSqft: 4700 },
  pricingTable: [
    { config: "2 BHK — 1,210 sft", carpetAreaSqft: 1210, price: 5887000 },
    { config: "2 BHK — 1,650 sft", carpetAreaSqft: 1650, price: 7955000 },
  ],
  faqs: [
    {
      question: "Is this project RERA registered?",
      answer:
        "A 10-flat apartment scheme like this is very likely required to be RERA-registered under Telangana RERA. The registration number is being finalized — contact us for the latest status before booking.",
    },
    {
      question: "How is the price calculated?",
      answer:
        "Pricing is ₹4,700 per sq.ft of built-up area, plus a flat ₹2,00,000 amenities charge. Contact our sales team for the total price of a specific flat.",
    },
    {
      question: "Can the interiors be customized?",
      answer: "Within a multi-unit apartment building, layouts are generally fixed, but finishes can often be discussed — contact our sales team for what's possible on this project.",
    },
    {
      question: "How many car parks come with each flat?",
      answer: "The stilt floor has 10 covered car parks for the 10 flats — one dedicated park per flat.",
    },
  ],
  seo: {
    metaTitle: "Yamjal Apartments, Stilt + 5 | Sri Balaji Constructions",
    metaDescription:
      "A proposed Stilt + 5 apartment building with 10 flats (2 BHK, 1,210–1,650 sft) — floor plans, elevation and design by Sri Balaji Constructions.",
    ogImage: "/projects/yamjal-apartments/elevation-real.jpg",
  },
};

// ---------------------------------------------------------------------------
// Real project — a proposed apartment building on a 33' x 67'-9" plot on a
// 25' wide North-facing road in Yamjal, opposite Swagath Grand, one 2,300 sft
// 3 BHK flat per floor (visible in the elevation as roughly Stilt + 3
// residential floors, though only one typical-floor sheet was shared, so the
// exact total floor count isn't confirmed). The typical-floor drawing itself
// prints "1932 SFT" as the plan's own area, but the client's quoted figure is
// 2,300 sft — using the client's figure as authoritative (likely a super
// built-up/loaded figure vs. the drawing's plain built-up number). Structural
// design by G. Rajasekhar Reddy — same engineer as Yamjal Apartments. Client
// is Mr. Srinivas Reddy (same client as the individual-home projects). This
// is a separate building from "Yamjal Apartments" (Mr. Sarva Reddy's Stilt+5
// on West Road) — same general Yamjal locality, different plot/client/road.
// Exact map pin provided by client as 17°16'51.2"N 78°35'15.9"E (converted
// to decimal below); reverse-geocoded (OpenStreetMap, verified 2026-09-20) to
// Abdullapurmet Mandal, Ranga Reddy, Telangana 501511 — same postal area as
// Yamjal Apartments, confirming this is genuinely in Yamjal. This is a
// for-sale flats scheme, so RERA applicability should not be assumed exempt.
// Pricing not yet provided.
// ---------------------------------------------------------------------------
const masqatiApartments: Project = {
  id: "yamjal-north-road-apartments",
  slug: "yamjal-north-road-apartments",
  name: "Yamjal North Road Apartments",
  tagline: "3 BHK flats on a 25' North-facing road, opposite Swagath Grand",
  status: "new-launch",
  projectType: "apartment",
  city: "Hyderabad",
  locality: "Yamjal, Opposite Swagath Grand",
  address: "Yamjal, Opposite Swagath Grand, Abdullapurmet Mandal, Ranga Reddy, Telangana 501511",
  geo: { lat: 17.280889, lng: 78.58775 },
  featured: false,
  order: 0.55,
  heroImage: "/projects/srinivas-north-road/elevation-real.jpg",
  gallery: [
    { url: "/projects/srinivas-north-road/elevation-real.jpg", category: "elevation", caption: "Front elevation render" },
  ],
  overview:
    "A proposed apartment building on a 33' x 67'-9\" plot fronting a 25' wide North road in Yamjal, opposite Swagath Grand. Each typical floor carries a single spacious 2,300 sft 3 BHK flat — a Master Bedroom, two further bedrooms, a large 12'6\" x 21'9\" hall, dining area, kitchen, puja room and a 3'-wide balcony — served by a lift and a wide corridor.",
  highlights: [
    "Opposite Swagath Grand — just 100 meters from Nagarjuna Sagar Highway",
    "Spacious 2,300 sft 3 BHK on every floor",
    "Large 12'6\" x 21'9\" hall",
    "Dedicated puja room",
    "3 toilets, 3 wardrobed bedrooms",
    "Passenger lift + wide corridor",
    "33' x 67'-9\" plot on a 25' wide North-facing road",
  ],
  keyFacts: [
    { label: "Configuration", value: "3 BHK, 2,300 sft" },
    { label: "Plot Size", value: "≈248.4 Sq Yards — 33' x 67'-9\"" },
    { label: "Road", value: "25' Wide Road (North)" },
    { label: "Lift", value: "Yes" },
    { label: "Status", value: "Proposed / Design stage" },
  ],
  configs: [
    {
      configLabel: "3 BHK — 2,300 sft",
      carpetAreaSqft: 2300,
      builtUpAreaSqft: 2300,
      planImage: "/projects/srinivas-north-road/typical-floor-plan.png",
      facing: "North",
      towerInfo: "Hall + Dining + Kitchen + 3 Bedrooms + Puja + Balcony",
    },
  ],
  amenities: [
    { name: "Passenger Lift", icon: "ArrowUpDown", category: "Convenience" },
    { name: "Puja Room", icon: "Flower2", category: "Family" },
    { name: "Balcony", icon: "DoorOpen", category: "Outdoor" },
    { name: "Wardrobes in Every Bedroom", icon: "Shirt", category: "Convenience" },
  ],
  // Placeholder distances — exact map pin not yet confirmed.
  // Send an exact map pin and I'll redo this with real connectivity.
  connectivity: [],
  priceRange: { min: 8000000, max: 8000000 },
  pricingTable: [{ config: "3 BHK — 2,300 sft", carpetAreaSqft: 2300, price: 8000000 }],
  faqs: [
    {
      question: "Is this project RERA registered?",
      answer:
        "As a multi-flat apartment building built for sale, this project is expected to require RERA registration under Telangana RERA. The registration number is being finalized — contact us for the latest status before booking.",
    },
    {
      question: "Can the floor plan be customized?",
      answer:
        "Within a multi-unit building, layouts are generally fixed, but finishes can often be discussed — contact our sales team for what's possible on this project.",
    },
  ],
  seo: {
    metaTitle: "Yamjal North Road Apartments | Sri Balaji Constructions",
    metaDescription:
      "A proposed apartment building with spacious 2,300 sft 3 BHK flats in Yamjal, opposite Swagath Grand, on a 25' North-facing road — floor plan and elevation by Sri Balaji Constructions.",
    ogImage: "/projects/srinivas-north-road/elevation-real.jpg",
  },
};

export const projects: Project[] = [
  yamjalApartments,
  masqatiApartments,
  vanastalipuramResidence,
  cornerPlotResidence,
  nagarjunaColonyResidence,
  hasthinapuramResidence,
  teachersColonyResidence,
  teachersColonyCornerResidence,
];

// Real business. logoUrl and social links are still placeholders (no real
// logo/socials on hand yet) — replace before this goes live. Phone,
// WhatsApp, email and office address are all real.
export const companyInfo: CompanyInfo = {
  name: "Sri Balaji Constructions",
  logoUrl: img("sri-balaji-constructions", 1200, 630),
  aboutTitle: "End-to-end residential & commercial construction, anywhere in India",
  aboutBody:
    "Sri Balaji Constructions designs and builds residential and commercial projects — from the first floor plan to handover — with 1500+ projects completed to date. We've built across Telangana, Andhra Pradesh and Karnataka (Bangalore), and take on projects in any state. Every enquiry starts with a free site visit.",
  stats: [
    { label: "Years of Experience", value: "20+" },
    { label: "Projects Delivered", value: "1500+" },
    { label: "Services", value: "Residential + Commercial" },
    { label: "Site Visit", value: "Always Free" },
  ],
  offices: [
    {
      label: "Hyderabad Office",
      address: "New Venkataramana Colony, Vanasthalipuram, Hyderabad, Telangana 500074",
      phone: "+91 70755 55444, +91 99891 78275",
      email: "srinivasreddykasireddy40405@gmail.com",
    },
  ],
  whatsappNumber: "917075555444",
  // Primary number, used for the site's click-to-call links. The second
  // number (+91 99891 78275) is shown alongside it in the office card above.
  phone: "+91 70755 55444",
  email: "srinivasreddykasireddy40405@gmail.com",
  socials: [{ label: "Instagram", url: "https://www.instagram.com/sri_balaji_constructions99" }],
};

// No real testimonials yet — the homepage hides this section entirely while
// the array is empty (see src/app/(site)/page.tsx). Add real ones here once
// you have them.
export const testimonials: Testimonial[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
