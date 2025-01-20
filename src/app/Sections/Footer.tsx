import { Button } from "@/components/ui/button";
export default function Footer() {
  const date = new Date();
  return (
    <footer className="w-full h-[70vh] bg-black relative flex justify-center items-center ">
      <div className="absolute px-2 lg:px-8 flex flex-col justify-center items-center">
        <img
          src="https://res.cloudinary.com/dhq5ewbyu/image/upload/v1736904000/Bit-A_v7_White_avmyet.svg"
          alt="Bit-A Desarrollo Web"
          className="w-[12rem] mb-5 pointer-events-none select-none sm:w-[14rem] md:w-[15rem]"
        ></img>
        <a className="underline" href="#home">
          <Button variant={"outline"}>Ir al inicio</Button>
        </a>
        <p className="text-background text-xs my-6">
          &copy; {date.getFullYear()} Bit-A. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
