import SceneFooter from "@/components/Scenes/SceneFooter";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "@nextui-org/react";
export default function Footer() {
  const date = new Date();
  return (
    <footer className="w-full h-72 bg-black relative flex justify-start items-center ">
      <div className="absolute px-2 lg:px-8">
        <img
          src="https://res.cloudinary.com/dhq5ewbyu/image/upload/v1731462052/Bit-A/yjcjxgoxffsktr0esmo1.png"
          alt="Bit-A Desarrollo Web"
          className="w-[15rem] mb-5 "
        ></img>
        <p className="text-background text-xs">
          &copy; {date.getFullYear()} Bit-A. Todos los derechos reservados
        </p>
      </div>
      <SceneFooter />

      <a className="absolute bottom-5 left-8  underline " href="#home">
        <Button variant={"outline"}>Ir al inicio</Button>
      </a>
    </footer>
  );
}
