import { Link, useNavigate } from "react-router-dom";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { fetchData } from "../../../insfrastructure/fetch-data";
import { Loading } from "../../../components/loading";

interface ListDeviceProps {
  devices?: Array<{
    id: number;
    name: string;
    icon: string;
    state: boolean;
    room: number;
  }>;
}

export const ListDevice = ({ devices }: ListDeviceProps) => {
  const [devicesData, setDevicesData] = useState(devices || []);
  const [loading, setLoading] = useState(false);

  console.log(devicesData);

  useEffect(() => {
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
    if (!devices) {
      try {
        setLoading(true);
        const response = await fetchData({ endpoint: "/devices" });
        setDevicesData(response);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative p-5 pb-[150px] ">
      <Link to={`/dispositivos/novo`}>
        <ActionButton icon="plus" />
      </Link>
      <h1 className="text-center text-2xl font-bold">Dispositivos</h1>

      {!loading ? (
        <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
          {devicesData.map((device) => (
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
      ) : (
        <Loading />
      )}
    </div>
  );
};
