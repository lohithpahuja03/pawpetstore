export interface AnimalCategoryData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  count: number;
}

export interface BreedData {
  id: string;
  name: string;
  slug: string;
  animalType: "dogs" | "cats" | "birds" | "hamsters";
  image: string;
  origin: string;
  temperament: string[];
  lifeExpectancy: string;
  averageWeight: string;
  size: "Small" | "Medium" | "Large" | "Giant";
  careLevel: "Low" | "Moderate" | "High";
  description: string;
  dietaryNeeds: string;
  idealFor: string;
  petCount: number;
}

export interface PetData {
  id: string;
  name: string;
  slug: string;
  animalType: "dogs" | "cats" | "birds" | "hamsters";
  breed: string;
  breedSlug: string;
  age: number;
  ageUnit: "weeks" | "months" | "years";
  gender: "Male" | "Female";
  price: number;
  location: string;
  vaccinated: boolean;
  dewormed: boolean;
  microchipped: boolean;
  healthStatus: string;
  temperament: string[];
  description: string;
  careTips: string[];
  images: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  color: string;
  weight: string;
}

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  category: "food" | "toys" | "cages" | "accessories" | "grooming" | "healthcare";
  animalType: "all" | "dogs" | "cats" | "birds" | "hamsters";
  brand: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  shortDescription: string;
  description: string;
  ingredients?: string[];
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  variants?: { name: string; price: number; inStock: boolean }[];
}

export interface TestimonialData {
  id: string;
  author: string;
  petName: string;
  petType: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
  date: string;
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------
export const ANIMAL_CATEGORIES: AnimalCategoryData[] = [
  {
    id: "dogs",
    name: "Dogs & Puppies",
    slug: "dogs",
    tagline: "Loyal companions for every lifestyle",
    description: "Explore ethical canine adoptions, certified pedigrees, and tailored nutrition for your four-legged best friend.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    icon: "Dog",
    count: 24,
  },
  {
    id: "cats",
    name: "Cats & Kittens",
    slug: "cats",
    tagline: "Graceful felines full of affection",
    description: "Discover gentle Persians, playful Bengals, and affectionate Maine Coons with complete veterinary health guarantees.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    icon: "Cat",
    count: 18,
  },
  {
    id: "birds",
    name: "Birds & Parrots",
    slug: "birds",
    tagline: "Charming singers and vibrant feathers",
    description: "Hand-tamed cockatiels, talkative parrots, and melodic canaries bred in hygienic, stress-free aviaries.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80",
    icon: "Feather",
    count: 15,
  },
  {
    id: "hamsters",
    name: "Hamsters & Small Pets",
    slug: "hamsters",
    tagline: "Pocket-sized joy and playful critters",
    description: "Gentle dwarf hamsters, friendly guinea pigs, and sweet dwarf rabbits ideal for cozy homes and young families.",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    icon: "Sparkles",
    count: 12,
  },
];

// ---------------------------------------------------------------------------
// BREEDS
// ---------------------------------------------------------------------------
export const BREEDS: BreedData[] = [
  // DOGS
  {
    id: "labrador-retriever",
    name: "Labrador Retriever",
    slug: "labrador-retriever",
    animalType: "dogs",
    image: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80",
    origin: "Newfoundland, Canada",
    temperament: ["Friendly", "Active", "Outgoing", "Gentle"],
    lifeExpectancy: "10 - 12 years",
    averageWeight: "25 - 36 kg",
    size: "Large",
    careLevel: "Moderate",
    description: "The Labrador Retriever is renowned for its intelligence, gentle nature, and immense loyalty, making it India's favorite family companion.",
    dietaryNeeds: "High-protein formula with joint support glucosamine.",
    idealFor: "Active families, first-time dog owners, households with children.",
    petCount: 6,
  },
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    slug: "golden-retriever",
    animalType: "dogs",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=800&q=80",
    origin: "Scotland",
    temperament: ["Intelligent", "Affectionate", "Patient", "Devoted"],
    lifeExpectancy: "10 - 12 years",
    averageWeight: "27 - 34 kg",
    size: "Large",
    careLevel: "Moderate",
    description: "Goldens are exuberantly friendly, patient companions with magnificent double coats and boundless eagerness to please.",
    dietaryNeeds: "Omega-3 enriched diet to support lustrous coat health.",
    idealFor: "Loving families, therapy companionship, outdoor enthusiasts.",
    petCount: 5,
  },
  {
    id: "german-shepherd",
    name: "German Shepherd",
    slug: "german-shepherd",
    animalType: "dogs",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80",
    origin: "Germany",
    temperament: ["Confident", "Courageous", "Smart", "Protective"],
    lifeExpectancy: "9 - 13 years",
    averageWeight: "30 - 40 kg",
    size: "Large",
    careLevel: "High",
    description: "A noble, versatile working dog with steadfast loyalty, supreme trainability, and dependable protective instincts.",
    dietaryNeeds: "High energy, digestible protein with chondroitin for hip support.",
    idealFor: "Experienced pet parents, active homes, guardian security.",
    petCount: 4,
  },
  {
    id: "french-bulldog",
    name: "French Bulldog",
    slug: "french-bulldog",
    animalType: "dogs",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    origin: "France / UK",
    temperament: ["Playful", "Adaptable", "Alert", "Quiet"],
    lifeExpectancy: "10 - 12 years",
    averageWeight: "9 - 13 kg",
    size: "Small",
    careLevel: "Low",
    description: "Compact, muscle-bound apartment champions with adorable bat ears and quiet, comical personalities.",
    dietaryNeeds: "Specialized kibble shape for brachycephalic jaws, moderate calorie count.",
    idealFor: "Apartment dwellers, modern professionals, seniors.",
    petCount: 3,
  },
  {
    id: "beagle",
    name: "Beagle",
    slug: "beagle",
    animalType: "dogs",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80",
    origin: "Great Britain",
    temperament: ["Curious", "Merry", "Friendly", "Determined"],
    lifeExpectancy: "12 - 15 years",
    averageWeight: "9 - 11 kg",
    size: "Medium",
    careLevel: "Low",
    description: "Sturdy scent hounds with soulful brown eyes, sweet dispositions, and an endlessly curious spirit.",
    dietaryNeeds: "Portion-controlled diet to prevent obesity.",
    idealFor: "Active families with secure gardens, energetic kids.",
    petCount: 3,
  },
  {
    id: "siberian-husky",
    name: "Siberian Husky",
    slug: "siberian-husky",
    animalType: "dogs",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=800&q=80",
    origin: "Siberia, Russia",
    temperament: ["Gentle", "Energetic", "Mischievous", "Social"],
    lifeExpectancy: "12 - 14 years",
    averageWeight: "20 - 27 kg",
    size: "Large",
    careLevel: "High",
    description: "Breathtaking arctic dogs with striking piercing eyes, plush double coats, and lively athletic personalities.",
    dietaryNeeds: "Dense high-calorie, nutrient-rich formula.",
    idealFor: "Cold-climate or air-conditioned homes, runner parents.",
    petCount: 3,
  },

