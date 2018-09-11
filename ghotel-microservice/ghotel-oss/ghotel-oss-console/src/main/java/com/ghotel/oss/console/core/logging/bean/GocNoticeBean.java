package com.ghotel.oss.console.core.logging.bean;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * @author kekon
 */
@Document(collection = "ghotel_notice")
public class GocNoticeBean implements Serializable {

    private static final long serialVersionUID = -9189212866927197872L;
    @Id
    private String noticeId;
    private String noticeSubject;
    private String noticeType;
    private String noticeContent;
    private String noticeReceiver;
    private String createTime;
    private String startTime;
    private String endTime;
    private String module;

    public String getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(String noticeId) {
        this.noticeId = noticeId;
    }

    public String getNoticeSubject() {
        return noticeSubject;
    }

    public void setNoticeSubject(String noticeSubject) {
        this.noticeSubject = noticeSubject;
    }

    public String getNoticeType() {
        return noticeType;
    }

    public void setNoticeType(String noticeType) {
        this.noticeType = noticeType;
    }

    public String getNoticeContent() {
        return noticeContent;
    }

    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }

    public String getNoticeReceiver() {
        return noticeReceiver;
    }

    public void setNoticeReceiver(String noticeReceiver) {
        this.noticeReceiver = noticeReceiver;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"noticeId\":\"")
                .append(noticeId).append('\"');
        sb.append(",\"noticeSubject\":\"")
                .append(noticeSubject).append('\"');
        sb.append(",\"noticeType\":\"")
                .append(noticeType).append('\"');
        sb.append(",\"noticeContent\":\"")
                .append(noticeContent).append('\"');
        sb.append(",\"noticeReceiver\":\"")
                .append(noticeReceiver).append('\"');
        sb.append(",\"createTime\":\"")
                .append(createTime).append('\"');
        sb.append(",\"startTime\":\"")
                .append(startTime).append('\"');
        sb.append(",\"endTime\":\"")
                .append(endTime).append('\"');
        sb.append(",\"module\":\"")
                .append(module).append('\"');
        sb.append('}');
        return sb.toString();
    }
}
