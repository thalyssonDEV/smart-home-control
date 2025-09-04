import { useEffect, useState } from "react";
import { fetchData } from "../../insfrastructure/fetch-data";
import { ActionButton } from "../action-button";
import Dropdown from "../dropdown";
import { Card } from "../card";

interface DevicesSelectorProps {
  selectedDevices: any[];
  onDeviceSelect: (device: any) => void;
  value: any;
  setValue: (value: any) => void;
  roomId?: string;
}

export const DevicesSelector = ({
  selectedDevices,
  onDeviceSelect,
  value,
  setValue,
  roomId,
}: DevicesSelectorProps) => {
  const [showDevicesDropdown, setShowDevicesDropdown] = useState(false);
  const [allDevices, setAllDevices] = useState<any[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      const response = await fetchData({ endpoint: "/devices" });
      setAllDevices(response);
    };

    fetchDevices();
  }, []);

  const handleDeleteDeviceFromRoom = (deviceId: number | string) => {
    if (!Array.isArray(selectedDevices)) return;
    const filtered = selectedDevices.filter(
      (device: any) => device.id !== deviceId
    );
    setValue(filtered);
  };

  const handleAddDeviceToRoom = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const deviceToAdd = allDevices.find(
      (device) => device.id.toString() === selectedDeviceId
    );
    if (!deviceToAdd) return;

    // const fetchObj = {
    //   method: "PUT",
    //   config: {
    //     data: {
    //       id: deviceToAdd.id,
    //       name: deviceToAdd.name,
    //       icon: deviceToAdd.icon,
    //       room: roomId,
    //     },
    //   },
    //   endpoint: `/devices/${deviceToAdd.id}/`,
    // };

    // console.log(fetchObj);

    const alreadyAdded = selectedDevices.some((d) => d.id === deviceToAdd.id);

    if (alreadyAdded) {
      console.log("Este dispositivo já foi adicionado.");
      return;
    }
    // const response = await fetchData(fetchObj);
    // console.log("Dispositivo adicionado com sucesso:", response);

    onDeviceSelect(deviceToAdd);
    setSelectedDeviceId("");
  };

  return (
    <div className="relative">
      <ActionButton
        icon={`${showDevicesDropdown ? "minus" : "plus"}`}
        onClick={() => setShowDevicesDropdown(!showDevicesDropdown)}
      />

      <h2 className="font-bold text-lg p-6">Dispositivos</h2>

      {showDevicesDropdown && allDevices && (
        <div className="flex flex-col items-center ">
          <Dropdown
            className="p-4 w-full"
            id="device"
            options={allDevices}
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            mapOptions={(device) => ({
              value: device.id.toString(),
              label: device.name,
              key: device.id,
            })}
            addEmptyOption={true}
          />

          <button
            className="bg-secondary px-4 py-2 rounded-md mb-4 shadow-md"
            onClick={(e) => handleAddDeviceToRoom(e)}
          >
            Adicionar Dispositivo
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {Array.isArray(selectedDevices) &&
          selectedDevices.map((device) => (
            <div className="relative" key={device.id}>
              <Card title={device.name} icon={device.icon} />
              <i
                className="fa-solid fa-trash absolute right-2 top-2 text-red-400"
                onClick={() => handleDeleteDeviceFromRoom(device.id)}
              ></i>
            </div>
          ))}
      </div>
    </div>
  );
};
