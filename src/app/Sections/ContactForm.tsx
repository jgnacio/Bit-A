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
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

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
    setValue("contact", { contactType: type, contact: "" });
  };

  const buttonVariants = {
    selected: {
      scale: [1, 0.95, 1.05, 1],
      transition: {
        duration: 0.8,
        times: [0, 0.1, 0.4, 1],
      },
    },
    unselected: {
      scale: 1,
      opacity: 0.9,
      transition: {
        duration: 0.3,
        times: [0, 0.2, 0.5, 1],
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: {
      scale: 0.95,
    },
  };
  const submitButtonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    hover: {
      scale: 1.02,
      boxShadow: [
        "0px 0px 0px rgba(0, 0, 0, 0)",
        "0px 5px 15px rgba(0, 0, 0, 0.2)",
      ],
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.1,
      },
    },
    loading: {
      scale: [1, 0.98, 1],
      boxShadow: [
        "0px 0px 0px rgba(0, 0, 0, 0.1)",
        "0px 3px 8px rgba(0, 0, 0, 0.2)",
        "0px 0px 0px rgba(0, 0, 0, 0.1)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
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

      // Send GA Event
      sendGAEvent({
        event: "form_submit",
        value: 1,
      });

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
      className="items-center h-[88vh] lg:h-[90vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
    >
      <div className="hidden overflow-hidden lg:flex justify-center items-center w-full h-full">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960"
          alt="Computadora de escritorio mostrando mockups para smartphone"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full h-[60vh] md:h-[88vh] flex flex-col justify-center items-center p-2 md:p-8 sm:flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col items-center justify-center"
        >
          <h3 className="text-5xl font-bold mb-2">Hablanos de tu proyecto</h3>
          <p className="text-lg text-gray-600">
            Completa el formulario y nos pondremos en contacto
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-lg"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Ingrese su nombre:</Label>
            <Input
              id="name"
              type="text"
              placeholder="¿Cuál es su nombre?"
              className={errors.name ? "border-red-500" : ""}
              {...register("name")}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label>Elija un método de contacto:</Label>
            <div className="flex gap-1 mb-2 flex-wrap justify-center w-full ">
              {(
                [
                  "email",
                  "telegram",
                  "phoneNumber",
                  "whatsapp",
                ] as FormContactType["contactType"][]
              ).map((type) => (
                <motion.div
                  key={type}
                  initial="unselected"
                  animate={contactType === type ? "selected" : "unselected"}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <Button
                    type="button"
                    size={!isOnPhone ? "lg" : "default"}
                    variant={contactType === type ? "default" : "outline"}
                    onClick={() => handleContactTypeSelection(type)}
                    className="relative"
                  >
                    {type === "email" && (
                      <motion.span
                        className="flex space-x-1 items-center justify-center"
                        whileHover="hover"
                      >
                        <Mail size={15} />
                        <span>Email</span>
                      </motion.span>
                    )}
                    {type === "telegram" && (
                      <motion.span
                        className="flex space-x-1 items-center justify-center"
                        whileHover="hover"
                      >
                        <PiTelegramLogo size={15} />
                        <span>Telegram</span>
                      </motion.span>
                    )}
                    {type === "phoneNumber" && (
                      <motion.span
                        className="flex space-x-1 items-center justify-center"
                        whileHover="hover"
                      >
                        <PhoneCall size={15} />
                        <span>Teléfono</span>
                      </motion.span>
                    )}
                    {type === "whatsapp" && (
                      <motion.span
                        className="flex space-x-1 items-center justify-center"
                        whileHover="hover"
                      >
                        <PiWhatsappLogo size={15} />
                        <span>WhatsApp</span>
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                id="contact"
                {...register("contact.contact")}
                {...getContactInputProps()}
                className={errors.contact?.contact ? "border-red-500" : ""}
                type="text"
              />
              <AnimatePresence>
                {errors.contact && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.contact.contact?.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            variants={submitButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isSubmitting ? "loading" : "initial"}
          >
            <Button
              type="submit"
              size={"lg"}
              disabled={isSubmitting}
              className="w-full transition-none"
            >
              {isSubmitting ? "Enviando..." : "Discutir el proyecto"}
              <ArrowUpRight className="ml-2" />
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
