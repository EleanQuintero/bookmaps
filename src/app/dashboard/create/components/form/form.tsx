"use client";

import {
  GeneratorSchema,
  type GeneratorValues,
} from "@/app/dashboard/create/schema/generator.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputForm from "@/app/dashboard/create/components/form/inputForm";

export const GenerateForm = () => {
  function send(data: GeneratorValues) {
    console.log(data);

    const error = false;

    if (error) {
      const result = { success: false, error: { message: "error" } };

      return result;
    }

    const result = { success: true, error: null };
    return result;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneratorValues>({
    resolver: zodResolver(GeneratorSchema),
    defaultValues: {
      theme: "",
    },
  });

  const onSubmit: SubmitHandler<GeneratorValues> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await send(data);

      if (result.error) {
        setSubmitStatus({
          type: "error",
          message: result.error.message,
        });
      } else {
        setSubmitStatus({
          type: "success",
          message: "Bookmap creado revisa tus mapas",
        });
        reset();
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 1500);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Error al enviar el mensaje. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
        <InputForm
          name="theme"
          control={control}
          placeholder="e.g., 'Quantum Physics', 'Stoic Philosophy', 'Machine Learning'..."
          type="text"
          error={errors.theme}
        />

        <Button
          type="submit"
          className="w-full h-12 font-semibold shadow-md"
          size="lg"
          disabled={isSubmitting}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {isSubmitting ? "Enviando Datos..." : "Generar BookMap"}
        </Button>

        {submitStatus.type && (
          <div
            className={`p-2 rounded-md ${
              submitStatus.type === "success"
                ? "bg-background text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>
    </form>
  );
};
