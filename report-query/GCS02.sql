SELECT O.*, T.C_S, T.C_R, T.C_SR, T.C_O, T.C_ALL, T.W_S, T.W_R, T.W_SR, T.W_O, T.W_ALL, T.C_CHECK
FROM
(SELECT 
	V.VehicleClassID, V.Description,
	SUM(
		CASE
			WHEN T.SrcGoods>0 AND T.DstGoods=0 AND ObjectiveID=1 OR ObjectiveID=2 THEN 1
			ELSE 0
		END
	) as C_S,
	SUM(
		CASE
			WHEN T.SrcGoods=0 AND T.DstGoods>0 AND ObjectiveID=1 OR ObjectiveID=2 THEN 1
			ELSE 0
		END
	) as C_R,
	SUM(
		CASE
			WHEN T.SrcGoods>0 AND T.DstGoods>0 AND ObjectiveID=1 OR ObjectiveID=2 THEN 1
			ELSE 0
		END
	) as C_SR,
	SUM(
		CASE
			WHEN ObjectiveID=2 THEN 1
			ELSE 0
		END
	) as C_O,
	SUM(
		CASE
			WHEN ObjectiveID=1 OR ObjectiveID=2 THEN 1
			ELSE 0
		END
	) as C_ALL,
	CAST(ROUND(SUM(
		CASE
			WHEN T.SrcGoods>0 AND T.DstGoods=0 AND ObjectiveID=1 OR ObjectiveID=2 THEN LoadWt
			ELSE 0
		END
	)/1000.0,0) AS int) as W_S,
	CAST(ROUND(SUM(
		CASE
			WHEN T.SrcGoods=0 AND T.DstGoods>0 AND ObjectiveID=1 OR ObjectiveID=2 THEN LoadWt
			ELSE 0
		END
	)/1000.0,0) AS int) as W_R,
	CAST(ROUND(SUM(
		CASE
			WHEN T.SrcGoods>0 AND T.DstGoods>0 AND ObjectiveID=1 OR ObjectiveID=2 THEN LoadWt
			ELSE 0
		END
	)/1000.0,0) AS int) as W_SR,
	CAST(ROUND(SUM(
		CASE
			WHEN ObjectiveID=2 THEN LoadWt
			ELSE 0
		END
	)/1000.0,0) AS int) as W_O,
	CAST(ROUND(SUM(
		CASE
			WHEN ObjectiveID=1 OR ObjectiveID=2 THEN LoadWt
			ELSE 0
		END
	)/1000.0,0) AS int) as W_ALL,
	SUM(
		CASE
			WHEN ObjectiveID=3 THEN 1
			ELSE 0
		END
	) as C_CHECK
FROM
	(SELECT TransportID, 
		(CASE
			WHEN VehicleClassID IS NULL THEN 1
			ELSE VehicleClassID
		END) as VehicleClassID, 
		SrcGoods,
		DstGoods,
		ObjectiveID,
		CompanyID,
		LoadWt
	FROM Transport
	WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1) T
	FULL OUTER JOIN VehicleClass V ON T.VehicleClassID=V.VehicleClassID
GROUP BY V.VehicleClassID, V.Description) T
JOIN (
SELECT V.VehicleClassID, V.Description, COUNT(O.VehicleOutID) as TotalCar, CAST(ROUND(SUM(O.GoodsWt)/1000.0,0) AS int) as TotalWeight
FROM
	(
	SELECT VehicleOutID, 
		(CASE
			WHEN VehicleClassID IS NULL THEN 1
			ELSE VehicleClassID
		END) as VehicleClassID, 
		GrossWt,
		GoodsWt 
	FROM VehicleOut
	WHERE CAST(TimeStampOut AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1
	) O JOIN VehicleClass V ON O.VehicleClassID=V.VehicleClassID
GROUP BY V.VehicleClassID, V.Description) O ON O.VehicleClassID=T.VehicleClassID
ORDER BY O.VehicleClassID
