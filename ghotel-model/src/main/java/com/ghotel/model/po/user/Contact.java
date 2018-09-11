package com.ghotel.model.po.user;

import com.ghotel.model.annotation.CascadeSave;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.List;

/**
 * @author kekon
 * 联系人
 */
public class Contact implements Serializable {

    private static final long serialVersionUID = 3339505642650059678L;

    /**
     * 联系人姓名
     */
    private String name;

    /**
     * 联系方式
     */
    private List<ContactInfo> contactInfos;

    /**
     * 如果是会员的话，就有会员数据
     */
    @DBRef
    @CascadeSave
    private User user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ContactInfo> getContactInfos() {
        return contactInfos;
    }

    public void setContactInfos(List<ContactInfo> contactInfos) {
        this.contactInfos = contactInfos;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"name\":\"")
                .append(name).append('\"');
        sb.append(",\"contactInfos\":")
                .append(contactInfos);
        sb.append(",\"user\":")
                .append(user);
        sb.append('}');
        return sb.toString();
    }
}
