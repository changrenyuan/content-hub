-- 添加 contentType 字段到 contents 表
ALTER TABLE contents ADD COLUMN IF NOT EXISTS content_type VARCHAR(20) DEFAULT 'serious' NOT NULL;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS contents_content_type_idx ON contents(content_type);

-- 添加注释
COMMENT ON COLUMN contents.content_type IS '内容类型：beauty(养眼)/serious(正经)/featured(精选)';

-- 为现有数据设置默认值（可选：根据featured字段推断）
UPDATE contents SET content_type = 'featured' WHERE featured = true;
