"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToggleVisibility } from "@/hooks/querys/use-toggle-visibility";

interface ShareMapControlProps {
  mapId: string;
  isPublic: boolean;
}

export function ShareMapControl({ mapId, isPublic }: ShareMapControlProps) {
  const [checked, setChecked] = useState(isPublic);
  const { toggleVisibility, isPending } = useToggleVisibility();

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/share/${mapId}`;

  const handleToggle = async (next: boolean) => {
    setChecked(next);
    try {
      await toggleVisibility({ mapId, isPublic: next });
      toast.success(next ? "Map is now public." : "Map is now private.");
    } catch (error) {
      setChecked(!next); // revert on failure, no stale optimistic state
      toast.error(
        error instanceof Error ? error.message : "Failed to update visibility.",
      );
    }
  };

  const handleCopyLink = async () => {
    if (!navigator?.clipboard) {
      toast.error("Clipboard is not available in this browser.");
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {checked && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Copy className="h-3.5 w-3.5" />
          Copy link
        </Button>
      )}
      <span className="text-muted-foreground text-sm tabular-nums">
        {checked ? "Public" : "Private"}
      </span>
      <Switch
        checked={checked}
        disabled={isPending}
        onCheckedChange={handleToggle}
        aria-label="Toggle public visibility"
      />
    </div>
  );
}
