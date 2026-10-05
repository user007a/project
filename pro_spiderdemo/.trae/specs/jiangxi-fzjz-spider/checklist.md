# Checklist

- [ ] fzjz 频道 `unitid` 已从首页 `columnlist` 中识别
- [ ] `POST /queryList` 用 `channelCode=fzjz` 返回 `total=3698`
- [ ] 全量 3698 条记录均被遍历（与站方 `total` 一致）
- [ ] 每条记录生成独立 markdown 文件，命名格式 `<YYYY-MM-DD>-<title>.md`
- [ ] 文件名清洗规则覆盖 Windows 非法字符与重名场景
- [ ] 每个 markdown 文件符合统一模板（标题 + 元信息表 + 正文）
- [ ] 正文 HTML→markdown 已去除脚本/样式/空行
- [ ] 失败记录全部记录到 `failed.json` 且支持 `--retry`
- [ ] 抓取过程加入随机延时，未触发站方限流
- [ ] 全量任务跑完后 `output/jxsnynct-fzjz/` 下文件数量与成功条数一致
- [ ] README 含运行命令、参数、目录结构说明