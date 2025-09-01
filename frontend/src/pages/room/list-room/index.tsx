import { Link } from "react-router-dom";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { httpClient } from "../../../services/api/api-client";
import { Loading } from "../../../components/loading";

export const ListRoom = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await httpClient({
          method: "GET",
          endpoint: "/rooms",
        });
        setRoomsData(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="relative p-5 pb-[150px] ">
      <Link to={`/comodos/novo`}>
        <ActionButton icon="plus" />
      </Link>
      <h1 className="text-center text-2xl font-bold">Cômodos</h1>

      {!loading ? (
        <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
          {roomsData.map((room: any) => (
            <Link to={`/comodos/${room.id}`} key={room.id}>
              <Card title={room.name} icon={room.icon} />
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
