package com.ghotel.oss.console.core.logging.bean;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * @author kekon
 */
@Document(collection = "ghotel_operation_log")
public class GocLogBean implements Serializable {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 5978473562443342160L;

    @Id
    private String logId;

    private String logModule;

    private String logAction;

    private String logParamter;

    private String logDate;

    private String logTime;

    public String getLogId() {
        return logId;
    }

    public void setLogId(String logId) {
        this.logId = logId;
    }

    public String getLogModule() {
        return logModule;
    }

    public void setLogModule(String logModule) {
        this.logModule = logModule;
    }

    public String getLogAction() {
        return logAction;
    }

    public void setLogAction(String logAction) {
        this.logAction = logAction;
    }

    public String getLogParamter() {
        return logParamter;
    }

    public void setLogParamter(String logParamter) {
        this.logParamter = logParamter;
    }

    public String getLogDate() {
        return logDate;
    }

    public void setLogDate(String logDate) {
        this.logDate = logDate;
    }

    public String getLogTime() {
        return logTime;
    }

    public void setLogTime(String logTime) {
        this.logTime = logTime;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"logId\":\"")
                .append(logId).append('\"');
        sb.append(",\"logModule\":\"")
                .append(logModule).append('\"');
        sb.append(",\"logAction\":\"")
                .append(logAction).append('\"');
        sb.append(",\"logParamter\":\"")
                .append(logParamter).append('\"');
        sb.append(",\"logDate\":\"")
                .append(logDate).append('\"');
        sb.append(",\"logTime\":\"")
                .append(logTime).append('\"');
        sb.append('}');
        return sb.toString();
    }
}
