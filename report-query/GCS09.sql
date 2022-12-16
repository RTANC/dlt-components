DECLARE @d1 DATETIME2 = '2021-01-01T00:00:00' DECLARE @d2 DATETIME2 = '2021-01-31T23:59:59' DECLARE @sid INT = 1
SELECT
    (
        CASE
            WHEN DATEPART(HOUR, d.qDt) >= 6
            AND DATEPART(HOUR, d.qDt) < 18 THEN 'DAY'
            ELSE 'NIGNT'
        END
    ) AS ByDateTime,
    SUM(
        CASE
            WHEN d.TableID = 1 THEN 1
            ELSE 0
        END
    ) AS NVehIN,
    SUM(
        CASE
            WHEN d.TableID = 2 THEN 1
            ELSE 0
        END
    ) AS NVehOUT,
    0 AS WGvwIN,
    ISNULL(SUM(CAST(d.GVW AS BIGINT)), 0) AS WGvwOUT,
    ISNULL(SUM(CAST(d.GoodsWOut AS BIGINT)), 0) AS WGoodsWOUT,
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
            WHEN d.Objective = 5
            OR d.Objective = 4 THEN 1
            ELSE 0
        END
    ) AS NSendReceive,
    SUM(
        CASE
            WHEN d.Objective = 3 THEN 1
            ELSE 0
        END
    ) AS NOthers,
    SUM(
        CASE
            WHEN d.Objective = 6 THEN 1
            ELSE 0
        END
    ) AS NVehCHK,
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
            WHEN d.Objective = 5
            OR d.Objective = 4 THEN GoodsW
            ELSE 0
        END
    ) AS WSendReceive,
    SUM(
        CASE
            WHEN d.Objective = 3 THEN GoodsW
            ELSE 0
        END
    ) AS WOthers
