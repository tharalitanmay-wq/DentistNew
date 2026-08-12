const seedDoctors = [
  {
    _id: 'doc-1',
    name: 'Dr. Ananya Sharma',
    title: 'Chief Cosmetic Dentist & Director',
    specialization: 'Cosmetic Dentistry & Porcelain Veneers',
    experience: '16+ Years Experience',
    bio: 'Renowned pioneer in digital smile design, porcelain veneers, and full-mouth rehabilitation. Dr. Sharma blends medical precision with high fashion smile aesthetics.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    consultationFee: 250,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    contactEmail: 'ananya@pearldental.com',
    education: ['BDS - AIIMS New Delhi', 'MDS Prosthodontics - MIDS', 'Fellowship - AACD USA'],
    featured: true
  },
  {
    _id: 'doc-2',
    name: 'Dr. Rajesh Kapoor',
    title: 'Lead Implant Specialist & Oral Surgeon',
    specialization: 'Dental Implants & All-on-4 Restoration',
    experience: '14+ Years Experience',
    bio: 'Pioneer in computer-guided implantology and bone regeneration techniques. Over 4,000 successful 3D implant placements.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    consultationFee: 300,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['10:00 AM', '01:00 PM', '03:30 PM'],
    contactEmail: 'rajesh@pearldental.com',
    education: ['BDS - KMC Manipal', 'MDS Oral Surgery - Manipal University', 'ICOI Master Fellow'],
    featured: true
  },
  {
    _id: 'doc-3',
    name: 'Dr. Vikramaditya Verma',
    title: 'Orthodontics & Invisalign Specialist',
    specialization: 'Clear Aligners & Invisible Orthodontics',
    experience: '10+ Years Experience',
    bio: 'Diamond Plus Invisalign provider specializing in adult orthodontics, facial symmetry balancing, and discreet teeth straightening.',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    consultationFee: 200,
    availableDays: ['Tuesday', 'Wednesday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:30 AM', '02:30 PM', '05:00 PM'],
    contactEmail: 'vikram@pearldental.com',
    education: ['BDS - KGMU Lucknow', 'MDS Orthodontics - KGMU', 'Invisalign Diamond Plus Certified'],
    featured: true
  }
];

const seedServices = [
  {
    _id: 'srv-1',
    name: 'Signature Porcelain Veneers',
    category: 'Cosmetic Dentistry',
    description: 'Ultra-thin, custom handcrafted ceramic veneers that transform discolored, chipped, or misaligned teeth into a luminous Hollywood smile.',
    priceRange: '$1,200 - $2,500 / tooth',
    estimatedPriceMin: 1200,
    estimatedPriceMax: 2500,
    duration: '60 mins per session',
    icon: 'Sparkles',
    benefits: ['Minimal enamel removal', 'Natural light translucency', 'Stain-resistant porcelain', '15-20 year durability'],
    isActive: true,
    featured: true
  },
  {
    _id: 'srv-2',
    name: '3D Computer-Guided Dental Implants',
    category: 'Implantology',
    description: 'Permanent, natural-looking replacement for missing teeth using biocompatible titanium roots and custom zirconia crowns.',
    priceRange: '$2,500 - $4,800',
    estimatedPriceMin: 2500,
    estimatedPriceMax: 4800,
    duration: '90 mins',
    icon: 'ShieldCheck',
    benefits: ['Lifetime stability', 'Preserves bone structure', 'Seamless natural match', 'Single day restoration option'],
    isActive: true,
    featured: true
  },
  {
    _id: 'srv-3',
    name: 'Invisalign Diamond Alignment',
    category: 'Orthodontics',
    description: 'Virtually invisible removable aligners that gently shift your teeth into ideal alignment without metal wires or brackets.',
    priceRange: '$3,500 - $6,500',
    estimatedPriceMin: 3500,
    estimatedPriceMax: 6500,
    duration: '30 mins check-in',
    icon: 'Smile',
    benefits: ['100% invisible aligners', 'Removable for dining', 'Accelerated 6-12 mo options', '3D iTero digital preview'],
    isActive: true,
    featured: true
  },
  {
    _id: 'srv-4',
    name: 'Laser Teeth Whitening Luxury Spa',
    category: 'Cosmetic Dentistry',
    description: 'In-office cold-laser whitening treatment lifting enamel stains up to 8 shades lighter in less than 60 relaxing minutes.',
    priceRange: '$450 - $750',
    estimatedPriceMin: 450,
    estimatedPriceMax: 750,
    duration: '60 mins',
    icon: 'Zap',
    benefits: ['Instant 8-shade brightening', 'Zero tooth sensitivity formula', 'Includes luxury take-home touchup kit'],
    isActive: true,
    featured: true
  },
  {
    _id: 'srv-5',
    name: 'Full Mouth Smile Rehabilitation',
    category: 'Surgery & Reconstruction',
    description: 'Comprehensive restorative overhaul combining crowns, veneers, laser therapy, and bite realignment for optimal function & beauty.',
    priceRange: '$8,000 - $22,000',
    estimatedPriceMin: 8000,
    estimatedPriceMax: 22000,
    duration: 'Multi-session custom plan',
    icon: 'Crown',
    benefits: ['Comprehensive aesthetics & bite correction', 'Tailored sedation options', 'Custom 3D waxup mockups'],
    isActive: true,
    featured: true
  }
];