  // CATS
  {
    id: "persian-cat",
    name: "Persian Cat",
    slug: "persian-cat",
    animalType: "cats",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
    origin: "Iran (Persia)",
    temperament: ["Quiet", "Docile", "Affectionate", "Serene"],
    lifeExpectancy: "12 - 17 years",
    averageWeight: "3.5 - 5.5 kg",
    size: "Medium",
    careLevel: "High",
    description: "Glamorous felines with luxurious silky coats, expressive flat faces, and placid, gentle temperaments.",
    dietaryNeeds: "Hairball management formula with omega fatty acids.",
    idealFor: "Quiet apartments, indoor lovers, attentive groomers.",
    petCount: 5,
  },
  {
    id: "maine-coon",
    name: "Maine Coon",
    slug: "maine-coon",
    animalType: "cats",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
    origin: "Maine, USA",
    temperament: ["Gentle Giant", "Playful", "Sociable", "Dog-like"],
    lifeExpectancy: "12 - 15 years",
    averageWeight: "6 - 10 kg",
    size: "Large",
    careLevel: "Moderate",
    description: "Majestic gentle giants featuring tufted ears, bushy lion-like ruffs, and an affectionate chirping voice.",
    dietaryNeeds: "Large kibble size with joint and cardiac health taurine.",
    idealFor: "Spacious homes, families with other pets and kids.",
    petCount: 4,
  },
  {
    id: "bengal-cat",
    name: "Bengal Cat",
    slug: "bengal-cat",
    animalType: "cats",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80",
    origin: "USA",
    temperament: ["Athletic", "Wild-looking", "Inquisitive", "Vocal"],
    lifeExpectancy: "12 - 16 years",
    averageWeight: "4.5 - 7 kg",
    size: "Medium",
    careLevel: "Moderate",
    description: "An exotic stunner with vivid rosetted coats, sleek athletic contours, and fascinating love for water and climbing.",
    dietaryNeeds: "High animal protein, grain-free ancestral nutrition.",
    idealFor: "Active owners who provide cat trees, interactive puzzles.",
    petCount: 3,
  },
  {
    id: "british-shorthair",
    name: "British Shorthair",
    slug: "british-shorthair",
    animalType: "cats",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
    origin: "United Kingdom",
    temperament: ["Calm", "Easygoing", "Dignified", "Loyal"],
    lifeExpectancy: "14 - 18 years",
    averageWeight: "4 - 8 kg",
    size: "Medium",
    careLevel: "Low",
    description: "Plush, teddy-bear-like felines known for dense velvet coats, round cheeks, and an unflappable easygoing vibe.",
    dietaryNeeds: "Weight-control protein with balanced fiber.",
    idealFor: "Relaxed households, busy working professionals.",
    petCount: 4,
  },

