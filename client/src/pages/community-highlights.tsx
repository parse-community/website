import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import {
  ExternalLink,
  Menu,
  Moon,
  Star,
  Sun,
  Users,
  X
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface CommunityProject {
  title: string;
  description: string;
  githubUrl: string;
  language?: string;
  category: string;
}

const communityProjects: CommunityProject[] = [
  {
    title: "Oracle Database Adapter",
    description: "A Oracle Database Adapter for Parse Server.",
    githubUrl: "https://github.com/oracle-samples/oracleadapter-parse",
    language: "JavaScript",
    category: "Database Adapters"
  },
  {
    title: "MySQL Database Adapter",
    description: "A MySQL Database Adapter for Parse Server.",
    githubUrl: "https://github.com/dplewis/parse-server-mysql-adapter",
    language: "JavaScript",
    category: "Database Adapters"
  },
  {
    title: "DynamoDB Database Adapter",
    description: "A DynamoDB Database Adapter for Parse Server.",
    githubUrl: "https://github.com/benishak/parse-server-dynamodb-adapter",
    language: "JavaScript",
    category: "Database Adapters"
  },
  {
    title: "Parse Client in Ruby",
    description: "An object-relational mapper and cloud code webhooks server.",
    githubUrl: "https://github.com/modernistik/parse-stack",
    language: "Ruby",
    category: "SDKs & Libraries"
  },
  {
    title: "Parse Cloud Class",
    description: "Extendable way to set up Parse Cloud classes behavior.",
    githubUrl: "https://github.com/owsas/parse-cloud-class",
    language: "JavaScript",
    category: "Tools & Utilities"
  },
  {
    title: "Parse Auditor",
    description: "Add automated data auditing/versioning to classes.",
    githubUrl: "https://github.com/Blackburn-Labs/parse-auditor",
    language: "JavaScript",
    category: "Tools & Utilities"
  },
  {
    title: "Parse Python Wrapper",
    description: "A Python wrapper for the Parse Server API.",
    githubUrl: "https://github.com/dgrtwo/ParsePy",
    language: "Python",
    category: "SDKs & Libraries"
  },
  {
    title: "Parse Dashboard for iOS",
    description: "A beautiful iOS client for managing your Parse apps.",
    githubUrl: "https://github.com/nathantannar4/Parse-Dashboard-for-iOS",
    language: "Swift",
    category: "Mobile Apps"
  },
  {
    title: "Android Dashboard",
    description: "A beautiful Android client for managing your Parse apps.",
    githubUrl: "https://github.com/bitterbit/Parse-Dashboard-Android",
    language: "Java",
    category: "Mobile Apps"
  },
  {
    title: "Live Query for .NET",
    description: "Live Query Project for .NET in development.",
    githubUrl: "https://github.com/JonMcPherson/parse-live-query-dotnet",
    language: "C#",
    category: "SDKs & Libraries"
  },
  {
    title: "Parse Ember Wrapper",
    description: "Includes an adapter, serializer and a session service for auth.",
    githubUrl: "https://github.com/GetBlimp/ember-parse",
    language: "JavaScript",
    category: "SDKs & Libraries"
  },
  {
    title: "Parse Client in Go",
    description: "Parse API Client Library written in Go.",
    githubUrl: "https://github.com/kylemcc/parse",
    language: "Go",
    category: "SDKs & Libraries"
  }
];

const categories = Array.from(new Set(communityProjects.map(project => project.category)));

// Function to get category colors
const getCategoryColors = (category: string) => {
  const colorMap: Record<string, { bg: string; darkBg: string; text: string; darkText: string }> = {
    "Database Adapters": {
      bg: "bg-blue-100",
      darkBg: "dark:bg-blue-900",
      text: "text-blue-700",
      darkText: "dark:text-blue-200"
    },
    "SDKs & Libraries": {
      bg: "bg-green-100",
      darkBg: "dark:bg-green-900",
      text: "text-green-700",
      darkText: "dark:text-green-200"
    },
    "Tools & Utilities": {
      bg: "bg-purple-100",
      darkBg: "dark:bg-purple-900",
      text: "text-purple-700",
      darkText: "dark:text-purple-200"
    },
    "Mobile Apps": {
      bg: "bg-orange-100",
      darkBg: "dark:bg-orange-900",
      text: "text-orange-700",
      darkText: "dark:text-orange-200"
    }
  };
  
  return colorMap[category] || {
    bg: "bg-gray-100",
    darkBg: "dark:bg-gray-600",
    text: "text-gray-700",
    darkText: "dark:text-gray-200"
  };
};

export default function CommunityHighlights() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory 
    ? communityProjects.filter(project => project.category === selectedCategory)
    : communityProjects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Community Highlights</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="outline" asChild>
                <Link href="/">← Back to Home</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                  Home
                </Link>
                <Link href="/donations" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                  Donations
                </Link>
                <Link href="/security" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                  Security
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Community Highlights
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A curated list of community projects to expand how you use Parse. 
              Discover amazing tools, adapters, and libraries created by the Parse community.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="mb-2"
            >
              All Projects
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 h-full bg-white dark:bg-gray-900/90 border border-gray-200 dark:border-gray-600 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColors(project.category).bg} ${getCategoryColors(project.category).darkBg} ${getCategoryColors(project.category).text} ${getCategoryColors(project.category).darkText}`}>
                          {project.category}
                        </span>
                        {project.language && (
                          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                            {project.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
                    {project.description}
                  </p>
                  <Button 
                    className="w-full bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 dark:bg-gray-700 dark:hover:bg-indigo-800 dark:text-gray-300 dark:hover:text-indigo-200 border-gray-200 dark:border-gray-600 transition-all duration-300" 
                    variant="outline"
                    asChild
                  >
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View on GitHub
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Have a Project to Share?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Built something awesome for Parse? We'd love to feature your project in our Community Highlights. 
            Share your work with the community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="https://community.parseplatform.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Suggest your Project
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Users className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold">Parse Community Highlights</span>
            </div>
            <p className="text-gray-400 mb-8">
              Building the future of backend development, together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
