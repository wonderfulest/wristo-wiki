# 使用 `sdkman` 管理多个 Java 版本

## 安装 `sdkman`

```
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

## 查看可安装的 Java 版本

```
sdk list java
```

例如会显示如下内容（节选）：

```
11.0.21-tem         # Java 11
8.0.392-tem         # Java 8
17.0.9-tem          # Java 17
```

## 安装多个 Java 版本

```
sdk install java 8.0.392-tem
sdk install java 11.0.21-tem
sdk install java 17.0.9-tem
```

## 全局切换 Java 版本

```
sdk default java 11.0.21-tem
```

## 当前 shell 切换 Java 版本（不会影响其他终端）

```
sdk use java 8.0.392-tem
```



# 使用 nvm管理 多个node.js 版本



