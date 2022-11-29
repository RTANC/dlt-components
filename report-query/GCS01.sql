--จำนวนรถเข้าสถานี
SELECT COUNT(VehicleInID) as TotalCarIn
FROM VehicleIn
WHERE CAST(TimeStampIn AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1;

--จำนวนรถออกสถานี
SELECT COUNT(VehicleOutID) as TotalCarOut
FROM VehicleOut
WHERE CAST(TimeStampOut AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1;

--จำนวนรถตรวจสภาพ
SELECT COUNT(TransportID) as TotalCarCheck
FROM Transport
WHERE CAST(TimeStampIn AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND ObjectiveID=3;

--ปริมาณการขนถ่ายสินค้าทั้งหมดผ่านสถานี
SELECT SUM(LoadWt) as TotalWeight
FROM Transport
WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1;

--จำนวนรถส่งสินค้า
SELECT COUNT(TransportID) as TotalCarTx, SUM(LoadWt) as TotalWeightTx
FROM Transport
WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND SrcGoods>0 AND DstGoods=0 AND ObjectiveID=1;

--จำนวนรถรับสินค้า
SELECT COUNT(TransportID) as TotalCarRx, SUM(LoadWt) as TotalWeightRx
FROM Transport
WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND SrcGoods=0 AND DstGoods>0 AND ObjectiveID=1;

--จำนวนรถรับส่งสินค้า
SELECT COUNT(TransportID) as TotalCarRxTx, SUM(LoadWt) as TotalWeightRxTx
FROM Transport
WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND SrcGoods>0 AND DstGoods>0 AND ObjectiveID=1;

--จำนวนรถอื่นๆ
SELECT COUNT(TransportID) as TotalCarEtc, SUM(LoadWt) as TotalWeightEtc
FROM Transport
WHERE CAST(TimeStampIn AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND ObjectiveID=2;
--WHERE CAST(TimeStampIn AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND ObjectiveID=2 AND CompanyID=8;
