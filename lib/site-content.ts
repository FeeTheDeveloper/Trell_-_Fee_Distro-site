export const navigationLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#faq", label: "FAQ" },
];

export const heroStats = [
  { value: "100%", label: "Release metadata checked before handoff" },
  { value: "24 hrs", label: "Average intake review turnaround" },
  { value: "3", label: "Premium service tiers for artists and labels" },
];

export const servicePlans = [
  {
    name: "Basic Upload",
    price: "$125",
    description:
      "Fast release setup for artists who need a clean upload path and sharp metadata before launch.",
    features: [
      "Release metadata check",
      "DSP-ready asset review",
      "Guided upload support",
    ],
    href: "/intake?service=basic-upload",
  },
  {
    name: "Full Admin",
    price: "$350",
    description:
      "Publishing, distribution, and rights support for artists who want a polished admin partner.",
    features: [
      "Publishing registration review",
      "Split and ownership verification",
      "Release operations guidance",
    ],
    featured: true,
    href: "/intake?service=full-admin",
  },
  {
    name: "Label Services",
    price: "$1,000",
    description:
      "High-touch setup support for managers, labels, and teams running coordinated release pipelines.",
    features: [
      "Multi-release operations support",
      "Rights and monetization strategy",
      "Custom release infrastructure",
    ],
    href: "/intake?service=label-services",
  },
];

export const processSteps = [
  {
    title: "Submit your release",
    description:
      "Send the release details, assets, rights information, and requested services in one guided intake.",
  },
  {
    title: "We audit the setup",
    description:
      "Our team checks metadata, ownership, splits, registrations, and monetization gaps before anything goes live.",
  },
  {
    title: "We configure the release",
    description:
      "We prepare the publishing and distribution stack so the release is aligned across platforms and collection societies.",
  },
  {
    title: "You collect with confidence",
    description:
      "Your release moves forward with clear tracking, cleaner reporting, and fewer revenue leaks.",
  },
];

export const benefitCards = [
  {
    title: "Music-business precision",
    description:
      "Release details, contributors, ownership, and royalty data are checked before they become expensive mistakes.",
  },
  {
    title: "Tech-forward admin",
    description:
      "Ghost Creators blends platform polish with release operations so artists feel supported from intake to launch.",
  },
  {
    title: "Premium client confidence",
    description:
      "A darker, more premium experience gives artists confidence that their money and release setup are being handled seriously.",
  },
];

export const trustHighlights = [
  "Centered around artist trust, rights accuracy, and clean release operations.",
  "Built for music teams who want software polish without losing human oversight.",
  "Designed to feel credible, modern, and worth trusting with real release money.",
];

export const faqItems = [
  {
    question: "Who is this for?",
    answer:
      "Independent artists, managers, labels, and creative teams who need publishing, distribution, or monetization support done correctly.",
  },
  {
    question: "Can you work with existing distributors?",
    answer:
      "Yes. We can support releases already tied to platforms like DistroKid, TuneCore, UnitedMasters, or label-distribution workflows.",
  },
  {
    question: "What happens after intake?",
    answer:
      "We review the submission, confirm service scope, flag issues, and move the release into the correct setup pipeline.",
  },
  {
    question: "Do you help with rights and split errors?",
    answer:
      "Yes. The platform is built to catch setup mistakes before they delay registrations or send money to the wrong place.",
  },
];
