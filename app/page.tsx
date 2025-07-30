import ProgramSearchBar from "@/components/ProgramSearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-full flex flex-1 justify-center items-center">
      <div className="relative p-3">
        <h1 className="font-extrabold text-5xl text-shadow-lg z-10">
          <span className="text-mcgill-red">Plan</span> Your Degree
        </h1>

        <ProgramSearchBar />
        <Image
          src="/mcgill-martlet.png"
          width={300}
          height={250}
          alt="McGill Martlet"
          className="absolute -left-35 -bottom-22"
        />
      </div>
    </div>
  );
}
