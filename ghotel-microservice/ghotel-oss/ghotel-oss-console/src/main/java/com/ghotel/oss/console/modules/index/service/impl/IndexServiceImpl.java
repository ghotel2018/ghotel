package com.ghotel.oss.console.modules.index.service.impl;

import com.ghotel.oss.console.core.logging.dao.GocNoticeRepository;
import com.ghotel.oss.console.core.utils.BeanUtil;
import com.ghotel.oss.console.modules.admin.bean.PaginationResult;
import com.ghotel.oss.console.modules.index.bean.NoticeSearchCriteria;
import com.ghotel.oss.console.modules.index.bean.TaskSearchCriteriaBean;
import com.ghotel.oss.console.modules.index.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class IndexServiceImpl implements IndexService {

    @Autowired
    private GocNoticeRepository gocNoticeRepository;

    @Override
    public PaginationResult getTasks(TaskSearchCriteriaBean object) throws Exception {
        Map map = BeanUtil.transBean2Map(object);
        PaginationResult result = new PaginationResult();
        result.setStart(object.getStart());
        result.setNum(object.getEnd());
//		result.setTotal(mapper.countAllTasks(map));
//		result.setList(mapper.getAllTasks(map));
        return result;
    }

    @Override
    public PaginationResult getNotices(NoticeSearchCriteria object) throws Exception {
        Map map = BeanUtil.transBean2Map(object);
        PaginationResult result = new PaginationResult();
        result.setStart(object.getStart());
        result.setNum(object.getEnd());
		result.setTotal((int)(gocNoticeRepository.count()));
        Pageable pageable = new PageRequest(object.getStart(),object.getEnd(),new Sort("createTime","DESC"));
        result.setList(gocNoticeRepository.findAll(pageable).getContent());
        return result;
    }


    @Override
    public List getExecutingTask() {
        // TODO Auto-generated method stub
//		return this.mapper.getExecutingTasks();
        return null;
    }


    @Override
    public PaginationResult getTasksByJobType(TaskSearchCriteriaBean object) throws Exception {
        // TODO Auto-generated method stub
        PaginationResult result = new PaginationResult();
        result.setStart(object.getStart());
        result.setNum(object.getEnd());
//		result.setTotal(mapper.countAllTasksByType(BeanUtil.transBean2Map(object)));
//		result.setList(mapper.getTasksByJobType(object));
        return result;
    }

    @Override
    public int finishTask(TaskSearchCriteriaBean object) {
//		return this.mapper.finishTask(object);
        return 0;
    }

    //TODO
    @Override
    public List<Map<String, String>> getStatistics() {
        List<Map<String, String>> returnList = new ArrayList<Map<String, String>>();
        // Map<String, String> map1 = mapper.statisticTopUserNotice(null);
        // map1.put("name", "七天内操作第一");
        // returnList.add(map1);
        // Map<String, String> map4 = mapper.statisticTopUserTask(null);
        // map4.put("name", "七天内总任务第一");
        // returnList.add(map4);
        // Map<String, String> map2 = mapper.statisticTopUserNotice("1");
        // map2.put("name", "总操作第一");
        // returnList.add(map2);
        // Map<String, String> map3 = mapper.statisticTopUserTask("1");
        // map3.put("name", "总任务第一");
        // returnList.add(map3);
        return returnList;
    }

    @Override
    public int updateTaskResult(Map map) {
//		return this.mapper.updateTaskResult(map);
        return 0;
    }

}
