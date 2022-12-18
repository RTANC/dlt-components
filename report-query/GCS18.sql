DECLARE @d1 DATETIME2 = '2021-01-01T00:00:00' DECLARE @d2 DATETIME2 = '2021-01-31T23:59:59' DECLARE @sid INT = 1
SELECT
	CompanyID,
	CompanyName,
	TransportLicenseID,
	TransportType,
	TransportScope,
    SrcProvinceID,
	SrcProvinceName,
    DstProvinceID,
	ProvinceName AS DstProvinceName,
	GoodsW,
	P1,P2,P3,P4,P5,P6,P7,P8,P9
FROM
	(
	SELECT
		--TransportID,
		B.CompanyID,
		Company.CompanyName,
		Company.TransportLicenseID,
		CASE WHEN TransportTypeID = 1 THEN
				'ไม่ประจำทาง'
			ELSE
				'ส่วนบุคคล'
		END AS TransportType,
		CASE WHEN TransportScopeID = 1 THEN
				'ในประเทศ'
			ELSE
				'ระหว่างประเทศ'
		END AS TransportScope,
		SrcProvinceID,
		ProvinceName AS SrcProvinceName,
		DstProvinceID,
		B.LoadWt AS GoodsW,
		(SUM((GoodsID & 1) / 1)) AS P1,
		(SUM((GoodsID & 2) / 2)) AS P2,
		(SUM((GoodsID & 4) / 4)) AS P3,
		(SUM((GoodsID & 8) / 8)) AS P4,
		(SUM((GoodsID & 16) / 16)) AS P5,
		(SUM((GoodsID & 32) / 32)) AS P6,
		(SUM((GoodsID & 64) / 64)) AS P7,
		(SUM((GoodsID & 128) / 128)) AS P8,
		(SUM((GoodsID & 256) / 256)) AS P9
	FROM
		(
			SELECT
				TransportID,
				SrcProvinceID,
				DstProvinceID,
				ObjectiveID,
				GoodsID,
				CASE
					WHEN LoadWt IS NULL THEN 0
					ELSE LoadWt
				END AS LoadWt,
				GrossWt,
				T.CompanyID,
				TimeStampTx
			FROM
				(
					SELECT
						TransportID,
						VehicleInID,
						1 AS ObjectiveID,
						CASE
							WHEN DstGoods > 0 THEN LoadWt / 2
							ELSE LoadWt
						END AS LoadWt,
						CASE
							WHEN DstGoods > 0 THEN GrossWt / 2
							ELSE GrossWt
						END AS GrossWt,
						TRansport.CompanyID,
						TimeStampTx,
						SrcProvinceID,
						1 AS DstProvinceID,
						SrcGoods AS GoodsID
					FROM
						Transport
						INNER JOIN Company C ON C.CompanyID = Transport.CompanyID
					WHERE
						SrcGoods > 0
						AND ObjectiveID = 1
						AND Transport.StationID = @sid
						AND TimeStampTx >= @d1
						AND TimeStampTx <= @d2
						AND C.IsActive = 1
						AND C.CompanyType = 1
						AND Transport.CompanyID LIKE '%'
					UNION
					ALL
					SELECT
						TransportID,
						VehicleInID,
						2 AS ObjectiveID,
						CASE
							WHEN SrcGoods > 0 THEN LoadWt / 2
							ELSE LoadWt
						END AS LoadWt,
						CASE
							WHEN SrcGoods > 0 THEN GrossWt / 2
							ELSE GrossWt
						END AS GrossWt,
						TRansport.CompanyID,
						TimeStampTx,
						1 AS SrcProvinceID,
						DstProvinceID,
						DstGoods AS GoodsID
					FROM
						Transport
						INNER JOIN Company C ON C.CompanyID = Transport.CompanyID
					WHERE
						DstGoods > 0
						AND ObjectiveID = 1
						AND Transport.StationID = @sid
						AND TimeStampTx >= @d1
						AND TimeStampTx <= @d2
						AND C.IsActive = 1
						AND C.CompanyType = 1
						AND Transport.CompanyID LIKE '%'
				) T
		) B JOIN Company ON B.CompanyID=Company.CompanyID JOIN TxProvince ON B.SrcProvinceID=ProvinceID
		GROUP BY
			B.CompanyID,
			CompanyName,
			TransportLicenseID,
			Company.TransportTypeID,
			Company.TransportScopeID,
			SrcProvinceID,
			TxProvince.ProvinceName,
			DstProvinceID,
			B.LoadWt
	) C JOIN TxProvince ON C.DstProvinceID=ProvinceID
WHERE P1!=0 OR P2!=0 OR P3!=0 OR P4!=0 OR P5!=0 OR P6!=0 OR P7!=0 OR P8!=0 OR P9!=0
ORDER BY
    CompanyName,
    SrcProvinceID,
    DstProvinceID