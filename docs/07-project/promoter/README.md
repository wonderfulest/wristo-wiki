promoter
推广员（最推荐）



## 靠链接提成：URL + 独立折扣码参数（强烈推荐）

最靠谱方案是：**单独加一个 coupon 参数**



promoter 靠 短链 ，靠口令，分享出去  Discount Code,  UTM  标签中有没有对应折扣码的标签，用户通过 点击短链或输入口令，下单，给  promoter 角色分佣。帮我设计数据库 表 



# 推广员扩展表（promoter_profile）

```
CREATE TABLE promoter_profile (
  user_id BIGINT PRIMARY KEY,
  level TINYINT DEFAULT 1,
  status ENUM('pending','active','banned'),
  settle_type ENUM('auto','manual'),
  total_income DECIMAL(12,2) DEFAULT 0,
  created_at DATETIME
);
```





