export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  brokerage: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I used to spend 3 hours per deal just on coordination emails. Britanni handles all of it — and follows up better than I ever did. I closed 4 extra deals last quarter because I had time to actually sell.",
    name: 'Sarah Mitchell',
    title: 'Residential Agent',
    brokerage: 'Keller Williams Realty',
    rating: 5,
  },
  {
    quote:
      "The contract analysis alone is worth it. I uploaded a 40-page purchase agreement and had every deadline, contingency, and missing initial flagged in under a minute. My previous TC charged $400 per file and took 24 hours.",
    name: 'Marcus Rivera',
    title: 'Senior Agent',
    brokerage: 'RE/MAX Elite',
    rating: 5,
  },
  {
    quote:
      "We switched our team of 5 agents to Britanni and haven't looked back. Every deal is tracked, every deadline is hit, and every party gets exactly the right email at exactly the right time. Our deals close faster and cleaner now.",
    name: 'Jennifer Park',
    title: 'Team Lead',
    brokerage: 'Compass Florida',
    rating: 5,
  },
];
