"use client";

import { signOut } from "@/app/auth/actions/auth";

interface props {
  user: {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
  };
}

function Dashboard({ user }: props) {
  return (
    <section className="flex flex-col min-h-full items-center justify-center bg-primary-foreground text-primary ">
      <div className="w-full h-full">
        <h1 className="text-4xl font-bold">{`Bienvenido al dashboard ${user?.username}`}</h1>
      </div>
      <section>
        <button onClick={() => signOut()}>Cerrar sesion</button>
      </section>
    </section>
  );
}

export default Dashboard;