FROM
    (
        SELECT
            TableID,
            qDt,
            StampIn,
            StampOut,
            Objective,
            GoodsW,
            GVW,
            GoodsWOut
        FROM
            (
                SELECT
                    B.timestamptx AS qDt,
                    0 AS ID,
                    B.transportid AS TxnNo,
                    B.timestampin AS StampIn,
                    B.timestampout AS StampOut,
                    B.timestamptx AS Stamp,
                    B.vehicleclassid AS VType,
                    B.objectiveid AS Objective,
                    B.companyid AS OperatorID,
                    B.regionid AS Region,
                    B.provincename,
                    B.loadwt AS GoodsW,
                    B.grosswt AS GVW,
                    0 AS GoodsWOut,
                    B.tailstatusid AS TailStatus,
                    0 AS TableID
                FROM
                    (
                        SELECT
                            transportid,
                            objectiveid,
                            timestampin,
                            timestampout,
                            vehicleclassid,
                            loadwt,
                            grosswt,
                            vehicleinid,
                            Z.companyid,
                            tailstatusid,
                            timestamptx,
                            regionid,
                            provincename
                        FROM
                            (
                                SELECT
                                    transportid,
                                    objectiveid,
                                    timestampin,
                                    timestampout,
                                    vehicleclassid,
                                    loadwt,
                                    grosswt,
                                    vehicleinid,
                                    T.companyid,
                                    tailstatusid,
                                    timestamptx,
                                    P.regionid,
                                    P.provincename
                                FROM
                                    (
                                        SELECT
                                            T.transportid,
                                            1 AS ObjectiveID,
                                            T.timestampin,
                                            T.timestampout,
                                            T.vehicleclassid,
                                            CASE
                                                WHEN T.dstgoods > 0 THEN T.loadwt / 2
                                                ELSE T.loadwt
                                            END AS LoadWt,
                                            CASE
                                                WHEN T.dstgoods > 0 THEN T.grosswt / 2
                                                ELSE T.grosswt
                                            END AS GrossWt,
                                            T.vehicleinid,
                                            T.companyid,
                                            T.tailstatusid,
                                            T.timestamptx,
                                            T.srcprovinceid AS ProvinceID
                                        FROM
                                            transport AS T
                                            LEFT JOIN (
                                                SELECT
                                                    *
                                                FROM
                                                    vehiclein
                                                WHERE
                                                    timestampin BETWEEN @d1
                                                    AND @d2
                                                    AND stationid = @sid
                                            ) AS VI ON T.vehicleinid = VI.vehicleinid
                                        WHERE
                                            T.SrcProvinceID > 0
                                            AND T.DstProvinceID = 0
                                            AND T.objectiveid = 1
                                            AND T.stationid = @sid
                                            AND T.timestamptx >= @d1
                                            AND T.timestamptx <= @d2
                                        UNION
                                        ALL
                                        SELECT
                                            T.transportid,
                                            2 AS ObjectiveID,
                                            T.timestampin,
                                            T.timestampout,
                                            T.vehicleclassid,
                                            CASE
                                                WHEN T.srcgoods > 0 THEN T.loadwt / 2
                                                ELSE T.loadwt
                                            END AS LoadWt,
                                            CASE
                                                WHEN T.srcgoods > 0 THEN T.grosswt / 2
                                                ELSE T.grosswt
                                            END AS GrossWt,
                                            T.vehicleinid,
                                            T.companyid,
                                            T.tailstatusid,
                                            T.timestamptx,
                                            T.dstprovinceid AS ProvinceID
                                        FROM
                                            transport AS T
                                            LEFT JOIN (
                                                SELECT
                                                    *
                                                FROM
                                                    vehiclein
                                                WHERE
                                                    timestampin BETWEEN @d1
                                                    AND @d2
                                                    AND stationid = @sid
                                            ) AS VI ON T.vehicleinid = VI.vehicleinid
                                        WHERE
                                            T.DstProvinceID > 0
                                            AND T.SrcProvinceID = 0
                                            AND T.objectiveid = 1
                                            AND T.stationid = @sid
                                            AND T.timestamptx >= @d1
                                            AND T.timestamptx <= @d2
                                        UNION
                                        ALL
                                        SELECT
                                            T.transportid,
                                            5 AS ObjectiveID,
                                            T.timestampin,
                                            T.timestampout,
                                            T.vehicleclassid,
                                            CASE
                                                WHEN T.srcgoods > 0 THEN T.loadwt / 2
                                                ELSE T.loadwt
                                            END AS LoadWt,
                                            CASE
                                                WHEN T.srcgoods > 0 THEN T.grosswt / 2
                                                ELSE T.grosswt
                                            END AS GrossWt,
                                            T.vehicleinid,
                                            T.companyid,
                                            T.tailstatusid,
                                            T.timestamptx,
                                            T.dstprovinceid AS ProvinceID
                                        FROM
                                            transport AS T
                                            LEFT JOIN (
                                                SELECT
                                                    *
                                                FROM
                                                    vehiclein
                                                WHERE
                                                    timestampin BETWEEN @d1
                                                    AND @d2
                                                    AND stationid = @sid
                                            ) AS VI ON T.vehicleinid = VI.vehicleinid
                                        WHERE
                                            T.DstProvinceID > 0
                                            AND T.SrcProvinceID > 0
                                            AND T.objectiveid = 1
                                            AND T.stationid = @sid
                                            AND T.timestamptx >= @d1
                                            AND T.timestamptx <= @d2
                                        UNION
                                        ALL
                                        SELECT
                                            T.transportid,
                                            case
                                                when T.objectiveid = 2 then 3
                                                else 6
                                            end AS ObjectiveID,
                                            T.timestampin,
                                            T.timestampout,
                                            T.vehicleclassid,
                                            T.loadwt,
                                            T.grosswt,
                                            T.vehicleinid,
                                            T.companyid,
                                            T.tailstatusid,
                                            T.timestamptx,
                                            0 AS ProvinceID
                                        FROM
                                            transport AS T
                                            LEFT JOIN (
                                                SELECT
                                                    *
                                                FROM
                                                    vehiclein
                                                WHERE
                                                    timestampin BETWEEN @d1
                                                    AND @d2
                                                    AND stationid = @sid
                                            ) AS VI ON T.vehicleinid = VI.vehicleinid
                                        WHERE
                                            T.objectiveid in (2, 3)
                                            AND T.stationid = @sid
                                            AND T.timestamptx >= @d1
                                            AND T.timestamptx <= @d2
                                    ) T
                                    LEFT JOIN txprovince P ON P.provinceid = T.provinceid
                                    INNER JOIN company C ON C.companyid = T.companyid
                                WHERE
                                    C.companytype = 1
                            ) Z
                    ) B
                UNION
                ALL
                SELECT
                    timestampin AS qDt,
                    vehicleinid AS ID,
                    transportid AS TxnNo,
                    timestampin AS StampIn,
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
                    vehiclein
                WHERE
                    stationid = @sid
                    AND timestampin >= @d1
                    AND timestampin <= @d2
                UNION
                ALL
                SELECT
                    timestampout AS qDt,
                    vehicleoutid AS ID,
                    transportid AS TxnNo,
                    NULL AS StampIn,
                    timestampout AS StampOut,
                    NULL AS Stamp,
                    (
                        CASE
                            WHEN CONVERT(DATE, Getdate()) = CONVERT(DATE, @d1)
                            AND CONVERT(DATE, Getdate()) = CONVERT(DATE, @d2) THEN 0
                            ELSE (
                                CASE
                                    WHEN vehicleclassid IS NULL THEN 1
                                    ELSE vehicleclassid
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
                            WHEN grosswt IS NULL THEN 0
                            ELSE grosswt
                        END
                    ) AS GVW,
                    (
                        CASE
                            WHEN goodswt IS NULL THEN 0
                            ELSE goodswt
                        END
                    ) AS GoodsWOut,
                    NULL AS TailStatus,
                    2 AS TableID
                FROM
                    vehicleout
                WHERE
                    stationid = @sid
                    AND timestampout >= @d1
                    AND timestampout <= @d2
            ) AS g
        WHERE
            g.OperatorID LIKE '%'
    ) as d
GROUP BY
    (
        CASE
            WHEN DATEPART(HOUR, d.qDt) >= 6
            AND DATEPART(HOUR, d.qDt) < 18 THEN 'DAY'
            ELSE 'NIGNT'
        END
    )
ORDER BY
    (
        CASE
            WHEN DATEPART(HOUR, d.qDt) >= 6
            AND DATEPART(HOUR, d.qDt) < 18 THEN 'DAY'
            ELSE 'NIGNT'
        END
    )