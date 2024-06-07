import Image from "next/image";
import HomeComponent from "../components/Home";

export default function Home() {
  return (
    <main className="">
      <div className="relative">
        <img src="/banner.jpg" alt="" className="w-full h-[70vh]" />

        <div className="absolute top-0 left-0 right-0 bottom-0 w-full ">
          <HomeComponent />
        </div>
      </div>

    </main>
  );
}
