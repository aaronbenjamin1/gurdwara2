import Navbar from "@/components/Navbar";
import LivePlayer from "@/components/LivePlayer";

export const metadata = {
  title: "Watch Live — Gurdwara Nanaksar Fresno",
  description: "Watch live kirtan and past broadcasts from Gurdwara Nanaksar Fresno.",
};

export default function LivePage() {
  return (
    <>
      <Navbar />
      <LivePlayer />
    </>
  );
}
