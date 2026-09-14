export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  shortName: string;
  title: string;
  description: string;
  heading: string;
  intro: string[];
  image: string;
  imageAlt: string;
  services: string[];
  preparation: string[];
  faqs: ServiceFaq[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "clothing-alterations-galway",
    shortName: "Clothing alterations",
    title: "Clothing Alterations Galway | Koko Atelier",
    description: "Clothing alterations in Galway city for trousers, dresses, suits, jackets and occasion wear, with personal fitting at Koko Atelier.",
    heading: "Clothing alterations in Galway, shaped around you",
    intro: [
      "A good alteration should make the garment feel natural on you. At Koko Atelier, each piece is assessed in person so the fit, fabric and finish can be considered before any work begins.",
      "Bring everyday clothing, workwear or an outfit for an important occasion to our Galway city atelier. We will discuss what can be changed, explain the approach and confirm the price after seeing the garment."
    ],
    image: "/images/atelier-work.jpg",
    imageAlt: "Garment alteration work inside Koko Atelier Galway",
    services: ["Trouser and jeans alterations", "Dress and skirt alterations", "Suit and jacket adjustments", "Zip replacement and repairs", "Bridal and occasion wear", "Sleeve, hem and waist adjustments"],
    preparation: ["Bring the shoes you plan to wear when the hem length matters.", "Wear the usual undergarments for fitted dresses and occasion wear.", "Tell us how you want the garment to feel as well as how you want it to look."],
    faqs: [
      { question: "Do I need an appointment?", answer: "You can contact the atelier before visiting if your garment needs a detailed fitting or you are working to a specific date." },
      { question: "Can you tell me the price online?", answer: "The guide prices on our website are a starting point. The final price depends on the garment, fabric, construction and alteration required." },
      { question: "Where is Koko Atelier?", answer: "We are at Unit 10, Corbett Court Shopping Centre, Williamsgate Street, Galway, H91 V5DX." }
    ]
  },
  {
    slug: "bridal-alterations-galway",
    shortName: "Bridal alterations",
    title: "Bridal Alterations Galway | Koko Atelier",
    description: "Bridal alterations in Galway city with personal fittings for wedding dresses, bridesmaid dresses and carefully finished occasion garments.",
    heading: "Bridal alterations in Galway with time for every detail",
    intro: [
      "A wedding dress fitting is about more than shortening a hem. The shape, support, movement and final proportions all need to work together with your shoes and undergarments.",
      "Koko Atelier provides personal bridal fittings in Galway for wedding dresses and bridal-party garments. We assess the construction carefully and agree the alteration plan before work begins."
    ],
    image: "/images/bridal-alteration.jpg",
    imageAlt: "Detailed bridal dress alteration at Koko Atelier Galway",
    services: ["Wedding dress hems", "Bodice and waist adjustments", "Strap and sleeve alterations", "Bridesmaid dress alterations", "Zip and fastening adjustments", "Careful finishing for lace and embellishment"],
    preparation: ["Bring your wedding shoes or shoes of the same height.", "Wear the undergarments or shapewear intended for the day.", "Bring any accessories that affect the neckline, waist or hem.", "Contact us early enough to allow for assessment and any follow-up fitting."],
    faqs: [
      { question: "When should I arrange my first bridal fitting?", answer: "Contact us as soon as you know the dress and wedding date. The required time depends on the dress construction and the alterations involved." },
      { question: "Can bridesmaid dresses be fitted too?", answer: "Yes. Bridesmaid and other occasion dresses can be assessed individually at the atelier." },
      { question: "How is the price confirmed?", answer: "Bridal work is priced after the dress has been examined and the required alterations have been agreed with you." }
    ]
  },
  {
    slug: "dress-alterations-galway",
    shortName: "Dress alterations",
    title: "Dress Alterations Galway | Koko Atelier",
    description: "Dress alterations in Galway for hems, resizing, straps, sleeves, zips and restyling, assessed personally at Koko Atelier.",
    heading: "Dress alterations in Galway for the fit you intended",
    intro: [
      "The right changes can help a dress sit cleanly through the shoulders, waist and hem without losing its original character. Fabric, lining and construction all influence what is possible.",
      "We alter everyday dresses, evening wear and special-occasion garments at our Galway atelier. Bring the dress for an in-person assessment and we will talk through the most suitable options."
    ],
    image: "/images/red-evening-dress.jpg",
    imageAlt: "Red evening dress prepared for alteration in Galway",
    services: ["Dress and skirt hemming", "Taking in or letting out", "Strap and shoulder adjustments", "Sleeve alterations", "Zip replacement", "Shape and fit refinements"],
    preparation: ["Bring the shoes that will be worn with the dress.", "Wear the intended undergarments for a close or structured fit.", "Bring a reference photo if you are considering a visible restyle."],
    faqs: [
      { question: "Can a lined dress be shortened?", answer: "Often yes. We assess the outer fabric, lining and original finish before confirming the work and price." },
      { question: "Can you replace a dress zip?", answer: "Zip replacement is available for many dresses. The construction and zip type need to be checked first." },
      { question: "Do you alter evening dresses?", answer: "Yes. Evening and occasion wear can be fitted and altered after an in-person assessment." }
    ]
  },
  {
    slug: "suit-alterations-galway",
    shortName: "Suit alterations",
    title: "Suit Alterations Galway | Koko Atelier",
    description: "Suit alterations in Galway for jackets, sleeves, waists and trousers, with an in-person fitting and careful attention to proportion.",
    heading: "Suit alterations in Galway with a balanced, personal fit",
    intro: [
      "A suit works as a whole: jacket length, sleeve break, trouser line and waist shape need to feel balanced together. Small adjustments can make a meaningful difference to how it sits and moves.",
      "Koko Atelier assesses suits and tailored separates in person in Galway. We will explain which changes are practical for the garment and confirm the work before beginning."
    ],
    image: "/images/tailored-jacket.jpg",
    imageAlt: "Tailored jacket being prepared for suit alterations in Galway",
    services: ["Jacket sleeve shortening", "Jacket waist adjustments", "Trouser hemming", "Trouser tapering", "Trouser waist adjustments", "Minor repairs and finishing"],
    preparation: ["Bring the shirt and shoes you expect to wear with the suit.", "Empty all pockets before the fitting.", "Explain whether the suit is for daily wear or a particular occasion."],
    faqs: [
      { question: "Can suit jacket sleeves be shortened?", answer: "Many can, but the cuff construction and buttonholes affect the available options. We confirm this after examining the jacket." },
      { question: "Can suit trousers be tapered?", answer: "Yes, depending on their construction and the fit you want. The trousers should be tried on during assessment." },
      { question: "Can you alter only one part of a suit?", answer: "Yes. A jacket or pair of trousers can be assessed separately, although bringing the full outfit helps when overall proportion matters." }
    ]
  },
  {
    slug: "trouser-jeans-alterations-galway",
    shortName: "Trousers & jeans",
    title: "Trouser & Jeans Alterations Galway | Koko Atelier",
    description: "Trouser and jeans alterations in Galway for shortening, tapering, waist adjustments, zip replacement and everyday repairs.",
    heading: "Trouser and jeans alterations in Galway",
    intro: [
      "Whether the issue is length, waist or leg shape, trousers should be pinned while you are wearing them so the final line works with your body and footwear.",
      "Bring jeans, work trousers, formal trousers or suit separates to Koko Atelier in Galway for assessment. We offer guide prices online and confirm the final cost after seeing the garment."
    ],
    image: "/images/services/trousers.png",
    imageAlt: "Grey trousers measured for alterations at Koko Atelier Galway",
    services: ["Standard hemming", "Jeans shortening", "Leg tapering", "Waist adjustments", "Trouser zip replacement", "Seam and pocket repairs"],
    preparation: ["Bring the shoes normally worn with the trousers.", "Wash new jeans before fitting if you expect the fabric to shrink.", "Choose the preferred break or finished length before pinning."],
    faqs: [
      { question: "How much does trouser shortening cost?", answer: "Standard hemming starts from the guide price shown on our website. Construction and finish can change the final price." },
      { question: "Can jeans be tapered as well as shortened?", answer: "Yes, both alterations can be assessed together so the finished leg shape remains balanced." },
      { question: "Can you adjust the waist?", answer: "Many trousers and jeans allow a waist adjustment. The available seam allowance and construction determine what is possible." }
    ]
  },
  {
    slug: "zip-repairs-galway",
    shortName: "Zip repairs",
    title: "Zip Repairs & Replacement Galway | Koko Atelier",
    description: "Zip repairs and replacement in Galway for trousers, dresses, skirts, jackets and coats, assessed in person at Koko Atelier.",
    heading: "Zip repairs and replacement in Galway",
    intro: [
      "A zip problem does not always mean the whole garment needs replacing. The slider, teeth, stitching and surrounding fabric should be checked to identify the appropriate repair.",
      "Koko Atelier assesses zip issues on trousers, dresses, skirts, jackets and coats in Galway. We confirm whether a repair or full replacement is suitable after examining the garment."
    ],
    image: "/images/services/coats-jackets.png",
    imageAlt: "Coat zip being checked for repair at Koko Atelier Galway",
    services: ["Trouser zip replacement", "Dress and skirt zips", "Jacket zip replacement", "Coat zip replacement", "Loose zip stitching", "Fastening and surrounding seam repairs"],
    preparation: ["Bring the complete garment so the zip length and construction can be checked.", "Do not force a jammed slider, as this may damage the surrounding fabric.", "Point out any other damage near the fastening during assessment."],
    faqs: [
      { question: "Can every broken zip be repaired?", answer: "Not always. Some faults can be repaired, while damaged teeth or tape may require a complete replacement." },
      { question: "Do you replace coat and jacket zips?", answer: "Yes, subject to an in-person assessment of the zip, garment construction and surrounding fabric." },
      { question: "How much does zip replacement cost?", answer: "Guide prices vary by garment. We confirm the final price after checking the zip length, type and installation required." }
    ]
  }
];

export const servicePaths = servicePages.map(({ slug }) => `/${slug}/`);

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
