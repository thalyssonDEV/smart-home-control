import { Link } from "react-router-dom";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { httpClient } from "../../../services/api/api-client";

export const ListRoom = () => {
  const [roomsData, setRoomsData] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await httpClient({
          method: "GET",
          endpoint: "/rooms",
        });
        setRoomsData(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return roomsData && roomsData.length > 0 ? (
    <div className="relative p-5 pb-[150px] ">
      <Link to={`/comodos/novo`}>
        <ActionButton icon="plus" />
      </Link>
      <h1 className="text-center text-2xl font-bold">Cômodos</h1>

      <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
        {roomsData.map((room: any) => (
          <Link to={`/comodos/${room.id}`} key={room.id}>
            <Card title={room.name} icon={room.icon} />
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500">Nenhum cômodo encontrado</div>
  );
};
const roomsMock = [
  {
    id: 7,
    name: "Sala de Estar",
    icon: "fa-couch",
  },
  {
    id: 8,
    name: "Cozinha",
    icon: "fa-utensils",
  },
  {
    id: 9,
    name: "Quarto Principal",
    icon: "fa-bed",
  },
  {
    id: 10,
    name: "Escritório",
    icon: "fa-laptop",
  },
  {
    id: 11,
    name: "Varanda",
    icon: "fa-umbrella-beach",
  },
  {
    id: 12,
    name: "Lavanderia",
    icon: "fa-soap",
  },
  {
    id: 13,
    name: "Quarto 3",
    icon: "fa-bed",
  },
  {
    id: 14,
    name: "Sala de Estar",
    icon: "fa-couch",
  },
  {
    id: 15,
    name: "Cozinha",
    icon: "fa-utensils",
  },
  {
    id: 16,
    name: "Quarto Principal",
    icon: "fa-bed",
  },
  {
    id: 17,
    name: "Escritório",
    icon: "fa-laptop",
  },
  {
    id: 18,
    name: "Varanda",
    icon: "fa-umbrella-beach",
  },
  {
    id: 19,
    name: "Lavanderia",
    icon: "fa-soap",
  },
  {
    id: 20,
    name: "Quarto 3",
    icon: "fa-bed",
  },
];
