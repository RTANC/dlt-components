const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { reportDateTimeFormatter, getStationName } = require('../../utils/utils')
const fs = require('fs')
exports.gcs01 = async (req, res, next) => {
    try {
        if (!req.query.station || !req.query.startDate || !req.query.endDate) {
            throw Error('stationId, startDate, endDate field is require!')
        }

        let extWhere = ``
        if (!!req.query.company) {
            extWhere = ` AND CompanyID = ${req.query.company}`
        }

        const sql_query = `SELECT COUNT(VehicleInID) as TotalCarIn
        FROM VehicleIn
        WHERE CAST(TimeStampIn AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station}
        
        SELECT COUNT(VehicleOutID) as TotalCarOut
        FROM VehicleOut
        WHERE CAST(TimeStampOut AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station}
        
        SELECT COUNT(TransportID) as TotalCarCheck
        FROM Transport
        WHERE CAST(TimeStampIn AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND ObjectiveID=3 ${extWhere}
        
        SELECT SUM(LoadWt) as TotalWeight
        FROM Transport
        WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} ${extWhere}
        
        SELECT COUNT(TransportID) as TotalCarTx, SUM(LoadWt) as TotalWeightTx
        FROM Transport
        WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND SrcGoods>0 AND DstGoods=0 AND ObjectiveID=1 ${extWhere}
        
        SELECT COUNT(TransportID) as TotalCarRx, SUM(LoadWt) as TotalWeightRx
        FROM Transport
        WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND SrcGoods=0 AND DstGoods>0 AND ObjectiveID=1 ${extWhere}
        
        SELECT COUNT(TransportID) as TotalCarRxTx, SUM(LoadWt) as TotalWeightRxTx
        FROM Transport
        WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND SrcGoods>0 AND DstGoods>0 AND ObjectiveID=1 ${extWhere}
        
        SELECT COUNT(TransportID) as TotalCarEtc, SUM(LoadWt) as TotalWeightEtc
        FROM Transport
        WHERE CAST(TimeStampIn AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND ObjectiveID=2 ${extWhere}`
        
        const result = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        const stationName = await getStationName(req.query.station)
        const data = {
            title: 'รายงาน GCS01 - จำนวนรถและปริมาณสินค้าเข้า-ออกสถานี รายสถานี',
            station: stationName,
            startDate: reportDateTimeFormatter(req.query.startDate),
            endDate: reportDateTimeFormatter(req.query.endDate),
            TotalCarIn: result[0].TotalCarIn,
            TotalCarOut: result[1].TotalCarOut,
            TotalCarCheck: result[2].TotalCarCheck,
            TotalWeight: result[3].TotalWeight || 0,
            TotalCars: [result[4].TotalCarTx, result[5].TotalCarRx, result[6].TotalCarRxTx, result[7].TotalCarEtc, (result[4].TotalCarTx + result[5].TotalCarRx + result[6].TotalCarRxTx + result[7].TotalCarEtc)],
            TotalWeights: [result[4].TotalWeightTx || 0, result[5].TotalWeightRx || 0, result[6].TotalWeightRxTx || 0, result[7].TotalWeightEtc || 0, (result[4].TotalWeightTx + result[5].TotalWeightRx + result[6].TotalWeightRxTx + result[7].TotalWeightEtc) || 0]
        }
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5492', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'H7UaSVeTxQ' }, data: data }, { timeout: 600000 })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS01.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs02 = async (req, res, next) => {
    try {
        if (!req.query.station || !req.query.startDate || !req.query.endDate) {
            throw Error('stationId, startDate, endDate field is require!')
        }

        let extWhere = ``
        if (!!req.query.company) {
            extWhere = ` AND CompanyID = ${req.query.company}`
        }

        const sql_query = `SELECT O.*, T.C_S, T.C_R, T.C_SR, T.C_O, T.C_ALL, T.W_S, T.W_R, T.W_SR, T.W_O, T.W_ALL, T.C_CHECK
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
            	WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} ${extWhere}) T
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
            	WHERE CAST(TimeStampOut AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station}
            	) O JOIN VehicleClass V ON O.VehicleClassID=V.VehicleClassID
            GROUP BY V.VehicleClassID, V.Description) O ON O.VehicleClassID=T.VehicleClassID
            ORDER BY O.VehicleClassID`
        const result = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        const stationName = await getStationName(req.query.station)
        const data = {
            title: "รายงาน GCS02 - จำนวนรถและปริมาณสินค้าเข้า-ออกสถานี  ตามประเภทรถ",
            station: stationName,
            startDate: reportDateTimeFormatter(req.query.startDate),
            endDate: reportDateTimeFormatter(req.query.endDate),
            reportData: result
        }
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'lldYmhM5F3' }, data: data }, { timeout: 600000 })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS02.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs03 = async (req, res, next) => {
    try {
        if (!req.query.station || !req.query.startDate || !req.query.endDate) {
            throw Error('stationId, startDate, endDate field is require!')
        }

        let extWhere = ``
        if (!!req.query.company) {
            extWhere = ` AND CompanyID = ${req.query.company}`
        }

        const sql_query = `SELECT O.*, T.C_S, T.C_R, T.C_SR, T.C_O, T.C_ALL, T.W_S, T.W_R, T.W_SR, T.W_O, T.W_ALL, T.C_CHECK
        FROM
        (SELECT 
            V.CompanyID, V.CompanyName,
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
            WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} ${extWhere}) T
            FULL OUTER JOIN Company V ON T.CompanyID=V.CompanyID
        GROUP BY V.CompanyID, V.CompanyName) T
        JOIN (
        SELECT C.CompanyID, C.CompanyName, COUNT(T.TransportID) as TotalCar, CAST(ROUND(SUM(O.GoodsWt)/1000.0,0) AS int) as TotalWeight
        FROM
            (
            SELECT TransportID,
                GrossWt,
                GoodsWt 
            FROM VehicleOut
            WHERE CAST(TimeStampOut AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station}
            UNION ALL
            SELECT TransportID,
                0,
                0 
            FROM VehicleIn
            WHERE CAST(TimeStampIn AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station}
            ) O JOIN Transport T ON O.TransportID=T.TransportID JOIN Company C ON C.CompanyID=T.CompanyID
        --WHERE C.CompanyName like '%อุปกรณ์%'
        GROUP BY C.CompanyID, C.CompanyName) O ON O.CompanyID=T.CompanyID
        ORDER BY O.CompanyName
        `
        const result = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        const stationName = await getStationName(req.query.station)
        const data = {
            title: "GCS03 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามชื่อผู้ประกอบการ",
            station: stationName,
            startDate: reportDateTimeFormatter(req.query.startDate),
            endDate: reportDateTimeFormatter(req.query.endDate),
            reportData: result
        }
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'pGINYt4mWL' }, data: data }, { timeout: 600000 })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS03.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs04 = async (req, res, next) => {
    try {
        if (!req.query.station || !req.query.startDate || !req.query.endDate) {
            throw Error('stationId, startDate, endDate field is require!')
        }

        let extWhere = ``
        if (!!req.query.company) {
            extWhere = ` AND CompanyID = ${req.query.company}`
        }

        const sql_query = `SELECT 
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
            WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND SrcGoods>0 AND DstGoods=0
            UNION ALL
            SELECT TransportID,
                CompanyID,
                ObjectiveID,
                DstProvinceID AS ProvinceID,
                SrcGoods,
                DstGoods,
                LoadWt
            FROM Transport
            WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND SrcGoods=0 AND DstGoods>0
            UNION ALL
            SELECT TransportID,
                CompanyID,
                ObjectiveID,
                SrcProvinceID AS ProvinceID,
                SrcGoods,
                DstGoods,
                LoadWt
            FROM Transport
            WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND SrcGoods>0 AND DstGoods>0
            UNION ALL
            SELECT TransportID,
                CompanyID,
                ObjectiveID,
                DstProvinceID AS ProvinceID,
                SrcGoods,
                DstGoods,
                LoadWt
            FROM Transport
            WHERE CAST(TimeStampTx AS DATE) BETWEEN '${req.query.startDate}' AND '${req.query.endDate}' AND StationID=${req.query.station} AND SrcGoods>0 AND DstGoods>0
        ) T JOIN TxProvince P ON P.ProvinceID=T.ProvinceID JOIN Region R ON P.RegionID=R.RegionID    
    GROUP BY R.RegionID, R.Description
    ORDER BY R.RegionID
    `
        const result = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        const stationName = await getStationName(req.query.station)
        const data = {
            title: "GCS04 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามภูมิภาค ต้นทาง-ปลายทาง",
            station: stationName,
            startDate: reportDateTimeFormatter(req.query.startDate),
            endDate: reportDateTimeFormatter(req.query.endDate),
            reportData: result
        }
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'H-Uyo4wBRX' }, data: data }, { timeout: 600000 })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS04.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs05 = async (req, res, next) => {
    try {
        const sql_query = `DECLARE @d1 DATETIME2 = '2020-07-15T00:00:00' DECLARE @d2 DATETIME2 = '2020-07-15T23:59:59' DECLARE @sid INT = 1
        SELECT
            DATEPART(hour, d.qDt) AS ByDateTime,
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
            ) as d
        GROUP BY
            DATEPART(hour, qDt)
        ORDER BY
            DATEPART(hour, qDt)`
        
        const result = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        const stationName = await getStationName(req.query.station)
        const data = {
            title: "GCS05 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายชั่วโมง",
            station: stationName,
            startDate: reportDateTimeFormatter(req.query.date),
            endDate: reportDateTimeFormatter(req.query.date),
            reportData: result
        }
        // fs.writeFile('./'+Date.now()+'.txt', JSON.stringify(data), function(err) {})
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'YC7Hv2kifI' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS05.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs06 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'nIqn2H_1Dm' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS06.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs07 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'ibfh9dkO9b' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS07.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs08 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'd5bHOOHrT' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS08.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs09 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: '_IM4JK2Xm' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS09.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs10 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'VWfwYFJGWl' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS10.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs11 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'lmeMkheHI' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS11.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs12 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'fkq4q6ZFQE' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS12.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs13 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'cgwMColChR' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS13.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs14 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'GNVVZrUvf3' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS14.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs15 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'D3B-iDkJvW' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS15.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs16 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'pqtaRfZufC' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS16.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs17 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'f28KLyV9S1' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS17.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs18 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5492', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'JF7MKzyJlb' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS18.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}