package com.ghotel.model.po.user;

import com.ghotel.model.annotation.CascadeSave;
import com.ghotel.model.constant.AccountStatus;
import com.ghotel.model.constant.DBConstant;
import com.ghotel.model.po.CommonMeta;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * 用户账号表
 */
@Document(collection = DBConstant.COLLECTION_NAME_ACCOUNT)
@CompoundIndexes({
        @CompoundIndex(name = "idx_account_name", def = "{'name': 1}", unique = true),
        @CompoundIndex(name = "idx_commonMeta_createTime", def = "{'commonMeta.createTime': 1}")
})
public class Account implements Serializable {

    private static final long serialVersionUID = -5772682191556046789L;

    /**
     * 唯一主键
     */
    @Id
    private String id;
    /**
     * 登录用户名
     */
    private String name;
    /**
     * 登录密码
     */
    private String password;

    /**
     * //TODO 这个是啥
     */
    private Integer registertype;
    /**
     * 账号状态
     */
    private AccountStatus status;


    /**
     * 关联的用户表
     */
    @DBRef
    @CascadeSave
    private User associateUser;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRegistertype() {
        return registertype;
    }

    public void setRegistertype(Integer registertype) {
        this.registertype = registertype;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public User getAssociateUser() {
        return associateUser;
    }

    public void setAssociateUser(User associateUser) {
        this.associateUser = associateUser;
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
        sb.append(",\"password\":\"")
                .append(password).append('\"');
        sb.append(",\"registertype\":")
                .append(registertype);
        sb.append(",\"status\":")
                .append(status);
        sb.append(",\"associateUser\":")
                .append(associateUser);
        sb.append(",\"commonMeta\":")
                .append(commonMeta);
        sb.append('}');
        return sb.toString();
    }
}
