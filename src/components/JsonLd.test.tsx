import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import JsonLd from "./JsonLd";

describe("JsonLd", () => {
  it("renders a JSON-LD script tag", () => {
    const markup = renderToStaticMarkup(<JsonLd data={{ "@type": "TailorShop", name: "Koko" }} />);

    expect(markup).toContain('type="application/ld+json"');
  });

  it("renders compact JSON inside the script tag", () => {
    const data = { "@type": "TailorShop", name: "Koko" };
    const markup = renderToStaticMarkup(<JsonLd data={data} />);

    expect(markup).toContain(JSON.stringify(data));
  });

  it("renders an empty object when data is empty", () => {
    const markup = renderToStaticMarkup(<JsonLd data={{}} />);

    expect(markup).toContain("{}");
  });
});