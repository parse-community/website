import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchGitHubStats } from "@/lib/github-api";
import { calculateTotalStars, estimateActiveDevelopers } from "@/lib/github-utils";
import { useQuery } from "@tanstack/react-query";
import {
  Code,
  ExternalLink,
  Heart,
  Server,
  Shield,
  Star,
  Users,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function Donations() {
  // Calculate years since Parse Platform was founded in 2011
  const yearsSinceFoundation = new Date().getFullYear() - 2011;
  
  const { data: githubStats } = useQuery({
    queryKey: ["/api/github/stats"],
    queryFn: fetchGitHubStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const totalStars = calculateTotalStars(githubStats);
  const activeDevelopers = estimateActiveDevelopers(githubStats);
  
  const impactStats = [
    {
      icon: Users,
      value: `${Math.floor(activeDevelopers / 1000)}k+`,
      label: "Active Developers",
      description: "Using Parse Server worldwide"
    },
    {
      icon: Server,
      value: "1M+",
      label: "Downloads",
      description: "Per month on npm"
    },
    {
      icon: Code,
      value: `${Math.floor(totalStars / 1000)}k+`,
      label: "GitHub Stars",
      description: "Community support"
    },
    {
      icon: Zap,
      value: `${yearsSinceFoundation}+`,
      label: "Years",
      description: "Of continuous development"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold">Donation</span>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Heart className="h-20 w-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
              Support Parse
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Help us maintain and improve the open-source Parse Platform for developers worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href="https://opencollective.com/parse-server" target="_blank" rel="noopener noreferrer">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <a href="https://github.com/sponsors/parse-community" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  GitHub Sponsors
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Parse Platform powers applications used by millions of users worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Need Support */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why We Need Your Support</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Parse Server is a community-driven open source project that relies on donations to thrive
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Server className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Infrastructure Costs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We maintain testing infrastructure, CI/CD pipelines, and hosting for documentation and demos that require ongoing funding.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Development Time</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our maintainers volunteer their time. Donations help us dedicate more hours to bug fixes, new features, and security updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Security Audits</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Security audits and our bug bounty program ensure Parse Server remains secure for all users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button size="lg" className="text-2xl px-14 py-6 h-auto" asChild>
              <a href="https://opencollective.com/parse-server/contribute" target="_blank" rel="noopener noreferrer">
                <Heart className="mr-3 h-8 w-8" />
                Make a Donation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Financial Transparency</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                We believe in complete transparency about how donations are used. Every expense is publicly tracked on Open Collective.
              </p>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Heart className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>All expenses are publicly visible</span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>Reports detail how funds are allocated</span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>Ultra-low administrative overhead, 99% of funds go to the project</span>
                </li>
              </ul>
            </div>
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                  How We Use Donations
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 dark:text-blue-300">Development & Maintenance</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 dark:text-blue-300">Fiscal Host Fees</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">16%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 dark:text-blue-300">Infrastructure & Hosting</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 dark:text-blue-300">Administration</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">1%</span>
                  </div>
                </div>
                <p className="text-xs text-blue-500 dark:text-blue-600 mt-4">
                  Historic expense statistics as of July 24, 2025.
                </p>
                <Button variant="outline" className="w-full mt-6 border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-800" asChild>
                  <a href="https://opencollective.com/parse-server" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Detailed Financial Reports
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alternative Ways to Help */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Other Ways to Help</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Can't donate? There are many other ways to support the Parse Platform community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Contribute Code</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Submit bug fixes, new features, or improvements to the codebase.
                </p>
                <Button variant="outline" asChild>
                  <a href="https://github.com/parse-community/parse-server/blob/alpha/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                    Learn How
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Help Others</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Answer questions on GitHub, Discord, or Stack Overflow.
                </p>
                <Button variant="outline" asChild>
                  <a href="https://discord.gg/parse" target="_blank" rel="noopener noreferrer">
                    Join Discord
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Spread the Word</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Star our repos, write blog posts, or speak at conferences.
                </p>
                <Button variant="outline" asChild>
                  <a href="https://github.com/parse-community/parse-server" target="_blank" rel="noopener noreferrer">
                    Star on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Heart className="w-8 h-8" />
              <span className="text-xl font-bold">Donation</span>
            </div>
            <p className="text-gray-400 mb-8">
              Thank you for supporting the Parse Platform community and keeping our project sustainable
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://opencollective.com/parse-server" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                Open Collective
              </a>
              <a href="https://github.com/sponsors/parse-community" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                GitHub Sponsors
              </a>
              <a href="mailto:hello@parseplatform.org" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
