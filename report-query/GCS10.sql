DECLARE @d1 DATETIME2 = '2021-01-01T00:00:00' DECLARE @d2 DATETIME2 = '2021-01-31T23:59:59'
SELECT
    m.VehicleClassID AS VType,
    m.[Description],
    COUNT(d.TxnNo) AS NCount,
    SUM(
        CASE
            WHEN (d.StampIn IS NOT NULL)
            AND (d.StampOut IS NOT NULL) THEN DATEDIFF(MINUTE, d.StampIn, d.StampOut)
            ELSE 0
        END
    ) AS MinUsed
FROM
    dbo.VehicleClass AS m
    LEFT OUTER JOIN (
        SELECT
            TransportID AS TxnNo,
            TimeStampIn AS StampIn,
            TimeStampOut AS StampOut,
            TimeStampTx AS Stamp,
            VehicleClassID AS VType
        FROM
            Transport a
            INNER JOIN Company b ON b.CompanyID = a.CompanyID
        WHERE
            a.TimeStampIn >= @d1
            AND a.TimeStampIn < @d2
            AND b.CompanyID LIKE '%'
            AND a.StationID = 1
            AND b.IsActive = 1
            AND b.CompanyType = 1
    ) AS d ON d.VType = m.VehicleClassID
GROUP BY
    m.VehicleClassID,
    m.[Description]
ORDER BY
    m.VehicleClassID