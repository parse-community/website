import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book,
  Code,
  Database,
  ExternalLink,
  FileText,
  Search,
  Server,
  ShieldCheck,
  Users,
  Zap
} from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from "wouter";

// Helper component for syntax highlighted code blocks
interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        fontSize: '13px',
        lineHeight: '1.4',
        margin: 0,
      }}
      showLineNumbers={false}
      wrapLongLines={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("initialization");
  const [activeCodeTab, setActiveCodeTab] = useState("rest");

  // Helper function to get the best available tab for a section
  const getAvailableTabForSection = (sectionId: string, preferredTab: string) => {
    const sectionTabs: Record<string, string[]> = {
      "initialization": ["javascript", "swift", "android", "php"],
      "objects": ["rest", "graphql", "javascript", "swift", "android", "php"],
      "queries": ["rest", "graphql", "javascript", "swift", "android", "php"],
      "queries-constraints": ["javascript", "swift", "android"],
      "users": ["rest", "graphql", "javascript", "swift", "android", "php"],
      "files": ["rest", "graphql", "javascript", "swift", "android", "php"],
      "files-retrieval": ["javascript", "swift", "android"],
      "push": ["rest", "graphql", "javascript", "swift", "android", "php"],
      "cloud": ["rest", "graphql", "javascript", "swift", "android", "php"],
      "security": ["javascript", "swift", "android", "php"],
      "security-roles": ["javascript", "swift", "android"],
    };

    const availableTabs = sectionTabs[sectionId] || ["rest", "graphql", "javascript", "swift", "android", "php"];
    
    return availableTabs.includes(preferredTab) ? preferredTab : availableTabs[0];
  };

  const navigationSections = [
    { id: "initialization", title: "SDK Initialization", icon: Code },
    { id: "objects", title: "Objects", icon: Database },
    { id: "queries", title: "Queries", icon: Search },
    { id: "users", title: "Users", icon: Users },
    { id: "files", title: "Files", icon: FileText },
    { id: "push", title: "Push Notifications", icon: Zap },
    { id: "cloud", title: "Cloud Functions", icon: Server },
    { id: "security", title: "Security", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Book className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">Documentation</span>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">API Reference</h3>
            <nav className="space-y-2">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
            
            {/* Additional Resources */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Resources
              </h4>
              <div className="space-y-2">
                <Link
                  href="/#server-apis"
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Parse Server</span>
                </Link>
                <Link
                  href="/#sdks"
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Client SDKs</span>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-4xl">
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Parse Platform Documentation
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn how to build applications with Parse Server using our comprehensive API reference and code examples.
              </p>
            </div>

            {/* SDK Initialization Section */}
            {activeSection === "initialization" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">SDK Initialization</h2>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Initialize Parse SDK</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Before using any Parse functionality, you need to initialize the SDK with your application credentials.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("initialization", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Initialize Parse SDK
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'https://example.com/parse';

// Optional: Enable local datastore for offline support
Parse.enableLocalDatastore();

// Optional: Set debug mode
Parse.CoreManager.set("DEBUG", true);`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`import ParseSwift

// Initialize Parse SDK
let configuration = ParseConfiguration {
    $0.applicationId = "YOUR_APP_ID"
    $0.clientKey = "YOUR_CLIENT_KEY"
    $0.serverURL = URL(string: "https://example.com/parse")!
    
    // Optional: Enable local datastore for offline support
    $0.isUsingDataProtection = true
    $0.fileTransferType = .useSession
}

do {
    try ParseSwift.initialize(configuration: configuration)
    print("Parse SDK initialized successfully")
} catch {
    print("Failed to initialize Parse SDK: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Initialize Parse SDK in your Application class
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize Parse
        Parse.Configuration.Builder configBuilder = new Parse.Configuration.Builder(this)
            .applicationId("YOUR_APP_ID")
            .clientKey("YOUR_CLIENT_KEY")
            .server("https://example.com/parse/");
            
        // Optional: Enable local datastore for offline support
        configBuilder.enableLocalDataStore();
        
        Parse.initialize(configBuilder.build());
        
        Log.d("Parse", "Parse SDK initialized successfully");
    }
}

// Don't forget to add your Application class to AndroidManifest.xml:
// <application android:name=".MyApplication" ...>`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
require_once 'vendor/autoload.php';

use Parse\\ParseClient;

// Initialize Parse SDK
ParseClient::initialize(
    "YOUR_APP_ID",          // Application ID
    "YOUR_REST_API_KEY",    // REST API Key
    "YOUR_MASTER_KEY"       // Master Key (for server-side operations)
);

// Set the server URL
ParseClient::setServerURL('https://example.com/parse');

// Optional: Set additional configuration
ParseClient::setServerVersion('1.6.0');

echo "Parse SDK initialized successfully";
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Credentials Setup</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    You'll need to obtain your application credentials from your Parse Server dashboard or configuration.
                  </p>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <ShieldCheck className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Security Notice</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          Never expose your Master Key in client-side code. Use it only for server-side operations and administrative tasks.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Required Credentials:</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li><strong>Application ID:</strong> Unique identifier for your Parse app</li>
                      <li><strong>JavaScript Key:</strong> For client-side JavaScript applications</li>
                      <li><strong>REST API Key:</strong> For REST API access and server-side PHP</li>
                      <li><strong>Client Key:</strong> For mobile applications (iOS/Android)</li>
                      <li><strong>Master Key:</strong> For administrative operations (server-side only)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Objects Section */}
            {activeSection === "objects" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Working with Objects</h2>
                
                {/* Save an Object */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Save an Object</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Create and save objects to the Parse database. Objects can contain any data that can be JSON-encoded.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("objects", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/classes/GameScore
                        </div>
                        <CodeBlock language="bash">
{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "score": 1337,
    "playerName": "Sean Plott",
    "cheatMode": false
  }' \\
  https://example.com/parse/classes/GameScore`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation CreateGameScore($input: CreateGameScoreFieldsInput!) {
  createGameScore(input: $input) {
    objectId
    score
    playerName
    cheatMode
    createdAt
    updatedAt
  }
}

# Variables:
{
  "input": {
    "fields": {
      "score": 1337,
      "playerName": "Sean Plott",
      "cheatMode": false
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Create a new GameScore object
const GameScore = Parse.Object.extend("GameScore");
const gameScore = new GameScore();

// Set values
gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

// Save the object
try {
  const result = await gameScore.save();
  console.log('GameScore created:', result.id);
} catch (error) {
  console.error('Error saving GameScore:', error);
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`import ParseSwift

// Define your Parse Object
struct GameScore: ParseObject {
    var objectId: String?
    var createdAt: Date?
    var updatedAt: Date?
    var ACL: ParseACL?
    var originalData: Data?
    
    var score: Int?
    var playerName: String?
    var cheatMode: Bool?
}

// Create and save a GameScore
var gameScore = GameScore()
gameScore.score = 1337
gameScore.playerName = "Sean Plott"
gameScore.cheatMode = false

do {
    let savedGameScore = try await gameScore.save()
    print("GameScore saved: \\(savedGameScore.objectId ?? "")")
} catch {
    print("Error saving GameScore: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Create a new GameScore object
ParseObject gameScore = new ParseObject("GameScore");
gameScore.put("score", 1337);
gameScore.put("playerName", "Sean Plott");
gameScore.put("cheatMode", false);

// Save the object
gameScore.saveInBackground(new SaveCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("GameScore", "Saved successfully: " + gameScore.getObjectId());
        } else {
            Log.e("GameScore", "Error saving: " + e.getMessage());
        }
    }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// Create a new GameScore object
$gameScore = new ParseObject("GameScore");
$gameScore->set("score", 1337);
$gameScore->set("playerName", "Sean Plott");
$gameScore->set("cheatMode", false);

try {
    $gameScore->save();
    echo 'GameScore created: ' . $gameScore->getObjectId();
} catch (Exception $e) {
    echo 'Error saving GameScore: ' . $e->getMessage();
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Retrieve an Object */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Retrieve an Object</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Retrieve objects from Parse by their objectId or using queries to find multiple objects.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("objects", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          GET https://example.com/parse/classes/GameScore/objectId
                        </div>
                        <CodeBlock language="bash">
{`curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  https://example.com/parse/classes/GameScore/Ed1nuqPvc`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          QUERY https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`query GetGameScore($objectId: String!) {
  gameScore(objectId: $objectId) {
    objectId
    score
    playerName
    cheatMode
    createdAt
    updatedAt
  }
}

# Variables:
{
  "objectId": "Ed1nuqPvc"
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Get object by ID
const GameScore = Parse.Object.extend("GameScore");
const query = new Parse.Query(GameScore);

try {
  const gameScore = await query.get("Ed1nuqPvc");
  console.log('Score:', gameScore.get('score'));
  console.log('Player:', gameScore.get('playerName'));
} catch (error) {
  console.error('Error fetching GameScore:', error);
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Retrieve object by ID
do {
    let gameScore: GameScore = try await GameScore.query()
        .where("objectId" == "Ed1nuqPvc")
        .first()
    
    print("Score: \\(gameScore.score ?? 0)")
    print("Player: \\(gameScore.playerName ?? "")")
} catch {
    print("Error fetching GameScore: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Get object by ID
ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.getInBackground("Ed1nuqPvc", new GetCallback<ParseObject>() {
    public void done(ParseObject gameScore, ParseException e) {
        if (e == null) {
            int score = gameScore.getInt("score");
            String playerName = gameScore.getString("playerName");
            Log.d("GameScore", "Score: " + score + ", Player: " + playerName);
        } else {
            Log.e("GameScore", "Error fetching: " + e.getMessage());
        }
    }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
use Parse\\ParseQuery;

// Get object by ID
$query = new ParseQuery("GameScore");

try {
    $gameScore = $query->get("Ed1nuqPvc");
    echo 'Score: ' . $gameScore->get("score");
    echo 'Player: ' . $gameScore->get("playerName");
} catch (Exception $e) {
    echo 'Error fetching GameScore: ' . $e->getMessage();
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Update an Object</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Update existing objects by setting new values for fields and saving the changes.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("objects", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          PUT https://example.com/parse/classes/GameScore/Ed1nuqPvc
                        </div>
                        <CodeBlock language="bash">
{`curl -X PUT \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "score": 73453
  }' \\
  https://example.com/parse/classes/GameScore/Ed1nuqPvc`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <CodeBlock language="graphql">
{`mutation UpdateGameScore($objectId: String!, $input: UpdateGameScoreFieldsInput!) {
  updateGameScore(objectId: $objectId, input: $input) {
    objectId
    score
    playerName
    cheatMode
    updatedAt
  }
}

# Variables:
{
  "objectId": "Ed1nuqPvc",
  "input": {
    "fields": {
      "score": 73453
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Update an existing object
const GameScore = Parse.Object.extend("GameScore");
const query = new Parse.Query(GameScore);

try {
  const gameScore = await query.get("Ed1nuqPvc");
  gameScore.set("score", 73453);
  
  const updatedScore = await gameScore.save();
  console.log('GameScore updated:', updatedScore.id);
} catch (error) {
  console.error('Error updating GameScore:', error);
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Update an existing object
do {
    var gameScore: GameScore = try await GameScore.query()
        .where("objectId" == "Ed1nuqPvc")
        .first()
    
    gameScore.score = 73453
    let updatedGameScore = try await gameScore.save()
    print("GameScore updated: \\(updatedGameScore.objectId ?? "")")
} catch {
    print("Error updating GameScore: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Update an existing object
ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.getInBackground("Ed1nuqPvc", new GetCallback<ParseObject>() {
    public void done(ParseObject gameScore, ParseException e) {
        if (e == null) {
            gameScore.put("score", 73453);
            gameScore.saveInBackground(new SaveCallback() {
                public void done(ParseException e) {
                    if (e == null) {
                        Log.d("GameScore", "Updated successfully");
                    } else {
                        Log.e("GameScore", "Error updating: " + e.getMessage());
                    }
                }
            });
        }
    }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// Update an existing object
$query = new ParseQuery("GameScore");

try {
    $gameScore = $query->get("Ed1nuqPvc");
    $gameScore->set("score", 73453);
    $gameScore->save();
    echo 'GameScore updated: ' . $gameScore->getObjectId();
} catch (Exception $e) {
    echo 'Error updating GameScore: ' . $e->getMessage();
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Delete an Object */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Delete an Object</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Delete objects from the Parse database when they are no longer needed.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("objects", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          DELETE https://example.com/parse/classes/GameScore/Ed1nuqPvc
                        </div>
                        <CodeBlock language="bash">
{`curl -X DELETE \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  https://example.com/parse/classes/GameScore/Ed1nuqPvc`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <CodeBlock language="graphql">
{`mutation DeleteGameScore($objectId: String!) {
  deleteGameScore(objectId: $objectId) {
    objectId
  }
}

# Variables:
{
  "objectId": "Ed1nuqPvc"
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Delete an object
const GameScore = Parse.Object.extend("GameScore");
const query = new Parse.Query(GameScore);

try {
  const gameScore = await query.get("Ed1nuqPvc");
  await gameScore.destroy();
  console.log('GameScore deleted');
} catch (error) {
  console.error('Error deleting GameScore:', error);
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Delete an object
do {
    let gameScore: GameScore = try await GameScore.query()
        .where("objectId" == "Ed1nuqPvc")
        .first()
    
    try await gameScore.delete()
    print("GameScore deleted")
} catch {
    print("Error deleting GameScore: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Delete an object
ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.getInBackground("Ed1nuqPvc", new GetCallback<ParseObject>() {
    public void done(ParseObject gameScore, ParseException e) {
        if (e == null) {
            gameScore.deleteInBackground(new DeleteCallback() {
                public void done(ParseException e) {
                    if (e == null) {
                        Log.d("GameScore", "Deleted successfully");
                    } else {
                        Log.e("GameScore", "Error deleting: " + e.getMessage());
                    }
                }
            });
        }
    }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// Delete an object
$query = new ParseQuery("GameScore");

try {
    $gameScore = $query->get("Ed1nuqPvc");
    $gameScore->destroy();
    echo 'GameScore deleted';
} catch (Exception $e) {
    echo 'Error deleting GameScore: ' . $e->getMessage();
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}

            {/* Queries Section */}
            {activeSection === "queries" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Queries</h2>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Basic Queries</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Query for objects using constraints like equality, comparison operators, and more.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("queries", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          GET https://example.com/parse/classes/GameScore?where=...
                        </div>
                        <CodeBlock language="bash">
{`# Query with constraints
curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -G \\
  --data-urlencode 'where={"playerName":"Sean Plott","score":{"$gte":1000}}' \\
  https://example.com/parse/classes/GameScore`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          QUERY https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`query FindGameScores($where: GameScoreWhereInput) {
  gameScores(where: $where) {
    edges {
      node {
        objectId
        score
        playerName
        cheatMode
        createdAt
      }
    }
  }
}

# Variables:
{
  "where": {
    "playerName": {
      "equalTo": "Sean Plott"
    },
    "score": {
      "greaterThanOrEqualTo": 1000
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`const GameScore = Parse.Object.extend("GameScore");
const query = new Parse.Query(GameScore);

// Add constraints
query.equalTo("playerName", "Sean Plott");
query.greaterThanOrEqualTo("score", 1000);

// Execute query
try {
  const results = await query.find();
  console.log(\`Found \${results.length} games\`);
  
  results.forEach(gameScore => {
    console.log(\`Score: \${gameScore.get('score')}\`);
  });
} catch (error) {
  console.error('Error finding games:', error);
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`do {
    let gameScores: [GameScore] = try await GameScore.query()
        .where("playerName" == "Sean Plott")
        .where("score" >= 1000)
        .find()
    
    print("Found \\(gameScores.count) games")
    
    for gameScore in gameScores {
        print("Score: \\(gameScore.score ?? 0)")
    }
} catch {
    print("Error finding games: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
query.whereEqualTo("playerName", "Sean Plott");
query.whereGreaterThanOrEqualTo("score", 1000);

query.findInBackground(new FindCallback<ParseObject>() {
    public void done(List<ParseObject> gameScores, ParseException e) {
        if (e == null) {
            Log.d("GameScore", "Found " + gameScores.size() + " games");
            
            for (ParseObject gameScore : gameScores) {
                Log.d("GameScore", "Score: " + gameScore.getInt("score"));
            }
        } else {
            Log.e("GameScore", "Error finding games: " + e.getMessage());
        }
    }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
$query = new ParseQuery("GameScore");
$query->equalTo("playerName", "Sean Plott");
$query->greaterThanOrEqualTo("score", 1000);

try {
    $results = $query->find();
    echo 'Found ' . count($results) . ' games';
    
    foreach ($results as $gameScore) {
        echo 'Score: ' . $gameScore->get("score");
    }
} catch (Exception $e) {
    echo 'Error finding games: ' . $e->getMessage();
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Query Constraints */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Query Constraints</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Use various constraints to filter your queries: equality, less than, greater than, contained in, and more.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("queries-constraints", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Basic constraints
query.equalTo("playerName", "Dan Stemkoski");
query.notEqualTo("playerName", "Michael Yabuti");
query.greaterThan("score", 1000);
query.lessThan("score", 2000);
query.greaterThanOrEqualTo("score", 1000);
query.lessThanOrEqualTo("score", 2000);

// Array constraints
query.containedIn("playerName", ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"]);
query.notContainedIn("playerName", ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"]);

// String constraints
query.startsWith("playerName", "Big Daddy");
query.endsWith("playerName", "Jr.");
query.contains("playerName", "Daddy");

// Query limit and ordering
query.limit(10);
query.skip(10);
query.ascending("score");
query.descending("score");

// Execute query
const results = await query.find();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Basic constraints
let gameScores = try await GameScore.query()
    .where("playerName" == "Dan Stemkoski")
    .where("playerName" != "Michael Yabuti")
    .where("score" > 1000)
    .where("score" < 2000)
    .where("score" >= 1000)
    .where("score" <= 2000)
    .containedIn("playerName", ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"])
    .order([.ascending("score")])
    .limit(10)
    .skip(10)
    .find()`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Basic constraints
query.whereEqualTo("playerName", "Dan Stemkoski");
query.whereNotEqualTo("playerName", "Michael Yabuti");
query.whereGreaterThan("score", 1000);
query.whereLessThan("score", 2000);
query.whereGreaterThanOrEqualTo("score", 1000);
query.whereLessThanOrEqualTo("score", 2000);

// Array constraints
List<String> names = Arrays.asList("Jonathan Walsh", "Dario Wunsch", "Shawn Simon");
query.whereContainedIn("playerName", names);
query.whereNotContainedIn("playerName", names);

// String constraints
query.whereStartsWith("playerName", "Big Daddy");
query.whereEndsWith("playerName", "Jr.");
query.whereContains("playerName", "Daddy");

// Query options
query.setLimit(10);
query.setSkip(10);
query.orderByAscending("score");
query.orderByDescending("score");

// Execute query
query.findInBackground(callback);`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}

            {/* Users Section */}
            {activeSection === "users" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Users</h2>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">User Registration</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Register new users with username, password, and additional fields.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("users", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/users
                        </div>
                        <CodeBlock language="bash">
{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "cooldude6",
    "password": "p_n7!-e8",
    "email": "cooldude6@example.com",
    "phone": "415-392-0202"
  }' \\
  https://example.com/parse/users`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      objectId
      username
      email
      createdAt
    }
  }
}

# Variables:
{
  "input": {
    "fields": {
      "username": "cooldude6",
      "password": "p_n7!-e8",
      "email": "cooldude6@example.com",
      "phone": "415-392-0202"
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`const user = new Parse.User();
user.set("username", "cooldude6");
user.set("password", "p_n7!-e8");
user.set("email", "cooldude6@example.com");
user.set("phone", "415-392-0202");

try {
  await user.signUp();
  console.log("User signed up successfully:", user.id);
} catch (error) {
  console.error("Error signing up user:", error);
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`let user = User()
user.username = "cooldude6"
user.password = "p_n7!-e8"
user.email = "cooldude6@example.com"
user.phone = "415-392-0202"

do {
    try await user.signup()
    print("User signed up successfully: \\(user.objectId)")
} catch {
    print("Error signing up user: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`ParseUser user = new ParseUser();
user.setUsername("cooldude6");
user.setPassword("p_n7!-e8");
user.setEmail("cooldude6@example.com");
user.put("phone", "415-392-0202");

user.signUpInBackground(new SignUpCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("User", "User signed up successfully: " + user.getObjectId());
        } else {
            Log.e("User", "Error signing up user: " + e.getMessage());
        }
    }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
$user = new ParseUser();
$user->set("username", "cooldude6");
$user->set("password", "p_n7!-e8");
$user->set("email", "cooldude6@example.com");
$user->set("phone", "415-392-0202");

try {
    $user->signUp();
    echo "User signed up successfully: " . $user->getObjectId();
} catch (Exception $e) {
    echo "Error signing up user: " . $e->getMessage();
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">User Login</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Log in existing users with username and password.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("users", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          GET https://example.com/parse/login?username=...&password=...
                        </div>
                        <CodeBlock language="bash">
{`curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -G \\
  --data-urlencode 'username=cooldude6' \\
  --data-urlencode 'password=p_n7!-e8' \\
  https://example.com/parse/login`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation LogIn($input: LogInInput!) {
  logIn(input: $input) {
    viewer {
      user {
        objectId
        username
        email
        sessionToken
      }
    }
  }
}

# Variables:
{
  "input": {
    "username": "cooldude6",
    "password": "p_n7!-e8"
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`try {
  const user = await Parse.User.logIn("cooldude6", "p_n7!-e8");
  console.log("User logged in successfully:", user.id);
  
  // Get current user
  const currentUser = Parse.User.current();
  if (currentUser) {
    console.log("Current user:", currentUser.get("username"));
  }
} catch (error) {
  console.error("Error logging in user:", error);
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`do {
    let user = try await User.login(username: "cooldude6", password: "p_n7!-e8")
    print("User logged in successfully: \\(user.objectId)")
    
    // Get current user
    if let currentUser = User.current {
        print("Current user: \\(currentUser.username)")
    }
} catch {
    print("Error logging in user: \\(error)")
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`ParseUser.logInInBackground("cooldude6", "p_n7!-e8", new LogInCallback() {
    public void done(ParseUser user, ParseException e) {
        if (user != null) {
            Log.d("User", "User logged in successfully: " + user.getObjectId());
            
            // Get current user
            ParseUser currentUser = ParseUser.getCurrentUser();
            if (currentUser != null) {
                Log.d("User", "Current user: " + currentUser.getUsername());
            }
        } else {
            Log.e("User", "Error logging in user: " + e.getMessage());
        }
    }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
try {
    $user = ParseUser::logIn("cooldude6", "p_n7!-e8");
    echo "User logged in successfully: " . $user->getObjectId();
    
    // Get current user
    $currentUser = ParseUser::getCurrentUser();
    if ($currentUser) {
        echo "Current user: " . $currentUser->getUsername();
    }
} catch (Exception $e) {
    echo "Error logging in user: " . $e->getMessage();
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}

            {/* Files Section */}
            {activeSection === "files" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Files</h2>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">File Upload</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Upload files to Parse and associate them with your objects.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("files", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/files/filename
                        </div>
                        <CodeBlock language="bash">
{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: text/plain" \\
  --data-binary 'Hello, World!' \\
  https://example.com/parse/files/hello.txt`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation CreateFile($input: CreateFileInput!) {
  createFile(input: $input) {
    fileInfo {
      name
      url
    }
  }
}

# Variables:
{
  "input": {
    "upload": "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=="
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// From input element
const fileUploadControl = document.getElementById("profilePhotoFileUpload");
const file = fileUploadControl.files[0];
const name = "photo.jpg";

const parseFile = new Parse.File(name, file);

try {
  await parseFile.save();
  console.log("File uploaded successfully:", parseFile.url());
  
  // Associate with object
  const user = Parse.User.current();
  user.set("profilePhoto", parseFile);
  await user.save();
} catch (error) {
  console.error("Error uploading file:", error);
}

// From byte array
const base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
const parseFile = new Parse.File("myfile.txt", { base64: base64 });
await parseFile.save();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// From Data
let data = "Hello, World!".data(using: .utf8)!
let parseFile = ParseFile(name: "hello.txt", data: data)

do {
    try await parseFile.save()
    print("File uploaded successfully: \\(parseFile.url)")
    
    // Associate with object
    var user = try await User.current()
    user.profilePhoto = parseFile
    try await user.save()
} catch {
    print("Error uploading file: \\(error)")
}

// From URL
if let url = URL(string: "https://example.com/image.jpg") {
    let parseFile = ParseFile(name: "image.jpg", cloudURL: url)
    try await parseFile.save()
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// From byte array
String str = "Hello, World!";
byte[] data = str.getBytes();
ParseFile file = new ParseFile("hello.txt", data);

file.saveInBackground(new SaveCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("File", "File uploaded successfully: " + file.getUrl());
            
            // Associate with object
            ParseUser user = ParseUser.getCurrentUser();
            user.put("profilePhoto", file);
            user.saveInBackground();
        } else {
            Log.e("File", "Error uploading file: " + e.getMessage());
        }
    }
});

// From File object
File imageFile = new File("path/to/image.jpg");
ParseFile parseFile = new ParseFile(imageFile);
parseFile.saveInBackground(callback);`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// From string data
$data = "Hello, World!";
$file = ParseFile::createFromData($data, "hello.txt");

try {
    $file->save();
    echo "File uploaded successfully: " . $file->getURL();
    
    // Associate with object
    $user = ParseUser::getCurrentUser();
    $user->set("profilePhoto", $file);
    $user->save();
} catch (Exception $e) {
    echo "Error uploading file: " . $e->getMessage();
}

// From file path
$file = ParseFile::createFromFile("/path/to/image.jpg", "image.jpg");
$file->save();
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">File Retrieval</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Retrieve and work with files that have been uploaded to Parse.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("files-retrieval", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Get file from object
const user = Parse.User.current();
const profilePhoto = user.get("profilePhoto");

if (profilePhoto) {
  console.log("File name:", profilePhoto.name());
  console.log("File URL:", profilePhoto.url());
  
  // Download file data
  const response = await fetch(profilePhoto.url());
  const blob = await response.blob();
  
  // Create download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = profilePhoto.name();
  a.click();
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Get file from object
let user = try await User.current()
if let profilePhoto = user.profilePhoto {
    print("File name: \\(profilePhoto.name)")
    print("File URL: \\(profilePhoto.url)")
    
    // Download file data
    do {
        let data = try await profilePhoto.fetch()
        // Use the data...
    } catch {
        print("Error downloading file: \\(error)")
    }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Get file from object
ParseUser user = ParseUser.getCurrentUser();
ParseFile profilePhoto = user.getParseFile("profilePhoto");

if (profilePhoto != null) {
    Log.d("File", "File name: " + profilePhoto.getName());
    Log.d("File", "File URL: " + profilePhoto.getUrl());
    
    // Download file data
    profilePhoto.getDataInBackground(new GetDataCallback() {
        public void done(byte[] data, ParseException e) {
            if (e == null) {
                // Use the data...
                Log.d("File", "File downloaded successfully");
            } else {
                Log.e("File", "Error downloading file: " + e.getMessage());
            }
        }
    });
}`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}

            {/* Push Notifications Section */}
            {activeSection === "push" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Push Notifications</h2>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Send Push Notifications</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Send push notifications to specific users or broadcast to all users.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("push", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/push
                        </div>
                        <CodeBlock language="bash">
{`# Send to all users
curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channels": [""],
    "data": {
      "alert": "Hello, World!"
    }
  }' \\
  https://example.com/parse/push

# Send to specific users
curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "where": {
      "deviceType": "ios"
    },
    "data": {
      "alert": "Hello iOS users!"
    }
  }' \\
  https://example.com/parse/push`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation SendPushNotification($input: SendPushNotificationInput!) {
  sendPushNotification(input: $input) {
    success
  }
}

# Variables:
{
  "input": {
    "fields": {
      "data": {
        "alert": "Hello, World!"
      },
      "channels": [""]
    }
  }
}

# Or with targeting:
{
  "input": {
    "fields": {
      "data": {
        "alert": "Hello iOS users!"
      },
      "where": {
        "deviceType": {
          "equalTo": "ios"
        }
      }
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Send to all users
Parse.Push.send({
  channels: [""],
  data: {
    alert: "Hello, World!"
  }
}).then(() => {
  console.log("Push notification sent successfully");
}).catch((error) => {
  console.error("Error sending push notification:", error);
});

// Send to specific users
const query = new Parse.Query(Parse.Installation);
query.equalTo("deviceType", "ios");

Parse.Push.send({
  where: query,
  data: {
    alert: "Hello iOS users!",
    badge: 1,
    sound: "default"
  }
}).then(() => {
  console.log("Targeted push notification sent");
}).catch((error) => {
  console.error("Error sending targeted push:", error);
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Send to all users
let push = PFPush()
push.setChannel("")
push.setMessage("Hello, World!")

do {
    try await push.send()
    print("Push notification sent successfully")
} catch {
    print("Error sending push notification: \\(error)")
}

// Send to specific users
let query = PFInstallation.query()
query?.whereKey("deviceType", equalTo: "ios")

let targetedPush = PFPush()
targetedPush.setQuery(query)
targetedPush.setData([
    "alert": "Hello iOS users!",
    "badge": 1,
    "sound": "default"
])

try await targetedPush.send()`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Send to all users
ParsePush push = new ParsePush();
push.setChannel("");
push.setMessage("Hello, World!");

push.sendInBackground(new SendCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("Push", "Push notification sent successfully");
        } else {
            Log.e("Push", "Error sending push notification: " + e.getMessage());
        }
    }
});

// Send to specific users
ParseQuery<ParseInstallation> query = ParseInstallation.getQuery();
query.whereEqualTo("deviceType", "android");

ParsePush targetedPush = new ParsePush();
targetedPush.setQuery(query);

JSONObject data = new JSONObject();
data.put("alert", "Hello Android users!");
data.put("badge", 1);

targetedPush.setData(data);
targetedPush.sendInBackground();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// Send to all users
$data = array(
    "channels" => array(""),
    "data" => array(
        "alert" => "Hello, World!"
    )
);

try {
    ParsePush::send($data);
    echo "Push notification sent successfully";
} catch (Exception $e) {
    echo "Error sending push notification: " . $e->getMessage();
}

// Send to specific users
$query = new ParseQuery("_Installation");
$query->equalTo("deviceType", "ios");

$data = array(
    "where" => $query,
    "data" => array(
        "alert" => "Hello iOS users!",
        "badge" => 1,
        "sound" => "default"
    )
);

ParsePush::send($data);
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}

            {/* Cloud Functions Section */}
            {activeSection === "cloud" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Cloud Functions</h2>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Calling Cloud Functions</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Execute server-side logic with Cloud Functions that run on Parse Server.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("cloud", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/functions/functionName
                        </div>
                        <CodeBlock language="bash">
{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }' \\
  https://example.com/parse/functions/sendWelcomeEmail`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation CallCloudFunction($input: CallCloudCodeInput!) {
  callCloudCode(input: $input) {
    result
  }
}

# Variables:
{
  "input": {
    "functionName": "sendWelcomeEmail",
    "params": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Call cloud function
try {
  const result = await Parse.Cloud.run("sendWelcomeEmail", {
    name: "John Doe",
    email: "john@example.com"
  });
  
  console.log("Cloud function result:", result);
} catch (error) {
  console.error("Error calling cloud function:", error);
}

// Cloud function with no parameters
const simpleResult = await Parse.Cloud.run("getServerTime");
console.log("Server time:", simpleResult);`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Call cloud function
let parameters = [
    "name": "John Doe",
    "email": "john@example.com"
]

do {
    let result = try await PFCloud.callFunction(withName: "sendWelcomeEmail", 
                                               parameters: parameters)
    print("Cloud function result: \\(result)")
} catch {
    print("Error calling cloud function: \\(error)")
}

// Cloud function with no parameters
let serverTime = try await PFCloud.callFunction(withName: "getServerTime", 
                                               parameters: nil)
print("Server time: \\(serverTime)")`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Call cloud function
HashMap<String, Object> params = new HashMap<>();
params.put("name", "John Doe");
params.put("email", "john@example.com");

ParseCloud.callFunctionInBackground("sendWelcomeEmail", params, 
    new FunctionCallback<Object>() {
        public void done(Object result, ParseException e) {
            if (e == null) {
                Log.d("CloudFunction", "Result: " + result.toString());
            } else {
                Log.e("CloudFunction", "Error: " + e.getMessage());
            }
        }
    });

// Cloud function with no parameters
ParseCloud.callFunctionInBackground("getServerTime", null, callback);`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// Call cloud function
$params = array(
    "name" => "John Doe",
    "email" => "john@example.com"
);

try {
    $result = ParseCloud::run("sendWelcomeEmail", $params);
    echo "Cloud function result: " . $result;
} catch (Exception $e) {
    echo "Error calling cloud function: " . $e->getMessage();
}

// Cloud function with no parameters
$serverTime = ParseCloud::run("getServerTime");
echo "Server time: " . $serverTime;
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Security</h2>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Access Control Lists (ACLs)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Control who can read and write to your objects using Access Control Lists.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("security", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`const GameScore = Parse.Object.extend("GameScore");
const gameScore = new GameScore();

// Create ACL
const acl = new Parse.ACL();

// Set public read/write access
acl.setPublicReadAccess(true);
acl.setPublicWriteAccess(false);

// Set user-specific access
const user = Parse.User.current();
acl.setReadAccess(user, true);
acl.setWriteAccess(user, true);

// Set role-based access
const adminRole = new Parse.Role("admin", acl);
acl.setRoleReadAccess(adminRole, true);
acl.setRoleWriteAccess(adminRole, true);

// Apply ACL to object
gameScore.setACL(acl);
gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");

await gameScore.save();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`let gameScore = GameScore()

// Create ACL
let acl = PFACL()

// Set public access
acl.setPublicReadAccess(true)
acl.setPublicWriteAccess(false)

// Set user-specific access
if let user = PFUser.current() {
    acl.setReadAccess(true, for: user)
    acl.setWriteAccess(true, for: user)
}

// Apply ACL to object
gameScore.acl = acl
gameScore.score = 1337
gameScore.playerName = "Sean Plott"

try await gameScore.save()`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`ParseObject gameScore = new ParseObject("GameScore");

// Create ACL
ParseACL acl = new ParseACL();

// Set public access
acl.setPublicReadAccess(true);
acl.setPublicWriteAccess(false);

// Set user-specific access
ParseUser user = ParseUser.getCurrentUser();
acl.setReadAccess(user, true);
acl.setWriteAccess(user, true);

// Apply ACL to object
gameScore.setACL(acl);
gameScore.put("score", 1337);
gameScore.put("playerName", "Sean Plott");

gameScore.saveInBackground();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
$gameScore = new ParseObject("GameScore");

// Create ACL
$acl = new ParseACL();

// Set public access
$acl->setPublicReadAccess(true);
$acl->setPublicWriteAccess(false);

// Set user-specific access
$user = ParseUser::getCurrentUser();
$acl->setUserReadAccess($user, true);
$acl->setUserWriteAccess($user, true);

// Apply ACL to object
$gameScore->setACL($acl);
$gameScore->set("score", 1337);
$gameScore->set("playerName", "Sean Plott");

$gameScore->save();
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Roles</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Create roles to group users and assign permissions at scale.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("security-roles", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Create a role
const roleACL = new Parse.ACL();
roleACL.setPublicReadAccess(true);

const adminRole = new Parse.Role("admin", roleACL);

// Add users to role
const user1 = await new Parse.Query(Parse.User).get("user1Id");
const user2 = await new Parse.Query(Parse.User).get("user2Id");

adminRole.getUsers().add(user1);
adminRole.getUsers().add(user2);

// Add child roles
const moderatorRole = await new Parse.Query(Parse.Role).get("moderatorRoleId");
adminRole.getRoles().add(moderatorRole);

await adminRole.save();

// Use role in ACL
const postACL = new Parse.ACL();
postACL.setRoleReadAccess(adminRole, true);
postACL.setRoleWriteAccess(adminRole, true);

const post = new Parse.Object("Post");
post.setACL(postACL);
await post.save();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Create a role
let roleACL = PFACL()
roleACL.setPublicReadAccess(true)

let adminRole = PFRole(name: "admin", acl: roleACL)

// Add users to role
let user1 = try await PFUser.query()?.getObjectWithId("user1Id")
let user2 = try await PFUser.query()?.getObjectWithId("user2Id")

adminRole.users.add(user1)
adminRole.users.add(user2)

try await adminRole.save()

// Use role in ACL
let postACL = PFACL()
postACL.setAccess(true, forRole: adminRole)

let post = PFObject(className: "Post")
post.acl = postACL
try await post.save()`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Create a role
ParseACL roleACL = new ParseACL();
roleACL.setPublicReadAccess(true);

ParseRole adminRole = new ParseRole("admin", roleACL);

// Add users to role
ParseQuery<ParseUser> userQuery = ParseUser.getQuery();
userQuery.getInBackground("user1Id", new GetCallback<ParseUser>() {
    public void done(ParseUser user, ParseException e) {
        if (e == null) {
            adminRole.getUsers().add(user);
            adminRole.saveInBackground();
        }
    }
});

// Use role in ACL
ParseACL postACL = new ParseACL();
postACL.setRoleReadAccess(adminRole, true);
postACL.setRoleWriteAccess(adminRole, true);

ParseObject post = new ParseObject("Post");
post.setACL(postACL);
post.saveInBackground();`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
