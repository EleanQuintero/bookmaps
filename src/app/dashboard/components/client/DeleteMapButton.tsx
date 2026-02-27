"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteMapById } from "@/app/actions/maps/deleteMap";

interface DeleteMapButtonProps {
  mapId: string;
}

export function DeleteMapButton({ mapId }: DeleteMapButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteMapById(mapId);
      if (result.success) {
        toast.success("Map deleted successfully.");
        router.push("/dashboard/maps");
      } else {
        toast.error(result.error ?? "Failed to delete map. Please try again.");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="w-4 h-4 mr-2" />
      {isPending ? "Deleting..." : "Delete Map"}
    </Button>
  );
}
