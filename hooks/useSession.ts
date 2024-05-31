"use client";

import useSalon from "@/store/useSalon";
import { useEffect, useState } from "react";

const useSession = () => {
  const [session, setSession] = useState(null);
  const { salonId } = useSalon();

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
      });
  }, [salonId]);

  return session;
};

export default useSession;
