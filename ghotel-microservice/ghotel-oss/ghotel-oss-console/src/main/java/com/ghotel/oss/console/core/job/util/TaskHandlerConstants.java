package com.ghotel.oss.console.core.job.util;

public class TaskHandlerConstants {

	public static final String COUPON_CONDITION_REPLACEMENT_SEGMENT_KEY = "{exportCouponWhereConditionSql}";

	public static final String EXPORT_AES_KEY_CONDITION_REPLACEMENT_SEGMENT_KEY = "{elements}";

	public static final String EXPORT_COUPON_REPORT_PROCEEDOR_NAME = "ExportCouponReportDataProceedor";


	/**优惠推广链接导出名称*/
	public static final String EXPORT_GENERALINK_NAME = "ExportGenLinkReportProceedor";

	/**优惠券充值报表*/
	public static final String EXPORT_ADD_COUNP_ACCOUNT_NAME = "exportCoupAccounRecProceedor";
	public static final String EXPORT_LOWESTFAREGUARENTEE_NAME = "ExportB2cLowestFareGuarantee";

	public static final String EXPORT_AES_KEY_BY_GROUP_ID_PROCEEDOR_NAME = "ExportAesKeyByGroupIdProceedor";

	public static final String EXPORT_AES_KEY_BY_DISCOUNT_CODE_PROCEEDOR_NAME = "ExportAesKeyByDiscountCodeProceedor";

	/** 抽奖活动_获取名单报表导出 */
	public static final String EXPROT_RAFFLE_POINT_PROCEEDOR_NAME = "ExportRafflePointProceedor";
	/**
	 * 优惠券报表导出
	 */
	public static final String EXPROT_COUOMGROUP_NAME = "ExportCouponGroupReportProceed";
	/**优惠券发放接导出名称*/
	public static final String EXPORT_COUPON_ISSU_NAME = "exportCoupIssuRecProceedor";

	/** 抽奖活动_活动统计报表导出 */
	public static final String EXPROT_ACTIVITY_STATISTICS_PROCEEDOR_NAME = "ExportActivityStatisticsProceedor";

	/** 抽奖活动兑换积分报表导出*/
	public static final String EXPROT_ExchangePointsReport_PROCEEDOR_NAME="ExportExchangePointsReportProceedor";

	/** 发放渠道管理报表导出 */
	public static final String EXPROT_DISTRIBUTION_CHANNEL_PROCEEDOR_NAME = "ExportDistributionChannelProceedor";

	/** 日志管理报表导出 */
	public static final String EXPROT_NOTICE_PROCEEDOR_NAME = "ExportNoticeMntProceedor";

	/** 优惠券日志管理*/
	public static final String EXPROT_COUPONNOTICE_PROCEEDOR_NAME = "ExportCouponNoticeMntProceedor";
	/** 航班舱位库存管理管理报表导出 */
	public static final String EXPROT_FLIGHTINVENTORY_PROCEEDOR_NAME = "ExportFlightInventoryProceedor";

	/** 运价券与会员直减管理报表导出 */
	public static final String EXPROT_RATE_COUPON_PROCEEDOR_NAME = "ExportRateCouponMntProceedor";

	/** 使用条件报表导出 */
	public static final String EXPROT_USECONDITIONS_PROCEEDOR_NAME = "ExportUseConditionsProceedor";


	/** 推广渠道设置 */
	public static final String EXPORT_POPULARIZING_CHANNELS_SETTING_NAME = "ExportPopularizingChannelsSettingProceedor";

	public static final String EXPORT_DISCOUNT_ACTIVITIES_NAME = "ExportDiscountActivitiesProceedor";

	public static final String EXPORT_CHANNELS_CONFIG_NAME = "ExportChannelsConfigProceedor";

	/** PNR信息报表导出*/
	public static final String EXPORT_PNR_INFO_PROCEEDOR_NAME="exportPnrInfoProceedor";

	public static final String EXPROT_MARKETING_ACTIVITY_PROCEEDOR_NAME = "ExportMarketingActivityProceedor";

	/**
	 * 机场信息报表导出
	 */
	public static final String EXPORT_AIRPORTSLIST_PROCEEDOR_NAME="ExportAirPortsListProceedor";

	/** 城市字典信息报表导出*/
	public static final String EXPORT_CITYLIST_PROCEEDOR_NAME="ExportCityListProceedor";

