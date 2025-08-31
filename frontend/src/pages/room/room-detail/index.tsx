import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../../insfrastructure/fetch-data";
import { Card } from "../../../components/card";
import { ActionButton } from "../../../components/action-button";

export const RoomDetail = () => {
  const params = useParams<{ id: string }>();
  const roomId = params.id;

  const [roomData, setRoomData] = useState<any>(null);
  const [roomsDevicesData, setRoomsDevicesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomsResponse = await fetchData({
          endpoint: `/rooms/${roomId}/`,
        });

        setRoomData(roomsResponse);

        const roomsDevicesResponse = await fetchData({
          endpoint: `/devices/?room=${roomId}`,
        });
        setRoomsDevicesData(roomsDevicesResponse);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, []);

  console.log(roomData);
  console.log(roomsDevicesData);

  return (
    <div>
      {roomData && (
        <div className="relative p-4">
          <Link
            to={`/comodos/novo`}
            className="absolute top-4 right-4"
            state={{ roomData, roomsDevicesData }}
          >
            <ActionButton icon="edit" />
          </Link>
          <h1 className="text-center text-2xl font-bold min-h-[4rem]">
            {roomData.icon && (
              <div
                className={`flex justify-center items-center bg-primary p-4 rounded-md w-full `}
              >
                <i className={`fa-solid ${roomData.icon} text-2xl`}></i>
              </div>
            )}
            {roomData.name}
          </h1>
          <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
            {roomsDevicesData.map((device) => (
              <Card
                key={device.id}
                title={device.name}
                icon={device.icon}
                showStatus={true}
                status={device.state}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
