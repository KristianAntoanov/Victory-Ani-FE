import { loc, type Lang, type Localized } from '@/i18n';

export interface Testimonial {
  name: string;
  organisation: string;
  project: string;
  quote: string;
}

interface TestimonialRecord {
  name: string;
  organisation: Localized;
  project: Localized;
  quote: Localized;
}

const exact = (value: string): Localized => ({ en: value, bg: value });

const testimonials: TestimonialRecord[] = [
  {
    name: 'Assoc. Prof. Dr Iliyana Ankova-Stoyanova',
    organisation: exact('Sofia University “St. Kliment Ohridski”'),
    project: exact('Erasmus+ Capacity Building in Higher Education proposal'),
    quote: exact('“V&A Projects brought structure, precision and strategic direction to the development of a complex Capacity Building in Higher Education proposal. Their support was particularly valuable in shaping the project logic, organising the work packages and coordinating the contributions of the consortium partners. The team demonstrated a strong understanding of EU funding requirements and maintained a high level of professionalism throughout the entire preparation process.”'),
  },
  {
    name: 'Daniela Atanasova',
    organisation: exact('Teacher, Primary School “Hristo Botev”, Ekzarh Antimovo'),
    project: exact('Erasmus+ KA1 mobility project'),
    quote: exact('“Working with V&A Projects made the entire Erasmus+ process feel clear and manageable. We received reliable support at every stage, from the initial planning and preparation to the organisation of our mobility. Our training in Finland gave us valuable new ideas and practical methods that we can now apply in our school. We are truly grateful for the professionalism, patience and personal attention shown throughout the project.”'),
  },
  {
    name: 'Alexandra Vassileva',
    organisation: exact('Institute of Ornamental and Medicinal Plants (IOMP), Sofia, Bulgaria'),
    project: exact('Horizon Europe proposal'),
    quote: exact('“Our work with V&A Projects on the Horizon Europe proposal was extremely valuable. They helped transform a technically ambitious idea into a clear and well-organised project concept that responded directly to the call requirements. Their ability to coordinate different areas of expertise, clarify partner roles and maintain consistency across the proposal gave the consortium confidence throughout the submission process.”'),
  },
  {
    name: 'Dr. Admira Boshnyaku',
    organisation: exact('ACTA Foundation, Sofia, Bulgaria'),
    project: exact('Horizon Europe proposal'),
    quote: exact('“V&A Projects is our trusted and highly committed partner. Their organisation, attention to detail and ability to bring together contributions from a diverse international consortium are essential to the quality of any final application. Communication is always clear and constructive and every challenge is approached with professionalism and a strong focus on solutions.”'),
  },
  {
    name: 'Tsvetelina Tomova',
    organisation: exact('Teacher, 148 Secondary School “Prof. Dr Lyubomir Miletich”, Sofia, Bulgaria'),
    project: exact('Erasmus+ KA1 mobility project'),
    quote: exact('“The support we received from V&A Projects gave our team the confidence to participate fully in our Erasmus+ mobility in Barcelona. The preparation was clear, the documentation was carefully organised and we always knew what was expected from us. The mobility was an inspiring professional experience that introduced us to new teaching methods, new colleagues and new possibilities for our school.”'),
  },
  {
    name: 'Tatyana Lepoeva',
    organisation: exact('Principal, 135 Secondary School “Jan Amos Komensky”, Sofia, Bulgaria'),
    project: exact('Erasmus+ KA1 project'),
    quote: exact('“V&A Projects provided our school with professional and dependable support throughout the development and implementation of our Erasmus+ project. They understood our institutional needs and helped us translate them into clear objectives and a realistic project plan. Their careful guidance reduced the administrative burden on our team and allowed us to focus on the educational value of the project.”'),
  },
  {
    name: 'Dr. Kristina Stefanova',
    organisation: exact('ERI-BAS, Sofia, Bulgaria'),
    project: exact('Horizon Europe proposal'),
    quote: exact('“Thank you for your excellent coordination and hard work in preparing our Horizon Europe proposal! It was a pleasure collaborating with you”'),
  },
];

export function getTestimonials(lang: Lang = 'en'): Testimonial[] {
  return testimonials.map((testimonial) => ({
    name: testimonial.name,
    organisation: loc(testimonial.organisation, lang),
    project: loc(testimonial.project, lang),
    quote: loc(testimonial.quote, lang),
  }));
}