const seedTestimonials = [
  {
    _id: 'tst-1',
    patientName: 'Victoria Sterling-Hayes',
    treatment: 'Full Set Porcelain Veneers',
    rating: 5,
    comment: 'Dr. Sterling completely reshaped my smile before my European film premiere. The aesthetic precision, serene atmosphere, and pain-free experience were unmatched. Worth every single penny.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    isFeatured: true,
    platform: 'Google Review'
  },
  {
    _id: 'tst-2',
    patientName: 'Harrison Ford-Blake',
    treatment: 'All-on-4 Dental Implants',
    rating: 5,
    comment: 'After years of dental anxiety, Dr. Vance and his surgical team put me entirely at ease. My new implants feel and function exactly like my natural teeth used to when I was 20.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    isFeatured: true,
    platform: 'Google Review'
  },
  {
    _id: 'tst-3',
    patientName: 'Sophia Lin',
    treatment: 'Invisalign & Laser Whitening',
    rating: 5,
    comment: 'The glassmorphic aesthetic of the studio combined with the AI consultation technology made me feel like I was stepping into a luxury spa rather than a dental clinic. 10/10 recommendation!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    isFeatured: true,
    platform: 'Google Review'
  }
];

const seedBlogs = [
  {
    _id: 'blg-1',
    title: 'The Art of Porcelain Veneers: How Bespoke Smiles are Crafted',
    slug: 'art-of-porcelain-veneers',
    excerpt: 'Discover the meticulous craftsmanship, color translucency matching, and digital smile design behind natural porcelain veneers.',
    content: `Porcelain veneers are widely regarded as the pinnacle of cosmetic dentistry. Unlike traditional crowns that cover the entire tooth, veneers are handcrafted ceramic shells meticulously bonded to the front surface of teeth.\n\n### Digital Smile Design (DSD)\nAt Pearl Dental Care, every transformation begins with high-definition 3D digital scans and facial symmetry analysis. We map out golden proportions tailored uniquely to your jaw structure and lip curvature.\n\n### Micro-Layering Porcelain\nOur master ceramists use field-spat ceramic layering to mimic the natural translucency and enamel ridges of youth. The result is a luminous, high-wattage smile that never looks artificially opaque.`,
    category: 'Cosmetic Dentistry',
    author: 'Dr. Evelyn Sterling',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
    isPublished: true,
    tags: ['Veneers', 'Smile Design', 'Cosmetics']
  },
  {
    _id: 'blg-2',
    title: 'Why Computer-Guided Dental Implants outlast Traditional Bridges',
    slug: 'guided-dental-implants-vs-bridges',
    excerpt: 'Explore why titanium and zirconia implants preserve jawbone density and provide a lifetime structural foundation.',
    content: `When replacing a missing tooth, traditional dentistry relied heavily on dental bridges. However, bridges require grinding down adjacent healthy teeth as anchor points.\n\n### The Implant Advantage\n3D computer-guided implants bypass healthy teeth entirely. A biocompatible titanium fixture is anchored directly into the jawbone, serving as an artificial root that prevents bone resorption over time.`,
    category: 'Implants',
    author: 'Dr. Julian Vance',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
    isPublished: true,
    tags: ['Implants', 'Restoration', 'Technology']
  }
];

const seedGallery = [
  {
    _id: 'gal-1',
    title: 'Hollywood Smile Veneer Overhaul',
    category: 'Veneers',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
    description: '10 upper teeth custom ceramic porcelain veneers with shade BL1 high translucency.',
    isBeforeAfter: true
  },
  {
    _id: 'gal-2',
    title: 'Full Arch Implant Reconstruction',
    category: 'Implants',
    beforeImage: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    description: 'All-on-4 full arch rehabilitation with custom zirconia bridge.',
    isBeforeAfter: true
  }
];

const seedFAQs = [
  {
    _id: 'faq-1',
    question: 'Are porcelain veneers permanent and irreversible?',
    answer: 'Porcelain veneers require minimal surface enamel preparation (0.3mm to 0.5mm) to ensure a smooth, natural fit. Because enamel is trimmed, the procedure is considered permanent, though individual veneers typically last 15-20+ years with proper care.',
    category: 'Veneers',
    order: 1
  },
  {
    _id: 'faq-2',
    question: 'How long does a dental implant procedure take?',
    answer: 'The surgical implant placement takes around 60 to 90 minutes. After placement, a healing period of 3-4 months allows osseointegration (bone fusion) before the final ceramic crown is attached.',
    category: 'Implants',
    order: 2
  },
  {
    _id: 'faq-3',
    question: 'Do you offer sedation options for anxious patients?',
    answer: 'Yes! We offer a full spectrum of luxury relaxation options including Nitrous Oxide (laughing gas), oral conscious sedation, and full IV twilight sedation monitored by certified anesthesiologists.',
    category: 'General',
    order: 3
  }
];

module.exports = {
  seedDoctors,
  seedServices,
  seedTestimonials,
  seedBlogs,
  seedGallery,
  seedFAQs
};
