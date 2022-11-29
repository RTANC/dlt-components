SELECT 
	R.RegionID, R.Description,
	COUNT(T.TransportID) as TotalCar,
	CAST(ROUND(SUM(T.LoadWt)/1000.0,0) AS int) as TotalWeight,
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
	(
		SELECT TransportID,
			CompanyID,
			ObjectiveID,
			SrcProvinceID AS ProvinceID,
			SrcGoods,
			DstGoods,
			LoadWt
		FROM Transport
		WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND SrcGoods>0 AND DstGoods=0
		UNION ALL
		SELECT TransportID,
			CompanyID,
			ObjectiveID,
			DstProvinceID AS ProvinceID,
			SrcGoods,
			DstGoods,
			LoadWt
		FROM Transport
		WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND SrcGoods=0 AND DstGoods>0
		UNION ALL
		SELECT TransportID,
			CompanyID,
			ObjectiveID,
			SrcProvinceID AS ProvinceID,
			SrcGoods,
			DstGoods,
			LoadWt
		FROM Transport
		WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND SrcGoods>0 AND DstGoods>0
		UNION ALL
		SELECT TransportID,
			CompanyID,
			ObjectiveID,
			DstProvinceID AS ProvinceID,
			SrcGoods,
			DstGoods,
			LoadWt
		FROM Transport
		WHERE CAST(TimeStampTx AS DATE) BETWEEN '2021-01-01' AND '2021-01-31' AND StationID=1 AND SrcGoods>0 AND DstGoods>0
	) T JOIN TxProvince P ON P.ProvinceID=T.ProvinceID JOIN Region R ON P.RegionID=R.RegionID
--WHERE C.CompanyName like '%อุปกรณ์%'

GROUP BY R.RegionID, R.Description
ORDER BY R.RegionID
