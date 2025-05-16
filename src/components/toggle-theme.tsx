"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled={true}>
        {dark ? (
          <Sun className="hover:cursor-pointer hover:text-primary" />
        ) : (
          <Moon className="hover:cursor-pointer hover:text-primary" />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setDark(!dark);
        if (dark) setTheme("dark");
        else setTheme("light");
      }}
    >
      {dark ? (
        <Sun className="hover:cursor-pointer hover:text-primary" />
      ) : (
        <Moon className="hover:cursor-pointer hover:text-primary" />
      )}
    </Button>
  );
}
