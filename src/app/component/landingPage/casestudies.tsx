import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

export default function CaseStudies() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div>
      <div className="w-full h-full py-20">
        <h2 className="italic text-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Case Studies
        </h2>
        <p className="italic mt-4 text-center justify-center items-center text-neutral-600 dark:text-neutral-400 text-base md:text-md font-sans max-w-2xl mx-auto">
          <span className="font-bold">Proven Results at Scale,</span>
          <span className="font-thin justify-center items-center">
            We &apos;ve helped over 600 brands amplify their reach and
            performance with <span className="font-bold">AI-powered </span>
            influencers. marketing
          </span>
        </p>
      </div>
      <h1 className="italic text-center md:text-md font-thin text-3xl text-neutral-800 dark:text-neutral-200 font-sans">
        3x engagment in 2 weeks
      </h1>
      <Carousel items={cards} />
    </div>
  );
}
const DummyContent = () => {
  return (
    <>
      {/* {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
              alt="Macbook"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })} */}
    </>
  );
};
const data = [
  {
    src: "https://player.mux.com/D02cP4j3co3kKHKblLVggJOqgfjjzFnkoIONnHKybyXM",
    content: <DummyContent />,
  },
  {
    src: "https://i.pinimg.com/1200x/4c/96/bf/4c96bf14c3160921d974a396c2895d00.jpg",
    content: <DummyContent />,
  },
  {
    src: "https://i.pinimg.com/736x/2d/6c/46/2d6c46163cbf800a7a1c50e200c4b9bc.jpg",
    content: <DummyContent />,
  },

  {
    src: "https://i.pinimg.com/736x/54/cb/90/54cb905e95b01e1e30813e69f7d52bc7.jpg",
    content: <DummyContent />,
  },
  {
    src: "https://i.pinimg.com/1200x/3a/af/69/3aaf69f8efe7267914181a8b4f941256.jpg",
    content: <DummyContent />,
  },
  {
    src: "https://i.pinimg.com/1200x/3f/c0/dc/3fc0dcb3f10aaba24d14fab6f516ac65.jpg",
    content: <DummyContent />,
  },
];
