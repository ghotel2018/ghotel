package com.ghotel.model.po.user;

import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.constant.JoinMethod;
import com.ghotel.model.constant.UserType;
import com.ghotel.model.po.CommonMeta;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author kekon
 * 用户表
 */
@Document(collection = DBConstant.COLLECTION_NAME_USER)
@CompoundIndexes({
        @CompoundIndex(name = "idx_user_name", def = "{'name': 1}", unique = true),
        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
})
public class User implements Serializable {

    private static final long serialVersionUID = 8390243233988184211L;

    /**
     * 唯一主键
     */
    @Id
    private String id;
    /**
     * 姓名
     */
    private String name;
    /**
     * 主要证件号码
     */
    private Certificate mainCertificate;
    /**
     * 主要联系方式
     */
    private ContactInfo mainContact;
    /**
     * 会员等级
     */
    private Integer level;
    /**
     * 用户类型
     */
    private UserType userType;
    /**
     * 加入会员时间
     */
    private Date joinDate;
    /**
     * 加入会员方式
     */
    private JoinMethod joinMethod;

    /**
     * 微信openid
     */
    private String weChatOpenId;

    /**
     * 用户证件号码
     */
    private List<Certificate> certificates;
    /**
     * 用户联系方式
     */
    private List<ContactInfo> contacts;

    /**
     * 创建时间
     */
    private Date createDate;
    /**
     * 最后更新时间
     */
    private Date lastUpdateDate;
    /**
     * 公共属性
     */
    private CommonMeta commonMeta;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Certificate getMainCertificate() {
        return mainCertificate;
    }

    public void setMainCertificate(Certificate mainCertificate) {
        this.mainCertificate = mainCertificate;
    }

    public ContactInfo getMainContact() {
        return mainContact;
    }

    public void setMainContact(ContactInfo mainContact) {
        this.mainContact = mainContact;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public JoinMethod getJoinMethod() {
        return joinMethod;
    }

    public void setJoinMethod(JoinMethod joinMethod) {
        this.joinMethod = joinMethod;
    }

    public String getWeChatOpenId() {
        return weChatOpenId;
    }

    public void setWeChatOpenId(String weChatOpenId) {
        this.weChatOpenId = weChatOpenId;
    }

    public List<Certificate> getCertificates() {
        return certificates;
    }

    public void setCertificates(List<Certificate> certificates) {
        this.certificates = certificates;
    }

    public List<ContactInfo> getContacts() {
        return contacts;
    }

    public void setContacts(List<ContactInfo> contacts) {
        this.contacts = contacts;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public CommonMeta getCommonMeta() {
        return commonMeta;
    }

    public void setCommonMeta(CommonMeta commonMeta) {
        this.commonMeta = commonMeta;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"id\":\"")
                .append(id).append('\"');
        sb.append(",\"name\":\"")
                .append(name).append('\"');
        sb.append(",\"mainCertificate\":")
                .append(mainCertificate);
        sb.append(",\"mainContact\":")
                .append(mainContact);
        sb.append(",\"level\":")
                .append(level);
        sb.append(",\"userType\":")
                .append(userType);
        sb.append(",\"joinDate\":\"")
                .append(joinDate).append('\"');
        sb.append(",\"joinMethod\":")
                .append(joinMethod);
        sb.append(",\"weChatOpenId\":\"")
                .append(weChatOpenId).append('\"');
        sb.append(",\"certificates\":")
                .append(certificates);
        sb.append(",\"contacts\":")
                .append(contacts);
        sb.append(",\"createDate\":\"")
                .append(createDate).append('\"');
        sb.append(",\"lastUpdateDate\":\"")
                .append(lastUpdateDate).append('\"');
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
