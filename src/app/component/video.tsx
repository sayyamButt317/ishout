import Image from "next/image";
export default function Video() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        src="/assets/chat-ishout.gif"
        alt="chat"
        unoptimized={true}
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-2xl"
        priority
      />
    </div>
  );
}
