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
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
    fetchDevicesData();
  }, []);

  const toggleState = async (e: any, deviceId: number) => {
    e.stopPropagation();
    e.preventDefault();

    const fetchObj = {
      method: "PATCH",
      config: {
        data: {
          id: deviceId,
        },
      },
      endpoint: "/devices/" + deviceId + "/",
    };

    try {
      await fetchData(fetchObj);

      fetchDevicesData();
    } catch (error) {
      console.error("Error toggling device state:", error);
    }
  };

  const fetchDevicesData = async () => {
    try {
      const roomsDevicesResponse = await fetchData({
        endpoint: `/devices?room=${roomId}`,
      });

      setRoomsDevicesData(roomsDevicesResponse);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

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
              <Link
                to={`/dispositivos/${device.id}`}
                key={device.id}
                state={{ selectedDevice: device }}
              >
                <Card
                  title={device.name}
                  icon={device.icon}
                  toggle={(e) => toggleState(e, device.id)}
                  toggleStatus={device.state}
                  toggleSize="md"
                  className="pt-[40px]"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
