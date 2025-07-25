import { AnimatedCounter } from "@/components/animated-counter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import { TypingHero } from "@/components/typing-hero";
import { useTheme } from "@/hooks/use-theme";
import { fetchGitHubStats } from "@/lib/github-api";
import { calculateTotalContributors, calculateTotalForks, calculateTotalStars } from "@/lib/github-utils";
import parseLogoPath from "@assets/parse-logo-vector.svg";
import {
  Blocks,
  Book,
  Box,
  Check,
  Cloud,
  Code,
  Cpu,
  Database,
  Github,
  HammerIcon,
  Heart,
  List,
  Menu,
  MessageCircle,
  Moon,
  OrbitIcon,
  Plug,
  Server,
  Settings,
  ShieldCheck,
  Smartphone,
  Sun,
  Users,
  X,
  Zap
} from "lucide-react";
import { useState } from "react";
import {
  SiAndroid,
  SiApple,
  SiDart,
  SiDiscord,
  SiDotnet,
  SiFlutter,
  SiJavascript,
  SiPhp,
  SiSwift,
  SiX
} from "react-icons/si";
import { Link } from "wouter";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: githubStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/github/stats", "v2"], // Added v2 to force cache refresh
    queryFn: fetchGitHubStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const features = [
    {
      icon: Database,
      title: "Database & Storage",
      description: "MongoDB and PostgreSQL support with flexible file storage options including Amazon S3, Google Cloud Storage, and local storage.",
      highlights: ["Real-time data synchronization", "GridFS default storage", "Multi-database support"]
    },
    {
      icon: ShieldCheck,
      title: "Authentication & Security", 
      description: "Comprehensive user management with OAuth support, email verification, and flexible authentication options.",
      highlights: ["OAuth integration", "Email verification", "Custom authentication"]
    },
    {
      icon: Plug,
      title: "APIs & Integration",
      description: "REST and GraphQL APIs with multi-platform SDKs for seamless integration across all major platforms.",
      highlights: ["REST & GraphQL APIs", "Multi-Platform SDKs", "Custom queries & mutations"]
    },
    {
      icon: Zap,
      title: "Real-time Features",
      description: "Live queries for real-time data updates and built-in push notification support across all platforms.",
      highlights: ["Live Queries", "Push notifications", "Real-time updates"]
    },
    {
      icon: Cloud,
      title: "Cloud Functions",
      description: "Server-side logic execution with custom functions, database triggers, and background job processing.",
      highlights: ["Custom cloud functions", "Database triggers", "Background jobs"]
    },
    {
      icon: Server,
      title: "Self-hosting Freedom",
      description: "Deploy anywhere that runs Node.js. Full control over your infrastructure and data with Parse Dashboard for management.",
      highlights: ["Any Node.js infrastructure", "Parse Dashboard included", "Complete data ownership"]
    }
  ];

  const sdks = [
    { 
      name: "Apple", 
      icon: SiApple, 
      stars: githubStats?.parseIOSSDK.stars || 2809, 
      color: "text-gray-700",
      githubUrl: "https://github.com/parse-community/Parse-SDK-iOS-OSX",
      docsUrl: "https://docs.parseplatform.org/ios/guide/",
      apiUrl: "https://parseplatform.org/Parse-SDK-iOS-OSX/api/"
    },
    { 
      name: "Android", 
      icon: SiAndroid, 
      stars: githubStats?.parseAndroidSDK.stars || 1879, 
      color: "text-green-500",
      githubUrl: "https://github.com/parse-community/Parse-SDK-Android",
      docsUrl: "https://docs.parseplatform.org/android/guide/",
      apiUrl: "https://parseplatform.org/Parse-SDK-Android/api/"
    },
    { 
      name: "JavaScript", 
      icon: SiJavascript, 
      stars: githubStats?.parseJsSDK.stars || 1317, 
      color: "text-yellow-500",
      githubUrl: "https://github.com/parse-community/Parse-SDK-JS",
      docsUrl: "https://docs.parseplatform.org/js/guide/",
      apiUrl: "https://parseplatform.org/Parse-SDK-JS/api/"
    },
    { 
      name: "PHP", 
      icon: SiPhp, 
      stars: 811, 
      color: "text-purple-500",
      githubUrl: "https://github.com/parse-community/parse-php-sdk",
      docsUrl: "https://docs.parseplatform.org/php/guide/",
      apiUrl: "https://parseplatform.org/parse-php-sdk/api/"
    },
    { 
      name: "Flutter", 
      icon: SiFlutter, 
      stars: 575, 
      color: "text-blue-400",
      githubUrl: "https://github.com/parse-community/Parse-SDK-Flutter/tree/master/packages/flutter",
      docsUrl: "https://docs.parseplatform.org/flutter/guide/",
      apiUrl: "https://pub.dev/documentation/parse_server_sdk_flutter/latest/"
    },
    { 
      name: "Dart", 
      icon: SiDart, 
      stars: 575, 
      color: "text-cyan-400",
      githubUrl: "https://github.com/parse-community/Parse-SDK-Flutter/tree/master/packages/dart",
      docsUrl: "https://docs.parseplatform.org/dart/guide/",
      apiUrl: "https://pub.dev/documentation/parse_server_sdk_flutter/latest/"
    },
    { 
      name: ".NET", 
      icon: SiDotnet, 
      stars: 323, 
      color: "text-indigo-500",
      githubUrl: "https://github.com/parse-community/Parse-SDK-dotNET",
      docsUrl: "https://docs.parseplatform.org/dotnet/guide/",
      apiUrl: "https://parseplatform.org/Parse-SDK-dotNET/api/"
    },
    { 
      name: "Swift", 
      icon: SiSwift, 
      stars: 302, 
      color: "text-orange-500",
      githubUrl: "https://github.com/parse-community/Parse-Swift",
      docsUrl: "https://docs.parseplatform.org/swift/guide/",
      apiUrl: "https://parseplatform.org/Parse-Swift/release/documentation/parseswift/"
    },
    { 
      name: "Arduino", 
      icon: Cpu, 
      stars: 109, 
      color: "text-teal-500",
      githubUrl: "https://github.com/parse-community/Parse-SDK-Arduino",
      docsUrl: "https://docs.parseplatform.org/arduino/guide/",
      apiUrl: "http://parseplatform.org/Parse-SDK-Arduino/api/"
    }
  ];

  const serverApis = [
    { 
      name: "Parse Server", 
      icon: Server, 
      stars: githubStats?.parseServer.stars || 20806, 
      color: "text-blue-500",
      githubUrl: "https://github.com/parse-community/parse-server",
      docsUrl: "https://docs.parseplatform.org/parse-server/guide/",
      cloudCodeUrl: "https://docs.parseplatform.org/cloudcode/guide/",
      schemasUrl: "https://docs.parseplatform.org/defined-schema/guide/",
      description: "The main backend server powering all Parse Platform features."
    },
    { 
      name: "Cloud Code", 
      icon: Cloud, 
      stars: null, 
      color: "text-purple-500",
      docsUrl: "https://docs.parseplatform.org/cloudcode/guide/",
      apiUrl: "https://docs.parseplatform.org/cloudcode/guide/",
      description: "Custom server-side JavaScript functions for advanced business logic."
    },
    { 
      name: "REST API", 
      icon: Plug, 
      stars: null, 
      color: "text-green-500",
      docsUrl: "https://docs.parseplatform.org/rest/guide/",
      apiUrl: "https://docs.parseplatform.org/rest/guide/",
      description: "A RESTful HTTP API for interacting with all Parse Platform services."
    },
    { 
      name: "GraphQL API", 
      icon: Plug, 
      stars: null, 
      color: "text-pink-500",
      docsUrl: "https://docs.parseplatform.org/graphql/guide/",
      apiUrl: "https://docs.parseplatform.org/graphql/guide/",
      description: "A modern GraphQL API supporting queries, mutations, and subscriptions."
    },
    { 
      name: "Extensions", 
      icon: Blocks, 
      stars: null, 
      color: "text-orange-500",
      extensionsUrl: "/extensions",
      description: "Enhance Parse Server with official and community-built extensions."
    }
  ];

  const totalStars = calculateTotalStars(githubStats, 30000);
  const totalForks = calculateTotalForks(githubStats, 8000);
  const totalContributors = calculateTotalContributors(githubStats, 1000);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img src={parseLogoPath} alt="Parse Platform" className="w-8 h-8 text-primary" style={{filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(201deg) brightness(102%) contrast(103%)'}} />
                <span className="text-xl font-bold">Parse Platform</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Features</a>
                <a href="#server-apis" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Server</a>
                <a href="#sdks" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">SDKs</a>
                <a href="#dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Dashboard</a>
                <a href="#docs" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Documentation</a>
                <a href="#community" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Community</a>
                <Link href="/security" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                  <ShieldCheck className="h-4 w-4 text-yellow-500" />
                  <span>Security</span>
                </Link>
                <Link href="/donations" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Donation</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Button asChild className="hidden md:inline-flex">
                <a href="#get-started">Start Building</a>
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Features</a>
                <a href="#server-apis" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Server</a>
                <a href="#dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Dashboard</a>
                <a href="#sdks" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">SDKs</a>
                <a href="#docs" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Documentation</a>
                <a href="#community" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Community</a>
                <Link href="/security" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center space-x-1">
                  <ShieldCheck className="h-4 w-4 text-yellow-500" />
                  <span>Security</span>
                </Link>
                <Link href="/donations" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Donation</span>
                </Link>
                <Button asChild className="w-fit">
                  <a href="#get-started">Start Building</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <TypingHero className="text-5xl md:text-7xl font-bold my-16" />
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Parse Platform is your complete backend solution for mobile and web applications.<br />Deploy anywhere, scale infinitely, own your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg h-12" asChild>
                <a href="#get-started">
                  Start Building <HammerIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg h-12 py-6" asChild>
                <a href="#docs">
                  Documentation <Book className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            
            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {statsLoading ? (
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 mx-auto rounded" />
                    ) : (
                      <AnimatedCounter target={totalStars} />
                    )}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">GitHub Stars</div>
                </CardContent>
              </Card>
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {statsLoading ? (
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 mx-auto rounded" />
                    ) : (
                      <AnimatedCounter target={totalForks} />
                    )}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Forks</div>
                </CardContent>
              </Card>
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter target={9} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">SDK Platforms</div>
                </CardContent>
              </Card>
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {statsLoading ? (
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 mx-auto rounded" />
                    ) : (
                      <AnimatedCounter target={totalContributors} suffix="+" />
                    )}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Contributors</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to build modern applications</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                    {feature.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parse Server and APIs Section */}
      <section id="server-apis" className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Parse Server</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Core backend services and APIs for your applications</p>
          </div>

          {/* Component Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serverApis.map((api, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <api.icon className={`h-8 w-8 ${api.color} mr-3 flex-shrink-0`} />
                    <h3 className="text-xl font-semibold">{api.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{api.description}</p>
                  <div className="flex flex-col gap-2">
                    {api.githubUrl && (
                      <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                        <a href={api.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                    {api.docsUrl && (
                      <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                        <a href={api.docsUrl} target="_blank" rel="noopener noreferrer">
                          <Book className="h-4 w-4 mr-2" />
                          Documentation
                        </a>
                      </Button>
                    )}
                    {api.schemasUrl && (
                      <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                        <a href={api.schemasUrl} target="_blank" rel="noopener noreferrer">
                          <Database className="h-4 w-4 mr-2" />
                          Schema Guide
                        </a>
                      </Button>
                    )}
                    {api.extensionsUrl && (
                      <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                        <Link href={api.extensionsUrl}>
                          <List className="h-4 w-4 mr-2" />
                          Explore Extensions
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs Section */}
      <section id="sdks" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Multi-Platform SDKs</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Build for every platform with our comprehensive SDK collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <sdk.icon className={`h-8 w-8 ${sdk.color} mr-3 flex-shrink-0`} />
                    <h3 className="text-xl font-semibold">{sdk.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {sdk.name === "Apple" && "Native iOS SDK with full Parse Platform functionality"}
                    {sdk.name === "Android" && "Native Android SDK for Parse Platform integration"}
                    {sdk.name === "JavaScript" && "Universal JavaScript SDK for web and Node.js"}
                    {sdk.name === "PHP" && "Server-side PHP SDK for Parse Platform"}
                    {sdk.name === "Flutter" && "Cross-platform Flutter SDK for mobile development"}
                    {sdk.name === "Dart" && "Pure Dart SDK for server and command-line applications"}
                    {sdk.name === ".NET" && "Cross-platform .NET SDK for Parse Platform"}
                    {sdk.name === "Swift" && "Modern Swift SDK with async/await support"}
                    {sdk.name === "Arduino" && "IoT SDK for Arduino microcontrollers and ESP32/ESP8266"}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                      <a href={sdk.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                    <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                      <a href={sdk.docsUrl} target="_blank" rel="noopener noreferrer">
                        <Book className="h-4 w-4 mr-2" />
                        Documentation
                      </a>
                    </Button>
                    {sdk.apiUrl && (
                      <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                        <a href={sdk.apiUrl} target="_blank" rel="noopener noreferrer">
                          <Code className="h-4 w-4 mr-2" />
                          API Reference
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Parse Dashboard</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful web interface for managing your Parse Server data and configuration
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Database className="h-7 w-7 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mt-1 mb-1">Data Browser</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Browse, edit, and query your application data with an intuitive table interface</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Users className="h-7 w-7 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mt-1 mb-1">User Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage user accounts, roles, and permissions directly from the dashboard</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Code className="h-7 w-7 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mt-1 mb-1">API Console</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Test queries and execute code directly in the dashboard with an interactive console</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-7 w-7 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mt-1 mb-1">Configuration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Configure app settings, push notifications, and security parameters</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="mt-6" asChild>
                  <a href="https://github.com/parse-community/parse-dashboard" target="_blank" rel="noopener noreferrer">
                    Get Parse Dashboard
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Parse Dashboard</span>
                  </div>
                  
                  {/* Mock Dashboard Interface */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 px-3 bg-blue-500 text-white rounded text-sm font-medium">
                      <span>Data Browser</span>
                      <Smartphone className="h-4 w-4" />
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <span>objectId</span>
                        <span>username</span>
                        <span>createdAt</span>
                      </div>
                      <div className="space-y-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="grid grid-cols-3 gap-2 p-3 text-xs border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                            <span className="text-blue-600 dark:text-blue-400 font-mono">xK7m{i}Pq9</span>
                            <span className="text-gray-700 dark:text-gray-300">user_{i}</span>
                            <span className="text-gray-500 dark:text-gray-400">2024-01-{i.toString().padStart(2, '0')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>3 of 127 objects</span>
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Previous</button>
                        <button className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Next</button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-20 bg-gradient-to-br from-primary to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-xl opacity-90">Deploy your Parse Server with just a few commands</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Installation Steps */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Install</h3>
                  <p className="text-sm opacity-90">Install Parse Server via npm</p>
                </div>
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Configure</h3>
                  <p className="text-sm opacity-90">Set up your database and keys</p>
                </div>
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Deploy</h3>
                  <p className="text-sm opacity-90">Launch your backend</p>
                </div>
              </div>
            </div>

            {/* Code Example */}
            <Card className="bg-gray-900 text-green-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm">install.sh</span>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>
                    <span className="text-gray-400"># Install Parse Server</span>{'\n'}
                    npm install -g parse-server{'\n\n'}
                    <span className="text-gray-400"># Start Parse Server</span>{'\n'}
                    parse-server --appId myAppId --masterKey myMasterKey --databaseURI mongodb://localhost:27017/dev{'\n\n'}
                    <span className="text-gray-400"># Your Parse Server is running on http://localhost:1337/parse</span>
                  </code>
                </pre>
              </CardContent>
            </Card>

            {/* Heading */}
            <div className="text-center text-white mb-8 mt-16">
              <p className="text-xl opacity-90">Then save and find your first object using Parse Server's <a href="#server-apis" className="text-blue-300 hover:text-blue-200 underline transition-colors">REST API</a></p>
            </div>

            {/* Code Example */}
            <Card className="bg-gray-900 text-green-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm">install.sh</span>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>
                    <span className="text-gray-400"># Create a new Booking object</span>{'\n'}
                    curl -X POST \{'\n'}
                    {'  '}-H "X-Parse-Application-Id: myAppId" \{'\n'}
                    {'  '}-H "X-Parse-Master-Key: myMasterKey" \{'\n'}
                    {'  '}-H "Content-Type: application/json" \{'\n'}
                    {'  '}-d '{"{\"room\":101,\"guests\":2,\"nights\":4}"}' {'\\'}{'\n'}
                    {'  '}http://localhost:1337/parse/classes/Booking{'\n\n'}
                    <span className="text-gray-400"># Get all bookings of room 101</span>{'\n'}
                    curl -X GET \{'\n'}
                    {'  '}-H "X-Parse-Application-Id: myAppId" \{'\n'}
                    {'  '}-H "X-Parse-Master-Key: myMasterKey" \{'\n'}
                    {'  '}-G \{'\n'}
                    {'  '}--data-urlencode {'\'where={\"room\":{\"$eq\":101}}\''} {'\\'}{'\n'}
                    {'  '}http://localhost:1337/parse/classes/Booking
                  </code>
                </pre>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Documentation & Resources</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive guides and references for every platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Book className="h-8 w-8 text-blue-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">Parse Server Guide</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Complete guide for deploying and configuring Parse Server</p>
                <div className="flex flex-col gap-2">
                  <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                    <a href="#server-apis">
                      Read Documentation
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <OrbitIcon className="h-8 w-8 text-purple-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">Postman Template</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Ready-to-use Postman collection for Parse Server REST API testing</p>
                <div className="flex flex-col gap-2">
                  <Button variant="link" className="p-0 h-auto text-gray-400 justify-start" disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Box className="h-8 w-8 text-green-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">Client SDK Guides</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Platform-specific integration guides for all supported SDKs</p>
                <div className="flex flex-col gap-2">
                  <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                    <a href="#sdks">
                      Browse SDKs
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Connect with developers worldwide using Parse Platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <MessageCircle className="h-8 w-8 text-blue-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">Community Forum</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Join discussions about Parse Platform and share your experiences</p>
                <Button className="bg-blue-500 hover:bg-blue-600 w-full" asChild>
                  <a href="https://community.parseplatform.org/" target="_blank" rel="noopener noreferrer">
                    Join Forum
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <MessageCircle className="h-8 w-8 text-green-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">Chat</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Connect with the community on our Slack workspace for instant communication</p>
                <Button className="bg-green-500 hover:bg-green-600 w-full" asChild>
                  <a href="http://chat.parseplatform.org" target="_blank" rel="noopener noreferrer">
                    Join Slack
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-purple-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">Community Highlights</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Discover amazing community projects and tools for Parse Platform</p>
                <Button className="bg-purple-500 hover:bg-purple-600 w-full" asChild>
                  <Link href="/extensions#community-projects">
                    Explore Projects
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <SiDiscord className="h-8 w-8 text-indigo-500 mr-3 flex-shrink-0" />
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold">Discord</h3>
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Join our Discord server for real-time chat and community support</p>
                <Button className="bg-indigo-500 hover:bg-indigo-600 w-full" asChild>
                  <a href="https://discord.gg/3BbTCJtZ5j" target="_blank" rel="noopener noreferrer">
                    Join Discord
                  </a>
                </Button>
              </CardContent>
            </Card>

             <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Github className="h-8 w-8 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">GitHub</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Contribute to Parse Platform and report issues on GitHub</p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="https://github.com/parse-community" target="_blank" rel="noopener noreferrer">
                    View Repositories
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <SiX className="h-8 w-8 text-gray-900 dark:text-white mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold">Follow us on X</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Stay updated with the latest Parse Platform news and announcements</p>
                <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 w-full" asChild>
                  <a href="https://x.com/parseplatform" target="_blank" rel="noopener noreferrer">
                    Follow @parseplatform
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img src={parseLogoPath} alt="Parse Platform" className="w-8 h-8" style={{filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(201deg) brightness(102%) contrast(103%)'}} />
                <span className="text-xl font-bold">Parse Platform</span>
              </div>
              <p className="text-gray-400">The open source backend for building modern applications without vendor lock-in. Deploy anywhere, scale infinitely, own your data.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://github.com/parse-community/parse-server" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Parse Server</a></li>
                <li><a href="https://github.com/parse-community/parse-dashboard" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Parse Dashboard</a></li>
                <li><a href="https://docs.parseplatform.org/cloudcode/guide/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Cloud Code</a></li>
                <li><a href="https://docs.parseplatform.org/rest/guide/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">REST API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://docs.parseplatform.org/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                <li><a href="https://community.parseplatform.org/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Community</a></li>
                <li><a href="https://discord.gg/3BbTCJtZ5j" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Discord</a></li>
                <li><a href="https://github.com/parse-community" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">SDKs</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://docs.parseplatform.org/ios/guide/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">iOS</a></li>
                <li><a href="https://docs.parseplatform.org/android/guide/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Android</a></li>
                <li><a href="https://docs.parseplatform.org/js/guide/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">JavaScript</a></li>
                <li><a href="https://docs.parseplatform.org/flutter/guide/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Flutter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 Parse Platform</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://github.com/parse-community" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://stackoverflow.com/tags/parse-platform" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-stack-overflow text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
