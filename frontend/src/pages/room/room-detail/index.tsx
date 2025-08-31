import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const RoomDetail = () => {
  const params = useParams<{ id: string }>();
  const roomId = params.id;

  const [roomData, setRoomData] = useState<any>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/rooms/${roomId}`
        );
        const data = await response.json();
        setRoomData(data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, []);

  return (
    <div>
      <h1>Room Detail</h1>
      <p>Room Data: {JSON.stringify(roomData)}</p>
    </div>
  );
};
