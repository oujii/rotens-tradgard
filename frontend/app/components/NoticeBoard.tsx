import Link from 'next/link'

interface Notice {
  title: string
  link?: string
  _key: string
}

export default function NoticeBoard({ notices }: { notices?: Notice[] }) {
  if (!notices || notices.length === 0) return null

  return (
    <div className="bg-stone-100 border-y border-stone-200 py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          
          {/* Label / Badge */}
          <div className="flex items-center gap-3">
             <span className="text-xl">🌱</span>
             <span className="bg-brand text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">
                Aktuellt
             </span>
          </div>

          {/* Notices List */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {notices.map((notice, index) => (
              <li key={notice._key} className="flex items-center gap-6 text-stone-700 text-sm md:text-base font-medium">
                {index > 0 && <span className="text-stone-300 hidden md:inline">•</span>}
                {notice.link ? (
                  <Link href={notice.link} className="hover:text-brand transition-colors">
                    {notice.title}
                  </Link>
                ) : (
                  <span>{notice.title}</span>
                )}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  )
}