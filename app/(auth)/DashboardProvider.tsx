"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Salon } from "@/types/salon.types";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { switchSalonAction } from "@/actions/salon.actions";
import useSession from "@/hooks/useSession";
import useSalon from "@/store/useSalon";
import Link from "next/link";
import useSalons from "@/store/useSalons";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);
  const { salonId, switchSalon: switchSalonStore } = useSalon();
  const [modulesRoutes, setModulesRoutes] = useState([
    {
      url: "/technique",
      name: "Technique",
      appCode: "TECH",
    },
    {
      url: "/rendez-vous",
      name: "Rendez-vous",
      appCode: "RDV",
    },
    {
      url: "/planity",
      name: "Planity",
      appCode: "PLAN",
    },
    {
      url: "/caisse-web",
      name: "Caisse Web",
      appCode: "CWEB",
    },
    {
      url: "/exploitation",
      name: "Exploitation",
      appCode: "EXPL",
    },
    {
      url: "/encaissement",
      name: "Encaissement",
      appCode: "ENCA",
    },
  ]);
  const data = useSession();
  const { salons } = useSalons();
  console.log(data);

  const switchSalon = async (e: DropdownChangeEvent) => {
    switchSalonStore(e.value);
    const res = await switchSalonAction({ salonId: e.value });
    console.log(e.value);
  };

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        content={({ closeIconRef, hide }) => (
          <>
            <Dropdown
              optionLabel="name"
              optionValue="code"
              options={salons.map((salon) => ({
                code: salon.key,
                name: salon.owner,
              }))}
              value={salonId}
              onChange={switchSalon}
            />
            {modulesRoutes.map((route) => {
              const monBonGrosSalon = salons.find(
                (salon) => salon.key === salonId
              );
              const maBonneGrosseApplication =
                monBonGrosSalon?.applications.find(
                  (app) => app.appCode === route.appCode
                );
              console.log(maBonneGrosseApplication);
              console.log(salonId);

              if (!maBonneGrosseApplication) return <></>;
              return (
                <div
                  key={route.url}
                  className="flex align-items-center justify-content-between"
                >
                  <Link href={route.url}>
                    <p>{route.name}</p>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      ></Sidebar>
      {children}
    </div>
  );
}
