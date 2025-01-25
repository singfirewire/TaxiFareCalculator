import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Navigation } from 'lucide-react';
import { calculateDistance } from '../utils/calculateDistance';
import { calculateFare } from '../utils/calculateFare';

interface Position {
  lat: number;
  lng: number;
  timestamp: number;
  speed: number;
}

const TaxiFareCalculator = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [fare, setFare] = useState(35);
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [slowSpeedTime, setSlowSpeedTime] = useState(0);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('เบราว์เซอร์ของคุณไม่รองรับ GPS');
      return;
    }

    setIsTracking(true);
    setStartTime(Date.now());
    setPositions([]);
    setTotalDistance(0);
    setFare(35);
    setError('');
  };

  const stopTracking = () => {
    setIsTracking(false);
    setStartTime(null);
  };

  useEffect(() => {
    let watchId: number;
    if (isTracking) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now(),
            speed: position.coords.speed || 0
          };

          setPositions(prevPositions => {
            const updatedPositions = [...prevPositions, newPosition];
            
            if (prevPositions.length > 0) {
              const lastPos = prevPositions[prevPositions.length - 1];
              const newDistance = calculateDistance(
                lastPos.lat,
                lastPos.lng,
                newPosition.lat,
                newPosition.lng
              );
              
              const timeGap = (newPosition.timestamp - lastPos.timestamp) / 1000 / 60;
              if (newPosition.speed < 1.67) {
                setSlowSpeedTime(prev => prev + timeGap);
              }

              setTotalDistance(prev => prev + newDistance);
            }
            
            return updatedPositions;
          });
        },
        (err) => setError('เกิดข้อผิดพลาดในการติดตาม GPS: ' + err.message),
        {
          enableHighAccuracy: true,
          distanceFilter: 10
        }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isTracking]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isTracking && startTime) {
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const minutes = Math.floor((currentTime - startTime) / 1000 / 60);
        setElapsedTime(minutes);
        setFare(calculateFare(totalDistance, slowSpeedTime));
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTracking, startTime, totalDistance, slowSpeedTime]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">คำนวณค่าแท็กซี่</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>ระยะทางรวม: {totalDistance.toFixed(2)} กม.</span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>เวลาเดินทาง: {elapsedTime} นาที</span>
          </div>

          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5" />
            <span>เวลารถติด: {Math.round(slowSpeedTime)} นาที</span>
          </div>

          <div className="flex items-center space-x-2 text-lg font-bold">
            <DollarSign className="w-5 h-5" />
            <span>ค่าโดยสาร: {fare} บาท</span>
          </div>

          <button
            onClick={isTracking ? stopTracking : startTracking}
            className={`w-full py-3 rounded-lg ${
              isTracking 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isTracking ? 'จบการเดินทาง' : 'เริ่มการเดินทาง'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxiFareCalculator;
