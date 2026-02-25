"use client";

import {
  GeneratorSchema,
  type GeneratorValues,
} from "@/app/dashboard/create/schema/generator.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import InputForm from "@/app/dashboard/create/components/form/inputForm";
import { getBookMap } from "@/app/actions/IA/IA";
import { processAndSaveMap } from "@/app/actions/maps/processAndSave";

type GenerationPhase = "idle" | "generating" | "verifying" | "saving" | "done";

const PHASE_PROGRESS: Record<GenerationPhase, number> = {
  idle: 0,
  generating: 15,
  verifying: 60,
  saving: 90,
  done: 100,
};

const PHASE_LABELS: Partial<Record<GenerationPhase, string>> = {
  generating: "Asking the AI librarian…",
  verifying: "Verifying your books…",
  saving: "Building your map…",
};

export const GenerateForm = () => {
  const [phase, setPhase] = useState<GenerationPhase>("idle");
  const router = useRouter();

  const isSubmitting = phase !== "idle";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneratorValues>({
    resolver: zodResolver(GeneratorSchema),
    defaultValues: {
      theme: "",
    },
  });

  const onSubmit: SubmitHandler<GeneratorValues> = async (data) => {
    try {
      setPhase("generating");

      const aiResponse = await getBookMap(data.theme);

      setPhase("verifying");

      const result = await processAndSaveMap(aiResponse);

      setPhase("saving");

      if (result.error) {
        toast.error(result.error);
        setPhase("idle");
        return;
      }

      setPhase("done");
      toast.success("Your bookmap is ready!");
      router.push(`/dashboard/maps/${result.mapId}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setPhase("idle");
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
          className="w-full h-12 font-bold shadow-md"
          size="lg"
          disabled={isSubmitting}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {isSubmitting ? "Looking for books..." : "Call the librarian"}
        </Button>

        {phase !== "idle" && (
          <div className="flex flex-col gap-2 animate-in fade-in duration-300 motion-reduce:animate-none">
            <Progress
              value={PHASE_PROGRESS[phase]}
              className="transition-all duration-700 motion-reduce:transition-none"
            />
            {phase !== "done" && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                {PHASE_LABELS[phase]}
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
};
