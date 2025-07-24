import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  AlertTriangle, 
  ExternalLink, 
  DollarSign,
  FileText,
  Users,
  Clock,
  ShieldCheck
} from "lucide-react";
import { Link } from "wouter";

export default function Security() {
  const bountyLevels = [
    {
      severity: "Critical",
      cvssScore: "9.0 - 10.0",
      description: "Remote code execution, authentication bypass, privilege escalation",
      compensation: "$200 - $500",
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
    },
    {
      severity: "High",
      cvssScore: "7.0 - 8.9",
      description: "Data exposure, unauthorized access, significant security impact",
      compensation: "$100 - $200",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
    },
    {
      severity: "Medium",
      cvssScore: "4.0 - 6.9",
      description: "Limited data exposure, moderate security impact",
      compensation: "$50 - $100",
      color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
    },
    {
      severity: "Low",
      cvssScore: "0.1 - 3.9",
      description: "Minor security issues, limited impact",
      compensation: "$25 - $50",
      color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Parse Platform Security</span>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <ShieldCheck className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Security
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Keeping Parse Server secure through responsible disclosure and community collaboration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href="https://github.com/parse-community/parse-server/security/advisories/new" target="_blank" rel="noopener noreferrer">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Report Vulnerability
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <a href="https://report.parseplatform.org" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Security Portal
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vulnerability Disclosure Program */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Vulnerability Disclosure Program</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We encourage responsible disclosure of security vulnerabilities in Parse Server
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">How to Report</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>If you believe you have found a security vulnerability in Parse Server, please report it responsibly:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Create a private security advisory on <a href="https://github.com/parse-community/parse-server/security/advisories/new" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li>Or email us at <a href="mailto:security@parseplatform.org" className="text-primary hover:underline">security@parseplatform.org</a></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Response Timeline</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>We are committed to responding promptly to security reports:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Initial Response:</strong> Within 7 days</li>
                    <li><strong>Patch Development:</strong> Within 30 days when possible</li>
                    <li><strong>Public Disclosure:</strong> Coordinated with reporter</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-amber-800 dark:text-amber-200">Responsible Disclosure Guidelines</h3>
                  <ul className="space-y-2 text-amber-700 dark:text-amber-300 list-disc list-inside">
                    <li>Give us reasonable time to investigate and fix the issue before public disclosure</li>
                    <li>Do not access or modify data belonging to others without explicit permission</li>
                    <li>Avoid privacy violations and service disruptions</li>
                    <li>Do not exploit vulnerabilities for any reason beyond proof of concept</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security Bounty Program */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Security Bounty Program</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We offer modest compensation for valid security vulnerabilities to recognize the valuable contributions of security researchers
            </p>
          </div>

          <div className="mb-12">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <DollarSign className="h-8 w-8 text-green-500 mr-3" />
                  <h3 className="text-2xl font-semibold">Compensation Guidelines</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  As a community-funded open source project, we offer modest but meaningful compensation based on CVSS v3 base metrics. 
                  Final amounts are determined by impact, exploitability, and responsible disclosure practices.
                </p>
                <div className="grid gap-4">
                  {bountyLevels.map((level, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 ${level.color}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">{level.severity}</span>
                            <span className="text-sm bg-white/50 dark:bg-gray-900/50 px-2 py-1 rounded">
                              CVSS {level.cvssScore}
                            </span>
                          </div>
                          <p className="text-sm">{level.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg">{level.compensation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Eligibility Requirements</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>First to report a previously unknown vulnerability</li>
                  <li>Provide clear proof of concept</li>
                  <li>Follow responsible disclosure guidelines</li>
                  <li>Allow sufficient time for patching before disclosure</li>
                  <li>Vulnerability must affect the latest stable version</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Out of Scope</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Social engineering attacks</li>
                  <li>Physical attacks against Parse infrastructure</li>
                  <li>Denial of service attacks</li>
                  <li>Issues in third-party dependencies (report to respective maintainers)</li>
                  <li>Already known or publicly disclosed vulnerabilities</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                Support Our Security Efforts
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-6">
                Our bounty program is funded by community donations. Consider supporting Parse Platform to help us maintain and improve our security program.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="https://opencollective.com/parse-server" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Support on Open Collective
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-8 h-8" />
              <span className="text-xl font-bold">Parse Platform Security</span>
            </div>
            <p className="text-gray-400 mb-8">
              Committed to maintaining the highest security standards for the Parse Platform community
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://report.parseplatform.org" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                Security Portal
              </a>
              <a href="mailto:security@parseplatform.org" className="text-gray-400 hover:text-white transition-colors">
                Contact Security Team
              </a>
              <a href="https://github.com/parse-community/parse-server/security" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                GitHub Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}