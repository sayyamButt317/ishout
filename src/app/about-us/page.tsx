'use client';
import Header from '../component/header';
import Footer from '../component/landingPage/footer';
import LogoFooter from '../component/logo-footer';
import CustomButton from '../component/button';
import Image from 'next/image';

const edgeItems = [
  {
    title: 'AI Powered Precision',
    description:
      'We use advanced algorithms to match brands with influencers who deliver measurable impact.',
  },
  {
    title: 'Speed at Scale',
    description:
      'Manage hundreds of collaborations, approvals, and reports effortlessly through automation.',
  },
  {
    title: 'Full Transparency',
    description:
      'Every decision backed by data, every outcome tracked in real time.',
  },
  {
    title: 'Proven Expertise',
    description: 'Trusted by over 600 brands across the GCC and beyond.',
  },
];

const stats = [
  { value: '600+', label: 'Brands Served' },
  { value: '10M+', label: 'GCC Reach' },
  { value: '1,000+', label: 'Collaborations' },
  { value: '3x', label: 'Avg. Engagement Lift' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden text-white font-family-poppins" style={{ background: 'linear-gradient(180deg, #000000 0%, #000000 30%, #060d1f 55%)' }}>
      <Header />

      {/* ─── Hero Banner ─── */}
      <section className="relative w-full flex flex-col items-center pt-40 pb-20 overflow-hidden">
        {/* Reuse the same vector decorations from home */}
        <Image
          src="https://ik.imagekit.io/dtdxnyskk/leftVector.svg"
          alt="leftVector"
          unoptimized={true}
          loading="lazy"
          width={800}
          height={800}
          className="absolute left-0 top-0 h-full w-auto object-contain pointer-events-none opacity-50"
        />
        <Image
          src="https://ik.imagekit.io/dtdxnyskk/rightVector.svg"
          alt="rightVector"
          unoptimized={true}
          loading="lazy"
          width={800}
          height={800}
          className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none opacity-50"
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 gap-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#ff3b8d] border border-[#ff3b8d]/30 rounded-full px-4 py-1">
            About iShout
          </span>
          <h1 className=" text-6xl font-extrabold text-transparent tracking-wide bg-clip-text bg-linear-to-r from-[#ff3b8d]  to-[#1e3a6e] italic">
            The Next Era of Influencer
            <br />
            Marketing is Intelligent.
            <br/>
          </h1>
          <p className="text-sm md:text-base italic font-thin text-slate-300 max-w-xl">
            iShout Media empowers brands to run high-performing influencer
            campaigns seamlessly, at scale. Our AI-driven platform handles
            discovery, workflow, and reporting — so you can focus on impact.
          </p>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-[#060e24]/60 border border-[#1e3a6e]/50 rounded-2xl py-6 px-4 backdrop-blur-sm hover:border-[#ff3b8d]/40 transition-all duration-300"
            >
              <span className="text-3xl md:text-4xl font-extrabold italic text-transparent bg-clip-text bg-linear-to-br from-[#ff3b8d] to-pink-200">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 mt-1 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Who We Are ─── */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* subtle glow blob */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#ff3b8d]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: Network graphic placeholder */}
          <div className="flex-1 flex justify-center items-center">
            {/* Central hub node diagram mirroring screenshot */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* center node */}
              <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-linear-to-br from-[#ff3b8d] to-pink-700 flex items-center justify-center shadow-[0_0_40px_rgba(255,59,141,0.5)] z-10">
                <span className="text-white font-extrabold text-xl italic">iShout</span>
              </div>
              {/* orbit avatars */}
              {[
                { top: '0%', left: '50%', transform: 'translate(-50%,-50%)', src: 'https://i.pinimg.com/736x/b7/90/03/b79003ab7751ba11eedc4893d6662152.jpg' },
                { top: '50%', left: '0%', transform: 'translate(-50%,-50%)', src: 'https://i.pinimg.com/1200x/05/91/59/059159f1e6aa19a3922f97ee2b24b767.jpg' },
                { top: '50%', left: '100%', transform: 'translate(-50%,-50%)', src: 'https://i.pinimg.com/1200x/ad/b7/c0/adb7c05989e01d03fd74d78c502fbd4e.jpg' },
                { top: '100%', left: '25%', transform: 'translate(-50%,-50%)', src: 'https://i.pinimg.com/1200x/22/47/ec/2247ecb27fd7d8fb55bdc6c7a6bdb3b3.jpg' },
                { top: '100%', left: '75%', transform: 'translate(-50%,-50%)', src: 'https://i.pinimg.com/1200x/ed/6a/e9/ed6ae9e8e16362fe61ba02ffa1d877ca.jpg' },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-30 h-30 rounded-full border-2 border-primarytext/60 overflow-hidden"
                  style={{ top: pos.top, left: pos.left, transform: pos.transform }}
                >
                  <Image
                    src={pos.src}
                    alt={`influencer-${i + 1}`}
                    width={48}
                    height={48}
                    unoptimized={true}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* connecting lines */}
              <svg className="absolute inset-0 md:top-8 md:left-10  w-full h-full" style={{ zIndex: 0 }}>
                {[
                  [144, 144, 144, 0],
                  [144, 144, 0, 144],
                  [144, 144, 288, 144],
                  [144, 144, 72, 288],
                  [144, 144, 216, 288],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#ff3b8d"
                    strokeOpacity="0.2"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Right: text */}
          <div className="flex-1 flex flex-col gap-6 text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold italic text-transparent bg-clip-text bg-linear-to-r from-[#ff3b8d] to-pink-300">
              Who We Are
            </h2>
            <p className="text-sm md:text-base italic font-light text-slate-300 leading-relaxed">
              Founded in Dubai, iShout Media is a next-generation influencer
              marketing agency built at the intersection of creativity and
              technology.
            </p>
            <p className="text-sm md:text-base italic font-light text-slate-300 leading-relaxed">
              We combine human strategy with artificial intelligence to help
              brands reach audiences with unmatched precision and speed.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* blue ambient glow */}
        <div className="absolute left-0 w-96 h-96 bg-[#1a3a8f]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        {[
          {
            label: 'Our Mission',
            text: 'To make influencer marketing predictable, scalable, and data-driven — helping brands activate thousands of collaborations with the efficiency of one click.',
          },
          {
            label: 'Our Vision',
            text: 'To redefine how brands build influence, turning what used to be a manual, fragmented process into an intelligent, results-driven system powered by AI.',
          },
        ].map((card) => (
          <div
            key={card.label}
            className="relative rounded-2xl border border-[#1e3a6e]/50 bg-[#060e24]/50 backdrop-blur-sm p-8 overflow-hidden group hover:border-[#ff3b8d]/40 transition-all duration-300"
          >
            {/* blue corner glow */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#1a3a8f]/15 rounded-full blur-2xl pointer-events-none" />
            {/* pink corner glow */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ff3b8d]/10 rounded-full blur-2xl group-hover:bg-[#ff3b8d]/20 transition-all duration-500 pointer-events-none" />
            <h3 className="text-2xl font-extrabold italic text-transparent bg-clip-text bg-linear-to-r from-[#ff3b8d] to-pink-300 mb-4">
              {card.label}
            </h3>
            <p className="text-sm md:text-base italic font-light text-slate-300 leading-relaxed">
              {card.text}
            </p>
          </div>
        ))}
      </section>

      {/* ─── Our Edge ─── */}
    
      <div className="relative w-full overflow-hidden" >
        <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold italic text-transparent bg-clip-text bg-linear-to-r from-[#ff3b8d] to-pink-300 mb-10 text-center">
          Our Edge
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {edgeItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-[#1e3a6e]/60 backdrop-blur-sm p-6 hover:border-[#ff3b8d]/40 hover:bg-[#112040]/80 transition-all duration-300 group"
            >
              {/* numbered badge */}
              <CustomButton className="w-8 h-8 rounded-full bg-[#ff3b8d]/20 border border-[#ff3b8d]/40 flex items-center justify-center text-[#ff3b8d] text-sm font-bold p-0 pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </CustomButton>
              <h4 className="text-base font-bold italic text-white group-hover:text-[#ff3b8d] transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-xs italic font-light text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        </section>
      </div>

      <Footer />
      <LogoFooter />
    </div>
  );
}