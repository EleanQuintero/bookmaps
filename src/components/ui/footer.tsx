"use client";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-8 text-center text-sm bg-background text-primary">
      <span suppressHydrationWarning>
        &copy; {new Date().getFullYear()} BookMaps. All rights reserved.
      </span>
    </footer>
  );
}
