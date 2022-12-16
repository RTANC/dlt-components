--GCS16 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามรายจังหวัด ต้นทาง-ปลายทาง
DECLARE @d1 DATETIME2 = '2020-07-15T00:00:00' DECLARE @d2 DATETIME2 = '2020-07-15T23:59:59' DECLARE @sid INT = 1
SELECT
    m.RegionID AS Region,
    d.ProvinceName,
    m.[Description],
    SUM(
        CASE
            WHEN d.Objective = 1
            OR d.Objective = 4 THEN 1
            ELSE 0
        END
    ) AS NSend,
    SUM(
        CASE
            WHEN d.Objective = 2
            OR d.Objective = 4 THEN 1
            ELSE 0
        END
    ) AS NReceive,
    SUM(
        CASE
            WHEN d.Objective = 3 THEN 1
            ELSE 0
        END
    ) AS NOthers,
    SUM(
        CASE
            WHEN d.Objective = 1
            OR d.Objective = 4 THEN GoodsW
            ELSE 0
        END
    ) AS WSend,
    SUM(
        CASE
            WHEN d.Objective = 2
            OR d.Objective = 4 THEN GoodsW
            ELSE 0
        END
    ) AS WReceive,
    SUM(
        CASE
            WHEN d.Objective = 3 THEN GoodsW
            ELSE 0
        END
    ) AS WOthers
