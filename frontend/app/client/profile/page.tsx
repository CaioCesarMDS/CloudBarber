"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClientSidebar from "../../_components/ClientSideBar";
import DashboardLayout from "../../_components/DashboardLayout";
import api from "../../services/api";
import { AxiosError } from "axios";
import { toast, Toaster } from "sonner";

const ClientDashboard: React.FC = () => {
  const router = useRouter();

  interface User {
    id: string;
    name: string;
  }

  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem("barber-token");
    if (!token) {
      router.push("/client/signin");
      return;
    }
    
    const fetchUser = async () => {
      try {
        const { data: authData } = await api.get("/auth/me");
        const { data: userData } = await api.get(`/client/${authData.id}`);
        setUser(userData);
        console.log(user)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("Error during get user:", error);
          if (error.status === 400) {
            toast('Erro ao buscar informações do usuário!');
          }
        }
        router.push("/client/signin");
      }
    };

    fetchUser();
  }, [router, user]);

  return (
    <DashboardLayout sidebar={<ClientSidebar />} title="Minha Área">
      <Toaster/>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-barber-blue to-barber-blue-light rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{`Perfil`}</h1>
        </div>
        <div className="bg-gradient-to-r from-barber-blue to-barber-blue-light rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{`Configurações da conta`}</h1>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
