# 友链API
### 开始使用吧！你需要3个步骤：
1. 更改config.json文件中的port 和 keyword
2. 放通防火墙
3. 运行pnpm i , node app.js

### api名称以及用法
1. GetLinks 无需参数，返回值为包含所有链接的json
2. AddLink  需要参数，keyword 为设定的keyword, 以及name，url，description三个参数
3. DelLink  需要参数，keyword 为设定的keyword，deleteId 为要删除的链接的编号，例如要删除第一个链接，则设定为1

 