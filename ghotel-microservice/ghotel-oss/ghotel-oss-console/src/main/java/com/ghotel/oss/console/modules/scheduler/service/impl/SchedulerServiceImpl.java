package com.ghotel.oss.console.modules.scheduler.service.impl;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.ghotel.oss.console.core.common.service.AbstractPaginationCommonServiceWrapper;
import com.ghotel.oss.console.core.logging.annotation.GocLogAnnotation;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceBean;
import com.ghotel.oss.console.modules.scheduler.bean.JobInstanceSearchBean;
import com.ghotel.oss.console.modules.scheduler.service.SchedulerService;

@GocLogAnnotation(moduleId = "Scheduler")
@Service
public class SchedulerServiceImpl extends AbstractPaginationCommonServiceWrapper implements SchedulerService {

	@Override
	public void updateToStartJob(JobInstanceBean bean) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateToStopJob(JobInstanceBean bean) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateToPauseAllJobs() throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateToStartAllJobs() throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void resetTaskStatus(JobInstanceSearchBean bean) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public List<JobInstanceBean> selectJobInstanceByIpAndPort(JobInstanceSearchBean searchBean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int addJobInstance(JobInstanceBean bean) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteJobInstance(JobInstanceBean bean) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void updateLastTimeStampByIpAndPort(JobInstanceBean bean) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateHeartBeatInfoByIpAndPort(JobInstanceBean bean) {
		// TODO Auto-generated method stub

	}

	@Override
	public void runJobOne(JobInstanceBean bean) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	protected MongoRepository getRepository() {
		// TODO Auto-generated method stub
		return null;
	}

	// SchedulerMapper mapper;
	//
	// @Override
	// public void setMapper(ICommonDao mapper) {
	// this.mapper =(SchedulerMapper) mapper;
	// this.setAdapter(mapper);
	//
	// }
	//
	// @CmcLogginAnnotation(description="更新调度工作信息")
	// public int update(Object object) throws Exception {
	// JobDetailInfoBean bean = (JobDetailInfoBean)object;
	/// * JobDetailInfoBean oldbean = (JobDetailInfoBean) get(bean.getJobId());
	// if(oldbean!=null
	// && bean.getJobCronExp()!=null
	// && bean.getJobCronExp().length()>0
	// && SchedulerConstant.JOB_STATUS_RUNNING.equals( bean.getJobStatus()+"")
	// && !oldbean.getJobCronExp().equals(bean.getJobCronExp())){
	// QuartzJobManager.modifyJobTime(bean.getJobId(), bean.getJobCronExp());
	// }*/
	// return super.update(object);
	// }
	//
	// @CmcLogginAnnotation(description="停止所有调度工作")
	// public void updateToPauseAllJobs() throws Exception {
	// QuartzJobManager.removeAllJobs();
	// Map<String,String> map = new HashMap<String,String>();
	// map.put("oldStatus", SchedulerConstant.JOB_STATUS_RUNNING);
	// map.put("newStatus", SchedulerConstant.JOB_STATUS_PAUSE);
	// mapper.updateJobStatus(map);
	// }
	//
	// @CmcLogginAnnotation(description="启动所有调度工作")
	// public void updateToStartAllJobs() throws Exception {
	// QuartzJobManager.startScheduler();
	// // get All enable and available job;
	// JobSearchCriteriaBean bean = new JobSearchCriteriaBean();
	// bean.setStart(1);
	// bean.setEnd(9999);
	// bean.setJobEnableInd(SchedulerConstant.JOB_ENABLED);
	// bean.setJobStatus(SchedulerConstant.JOB_STATUS_AVAILABLE);
	// proceedToStartAllAvaliableJob(bean);
	//
	// bean.setJobStatus(SchedulerConstant.JOB_STATUS_PAUSE);
	// proceedToStartAllPausedJob(bean);
	//
	// }
	//
	// @CmcLogginAnnotation(description="启动调度工作信息")
	// public void updateToStartJob(JobDetailInfoBean object) throws Exception {
	// if(QuartzJobManager.findJob(object.getJobId())==null){
	// QuartzJobManager.addJob(object.getJobId(), (Class<? extends
	// Job>)Class.forName(object.getHandler()), object.getJobCronExp());
	// Map<String ,String> params = new HashMap<String ,String>();
	// params.put("newJobStatus", SchedulerConstant.JOB_STATUS_RUNNING);
	// params.put("jobId", object.getJobId());
	// mapper.updateJobStatus(params);
	// }
	// }
	//
	// @CmcLogginAnnotation(description="停止调度工作信息")
	// public void updateToStopJob(JobDetailInfoBean object) throws Exception {
	// //if(QuartzJobManager.findJob(object.getJobId())==null){
	// QuartzJobManager.removeJob(object.getJobId());
	// Map<String ,String> params = new HashMap<String ,String>();
	// params.put("newJobStatus", SchedulerConstant.JOB_STATUS_PAUSE);
	// params.put("jobId", object.getJobId());
	// mapper.updateJobStatus(params);
	// // }
	//
	// }
	//
	// private void proceedToStartAllAvaliableJob(JobSearchCriteriaBean bean )throws
	// Exception{
	// List<JobDetailInfoBean> availableList =
	// (List<JobDetailInfoBean>)mapper.getAll(bean);
	// for(JobDetailInfoBean abean : availableList){
	// QuartzJobManager.addJob(abean.getJobId(), (Class<? extends
	// Job>)Class.forName(abean.getHandler()), abean.getJobCronExp());
	// }
	// Map<String ,String> params = new HashMap<String ,String>();
	// params.put("oldStatus", SchedulerConstant.JOB_STATUS_AVAILABLE);
	// params.put("newStatus", SchedulerConstant.JOB_STATUS_RUNNING);
	// mapper.updateJobStatus(params);
	// }
	//
	// private void proceedToStartAllPausedJob(JobSearchCriteriaBean bean ) throws
	// Exception{
	// List<JobDetailInfoBean> pasuedList =
	// (List<JobDetailInfoBean>)mapper.getAll(bean);
	// for(JobDetailInfoBean abean : pasuedList){
	// QuartzJobManager.addJob(abean.getJobId(), (Class<? extends
	// Job>)Class.forName(abean.getHandler()), abean.getJobCronExp());
	// }
	// Map<String ,String> params = new HashMap<String ,String>();
	// params.put("oldStatus", SchedulerConstant.JOB_STATUS_PAUSE);
	// params.put("newStatus", SchedulerConstant.JOB_STATUS_RUNNING);
	// mapper.updateJobStatus(params);
	// }
	//
	// @Override
	// public void resetTaskStatus(JobInstanceSearchBean bean) throws Exception {
	// mapper.resetTaskStatus(bean);
	// }
	//
	// @Override
	// public List<JobInstanceBean> selectJobInstanceByIpAndPort(
	// JobInstanceSearchBean searchBean) {
	// return mapper.selectJobInstanceByIpAndPort(searchBean);
	// }
	//
	// @Override
	// @CmcLogginAnnotation(description="注册实例")
	// public int addJobInstance(JobInstanceBean bean) {
	// return mapper.addJobInstance(bean);
	// }
	//
	//
	// @Override
	// @CmcLogginAnnotation(description="注销实例")
	// public int deleteJobInstance(JobInstanceBean bean) {
	// return mapper.deleteJobInstance(bean);
	// }
	//
	//
	// @Override
	// public void updateToStartJob(JobInstanceBean bean) throws Exception {
	// JobDetailInfoBean jobBean = (JobDetailInfoBean)mapper.get(bean.getJobId());
	// if(QuartzJobManager.findJob(jobBean.getJobId())!=null){
	// return;
	// }
	// if(jobBean.getHandlerType() == JobConstants.HANDLER_TYPE_INTERFACE ){
	// QuartzJobManager.addJob(jobBean.getJobId(),
	// RemoteInterfaceCallerHandler.class, jobBean.getJobCronExp());
	// }else{
	// QuartzJobManager.addJob(jobBean.getJobId(), (Class<? extends
	// Job>)Class.forName(jobBean.getHandler()), jobBean.getJobCronExp());
	// }
	//
	// bean.setStatus(JobInstanceConstant.JOB_INSTANCE_STATUS_RUNNING);
	// bean.setErrMsg(null);
	// bean.setHealthStatus(0);
	// bean.setErrNum(0);
	// mapper.updateJobInstance(bean);
	// }
	//
	// @Override
	// public void updateToStopJob(JobInstanceBean bean) throws Exception {
	// JobDetailInfoBean jobBean = (JobDetailInfoBean)mapper.get(bean.getJobId());
	// if(QuartzJobManager.findJob(jobBean.getJobId()) != null){
	// QuartzJobManager.removeJob(jobBean.getJobId());
	// }
	// bean.setStatus(JobInstanceConstant.JOB_INSTANCE_STATUS_AVAILABLE);
	// bean.setHealthStatus(0);
	// mapper.updateJobInstance(bean);
	// }
	//
	// @Override
	// public void updateLastTimeStampByIpAndPort(JobInstanceBean bean) {
	// mapper.updateLastTimeStampByIpAndPort(bean);
	// }
	//
	// @Override
	// public void updateHeartBeatInfoByIpAndPort(JobInstanceBean bean) {
	// mapper.updateHeartBeatInfoByIpAndPort(bean);
	// }
	//
	// @Override
	// public void runJobOne(final JobInstanceBean bean) throws Exception {
	// final JobDetailInfoBean jobBean = (JobDetailInfoBean)
	// mapper.get(bean.getJobId());
	// new Thread(new Runnable (){
	// @Override
	// public void run() {
	// try {
	// String handlerClass = jobBean.getHandler();
	// if (jobBean.getHandlerType() == JobConstants.HANDLER_TYPE_INTERFACE) {
	// RemoteInterfaceCallerHandler.class.getMethod("execute",JobInstanceBean.class).invoke(Class.forName(handlerClass).newInstance(),
	// bean);
	// } else {
	// Class.forName(handlerClass).getMethod("execute",JobInstanceBean.class).invoke(Class.forName(handlerClass).newInstance(),
	// bean);
	// }
	// } catch (Exception e) {
	// e.printStackTrace();
	// }
	// }
	//
	// }).start();
	//
	//
	// }
}
