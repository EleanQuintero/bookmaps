"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUsernameAction } from "@/app/actions/profile/profile";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be at most 30 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
});

type UsernameFormValues = z.infer<typeof usernameSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface UsernameSetupModalProps {
  /** Called by the parent once the username has been successfully saved. */
  onUsernameSet: (username: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function UsernameSetupModal({
  onUsernameSet,
}: UsernameSetupModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
  });

  async function onSubmit(values: UsernameFormValues) {
    setIsSubmitting(true);

    try {
      const result = await setUsernameAction(values.username);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Username set successfully!");
      onUsernameSet(result.username);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    // `open` is always true and we intentionally omit `onOpenChange`
    // so the modal cannot be closed by pressing Escape or clicking outside.
    <Dialog open>
      <DialogContent
        // Prevent dismissal via Escape key or outside click.
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        // Hide the default close button so the user cannot dismiss the modal.
        showCloseButton={false}
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Welcome to BookMap!</DialogTitle>
          <DialogDescription>
            Before you continue, please choose a username. This cannot be
            changed later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-2 text-white ">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="e.g. bookworm_42"
              autoComplete="off"
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username")}
            />
            {errors.username && (
              <p
                id="username-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Continue"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
