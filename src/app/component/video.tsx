import Image from "next/image";
export default function Video() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        src="https://ik.imagekit.io/dtdxnyskk/chat-ishout.gif"
        alt="chat"
        unoptimized={true}
        width={400}
        height={400}
        className="w-60 sm:w-70 md:w-55 lg:w-86.25 xl:w-[320px] 2xl:w-112.5 h-auto drop-shadow-2xl transition-opacity duration-700 opacity-100"
        priority
      />
    </div>
  );
}