  // BIRDS
  {
    id: "cockatiel",
    name: "Cockatiel",
    slug: "cockatiel",
    animalType: "birds",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80",
    origin: "Australia",
    temperament: ["Cuddly", "Whistling", "Gentle", "Curious"],
    lifeExpectancy: "15 - 20 years",
    averageWeight: "80 - 100 g",
    size: "Small",
    careLevel: "Moderate",
    description: "Affectionate crested parrots that love shoulder perching, sweet head scritches, and whistling famous tunes.",
    dietaryNeeds: "Fortified seeds, pelleted base, fresh leafy greens.",
    idealFor: "Apartments, bird beginners, gentle households.",
    petCount: 4,
  },
  {
    id: "budgerigar",
    name: "Budgerigar (Budgie)",
    slug: "budgerigar",
    animalType: "birds",
    image: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&w=800&q=80",
    origin: "Australia",
    temperament: ["Playful", "Chatty", "Social", "Energetic"],
    lifeExpectancy: "7 - 12 years",
    averageWeight: "30 - 40 g",
    size: "Small",
    careLevel: "Low",
    description: "Cheery pocket parrots packed with personality, cheerful morning chirps, and surprising miming ability.",
    dietaryNeeds: "Millet spray, quality seed blend, clean cuttlebone.",
    idealFor: "First-time bird guardians, children, small rooms.",
    petCount: 5,
  },
  {
    id: "lovebird",
    name: "Peach-faced Lovebird",
    slug: "lovebird",
    animalType: "birds",
    image: "https://images.unsplash.com/photo-1574063413132-355dbfd83e23?auto=format&fit=crop&w=800&q=80",
    origin: "Southwestern Africa",
    temperament: ["Feisty", "Affectionate", "Inquisitive", "Bold"],
    lifeExpectancy: "12 - 15 years",
    averageWeight: "45 - 60 g",
    size: "Small",
    careLevel: "Moderate",
    description: "Tiny vibrant parrots with massive hearts, vibrant rainbow plumage, and deep loving bonds with their caregivers.",
    dietaryNeeds: "Small parrot pellets, fruit treats, calcium supplements.",
    idealFor: "Devoted bird owners ready for high-energy playtime.",
    petCount: 3,
  },

  // HAMSTERS & SMALL PETS
  {
    id: "syrian-hamster",
    name: "Syrian Hamster (Teddy Bear)",
    slug: "syrian-hamster",
    animalType: "hamsters",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    origin: "Syria",
    temperament: ["Docile", "Solitary", "Nocturnal", "Tame"],
    lifeExpectancy: "2 - 3 years",
    averageWeight: "120 - 150 g",
    size: "Small",
    careLevel: "Low",
    description: "The classic plush pocket pet. Very easy to hold, charming cheek pouches, and quiet nocturnal companionship.",
    dietaryNeeds: "Diverse seeds, dried mealworms, occasional broccoli or apple.",
    idealFor: "Bedrooms, students, peaceful individual owners.",
    petCount: 4,
  },
  {
    id: "guinea-pig",
    name: "Abyssinian Guinea Pig",
    slug: "guinea-pig",
    animalType: "hamsters",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80",
    origin: "South America",
    temperament: ["Social", "Vocal (Wheeking)", "Gentle", "Cuddly"],
    lifeExpectancy: "5 - 7 years",
    averageWeight: "800 - 1200 g",
    size: "Medium",
    careLevel: "Moderate",
    description: "Adorable squeaking rosetted furballs that love lap time, sweet bell peppers, and living in companion pairs.",
    dietaryNeeds: "Unlimited Timothy Hay and daily Vitamin C supplements.",
    idealFor: "Families, children learning pet responsibility.",
    petCount: 4,
  },
];

