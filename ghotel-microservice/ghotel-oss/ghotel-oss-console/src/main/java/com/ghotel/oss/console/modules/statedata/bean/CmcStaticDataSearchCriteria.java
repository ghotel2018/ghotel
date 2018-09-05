package com.ghotel.oss.console.modules.statedata.bean;

import java.util.Date;

import com.ghotel.oss.console.core.common.bean.PaginationBean;

public class CmcStaticDataSearchCriteria extends PaginationBean {
    /** 类型 */
    private String typeKey;

    /** code */
    private String typeCode;

    /** 值  */
    private String value;

    /** 名称 */
    private String name;

    /** 备注 */
    private String description;

    /**创建人 */
    private String createBy;

    /** 修改人 */
    private String optBy;

    /** 创建时间 */
    private Date createDate;

    /** 修改时间 */
    private Date optDate;
    /**
     * 1启动  0不启动用
     */
    private int status;
    
    private String id;
    

    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTypeKey() {
        return typeKey;
    }

    public void setTypeKey(String typeKey) {
        this.typeKey = typeKey;
    }

    public String getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(String typeCode) {
        this.typeCode = typeCode;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getOptBy() {
        return optBy;
    }

    public void setOptBy(String optBy) {
        this.optBy = optBy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getOptDate() {
        return optDate;
    }

    public void setOptDate(Date optDate) {
        this.optDate = optDate;
    }

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
    
}