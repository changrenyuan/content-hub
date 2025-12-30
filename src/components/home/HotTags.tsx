import { Tag as TagIcon, Flame } from 'lucide-react';
import Link from 'next/link';

const hotTags = [
  { name: '效率工具', count: 1234, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { name: '设计灵感', count: 856, color: 'bg-pink-50 text-pink-600 border-pink-200' },
  { name: '开发资源', count: 723, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { name: 'AI工具', count: 654, color: 'bg-green-50 text-green-600 border-green-200' },
  { name: '生产力', count: 543, color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { name: '笔记软件', count: 432, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  { name: '项目管理', count: 321, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { name: 'UI设计', count: 298, color: 'bg-rose-50 text-rose-600 border-rose-200' },
  { name: '自动化', count: 234, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { name: '资源收集', count: 198, color: 'bg-teal-50 text-teal-600 border-teal-200' },
];

export function HotTags() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-orange-500" />
        <h3 className="font-bold text-gray-900">热门标签</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {hotTags.map((tag) => (
          <Link
            key={tag.name}
            href={`/explore?tag=${encodeURIComponent(tag.name)}`}
            className="group"
          >
            <span
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-300
                hover:scale-105 hover:shadow-md
                ${tag.color}
              `}
            >
              <TagIcon className="w-3.5 h-3.5" />
              <span>{tag.name}</span>
              <span className="text-xs opacity-60">{tag.count}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