// ---------------------------------------------------------------------------
// PETS (ANIMALS FOR ADOPTION / INQUIRY)
// ---------------------------------------------------------------------------
export const PETS: PetData[] = [
  // DOGS
  {
    id: "pet-dog-1",
    name: "Milo",
    slug: "milo-golden-retriever-pup",
    animalType: "dogs",
    breed: "Golden Retriever",
    breedSlug: "golden-retriever",
    age: 3,
    ageUnit: "months",
    gender: "Male",
    price: 32000,
    location: "Bengaluru, Karnataka",
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    healthStatus: "100% Vet Certified & KCPI Pedigree Registered",
    temperament: ["Playful", "Cuddly", "Quick Learner"],
    description: "Milo is a bundle of golden sunshine! Champion pedigree lines with an extremely gentle temper, microchipped, and crate-trained on puppy pads.",
    careTips: ["Brush silky coat 3 times a week", "Provide teething rubber chew toys", "Feed 3 measured meals of puppy kibble"],
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: true,
    isAvailable: true,
    color: "Golden Cream",
    weight: "8.5 kg",
  },
  {
    id: "pet-dog-2",
    name: "Bella",
    slug: "bella-labrador-retriever",
    animalType: "dogs",
    breed: "Labrador Retriever",
    breedSlug: "labrador-retriever",
    age: 4,
    ageUnit: "months",
    gender: "Female",
    price: 26000,
    location: "Mumbai, Maharashtra",
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    healthStatus: "Fully Vaccinated (DHPPi + Rabies), Health Card Ready",
    temperament: ["Loyal", "Energetic", "Swimmer"],
    description: "Bella is a stunning chocolate-tinged yellow lab with big brown eyes. She adores kids, fetch games, and learns sit and paw in just 2 days.",
    careTips: ["Daily 30-minute play sessions", "Regular ear cleaning after water play", "Joint supplement treats"],
    images: [
      "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: true,
    isAvailable: true,
    color: "Champagne Yellow",
    weight: "11 kg",
  },
  {
    id: "pet-dog-3",
    name: "Rocky",
    slug: "rocky-german-shepherd",
    animalType: "dogs",
    breed: "German Shepherd",
    breedSlug: "german-shepherd",
    age: 5,
    ageUnit: "months",
    gender: "Male",
    price: 35000,
    location: "Delhi NCR",
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    healthStatus: "Vet Inspected, Clear Hips & Spine Certified",
    temperament: ["Alert", "Protective", "Devoted"],
    description: "Rocky has a deep black-and-tan saddle coat, exceptional alertness, and high responsiveness to agility commands. A true guardian companion.",
    careTips: ["Mental stimulation and agility tasks", "High quality large breed protein", "Socialization with other puppies"],
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: true,
    isAvailable: true,
    color: "Black & Tan",
    weight: "16 kg",
  },
  {
    id: "pet-dog-4",
    name: "Coco",
    slug: "coco-french-bulldog",
    animalType: "dogs",
    breed: "French Bulldog",
    breedSlug: "french-bulldog",
    age: 3,
    ageUnit: "months",
    gender: "Female",
    price: 48000,
    location: "Pune, Maharashtra",
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    healthStatus: "DNA Health Tested, Certified Respiratory Airways",
    temperament: ["Affectionate", "Comical", "Quiet"],
    description: "Coco is a lilac-fawn Frenchie princess! Doesn't bark at doorbells, loves snuggling on the couch, and is perfectly suited for luxury apartments.",
    careTips: ["Keep in cool air-conditioned space in summer", "Clean facial wrinkles weekly", "Use harness instead of collar"],
    images: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: false,
    isAvailable: true,
    color: "Lilac Fawn",
    weight: "4.5 kg",
  },

  // CATS
  {
    id: "pet-cat-1",
    name: "Luna",
    slug: "luna-pure-persian-kitten",
    animalType: "cats",
    breed: "Persian Cat",
    breedSlug: "persian-cat",
    age: 3,
    ageUnit: "months",
    gender: "Female",
    price: 24000,
    location: "Hyderabad, Telangana",
    vaccinated: true,
    dewormed: true,
    microchipped: false,
    healthStatus: "PKD Negative, Feline Leukemia Negative, Vet Cleared",
    temperament: ["Sweet", "Purring Machine", "Gentle"],
    description: "Luna is a cloud of snow-white fur with emerald-blue eyes. She loves lap naps, quiet jazz music, and gentle petting sessions.",
    careTips: ["Daily gentle stainless-steel comb", "Tear-stain wipe once daily", "Clumping dust-free litter"],
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: true,
    isAvailable: true,
    color: "Pure White",
    weight: "1.4 kg",
  },
  {
    id: "pet-cat-2",
    name: "Simba",
    slug: "simba-maine-coon-juvenile",
    animalType: "cats",
    breed: "Maine Coon",
    breedSlug: "maine-coon",
    age: 6,
    ageUnit: "months",
    gender: "Male",
    price: 42000,
    location: "Bengaluru, Karnataka",
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    healthStatus: "HCM & SMA Clear Pedigree, Full Core Vaccinations",
    temperament: ["Giant Softie", "Chirpy", "Water Lover"],
    description: "Simba has ear tufts like a lynx and a tail like a feather duster. He greets you at the doorway and drinks water by dipping his paws.",
    careTips: ["Heavy-duty large scratching tower", "High-protein wet food twice a day", "Brushing undercoat twice a week"],
    images: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: true,
    isAvailable: true,
    color: "Silver Tabby",
    weight: "4.8 kg",
  },
  {
    id: "pet-cat-3",
    name: "Oliver",
    slug: "oliver-british-shorthair",
    animalType: "cats",
    breed: "British Shorthair",
    breedSlug: "british-shorthair",
    age: 4,
    ageUnit: "months",
    gender: "Male",
    price: 36000,
    location: "Chennai, Tamil Nadu",
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    healthStatus: "Complete Deworming & First 2 Tricat Vaccines Given",
    temperament: ["Calm", "Affectionate", "Independent"],
    description: "Oliver has the iconic round teddy bear cheeks and striking copper eyes. He loves lounging in sunspots and observing household activities peacefully.",
    careTips: ["Regular interactive wand playtime", "Measured grain-free meals", "Slicker brush weekly"],
    images: [
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: false,
    isAvailable: true,
    color: "Classic Blue Slate",
    weight: "2.3 kg",
  },

  // BIRDS
  {
    id: "pet-bird-1",
    name: "Sunny",
    slug: "sunny-tamed-cockatiel",
    animalType: "birds",
    breed: "Cockatiel",
    breedSlug: "cockatiel",
    age: 5,
    ageUnit: "months",
    gender: "Male",
    price: 4500,
    location: "Mumbai, Maharashtra",
    vaccinated: true,
    dewormed: true,
    microchipped: false,
    healthStatus: "Avian Vet Examined, DNA Gender Tested",
    temperament: ["Hand-Tamed", "Whistler", "Gentle"],
    description: "Sunny steps up on fingers effortlessly, whistles peek-a-boo, and bows his head for sweet forehead scratches. Hand-fed since chick stage.",
    careTips: ["Spacious cage with non-toxic perches", "Fresh coriander and spinach daily", "Minimum 1 hour out-of-cage flight"],
    images: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: true,
    isAvailable: true,
    color: "Lutino Yellow",
    weight: "92 g",
  },
  {
    id: "pet-bird-2",
    name: "Rio & Kiwi (Pair)",
    slug: "rio-kiwi-budgie-pair",
    animalType: "birds",
    breed: "Budgerigar",
    breedSlug: "budgerigar",
    age: 4,
    ageUnit: "months",
    gender: "Male",
    price: 2200,
    location: "Pune, Maharashtra",
    vaccinated: true,
    dewormed: true,
    microchipped: false,
    healthStatus: "Active, Bright Eyes, Clean Plumes",
    temperament: ["Chirpy", "Playful", "Inseparable"],
    description: "An adorable bonded pair of turquoise and emerald budgies that sing harmonious duets and love swinging together on wooden ladders.",
    careTips: ["Keep in natural daylight", "Provide multiple swinging perches", "Fresh water twice daily"],
    images: [
      "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574063413132-355dbfd83e23?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: false,
    isAvailable: true,
    color: "Turquoise & Sky Blue",
    weight: "35 g each",
  },

  // HAMSTERS
  {
    id: "pet-hamster-1",
    name: "Peanut",
    slug: "peanut-syrian-teddy-bear-hamster",
    animalType: "hamsters",
    breed: "Syrian Hamster",
    breedSlug: "syrian-hamster",
    age: 2,
    ageUnit: "months",
    gender: "Male",
    price: 1800,
    location: "Bengaluru, Karnataka",
    vaccinated: false,
    dewormed: true,
    microchipped: false,
    healthStatus: "Veterinary Checked, Active Cheek Pouches",
    temperament: ["Tame", "Curious", "Gentle"],
    description: "Peanut loves exploring tunnels, eating sunflower seeds from your palm, and running on his silent wooden wheel after twilight.",
    careTips: ["Keep in solitary enclosure (min 100x50 cm)", "Provide 10-inch wheel", "Deep paper bedding for burrowing"],
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: true,
    isAvailable: true,
    color: "Golden Caramel",
    weight: "130 g",
  },
  {
    id: "pet-hamster-2",
    name: "Pippin & Pip",
    slug: "pippin-guinea-pigs-pair",
    animalType: "hamsters",
    breed: "Abyssinian Guinea Pig",
    breedSlug: "guinea-pig",
    age: 3,
    ageUnit: "months",
    gender: "Female",
    price: 3800,
    location: "Delhi NCR",
    vaccinated: false,
    dewormed: true,
    microchipped: false,
    healthStatus: "Healthy Rosette Coats, Clear Teeth & Respiratory Tract",
    temperament: ["Friendly", "Cuddly", "Wheeking"],
    description: "Bonded sisters with adorable swirling cowlick fur. They greet you with cheerful 'wheek wheek' noises whenever the fridge opens for veggies!",
    careTips: ["Timothy hay at all times", "Fresh bell pepper for vitamin C", "Gentle fleece bedding"],
    images: [
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    ],
    isFeatured: false,
    isAvailable: true,
    color: "Tri-Color Calico",
    weight: "650 g each",
  },
];

// ---------------------------------------------------------------------------
// PRODUCTS (E-COMMERCE CATALOG)
// ---------------------------------------------------------------------------
export const PRODUCTS: ProductData[] = [
  // FOOD
  {
    id: "prod-food-1",
    name: "Royal Canin Golden Retriever Adult Kibble (12kg)",
    slug: "royal-canin-golden-retriever-adult-12kg",
    category: "food",
    animalType: "dogs",
    brand: "Royal Canin",
    price: 7850,
    compareAtPrice: 8600,
    rating: 4.9,
    reviewCount: 342,
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    isBestSeller: true,
    shortDescription: "Tailor-made kibble for purebred Golden Retrievers supporting skin barrier, cardiac health, and optimal body weight.",
    description: "Golden Retrievers are prone to cardiac sensitivities and skin irritation. Royal Canin's dedicated breed formula provides EPA & DHA, borage oil, and taurine, tailored to this noble breed's specific physiology.",
    ingredients: ["Dehydrated poultry protein", "Brown rice", "Barley", "Fish oil", "Borage oil", "Glucosamine", "Marigold extract"],
    features: ["Exclusive kibble shape for easy gripping", "Enriched with EPA & DHA for coat shine", "Cardiac function support formula", "Weight management balanced calories"],
    specifications: {
      "Weight": "12 kg",
      "Life Stage": "Adult (15+ months)",
      "Breed Specific": "Golden Retriever",
      "Country of Origin": "France",
    },
    images: [
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
    ],
    variants: [
      { name: "3 kg Bag", price: 2450, inStock: true },
      { name: "12 kg Bag", price: 7850, inStock: true },
    ],
  },
  {
    id: "prod-food-2",
    name: "Orijen Amazing Grains Regional Red Dry Dog Food (4.5kg)",
    slug: "orijen-amazing-grains-regional-red-4-5kg",
    category: "food",
    animalType: "dogs",
    brand: "Orijen",
    price: 5200,
    compareAtPrice: 5800,
    rating: 4.8,
    reviewCount: 184,
    inStock: true,
    stockCount: 28,
    isFeatured: true,
    shortDescription: "Biologically appropriate nutrition packed with 85% fresh ranch-raised beef, wild boar, and wholesome heirloom grains.",
    description: "Peak nutritional goodness crafted with real meat, organs, and cartilage to deliver evolutionary nutrition that energizes high-performance dogs.",
    ingredients: ["Fresh beef", "Wild boar", "Boar liver", "Steel-cut oats", "Millet", "Pumpkin", "Cranberries"],
    features: ["85% Quality Animal Ingredients", "First 5 ingredients fresh or raw", "WholePrey ratios with bone & marrow", "Grain-inclusive with chia and quinoa"],
    specifications: {
      "Weight": "4.5 kg",
      "Life Stage": "All Life Stages",
      "Primary Protein": "Beef & Wild Boar",
    },
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "prod-food-3",
    name: "Whiskas Ocean Fish Gourmet Wet Cat Food (Pack of 24 Pouches)",
    slug: "whiskas-ocean-fish-wet-cat-food-24-pack",
    category: "food",
    animalType: "cats",
    brand: "Whiskas",
    price: 1140,
    compareAtPrice: 1290,
    rating: 4.7,
    reviewCount: 420,
    inStock: true,
    stockCount: 90,
    isFeatured: false,
    isBestSeller: true,
    shortDescription: "Tender chunks of ocean fish in rich savory jelly providing complete hydration and essential taurine.",
    description: "Cats crave the aroma of fresh seafood. Whiskas wet pouches ensure urinary tract wellness through vital moisture, paired with zinc and omega-6 for glossy coats.",
    ingredients: ["Fresh ocean fish", "Chicken by-products", "Gelling agents", "Taurine", "Vitamin E", "Zinc sulphate"],
    features: ["Contains 83% natural moisture for kidney health", "Enriched with Taurine for sharp eyesight", "Easy single-serve tear pouches", "Zero artificial preservatives"],
    specifications: {
      "Pack Size": "24 x 85g pouches",
      "Life Stage": "Adult (1+ years)",
      "Flavor": "Ocean Fish in Gravy",
    },
    images: [
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "prod-food-4",
    name: "ZuPreem FruitBlend Flavour Parrot Pellets (1.6kg)",
    slug: "zupreem-fruitblend-parrot-pellets",
    category: "food",
    animalType: "birds",
    brand: "ZuPreem",
    price: 1950,
    compareAtPrice: 2200,
    rating: 4.9,
    reviewCount: 98,
    inStock: true,
    stockCount: 35,
    isFeatured: false,
    shortDescription: "Fruit-flavored extruded daily pellets with 21 essential vitamins and minerals for cockatiels and parrots.",
    description: "Eliminates selective seed picking and nutritional deficiencies. Naturally flavored with bananas, oranges, apples, and grapes in enticing shapes.",
    ingredients: ["Ground corn", "Soybean meal", "Ground wheat", "Vegetable oil", "Natural fruit flavors", "Choline chloride"],
    features: ["Complete extruded nutrition prevents obesity", "Loaded with Vitamin A for respiratory health", "Zero dust or wasted hulls"],
    specifications: {
      "Weight": "1.6 kg",
      "Target Birds": "Cockatiels, Conures, Lovebirds, Small Parrots",
    },
    images: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "prod-food-5",
    name: "Oxbow Essentials Adult Guinea Pig Food (2.25kg)",
    slug: "oxbow-essentials-adult-guinea-pig-food",
    category: "food",
    animalType: "hamsters",
    brand: "Oxbow",
    price: 1650,
    compareAtPrice: 1850,
    rating: 4.8,
    reviewCount: 76,
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    shortDescription: "Timothy-based uniform pellets fortified with stabilized Vitamin C to prevent scurvy and digestive upset.",
    description: "Veterinarian-recommended formula designed to support healthy gut motility and dental wear with high-fiber grass hay.",
    ingredients: ["Timothy grass meal", "Soybean hulls", "Wheat middlings", "Stabilized Vitamin C", "Cane molasses"],
    features: ["Uniform pellets stop selective eating", "Daily stabilized Vitamin C guarantee", "Optimal calcium-to-phosphorus ratio"],
    specifications: {
      "Weight": "2.25 kg",
      "Animal": "Guinea Pigs",
    },
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // TOYS
  {
    id: "prod-toy-1",
    name: "KONG Classic Indestructible Natural Rubber Dog Toy",
    slug: "kong-classic-rubber-dog-toy",
    category: "toys",
    animalType: "dogs",
    brand: "KONG",
    price: 1150,
    compareAtPrice: 1350,
    rating: 4.9,
    reviewCount: 512,
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    isBestSeller: true,
    shortDescription: "The gold standard of dog toys. Ultra-durable red natural rubber for stuffing with peanut butter, treats, or kibble.",
    description: "Solves chewing boredom, separation anxiety, and crate adjustment. Unpredictable bounce inspires active chase games and mental enrichment.",
    features: ["Dishwasher safe and ultra-durable", "Great for peanut butter stuffing and freezing", "Made with pet-safe all-natural rubber", "Veterinarian and trainer recommended worldwide"],
    specifications: {
      "Material": "Natural Red Rubber",
      "Size": "Medium (dogs 7-16 kg)",
      "Origin": "USA",
    },
    images: [
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=80",
    ],
    variants: [
      { name: "Small (under 9kg)", price: 890, inStock: true },
      { name: "Medium (7-16kg)", price: 1150, inStock: true },
      { name: "Large (15-30kg)", price: 1450, inStock: true },
    ],
  },
  {
    id: "prod-toy-2",
    name: "Catit Senses 2.0 Digger Interactive Puzzle Feeder",
    slug: "catit-senses-digger-puzzle-feeder",
    category: "toys",
    animalType: "cats",
    brand: "Catit",
    price: 1890,
    compareAtPrice: 2200,
    rating: 4.7,
    reviewCount: 140,
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    shortDescription: "Interactive multi-tube puzzle that activates your cat's natural hunting and pawing instincts.",
    description: "Prevents binge eating and boredom. Cats naturally paw small portions of food from the varied-height tubes.",
    features: ["Stable ergonomic sloping base", "Multiple tube sizes for adjustable difficulty", "BPA-free durable plastic", "Dishwasher safe parts"],
    specifications: {
      "Material": "BPA-free polymer",
      "Color": "White & Forest Green",
    },
    images: [
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "prod-toy-3",
    name: "Silent Spinner Exercise Running Wheel (10-inch)",
    slug: "silent-spinner-running-wheel-10-inch",
    category: "toys",
    animalType: "hamsters",
    brand: "Kaytee",
    price: 1290,
    compareAtPrice: 1490,
    rating: 4.8,
    reviewCount: 165,
    inStock: true,
    stockCount: 30,
    isFeatured: false,
    shortDescription: "Ultra-quiet dual ball-bearing wheel with solid running surface to protect tiny paws and spine.",
    description: "Enjoy peaceful sleep while your hamster runs miles in complete quiet. Solid textured floor prevents bumblefoot and broken toes.",
    features: ["Whisper-quiet dual ball bearings", "Zero wire gaps for 100% paw safety", "Freestanding wire stand or cage mountable"],
    specifications: {
      "Diameter": "10.5 inches (26.5 cm)",
      "Target": "Syrian Hamsters, Rats, Gerbils",
    },
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // CAGES & ACCESSORIES
  {
    id: "prod-cage-1",
    name: "Prevue Hampton Deluxe Wrought Iron Bird Flight Villa",
    slug: "prevue-hampton-deluxe-bird-villa",
    category: "cages",
    animalType: "birds",
    brand: "Prevue Pet",
    price: 8900,
    compareAtPrice: 10500,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    shortDescription: "Heavy-duty wrought iron flight cage on caster wheels with pull-out bottom grille and storage shelf.",
    description: "Generous wingspan flight room for cockatiels, budgies, and lovebirds. Non-toxic powder coating resists chewing and rust.",
    features: ["Heavy duty locking casters for easy mobility", "Slide-out zinc waste tray and safety grille", "Large main door plus feeder side doors", "Includes 3 natural wood perches and 4 stainless cups"],
    specifications: {
      "Dimensions": "31\" L x 20.5\" W x 53\" H",
      "Wire Spacing": "1/2 inch (safe for small birds)",
      "Finish": "Non-toxic Black Hammertone",
    },
    images: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "prod-cage-2",
    name: "Niteangel Glass Vista Hamster Habitat (Large 100cm)",
    slug: "niteangel-glass-vista-hamster-habitat",
    category: "cages",
    animalType: "hamsters",
    brand: "Niteangel",
    price: 9800,
    compareAtPrice: 11800,
    rating: 5.0,
    reviewCount: 64,
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    shortDescription: "Modern furniture-grade wood and crystal-clear acrylic terrarium offering 12-inch deep burrowing space.",
    description: "Meets international humane standards for Syrian and dwarf hamsters. Features mesh roof ventilation and panoramic viewing.",
    features: ["Over 800 sq inches of unbroken floor space", "Allows 12+ inches of deep burrowing substrate", "Sliding front door for gentle taming approach"],
    specifications: {
      "Dimensions": "39.4\" L x 19.7\" W x 19.7\" H",
      "Materials": "Birch wood + Tempered acrylic panels",
    },
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "prod-acc-1",
    name: "PawPetStore CloudComfort Memory Foam Orthopedic Pet Bed",
    slug: "pawpetstore-cloudcomfort-orthopedic-bed",
    category: "accessories",
    animalType: "dogs",
    brand: "PawPetStore Heritage",
    price: 3499,
    compareAtPrice: 4299,
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    stockCount: 40,
    isFeatured: true,
    isBestSeller: true,
    shortDescription: "Therapeutic human-grade memory foam with waterproof liner, bolster neck rest, and washable velvet cover.",
    description: "Soothes aching joints, hip dysplasia, and arthritis. The supportive bolsters give your furry friend a secure chin rest while sleeping.",
    features: ["Dual-layer memory foam base eliminates pressure points", "100% water-resistant inner membrane", "Machine washable anti-fur outer shell", "Non-slip rubber grip bottom"],
    specifications: {
      "Size": "Large (36\" x 28\" x 7\")",
      "Core": "4-inch High Density Gel Memory Foam",
      "Colors": "Forest Slate, Warm Sand",
    },
    images: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    ],
    variants: [
      { name: "Medium (Cats / Small Dogs)", price: 2499, inStock: true },
      { name: "Large (Labradors / Goldens)", price: 3499, inStock: true },
      { name: "Extra Large (Shepherds / Huskies)", price: 4499, inStock: true },
    ],
  },
  {
    id: "prod-acc-2",
    name: "Handcrafted Vegetable-Tanned Italian Leather Dog Collar & Leash Set",
    slug: "italian-leather-collar-leash-set",
    category: "accessories",
    animalType: "dogs",
    brand: "PawPetStore Atelier",
    price: 2199,
    compareAtPrice: 2899,
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    stockCount: 50,
    isFeatured: false,
    shortDescription: "Artisanal saddle leather with solid brass hardware that patinas gracefully with age.",
    description: "Soft padded inner collar to prevent chafing, reinforced stitching, and a matching 5-foot lead with 360-degree brass swivel clasp.",
    features: ["Natural vegetable tanned leather with no harsh dyes", "Solid rustproof antiqued brass hardware", "Includes engraved custom name tag slot"],
    specifications: {
      "Length": "Leash 5 ft (150cm), Collar adjustable 16-22 inch",
      "Width": "1 inch",
      "Color": "Cognac Tan",
    },
    images: [
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "prod-acc-3",
    name: "Furminator Undercoat De-Shedding Grooming Tool",
    slug: "furminator-undercoat-deshedding-tool",
    category: "grooming",
    animalType: "dogs",
    brand: "FURminator",
    price: 1750,
    compareAtPrice: 2100,
    rating: 4.9,
    reviewCount: 380,
    inStock: true,
    stockCount: 55,
    isFeatured: false,
    shortDescription: "Reduces loose shedding hair up to 90% without cutting skin or damaging healthy topcoat.",
    description: "Ergonomic stainless-steel curved edge reaches through topcoat to safely remove loose hair and undercoat. Features FURejector push button.",
    features: ["FURejector button cleans hair from tool with one push", "SkinGuard glides over skin without digging in", "Ergonomic rubberized grip handle"],
    specifications: {
      "Target": "Medium to Large Double Coated Breeds",
      "Blade Width": "2.65 inch",
    },
    images: [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// ---------------------------------------------------------------------------
// TESTIMONIALS
// ---------------------------------------------------------------------------
export const TESTIMONIALS: TestimonialData[] = [
  {
    id: "test-1",
    author: "Priya Sharma",
    petName: "Mochi",
    petType: "Golden Retriever Puppy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment: "PawPetStore made welcoming Mochi so effortless and reassuring. His complete veterinary checkup, vaccination record, and initial starter food arrived seamlessly. You can truly tell they put pet welfare first!",
    location: "Indiranagar, Bengaluru",
    date: "February 2026",
  },
  {
    id: "test-2",
    author: "Vikram Mehta",
    petName: "Cleo",
    petType: "Persian Cat",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment: "The CloudComfort bed and grooming tools are top-tier. Shipping to Mumbai took less than 24 hours. The dark mode website experience is so modern and easy to browse.",
    location: "Bandra West, Mumbai",
    date: "March 2026",
  },
  {
    id: "test-3",
    author: "Ananya Deshmukh",
    petName: "Pippin",
    petType: "Syrian Hamster",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment: "Finding proper spacious cages for hamsters in India used to be impossible until I discovered PawPetStore. Their Niteangel habitat and silent wheels are extraordinary!",
    location: "Koregaon Park, Pune",
    date: "January 2026",
  },
];

// ---------------------------------------------------------------------------
// VACCINATION & PET-CARE SERVICES
// ---------------------------------------------------------------------------
export interface CareServiceData {
  id: string;
  name: string;
  slug: string;
  category: "Vaccination" | "Health Check" | "Grooming" | "Consultation";
  price: number;
  duration: string;
  targetAnimals: string[];
  description: string;
  includes: string[];
  badge?: string;
}

export const CARE_SERVICES: CareServiceData[] = [
  {
    id: "service-vaccine-core",
    name: "Essential Core Immunization & Deworming",
    slug: "essential-core-immunization",
    category: "Vaccination",
    price: 1499,
    duration: "30 mins",
    targetAnimals: ["Dogs", "Cats"],
    description: "Comprehensive core vaccine protocol (DHPPi/Tricat + Anti-Rabies) administered by licensed veterinary doctors.",
    includes: [
      "Full pre-vaccination clinical vital check",
      "Core immunization with registered batch vial barcode",
      "Oral broad-spectrum deworming dose",
      "Digital Health Card update & reminder sync",
    ],
    badge: "Most Booked",
  },
  {
    id: "service-comprehensive-checkup",
    name: "Comprehensive Vet Wellness & Dental Check",
    slug: "wellness-dental-checkup",
    category: "Health Check",
    price: 999,
    duration: "45 mins",
    targetAnimals: ["Dogs", "Cats", "Birds", "Hamsters"],
    description: "Head-to-tail clinical physical assessment including heart auscultation, joint palpation, ear otoscopy, and dental tartar evaluation.",
    includes: [
      "Stethoscope heart & lung examination",
      "Ear canal otoscopy & parasite screening",
      "Body condition score & tailored nutritional guidance",
      "Written wellness report with dietary suggestions",
    ],
  },
  {
    id: "service-spa-grooming",
    name: "PawPetStore Spa, Bath & Deshedding Retreat",
    slug: "spa-grooming-deshedding",
    category: "Grooming",
    price: 1899,
    duration: "60 - 90 mins",
    targetAnimals: ["Dogs", "Cats"],
    description: "Stress-free grooming retreat with organic oatmeal shampoo, deep undercoat deshedding, sanitary trimming, and paw balm treatment.",
    includes: [
      "Warm hydro-massage with hypoallergenic shampoo",
      "High-velocity blow dry & 30-min Furminator deshedding",
      "Nail clipping & edge smoothing with dremel",
      "Ear cleansing & lavender paw pad moisturizing balm",
    ],
    badge: "Popular",
  },
  {
    id: "service-tele-consultation",
    name: "Emergency / General Video Consultation",
    slug: "video-consultation",
    category: "Consultation",
    price: 499,
    duration: "20 mins",
    targetAnimals: ["Dogs", "Cats", "Birds", "Hamsters"],
    description: "Direct face-to-face video consultation with certified veterinary surgeons for behavioral questions, dietary advice, or second opinions.",
    includes: [
      "HD encrypted video call with certified veterinary doctor",
      "Digital medical prescription via SMS / WhatsApp",
      "48-hour complimentary follow-up chat window",
    ],
  },
];
