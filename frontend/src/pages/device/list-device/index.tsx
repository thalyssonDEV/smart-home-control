import { Link } from "react-router-dom";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { fetchData } from "../../../insfrastructure/fetch-data";

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

  console.log(devicesData);

  useEffect(() => {
    const fetchDevicesData = async () => {
      if (!devices) {
        try {
          const response = await fetchData({ endpoint: "/devices" });
          setDevicesData(response);
        } catch (error) {
          console.error("Error fetching devices:", error);
        }
      }
    };

    fetchDevicesData();
  }, []);

  return (
    <div className="relative p-5 pb-[150px] ">
      <Link to={`/dispositivos/novo`}>
        <ActionButton icon="plus" />
      </Link>
      <h1 className="text-center text-2xl font-bold">Dispositivos</h1>

      <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
        {devicesData.map((device) => (
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
  );
};