	/** 机型字典信息报表导出*/
	public static final String EXPORT_PLANETYPELOCALE_PROCEEDOR_NAME="exportPlaneTypeLocaleProceedor";
	public static final String EXPORT_CHI_MONITOR_PROCEEDOR_NAME="exportChi_MonitorProceedor";
	/** 销售统计报表导出*/
	public static final String EXPORT_SaleStatistics_PROCEEDOR_NAME="exportSaleStatisticsProceedor";

	/** 预约单信息报表导出*/
	public static final String EXPORT_RESERVAINFOLIST_PROCEEDOR_NAME="exportReservationInfoListProceedor";

	/** 优享飞规则数据报表导出*/
	public static final String ENJOYFLY_PROCEEDOR_NAME="ExportEnjoyFlyProceedor";
	
	public static final String  COUPON_EXPORT_REPORT_SQL = "SELECT L.*, dc.NAME as CHANNEL_NAME FROM"
			+ " ( SELECT H.* "
			+ " FROM ( "
			+ "		SELECT R.*,ROWNUM RN  FROM ( "
			+ " 		SELECT t.id,"
			+ " 		NVL(t.discountcode_m, t.discountcode) as DISCOUNT_CODE,"
			+ " 		t.groupid as GROUP_ID, "
			+ " 		decode(g.discounttype,0,'收入现金优惠券',1,'运价优惠卷',2,'费用现金优惠券','') as DISCOUNT_TYPE, "
			+ " 		t.facevalue as FACE_VALUE, "
			+ " 		g.CHANNELID,"
			+ " 		nvl(t.bindmember,'') as BINDING_MEMEBER, "
			+ " 		nvl(t.bindid,'') as BINDING_ID, "
			+ " 		nvl(t.bindmobile,'') as BINDING_CELL_PHONE, "
			+ " 		decode(t.pastflag,1,'已过期',decode(t.status,0,'未发放',1,'未使用',2,'已挂起',3,'已使用',4,'已作废','')) as STATUS, "
			+ " 		nvl2(g.flightdate,substr(g.flightdate,0,10),'') as FLIGHT_DATE_START, "
			+ " 		nvl2(g.flightdate,substr(g.flightdate,12),'') as FLIGHT_DATE_END, "
			+ " 		nvl2(g.usefuldate,substr(g.USEFULDATE,0,10),'') as USE_DATE_START , "
			+ " 		nvl2(g.usefuldate,substr(g.USEFULDATE,12),'') as USE_DATE_END, "
			+ " 		'\"'||g.cabintype||'\"' as CANBIN_TYPE, "
			+ " 		g.segpricelimit as SEG_PRICE_LIMIT, "
			+ " 		to_char(g.createdate,'yyyy-mm-dd') as CREATE_DATE, "
			+ " 		nvl2(g.segmenttype,decode(g.segmenttype,0,'无限制',1,'航段（包含）',2,'航段（除外）',3,'始发城市（包含）',4,'始发城市（除外）',5,'到达城市（包含）',6,'到达城市（除外）',g.segmenttype) ,'') as SEGMENT_TYPE, "
			+ " 		nvl(g.segmentinfo, '') as SEGMENT_INFO, "
			+ " 		nvl2(t.givedate,to_char(t.givedate,'yyyy-mm-dd'),'未发放') as ISSUE_DATE, "
			+ " 		g.rateid as RATE_ID, "
			+ " 		decode(g.userestriction,'1','绑定会员号时不限乘机人使用','2','绑定会员号时仅限会员本人使用','3','绑定会员号时仅限会员和受让人使用',g.userestriction) as USE_RESTRICTION "
			+ " 		FROM "
			+ " 			discount_info t ,"
			+ " 			discount_groupinfo g"
			+ " 			WHERE t.groupid = g.groupid "
			+ " 			{exportCouponWhereConditionSql} "
			+ " 		) R where ROWNUM <=?  "
			+ " ) H WHERE H.RN >=? "
			+ " ) L , DISCOUNT_CHANNELS dc  where L.CHANNELID = DC.ID";

