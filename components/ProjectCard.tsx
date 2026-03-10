import type { GitHubRepo } from "@/lib/github";

export function ProjectCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl
                 border border-stone-200 dark:border-ink-wire
                 bg-white dark:bg-ink-card
                 p-6
                 hover:border-azure dark:hover:border-azure
                 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-lg truncate
                         text-stone-800 dark:text-cream
                         group-hover:text-azure dark:group-hover:text-sky
                         transition-colors duration-200">
            {repo.fullName}
          </h3>
          <p className="mt-1 text-sm text-stone-500 dark:text-fog line-clamp-2">
            {repo.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-400 dark:text-ash">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current" aria-hidden="true">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
          </svg>
          {repo.stars.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current" aria-hidden="true">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM8 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
          </svg>
          {repo.forks.toLocaleString()}
        </span>
      </div>

      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {repo.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs rounded-full
                         bg-stone-100 dark:bg-ink-shell/40
                         text-stone-500 dark:text-ash"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
