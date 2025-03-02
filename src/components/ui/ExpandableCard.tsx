import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Button from "./Button";
import { Data, Country } from "@/types";

export function ExpandableCardDemo({ countries }: Data) {
  const [active, setActive] = useState<Country | boolean | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const displayedCountries = countries.slice(0, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  src={`https://flagcdn.com/w320/${active.code.toLowerCase()}.png`}
                  alt={active.code}
                  className="w-full h-80 lg:h-60 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.capital}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.capital}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.name}-${id}`}
                    href={`/chat/${active.name}`}
                    // target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Ask AI
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs md:text-sm lg:text-base h-40 md:h-fit md:pb-15 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {/* {typeof active.content === "function"
                      ? active.content()
                      : active.content} */}
                    <h1 className="font-bold">Country Information</h1>

                    <div className="w-full h-0.5 border-t-0 bg-neutral-300 dark:bg-white/10" />

                    <div className="w-full px-2 flex flex-row">
                      <div className="flex-1">
                        <p>Capital : </p>
                        <p className="font-bold">{active.capital || "-"}</p>
                      </div>
                      <div className="flex-1">
                        <p>Continent : </p>
                        <p className="font-bold">{active.continent.name}</p>
                      </div>
                    </div>

                    <div className="w-full px-2 flex flex-row">
                      <div className="flex-1">
                        Currency :
                        <p className="font-bold">{active.currency || "-"}</p>
                      </div>
                      <div className="flex-1">
                        <p>Language : </p>
                        <p className="font-bold">
                          {active.languages[0]?.name || "-"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-screen w-full md:w-1xl gap-6 grid grid-cols-2 lg:grid-cols-3">
        {displayedCountries.map((card: Country) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={`card-${card.name}-${id}`}
            onClick={() => setActive(card)}
            className="ps-0 p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <img
                  src={`https://flagcdn.com/w320/${card.code.toLowerCase()}.png`}
                  alt={card.code}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.capital}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.capital}
                </motion.p>
                <motion.p
                  layoutId={`description-${card.currency}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  Currency: {card.currency || "-"}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.name}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              Details
            </motion.button>
          </motion.div>
        ))}
      </ul>
      {visibleCount < countries.length && (
        <div className="flex justify-center items-center mt-5">
          <Button onClick={handleLoadMore} text="Load More" />
        </div>
      )}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
