"use client";

import { useUser } from "@stackframe/stack";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const user = useUser();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await user?.signOut();
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return "Not signed in";

  return (
    <Button variant="ghost" onClick={handleSignOut} disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Signing out...
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
}
