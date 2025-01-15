"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function Docs() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Documento sem título
        </h1>

        <textarea
          className="w-full h-64 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escreva aqui..."
        ></textarea>

        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Voltar
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
