package com.ghotel.oss.console.modules.scheduler.contant;

/*
 * schedules任务入库前状态对应中文描述
 */
public enum SchedulerStatusEnum{
	
	JOBSTATUS_0("未启动"),
	JOBSTATUS_1("执行中"),
	JOBSTATUS_ERROR("出错"),
	JOBSTATUS_2("挂起"),
	JOBAUTOSTART_0("不自动启动"),
	JOBAUTOSTART_1("自动启动"),
	JOBENABLE_0("未启用"),
	JOBENABLE_1("已启用"),
	;
	 
	private final String desc;
	
	private SchedulerStatusEnum(String desc) {
		this.desc = desc;
	}


	public String getDesc() {
		return this.desc;
	}

}
