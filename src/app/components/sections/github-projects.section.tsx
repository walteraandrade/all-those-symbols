import { FadeIn } from "@/app/components/animations/fade-in.component";
import { ExternalLink } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

async function getGitHubRepos() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username || !token) {
    console.error("GitHub username or token is not set in .env.local");
    return [];
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Authorization: `token ${token}`,
      },
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.error("Failed to fetch GitHub repos:", res.statusText);
      return [];
    }

    const repos: Repo[] = await res.json();
    
    const featuredRepos = repos.filter(repo => repo.topics?.includes('portfolio'));
    
    return featuredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export const GitHubProjectsSection = async () => {
  const repos = await getGitHubRepos();

  return (
    <section id="github-projects" className="w-full py-20 lg:py-24 border-t border-border">
      <FadeIn>
        <h2 className="text-3xl font-bold text-center mb-[16px] mt-[32px] text-primary">
          Open Source Projects
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo, i) => (
          <FadeIn key={repo.id} delay={i * 0.1}>
            <RepoCard repo={repo} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const RepoCard = ({ repo }: { repo: Repo }) => {

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 border border-background px-[16px] py-[8px]"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-primary">
              {repo.name}
            </h3>
            <ExternalLink className="w-4 h-4 mr-1 text-secondary group-hover:text-primary transition-colors" />
          </div>
          <p className="text-secondary text-sm mb-4 leading-relaxed">
            {repo.description}
          </p>
        </div>
        <div className="flex items-center text-sm text-secondary mt-4">
          <span className="flex items-center mr-4">
            <div className={`w-3 h-3 rounded-full mr-1.5 bg-gray-500`}></div>
            Language: {repo.language || "N/A"}
          </span>
        </div>
      </div>
    </a>
  );
};
