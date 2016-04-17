## 写作工具
该文档基于工具[`MkDocs`](http://markdown-docs-zh.readthedocs.org/zh_CN/latest/)进行书写。

### 安装小记录
1. 安装`MKDocs`

```
pip install mkdoc
```

2. 创建目录结构

```
.
├── docs
│   └── index.md
├── mkdocs.yml
```

3. 基础配置
mkdocs.yml

``` yaml
site_name: Junzexu's Docs
site_author: Junzexu
theme: readthedocs
markdown_extensions: [fenced_code, tables, toc, meta, footnotes, nl2br]

pages:
- Home: index.md
```