	public static final String COUPON_EXPORT_REPORT_GET_COUPON_SQL = "SELECT H.* "
			+ " FROM ( "
			+ " select G.* , ROWNUM RN  FROM ("
			+ "     SELECT  "
			+ "       t.id, "
			+ "       t.discountcode_m as DISCOUNT_CODE_M,"
			+ "		  t.discountcode as DISCOUNT_CODE, "
			+ "       t.groupid as GROUP_ID,"
			+ "       g.created_by as CREATED_BY,"
			+ "       t.bindmember as BINDING_MEMEBER, "
			+ "       t.bindid as BINDING_ID, "
			+ "       t.bindmobile as BINDING_CELL_PHONE, "
			+ "       t.pastflag as PAST_FLAG,"
			+ "		  t.status as STATUS,"
			+ "       t.givedate as ISSUE_DATE, "
			+ "       t.USEDATE as USED_DATE, "
			+ "       nvl2(t.usefuldate,substr(t.USEFULDATE,12),'') as USE_DATE_END,  "
			+ "		  t.createdate "
			+ "     FROM  "
			+ "       discount_info t , "
			+ "       discount_groupinfo g "
			+ "     WHERE t.groupid = g.groupid "
			+ " 	{exportCouponWhereConditionSql} "
			+ " 	union "
			+ "     SELECT  "
			+ "       t.id, "
			+ "       t.discountcode_m as DISCOUNT_CODE_M,"
			+ "		  t.discountcode as DISCOUNT_CODE, "
			+ "       t.groupid as GROUP_ID,"
			+ "       g.created_by as CREATED_BY,"
			+ "       t.bindmember as BINDING_MEMEBER, "
			+ "       t.bindid as BINDING_ID, "
			+ "       t.bindmobile as BINDING_CELL_PHONE, "
			+ "       t.pastflag as PAST_FLAG,"
			+ "		  t.status as STATUS,"
			+ "       t.givedate as ISSUE_DATE, "
			+ "       t.USEDATE as USED_DATE, "
			+ "       nvl2(t.usefuldate,substr(t.USEFULDATE,12),'') as USE_DATE_END,  "
			+ "		  t.createdate "
			+ "     FROM  "
			+ "       BACKUP_DISCOUNT_INFO t , "
			+ "       discount_groupinfo g "
			+ "     WHERE t.groupid = g.groupid "
			+ " 	{exportCouponWhereConditionSql} "
			+ " ) g where ROWNUM <= ? "
			+ " order by g.createdate "
			+ " ) H WHERE H.RN >=? ";

	public static final String COUPON_EXPORT_REPORT_GET_GROUP_SQL = "select "
			+ " dg.groupId as GROUP_ID, "
			+ " decode(dg.discounttype,0,'收入现金优惠券',1,'运价优惠卷',2,'费用现金优惠券','') as DISCOUNT_TYPE,  "
			+ " dg.CHANNELID, "
			+ " nvl2(dg.flightdate,substr(dg.flightdate,0,10),'') as FLIGHT_DATE_START,  "
			+ " nvl2(dg.flightdate,substr(dg.flightdate,12),'') as FLIGHT_DATE_END,  "
			+ " nvl2(dg.usefuldate,substr(dg.USEFULDATE,0,10),'') as USE_DATE_START ,  "
			//+ " nvl2(dg.usefuldate,substr(dg.USEFULDATE,12),'') as USE_DATE_END,  "
			+ " '\"'||dg.cabintype||'\"' as CANBIN_TYPE,  "
			+ " dg.segpricelimit as SEG_PRICE_LIMIT,  "
			+ " to_char(dg.createdate,'yyyy-mm-dd') as CREATE_DATE,  "
			+ " nvl2(dg.segmenttype,decode(dg.segmenttype,0,'无限制',1,'航段（包含）',2,'航段（除外）',3,'始发城市（包含）',4,'始发城市（除外）',5,'到达城市（包含）',6,'到达城市（除外）',dg.segmenttype) ,'') as SEGMENT_TYPE,  "
			+ " nvl(dg.segmentinfo, '') as SEGMENT_INFO,  "
			+ " dg.rateid as RATE_ID,  "
			+ " decode(dg.userestriction,'1','绑定会员号时不限乘机人使用','2','绑定会员号时仅限会员本人使用','3','绑定会员号时仅限会员和受让人使用',dg.userestriction) as USE_RESTRICTION , "
			+ " dc.name as CHANNEL_NAME ,"
			+ " dg.facevalue as FACE_VALUE"
			+ " FROM DISCOUNT_GROUPINFO dg "
			+ " left join DISCOUNT_CHANNELS dc on  dg.channelid = dc.id and dc.status =1  "
			+ " inner join ( "
			+ " SELECT  "
			+ " t.groupid "
			+ " FROM discount_info t ,discount_groupinfo g "
			+ " WHERE t.groupid = g.groupid "
			+ " {exportCouponWhereConditionSql} "
			+ " GROUP BY t.groupid ) r on dg.groupid = r.groupid "
			+ " union "
			+ "select "
			+ " dg.groupId as GROUP_ID, "
			+ " decode(dg.discounttype,0,'收入现金优惠券',1,'运价优惠卷',2,'费用现金优惠券','') as DISCOUNT_TYPE,  "
			+ " dg.CHANNELID, "
			+ " nvl2(dg.flightdate,substr(dg.flightdate,0,10),'') as FLIGHT_DATE_START,  "
			+ " nvl2(dg.flightdate,substr(dg.flightdate,12),'') as FLIGHT_DATE_END,  "
			+ " nvl2(dg.usefuldate,substr(dg.USEFULDATE,0,10),'') as USE_DATE_START ,  "
			//+ " nvl2(dg.usefuldate,substr(dg.USEFULDATE,12),'') as USE_DATE_END,  "
			+ " '\"'||dg.cabintype||'\"' as CANBIN_TYPE,  "
			+ " dg.segpricelimit as SEG_PRICE_LIMIT,  "
			+ " to_char(dg.createdate,'yyyy-mm-dd') as CREATE_DATE,  "
			+ " nvl2(dg.segmenttype,decode(dg.segmenttype,0,'无限制',1,'航段（包含）',2,'航段（除外）',3,'始发城市（包含）',4,'始发城市（除外）',5,'到达城市（包含）',6,'到达城市（除外）',dg.segmenttype) ,'') as SEGMENT_TYPE,  "
			+ " nvl(dg.segmentinfo, '') as SEGMENT_INFO,  "
			+ " dg.rateid as RATE_ID,  "
			+ " decode(dg.userestriction,'1','绑定会员号时不限乘机人使用','2','绑定会员号时仅限会员本人使用','3','绑定会员号时仅限会员和受让人使用',dg.userestriction) as USE_RESTRICTION , "
			+ " dc.name as CHANNEL_NAME ,"
			+ " dg.facevalue as FACE_VALUE"
			+ " FROM DISCOUNT_GROUPINFO dg "
			+ " left join DISCOUNT_CHANNELS dc on dg.channelid = dc.id and dc.status =1 "
			+ " inner join ( "
			+ " SELECT  "
			+ " t.groupid "
			+ " FROM BACKUP_DISCOUNT_INFO t ,discount_groupinfo g "
			+ " WHERE t.groupid = g.groupid "
			+ " {exportCouponWhereConditionSql} "
			+ " GROUP BY t.groupid ) r on dg.groupid = r.groupid  ";

