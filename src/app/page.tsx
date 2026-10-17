"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      gsap.to(".parallax-bg", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: ".pin-section",
        start: "top top",
        end: "+=1000",
        pin: true,
        scrub: true,
      });
    },
    { scope: container }
  );

  return (
    <SmoothScroll>
      <div ref={container}>
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="reveal text-6xl md:text-8xl font-extrabold tracking-tight">
            Motion Lab
          </h1>
          <p className="reveal mt-6 text-neutral-400 text-lg">
            اسكرول لتحت وشوف الحركة
          </p>
        </section>

        <section className="parallax-section relative h-[80vh] overflow-hidden flex items-center justify-center">
          <div className="parallax-bg absolute inset-0 -top-20 -bottom-20 bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-900" />
          <h2 className="reveal relative text-4xl md:text-6xl font-bold">Parallax</h2>
        </section>

        <section className="pin-section h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <p className="reveal text-3xl md:text-5xl font-semibold max-w-3xl">
              القسم ده بيفضل ثابت وانت بتسكرول
            </p>
          </div>
        </section>

        <section className="reveal min-h-screen flex flex-col items-center justify-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">شبكة عالمية</h2>
          <p className="text-neutral-400 mb-10">نقاط على الكرة تمثل المدن اللي بنشتغل فيها</p>
          <Globe />
        </section>

        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <h2 className="reveal text-4xl md:text-6xl font-bold mb-4">الخريطة</h2>
          <p className="text-neutral-400 mb-10">اضغط على أي علامة عشان تشوف التفاصيل</p>
          <div className="w-full max-w-4xl">
            <MapView />
          </div>
        </section>

        <section className="h-screen flex items-center justify-center px-6">
          <h2 className="reveal text-4xl md:text-6xl font-bold text-center">النهاية</h2>
        </section>
      </div>
    </SmoothScroll>
  );
}