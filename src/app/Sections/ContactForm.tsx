"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FormContactType,
  contactSchema,
} from "../Schemas/ContactFormSchema";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Handshake, Heart, Mail, PhoneCall } from "lucide-react";
import { useState } from "react";
import { PiTelegramLogo, PiWhatsappLogo } from "react-icons/pi";
import { OS, useOs } from "@mantine/hooks";
import { useToast } from "@/hooks/use-toast";
import { DateInput, Spinner } from "@nextui-org/react";
import axios from "axios";

export default function ContactForm() {
  const { toast } = useToast();
  const [contactType, setContactType] =
    useState<FormContactType["contactType"]>("email");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormContactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactType: "email",
      contact: {
        contactType: "email",
        contact: "",
      },
    },
  });

  const os: OS = useOs();
  const isOnPhone = os === "android" || os === "ios" || os === "undetermined";

  const handleContactTypeSelection = (type: FormContactType["contactType"]) => {
    setContactType(type);
    setValue("contactType", type);

    // Limpiar el campo de contacto cuando se cambia el tipo
    setValue("contact", { contactType: type, contact: "" });
  };

  const onSubmit = async (data: FormContactType) => {
    try {
      // Simular envío del formulario
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Send to API
      const response = await axios
        .post("/api/send", data)
        .then((res: any) => res.data)
        .catch((error: any) => {});

      // Toast
      toast({
        title: "Formulario enviado",
        description: (
          <span className="">
            Gracias por confiar en nosotros{" "}
            <Heart className="inline-block text-secondary" size={18} />. Nos
            pondremos en contacto contigo lo antes posible!
          </span>
        ),
      });
    } catch (error) {}
  };

  const getContactInputProps = () => {
    switch (contactType) {
      case "telegram":
        return {
          placeholder: "Ingresa tu @usuario",
          type: "text",
        };
      case "email":
        return {
          placeholder: "Ingrese su correo electrónico",
          type: "email",
        };
      case "phoneNumber":
        return {
          placeholder: "Ingrese su número de teléfono",
          type: "tel",
        };
      case "whatsapp":
        return {
          placeholder: "Ingrese su número de WhatsApp",
          type: "tel",
        };
    }
  };

  return (
    <div
      id="FormContact"
      className=" items-center h-[88vh] lg:h-[90vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
    >
      <div className="hidden  overflow-hidden lg:flex justify-center items-center w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960"
          alt="Computadora de escritorio mostrando mockups para smartphone"
          className="object-cover w-full h-full"
        />
        {/* <video autoPlay loop muted playsInline className=" object-cover">
          <source
            src="https://res.cloudinary.com/dhq5ewbyu/video/upload/v1731596491/Bit-A/videos/u9jlw2sbas6ycszncxut.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el tag de video.
        </video> */}
      </div>
      <div className="w-full h-[60vh] md:h-[88vh] flex flex-col justify-center items-center p-2 md:p-8 sm:flex-1 ">
        <div className="mb-6 flex flex-col items-center justify-center">
          <h3 className="text-5xl font-bold mb-2">Hablanos de tu proyecto</h3>
          <p className="text-lg text-gray-600">
            Completa el formulario y nos pondremos en contacto
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ingrese su nombre:</Label>
            <Input
              id="name"
              type="text"
              placeholder="¿Cuál es su nombre?"
              className={errors.name ? "border-red-500" : ""}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Elija un método de contacto:</Label>
            <div className="flex gap-2 mb-2 flex-wrap justify-center">
              {(
                [
                  "email",
                  "telegram",
                  "phoneNumber",
                  "whatsapp",
                ] as FormContactType["contactType"][]
              ).map((type) => (
                <Button
                  key={type}
                  type="button"
                  size={!isOnPhone ? "lg" : "default"}
                  variant={contactType === type ? "default" : "outline"}
                  onClick={() => handleContactTypeSelection(type)}
                >
                  {type === "email" && (
                    <span className="flex space-x-1 items-center justify-center">
                      <Mail size={15} />
                      <span>Email</span>
                    </span>
                  )}
                  {type === "telegram" && (
                    <span className="flex space-x-1 items-center justify-center">
                      <PiTelegramLogo size={15} />
                      <span>Telegram</span>
                    </span>
                  )}
                  {type === "phoneNumber" && (
                    <span className="flex space-x-1 items-center justify-center">
                      <PhoneCall size={15} />
                      <span>Teléfono</span>
                    </span>
                  )}
                  {type === "whatsapp" && (
                    <span className="flex space-x-1 items-center justify-center">
                      <PiWhatsappLogo size={15} />
                      <span>WhatsApp</span>
                    </span>
                  )}
                </Button>
              ))}
            </div>

            <Input
              id="contact"
              {...register("contact.contact")}
              {...getContactInputProps()}
              className={errors.contact?.contact ? "border-red-500" : ""}
              type="text"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.contact?.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size={"lg"}
            disabled={isSubmitting}
            className="w-full "
          >
            {isSubmitting ? "Enviando..." : "Discutir el proyecto"}
            <ArrowUpRight className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
