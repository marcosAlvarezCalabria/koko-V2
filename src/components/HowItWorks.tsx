const steps = [
  ["01", "Message us", "Send us a WhatsApp with a photo and a few details about your garment."],
  ["02", "We reply with a guide price", "We confirm what's possible and give you an estimated price."],
  ["03", "Visit the studio", "Bring the garment to Corbett Court for a fitting and final confirmation."]
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-page">
        <h2 className="text-3xl font-semibold md:text-4xl">How it works</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(([number, title, description]) => (
            <div key={number}>
              <span className="text-sm font-semibold text-brand-600">{number}</span>
              <h3 className="mt-3 text-xl font-medium">{title}</h3>
              <p className="mt-2 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
