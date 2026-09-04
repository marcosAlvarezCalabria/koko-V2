"use client";

import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { priceGroups } from "@/data/site";

export function Prices() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const activationPointer = useRef<string | null>(null);

  return (
    <section id="prices" className="section-padding">
      <div className="container-page">
        <h2 className="text-3xl font-semibold md:text-4xl">Guide prices</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Guide prices — your final quote is confirmed in person after a fitting.
        </p>

        <div className="mt-10 grid items-start gap-5 md:grid-cols-2">
          {priceGroups.map((group, index) => {
            const isOpen = openCategory === group.category;
            const panelId = `price-group-${index}`;

            return (
              <article
                key={group.category}
                className="overflow-hidden rounded-2xl border bg-white transition-colors hover:border-brand-200"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    setOpenCategory(group.category);
                  }
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") {
                    setOpenCategory((current) =>
                      current === group.category ? null : current
                    );
                  }
                }}
              >
                <h3>
                  <button
                    type="button"
                    className="flex min-h-20 w-full items-center justify-between gap-4 bg-brand-50 px-5 py-4 text-left text-brand-900 outline-none transition-colors hover:bg-brand-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onPointerDown={(event) => {
                      activationPointer.current = event.pointerType;
                    }}
                    onClick={() => {
                      if (activationPointer.current === "mouse") {
                        setOpenCategory(group.category);
                      } else {
                        setOpenCategory((current) =>
                          current === group.category ? null : group.category
                        );
                      }

                      activationPointer.current = null;
                    }}
                  >
                    <span>
                      <span className="block text-xl font-semibold">
                        {group.category}
                      </span>
                      <span className="mt-1 block text-sm font-normal text-brand-700">
                        {group.items.length} guide prices
                      </span>
                    </span>
                    <ChevronDown
                      className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="divide-y">
                      {group.items.map((item) => (
                        <div
                          key={item.service}
                          className="flex items-center justify-between gap-4 p-5"
                        >
                          <span>{item.service}</span>
                          <strong className="shrink-0 text-brand-900">
                            {item.price}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