FROM
    dbo.Region AS m
    LEFT OUTER JOIN (
        SELECT
            Objective,
            GoodsW,
            Region,
            ProvinceName
        FROM
            (
                SELECT
                    B.TimeStampTx AS qDt,
                    0 AS ID,
                    B.TransportID AS TxnNo,
                    B.TimeStampIn AS StampIn,
                    B.TimeStampOut AS StampOut,
                    B.TimeStampTx AS Stamp,
                    B.VehicleClassID AS VType,
                    B.ObjectiveID AS Objective,
                    B.CompanyID AS OperatorID,
                    B.RegionID AS Region,
                    B.ProvinceName,
                    B.LoadWt AS GoodsW,
                    B.GrossWt AS GVW,
                    0 AS GoodsWOut,
                    B.TailStatusID AS TailStatus,
                    0 AS TableID
                FROM
                    (
                        SELECT
                            TransportID,
                            ObjectiveID,
                            TimeStampIn,
                            TimeStampOut,
                            VehicleClassID,
                            LoadWt,
                            GrossWt,
                            VehicleInID,
                            Z.CompanyID,
                            TailStatusID,
                            TimeStampTx,
                            RegionID,
                            ProvinceName
                        FROM
                            (
                                SELECT
                                    TransportID,
                                    ObjectiveID,
                                    TimeStampIn,
                                    TimeStampOut,
                                    VehicleClassID,
                                    LoadWt,
                                    GrossWt,
                                    VehicleInID,
                                    T.CompanyID,
                                    TailStatusID,
                                    TimeStampTx,
                                    P.RegionID,
                                    P.ProvinceName
                                FROM
                                    (
                                        SELECT
                                            TransportID,
                                            1 AS ObjectiveID,
                                            TimeStampIn,
                                            TimeStampOut,
                                            VehicleClassID,
                                            CASE
                                                WHEN DstGoods > 0 THEN LoadWt / 2
                                                ELSE LoadWt
                                            END AS LoadWt,
                                            CASE
                                                WHEN DstGoods > 0 THEN GrossWt / 2
                                                ELSE GrossWt
                                            END AS GrossWt,
                                            VehicleInID,
                                            CompanyID,
                                            TailStatusID,
                                            TimeStampTx,
                                            SrcProvinceID AS ProvinceID
                                        FROM
                                            Transport
                                        WHERE
                                            SrcGoods > 0
                                            AND ObjectiveID = 1
                                            AND StationID = @sid
                                            AND TimeStampTx >= @d1
                                            AND TimeStampTx <= @d2
                                        UNION
                                        ALL
                                        SELECT
                                            TransportID,
                                            2 AS ObjectiveID,
                                            TimeStampIn,
                                            TimeStampOut,
                                            VehicleClassID,
                                            CASE
                                                WHEN SrcGoods > 0 THEN LoadWt / 2
                                                ELSE LoadWt
                                            END AS LoadWt,
                                            CASE
                                                WHEN SrcGoods > 0 THEN GrossWt / 2
                                                ELSE GrossWt
                                            END AS GrossWt,
                                            VehicleInID,
                                            CompanyID,
                                            TailStatusID,
                                            TimeStampTx,
                                            DstProvinceID AS ProvinceID
                                        FROM
                                            Transport
                                        WHERE
                                            DstGoods > 0
                                            AND ObjectiveID = 1
                                            AND StationID = @sid
                                            AND TimeStampTx >= @d1
                                            AND TimeStampTx <= @d2
                                        UNION
                                        ALL
                                        SELECT
                                            TransportID,
                                            3 AS ObjectiveID,
                                            TimeStampIn,
                                            TimeStampOut,
                                            VehicleClassID,
                                            LoadWt,
                                            GrossWt,
                                            VehicleInID,
                                            CompanyID,
                                            TailStatusID,
                                            TimeStampTx,
                                            0 AS ProvinceID
                                        FROM
                                            Transport
                                        WHERE
                                            ObjectiveID = 2
                                            AND StationID = @sid
                                            AND TimeStampTx >= @d1
                                            AND TimeStampTx <= @d2
                                    ) T
                                    LEFT JOIN TxProvince P ON P.ProvinceID = T.ProvinceID
                                    INNER JOIN Company C ON C.CompanyID = T.CompanyID
                                WHERE
                                    C.CompanyType = 1
                            ) Z
                    ) B
                UNION
                ALL
                SELECT
                    TimeStampIn AS qDt,
                    VehicleInID AS ID,
                    TransportID AS TxnNo,
                    TimeStampIn AS StampIn,
                    NULL AS StampOut,
                    NULL AS Stamp,
                    99 AS VType,
                    99 AS Objective,
                    '0' AS OperatorID,
                    0 AS Region,
                    '' AS ProvinceName,
                    0 AS GoodsW,
                    0 AS GVW,
                    0 AS GoodsWOut,
                    NULL AS TailStatus,
                    1 AS TableID
                FROM
                    VehicleIn
                WHERE
                    StationID = @sid
                    AND TimeStampIn >= @d1
                    AND TimeStampIn <= @d2
                UNION
                ALL
                SELECT
                    TimeStampOut AS qDt,
                    VehicleOutID AS ID,
                    TransportID AS TxnNo,
                    NULL AS StampIn,
                    TimeStampOut AS StampOut,
                    NULL AS Stamp,
                    (
                        CASE
                            WHEN CONVERT(date, getdate()) = CONVERT(date, @d1)
                            AND CONVERT(date, getdate()) = CONVERT(date, @d2) THEN 0
                            ELSE (
                                CASE
                                    WHEN VehicleClassID IS NULL THEN 1
                                    ELSE VehicleClassID
                                END
                            )
                        END
                    ) AS VType,
                    99 AS Objective,
                    '0' AS OperatorID,
                    0 AS Region,
                    '' AS ProvinceName,
                    0 AS GoodsW,
                    (
                        CASE
                            WHEN GrossWt IS NULL THEN 0
                            ELSE GrossWt
                        END
                    ) AS GVW,
                    (
                        CASE
                            WHEN GoodsWt IS NULL THEN 0
                            ELSE GoodsWt
                        END
                    ) AS GoodsWOut,
                    NULL AS TailStatus,
                    2 AS TableID
                FROM
                    VehicleOut
                WHERE
                    StationID = @sid
                    AND TimeStampOut >= @d1
                    AND TimeStampOut <= @d2
            ) AS g
        WHERE
            g.OperatorID LIKE '%'
    ) as d ON d.Region = m.RegionID
GROUP BY
    m.RegionID,
    m.Description,
    d.ProvinceName
ORDER BY
    m.RegionID,
    d.ProvinceName