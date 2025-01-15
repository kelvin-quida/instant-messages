"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Home() {
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
    <main className="flex justify-center  w-full">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
        <h1 className="text-4xl font-bold mb-8">Study Docs</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="mb-4">
            <li className="border-b border-gray-300 py-2">
              <a href="/docs" className="text-blue-500 hover:underline">
                JavaScript
              </a>
            </li>
            <li className="border-b border-gray-300 py-2">Node</li>
            <li className="border-b border-gray-300 py-2">Socket.io</li>
          </ul>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Documento..."
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Adicionar documento
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
