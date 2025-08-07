"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col gap-10 items-center justify-center">
      <span className="flex gap-10 items-center">
        <h1 className="text-3xl font-bold border-r-2 w-40 h-20 flex justify-center items-center">
          404
        </h1>
        <p className="text-md">This page could not be found</p>
      </span>
      <button
        className="rounded-full p-2 bg-foreground text-white font-semibold w-30 hover:opacity-90"
        onClick={() => router.push("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