	public static final String  COUNT_COUPON_EXPORT_REPORT_SQL = " SELECT count(F.id) from ("
			+"SELECT t.id "
			+" FROM "
			+" discount_info t ,  "
			+" discount_groupinfo g "
			+" WHERE t.groupid = g.groupid "
			+" {exportCouponWhereConditionSql}  "
			+" union "
			+"SELECT t.id "
			+" FROM "
			+" backup_discount_info t ,  "
			+" discount_groupinfo g "
			+" WHERE t.groupid = g.groupid "
			+" {exportCouponWhereConditionSql}  "
			+" ) f";


	public static final String EXPORT_AES_KEY_BY_GROUP_ID_SQL = "select  "
			+" ''''||dg.groupid as groupid ,  "
			+" NVL2(dg.aeskey,dg.aeskey,'无对应批号密钥') as aeskey  "
			+" from discount_groupinfo dg  "
			+" where dg.groupid in  "
			+ " ( {elements} ) " ;

	public static final String EXPORT_AES_KEY_BY_DISCOUNT_CODE_SQL = "SELECT di.discountcode_M, "
			+" NVL2(dg.aeskey,dg.aeskey,'无对应批号密钥') as aeskey "
			+" FROM discount_groupinfo dg left join discount_info di on dg.GROUPID = di.GROUPID "
			+" WHERE di.discountcode_M in "
			+" ( {elements} )"
			+" union "
			+ "SELECT di.discountcode_M, "
			+" NVL2(dg.aeskey,dg.aeskey,'无对应批号密钥') as aeskey "
			+" FROM discount_groupinfo dg left join BACKUP_DISCOUNT_INFO di on dg.GROUPID = di.GROUPID "
			+" WHERE di.discountcode_M in "
			+" ( {elements} )";

	public static final String Export_B2cLowestFareGuarantee_BY_SEACH_CONDITION="";

	public static final String EXPORT_CITYWIDGET_AIRPORTINFO = "ExportCityWidgetAirportInfoProceedor";

	public static final String EXPORT_CITYWIDGET_CITYINFO = "ExportCityWidgetCityInfoProceedor";

	public static final String EXPORT_CITYWIDGET_TOURISTSPOTINFO = "ExportCityWidgetTouristSpotInfoProceedor";
	
	public static final String EXPORT_MILITARYREMNANTS = "ExportMilitaryRemnantsProceedor";

}
