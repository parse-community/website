import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Book,
  Code,
  Database,
  ExternalLink,
  FileText,
  MessageSquare,
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

// Helper component for suggesting changes to documentation sections
interface SuggestChangeProps {
  sectionTitle: string;
  sectionId: string;
}

const SuggestChange: React.FC<SuggestChangeProps> = ({ sectionTitle, sectionId }) => {
  const handleSuggestChange = () => {
    const issueTitle = `docs: Suggestion for section ${sectionTitle}`;
    const issueBody = `## Section ${sectionTitle}

### Suggested Change

<!-- Please describe your suggested improvement or correction here -->

### Reason

<!-- Please explain why this change would be helpful -->

### Additional Context

<!-- Add any other context or screenshots about the suggestion here -->`;

    const encodedTitle = encodeURIComponent(issueTitle);
    const encodedBody = encodeURIComponent(issueBody);
    const githubUrl = `https://github.com/parse-community/website/issues/new?title=${encodedTitle}&body=${encodedBody}&labels=documentation,enhancement`;
    
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSuggestChange}
      className="flex items-center space-x-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 opacity-60 hover:opacity-100 transition-opacity"
    >
      <MessageSquare className="h-3 w-3" />
      <span className="text-xs">Suggest Change</span>
    </Button>
  );
};

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("initialization");
  const [activeCodeTab, setActiveCodeTab] = useState("rest");

  // Helper function to get the best available tab for a section
  const getAvailableTabForSection = (sectionId: string, preferredTab: string) => {
    const sectionTabs: Record<string, string[]> = {
      "initialization": ["javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "objects": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "queries": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "queries-constraints": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "users": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "files": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "files-retrieval": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "push": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "cloud": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "security": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
      "security-roles": ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"],
    };

    const availableTabs = sectionTabs[sectionId] || ["rest", "graphql", "javascript", "swift", "android", "flutter", "apple", "dotnet", "dart", "arduino", "php"];
    
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
        <div className="max-w-1xl mx-auto px- sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Book className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">Developer Guide</span>
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
            <h3 className="text-lg font-semibold mb-4">Topics</h3>
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

              {/* Feedback Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      This new guide is under construction. If you found something unclear, missing, or incorrect, use the "Suggest Change" button.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SDK Initialization Section */}
            {activeSection === "initialization" && (
              <div className="space-y-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">SDK Initialization</h2>
                  <SuggestChange sectionTitle="SDK Initialization" sectionId="initialization" />
                </div>
                
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
                        <TabsTrigger value="dotnet" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">.NET</TabsTrigger>
                        <TabsTrigger value="dart" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Dart</TabsTrigger>
                        <TabsTrigger value="arduino" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Arduino</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`import 'package:parse_server_sdk_flutter/parse_server_sdk.dart';

// Initialize Parse SDK
void initializeParse() async {
  const keyApplicationId = 'YOUR_APP_ID';
  const keyClientKey = 'YOUR_CLIENT_KEY';
  const keyParseServerUrl = 'https://example.com/parse';

  await Parse().initialize(
    keyApplicationId,
    keyParseServerUrl,
    clientKey: keyClientKey,
    // Optional: Enable debug mode
    debug: true,
    // Optional: Enable local datastore for offline support
    coreStore: await CoreStoreMemoryImp.getInstance(),
  );

  print('Parse SDK initialized successfully');
}

// Call this in your main() function
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeParse();
  runApp(MyApp());
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`import ParseCore

// Initialize Parse SDK in AppDelegate or SceneDelegate
func initializeParse() {
    let configuration = ParseConfiguration {
        $0.applicationId = "YOUR_APP_ID"
        $0.clientKey = "YOUR_CLIENT_KEY" 
        $0.server = "https://example.com/parse"
        
        // Optional: Enable local datastore for offline support
        $0.isLocalDatastoreEnabled = true
        
        // Optional: Set additional options
        $0.isUsingDataProtection = true
    }
    
    Parse.initialize(with: configuration)
    print("Parse SDK initialized successfully")
}

// In AppDelegate.swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    initializeParse()
    return true
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="dotnet" className="p-0 -mt-px">
                        <CodeBlock language="csharp">
{`using Parse;

// Initialize Parse SDK
public static void InitializeParse()
{
    ParseClient.Initialize(new ParseClient.Configuration
    {
        ApplicationId = "YOUR_APP_ID",
        Key = "YOUR_DOTNET_KEY",
        Server = "https://example.com/parse"
    });
    
    Console.WriteLine("Parse SDK initialized successfully");
}

// In your main application
static void Main(string[] args)
{
    InitializeParse();
    
    // Your application code here
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="dart" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`import 'package:parse_server_sdk/parse_server_sdk.dart';

// Initialize Parse SDK (Pure Dart)
void initializeParse() async {
  const keyApplicationId = 'YOUR_APP_ID';
  const keyClientKey = 'YOUR_CLIENT_KEY';
  const keyParseServerUrl = 'https://example.com/parse';

  await Parse().initialize(
    keyApplicationId,
    keyParseServerUrl,
    clientKey: keyClientKey,
    // Optional: Enable debug mode
    debug: true,
    // Optional: Enable local datastore for offline support
    coreStore: await CoreStoreMemoryImp.getInstance(),
  );

  print('Parse SDK initialized successfully');
}

// Call this in your main() function
void main() async {
  await initializeParse();
  
  // Your application code here
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="arduino" className="p-0 -mt-px">
                        <CodeBlock language="cpp">
{`#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Parse configuration
const char* PARSE_APPLICATION_ID = "YOUR_APP_ID";
const char* PARSE_REST_API_KEY = "YOUR_REST_API_KEY";
const char* PARSE_SERVER_URL = "https://example.com/parse";

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  
  // Initialize WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected!");
  
  // Parse is now ready to use with HTTP requests
  Serial.println("Parse SDK ready for Arduino");
}

void loop() {
  // Your main application code here
}`}
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
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
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
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Working with Objects</h2>
                  <SuggestChange sectionTitle="Working with Objects" sectionId="objects" />
                </div>
                
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
                        <TabsTrigger value="dotnet" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">.NET</TabsTrigger>
                        <TabsTrigger value="dart" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Dart</TabsTrigger>
                        <TabsTrigger value="arduino" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Arduino</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`import 'package:parse_server_sdk_flutter/parse_server_sdk.dart';

// Create a new GameScore object
final gameScore = ParseObject('GameScore')
  ..set('score', 1337)
  ..set('playerName', 'Sean Plott')
  ..set('cheatMode', false);

// Save the object
try {
  final response = await gameScore.save();
  if (response.success) {
    print('GameScore saved: \${gameScore.objectId}');
  } else {
    print('Error saving GameScore: \${response.error?.message}');
  }
} catch (e) {
  print('Error saving GameScore: \$e');
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`import ParseCore

// Create a new GameScore object
let gameScore = PFObject(className: "GameScore")
gameScore["score"] = 1337
gameScore["playerName"] = "Sean Plott"
gameScore["cheatMode"] = false

// Save the object
gameScore.saveInBackground { (success, error) in
    if success {
        print("GameScore saved: \\(gameScore.objectId ?? "")")
    } else {
        print("Error saving GameScore: \\(error?.localizedDescription ?? "Unknown error")")
    }
}`}
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
                        <TabsTrigger value="dotnet" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">.NET</TabsTrigger>
                        <TabsTrigger value="dart" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Dart</TabsTrigger>
                        <TabsTrigger value="arduino" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Arduino</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`// Get object by ID
final query = QueryBuilder<ParseObject>(ParseObject('GameScore'));

try {
  final gameScore = await query.getObject('Ed1nuqPvc');
  if (gameScore != null) {
    final score = gameScore.get<int>('score') ?? 0;
    final playerName = gameScore.get<String>('playerName') ?? '';
    print('Score: \$score, Player: \$playerName');
  } else {
    print('GameScore not found');
  }
} catch (e) {
  print('Error fetching GameScore: \$e');
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Get object by ID
let query = PFQuery(className: "GameScore")

query.getObjectInBackground(withId: "Ed1nuqPvc") { (gameScore, error) in
    if let gameScore = gameScore {
        let score = gameScore["score"] as? Int ?? 0
        let playerName = gameScore["playerName"] as? String ?? ""
        print("Score: \\(score), Player: \\(playerName)")
    } else {
        print("Error fetching GameScore: \\(error?.localizedDescription ?? "Unknown error")")
    }
}`}
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
                      <TabsContent value="dotnet" className="p-0 -mt-px">
                        <CodeBlock language="csharp">
{`// Get object by ID
var query = ParseClient.Instance.GetQuery("GameScore");

try 
{
    var gameScore = await query.GetAsync("Ed1nuqPvc");
    var score = gameScore.Get<int>("score");
    var playerName = gameScore.Get<string>("playerName");
    Console.WriteLine($"Score: {score}, Player: {playerName}");
}
catch (ParseException e)
{
    Console.WriteLine($"Error fetching GameScore: {e.Message}");
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="dart" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`// Get object by ID
final dio = Dio();

try {
  final response = await dio.get(
    'https://example.com/parse/classes/GameScore/Ed1nuqPvc',
    options: Options(
      headers: {
        'X-Parse-Application-Id': 'YOUR_APP_ID',
        'X-Parse-REST-API-Key': 'YOUR_REST_API_KEY',
      },
    ),
  );
  
  final gameScore = response.data;
  print('Score: \${gameScore['score']}');
  print('Player: \${gameScore['playerName']}');
} catch (e) {
  print('Error fetching GameScore: \$e');
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="arduino" className="p-0 -mt-px">
                        <CodeBlock language="cpp">
{`// Get object by ID
#include <HTTPClient.h>
#include <ArduinoJson.h>

HTTPClient http;
http.begin("https://example.com/parse/classes/GameScore/Ed1nuqPvc");
http.addHeader("X-Parse-Application-Id", "YOUR_APP_ID");
http.addHeader("X-Parse-REST-API-Key", "YOUR_REST_API_KEY");

int httpCode = http.GET();
if (httpCode == HTTP_CODE_OK) {
  String payload = http.getString();
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, payload);
  
  int score = doc["score"];
  const char* playerName = doc["playerName"];
  Serial.printf("Score: %d, Player: %s\\n", score, playerName);
} else {
  Serial.printf("Error fetching GameScore: %d\\n", httpCode);
}
http.end();`}
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
                        <TabsTrigger value="dotnet" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">.NET</TabsTrigger>
                        <TabsTrigger value="dart" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Dart</TabsTrigger>
                        <TabsTrigger value="arduino" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Arduino</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`// Update an existing object
final query = QueryBuilder<ParseObject>(ParseObject('GameScore'));

try {
  final gameScore = await query.getObject('Ed1nuqPvc');
  if (gameScore != null) {
    gameScore.set('score', 73453);
    
    final response = await gameScore.save();
    if (response.success) {
      print('GameScore updated: \${gameScore.objectId}');
    } else {
      print('Error updating GameScore: \${response.error?.message}');
    }
  }
} catch (e) {
  print('Error updating GameScore: \$e');
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Update an existing object
let query = PFQuery(className: "GameScore")

query.getObjectInBackground(withId: "Ed1nuqPvc") { (gameScore, error) in
    if let gameScore = gameScore {
        gameScore["score"] = 73453
        
        gameScore.saveInBackground { (success, error) in
            if success {
                print("GameScore updated: \\(gameScore.objectId ?? "")")
            } else {
                print("Error updating GameScore: \\(error?.localizedDescription ?? "Unknown error")")
            }
        }
    } else {
        print("Error fetching GameScore: \\(error?.localizedDescription ?? "Unknown error")")
    }
}`}
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
                        <TabsTrigger value="dotnet" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">.NET</TabsTrigger>
                        <TabsTrigger value="dart" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Dart</TabsTrigger>
                        <TabsTrigger value="arduino" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Arduino</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`// Delete an object
final query = QueryBuilder<ParseObject>(ParseObject('GameScore'));

try {
  final gameScore = await query.getObject('Ed1nuqPvc');
  if (gameScore != null) {
    final response = await gameScore.delete();
    if (response.success) {
      print('GameScore deleted');
    } else {
      print('Error deleting GameScore: \${response.error?.message}');
    }
  }
} catch (e) {
  print('Error deleting GameScore: \$e');
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Delete an object
let query = PFQuery(className: "GameScore")

query.getObjectInBackground(withId: "Ed1nuqPvc") { (gameScore, error) in
    if let gameScore = gameScore {
        gameScore.deleteInBackground { (success, error) in
            if success {
                print("GameScore deleted")
            } else {
                print("Error deleting GameScore: \\(error?.localizedDescription ?? "Unknown error")")
            }
        }
    } else {
        print("Error fetching GameScore: \\(error?.localizedDescription ?? "Unknown error")")
    }
}`}
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
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Queries</h2>
                  <SuggestChange sectionTitle="Queries" sectionId="queries" />
                </div>
                
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`final query = QueryBuilder<ParseObject>(ParseObject('GameScore'))
  ..whereEqualTo('playerName', 'Sean Plott')
  ..whereGreaterThanOrEqualTo('score', 1000);

try {
  final gameScores = await query.find();
  print('Found \${gameScores.length} games');
  
  for (final gameScore in gameScores) {
    final score = gameScore.get<int>('score') ?? 0;
    print('Score: \$score');
  }
} catch (e) {
  print('Error finding games: \$e');
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`let query = PFQuery(className: "GameScore")
query.whereKey("playerName", equalTo: "Sean Plott")
query.whereKey("score", greaterThanOrEqualTo: 1000)

query.findObjectsInBackground { (gameScores, error) in
    if let gameScores = gameScores {
        print("Found \\(gameScores.count) games")
        
        for gameScore in gameScores {
            let score = gameScore["score"] as? Int ?? 0
            print("Score: \\(score)")
        }
    } else {
        print("Error finding games: \\(error?.localizedDescription ?? "Unknown error")")
    }
}`}
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
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          GET https://example.com/parse/classes/GameScore?where=...
                        </div>
                        <CodeBlock language="bash">
{`# Basic constraints
curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -G \\
  --data-urlencode 'where={"playerName":"Dan Stemkoski","score":{"$gte":1000,"$lt":2000}}' \\
  https://example.com/parse/classes/GameScore

# Array constraints (contained in)
curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -G \\
  --data-urlencode 'where={"playerName":{"$in":["Jonathan Walsh","Dario Wunsch","Shawn Simon"]}}' \\
  https://example.com/parse/classes/GameScore

# String constraints  
curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -G \\
  --data-urlencode 'where={"playerName":{"$regex":"^Big Daddy"}}' \\
  --data-urlencode 'limit=10' \\
  --data-urlencode 'skip=10' \\
  --data-urlencode 'order=score' \\
  https://example.com/parse/classes/GameScore`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          QUERY https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`query FindGameScoresWithConstraints($where: GameScoreWhereInput, $limit: Int, $skip: Int) {
  gameScores(where: $where, limit: $limit, skip: $skip, order: [score_ASC]) {
    edges {
      node {
        objectId
        score
        playerName
        createdAt
      }
    }
  }
}

# Variables for basic constraints:
{
  "where": {
    "playerName": {
      "equalTo": "Dan Stemkoski"
    },
    "score": {
      "greaterThanOrEqualTo": 1000,
      "lessThan": 2000
    }
  },
  "limit": 10,
  "skip": 10
}

# Variables for array constraints:
{
  "where": {
    "playerName": {
      "in": ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"]
    }
  }
}

# Variables for string constraints:
{
  "where": {
    "playerName": {
      "matchesRegex": "^Big Daddy"
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`final query = QueryBuilder<ParseObject>(ParseObject('GameScore'));

// Basic constraints
query
  ..whereEqualTo('playerName', 'Dan Stemkoski')
  ..whereNotEqualTo('playerName', 'Michael Yabuti')
  ..whereGreaterThan('score', 1000)
  ..whereLessThan('score', 2000)
  ..whereGreaterThanOrEqualTo('score', 1000)
  ..whereLessThanOrEqualTo('score', 2000);

// Array constraints
final names = ['Jonathan Walsh', 'Dario Wunsch', 'Shawn Simon'];
query
  ..whereContainedIn('playerName', names)
  ..whereNotContainedIn('playerName', names);

// String constraints
query
  ..whereStartsWith('playerName', 'Big Daddy')
  ..whereEndsWith('playerName', 'Jr.')
  ..whereContains('playerName', 'Daddy');

// Query options
query
  ..setLimit(10)
  ..setAmountToSkip(10)
  ..orderByAscending('score')
  ..orderByDescending('score');

// Execute query
final results = await query.find();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`let query = PFQuery(className: "GameScore")

// Basic constraints
query.whereKey("playerName", equalTo: "Dan Stemkoski")
query.whereKey("playerName", notEqualTo: "Michael Yabuti")
query.whereKey("score", greaterThan: 1000)
query.whereKey("score", lessThan: 2000)
query.whereKey("score", greaterThanOrEqualTo: 1000)
query.whereKey("score", lessThanOrEqualTo: 2000)

// Array constraints
let names = ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"]
query.whereKey("playerName", containedIn: names)
query.whereKey("playerName", notContainedIn: names)

// String constraints
query.whereKey("playerName", hasPrefix: "Big Daddy")
query.whereKey("playerName", hasSuffix: "Jr.")
query.whereKey("playerName", contains: "Daddy")

// Query options
query.limit = 10
query.skip = 10
query.order(byAscending: "score")
query.order(byDescending: "score")

// Execute query
query.findObjectsInBackground { (results, error) in
    // Handle results
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
$query = new ParseQuery("GameScore");

// Basic constraints
$query->equalTo("playerName", "Dan Stemkoski");
$query->notEqualTo("playerName", "Michael Yabuti");
$query->greaterThan("score", 1000);
$query->lessThan("score", 2000);
$query->greaterThanOrEqualTo("score", 1000);
$query->lessThanOrEqualTo("score", 2000);

// Array constraints
$names = ["Jonathan Walsh", "Dario Wunsch", "Shawn Simon"];
$query->containedIn("playerName", $names);
$query->notContainedIn("playerName", $names);

// String constraints
$query->startsWith("playerName", "Big Daddy");
$query->endsWith("playerName", "Jr.");
$query->contains("playerName", "Daddy");

// Query options
$query->limit(10);
$query->skip(10);
$query->ascending("score");
$query->descending("score");

try {
    $results = $query->find();
    echo 'Found ' . count($results) . ' games matching constraints';
    
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
              </div>
            )}

            {/* Users Section */}
            {activeSection === "users" && (
              <div className="space-y-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Users</h2>
                  <SuggestChange sectionTitle="Users" sectionId="users" />
                </div>
                
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`final user = ParseUser.createUser("cooldude6", "p_n7!-e8", "cooldude6@example.com");
user.set("phone", "415-392-0202");

try {
  final response = await user.signUp();
  if (response.success) {
    print("User signed up successfully: \${user.objectId}");
  } else {
    print("Error signing up user: \${response.error?.message}");
  }
} catch (e) {
  print("Error signing up user: \$e");
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`let user = PFUser()
user.username = "cooldude6"
user.password = "p_n7!-e8"
user.email = "cooldude6@example.com"
user["phone"] = "415-392-0202"

user.signUpInBackground { (success, error) in
    if success {
        print("User signed up successfully: \\(user.objectId ?? "")")
    } else {
        print("Error signing up user: \\(error?.localizedDescription ?? "Unknown error")")
    }
}`}
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
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
                      <TabsContent value="flutter" className="p-0 -mt-px">
                        <CodeBlock language="dart">
{`try {
  final user = await ParseUser.currentUser()?.login("cooldude6", "p_n7!-e8");
  if (user != null && user.success) {
    print("User logged in successfully: \${user.result?.objectId}");
    
    // Get current user
    final currentUser = await ParseUser.currentUser();
    if (currentUser != null) {
      print("Current user: \${currentUser.username}");
    }
  } else {
    print("Error logging in user: \${user?.error?.message}");
  }
} catch (e) {
  print("Error logging in user: \$e");
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="apple" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`PFUser.logInWithUsername(inBackground: "cooldude6", password: "p_n7!-e8") { (user, error) in
    if let user = user {
        print("User logged in successfully: \\(user.objectId ?? "")")
        
        // Get current user
        if let currentUser = PFUser.current() {
            print("Current user: \\(currentUser.username ?? "")")
        }
    } else {
        print("Error logging in user: \\(error?.localizedDescription ?? "Unknown error")")
    }
}`}
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
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Files</h2>
                  <SuggestChange sectionTitle="Files" sectionId="files" />
                </div>
                
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
                        <TabsTrigger value="flutter" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Flutter</TabsTrigger>
                        <TabsTrigger value="apple" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apple</TabsTrigger>
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
                    Retrieve Parse File objects and their metadata from your objects.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("files-retrieval", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
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
                          GET https://example.com/parse/classes/MyClass/objectId
                        </div>
                        <CodeBlock language="bash">
{`# Get file metadata from object
curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  https://example.com/parse/classes/MyClass/objectId?include=fileField

# Response will include file URL:
# {
#   "objectId": "...",
#   "fileField": {
#     "__type": "File",
#     "name": "image.jpg",
#     "url": "https://example.com/parse/files/YOUR_APP_ID/image.jpg"
#   }
# }`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          QUERY https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`query GetObjectWithFile($objectId: String!) {
  myObject(objectId: $objectId) {
    objectId
    fileField {
      name
      url
    }
    createdAt
    updatedAt
  }
}

# Variables:
{
  "objectId": "your_object_id"
}

# Response includes file metadata and URL:
# {
#   "data": {
#     "myObject": {
#       "objectId": "...",
#       "fileField": {
#         "name": "image.jpg",
#         "url": "https://example.com/parse/files/YOUR_APP_ID/image.jpg"
#       }
#     }
#   }
# }`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Get file from object
const user = Parse.User.current();
const profilePhoto = user.get("profilePhoto");

if (profilePhoto) {
  console.log("File name:", profilePhoto.name());
  console.log("File URL:", profilePhoto.url());
  
  // The URL can be used directly in HTML
  const img = document.createElement('img');
  img.src = profilePhoto.url();
  document.body.appendChild(img);
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
    
    // Use URL to load image
    if let url = URL(string: profilePhoto.url) {
        // Load image from URL
        let (data, _) = try await URLSession.shared.data(from: url)
        let image = UIImage(data: data)
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
    
    // Use URL to load image with Picasso/Glide
    // Picasso.get().load(profilePhoto.getUrl()).into(imageView);
    
    // Or get file data
    profilePhoto.getDataInBackground(new GetDataCallback() {
        public void done(byte[] data, ParseException e) {
            if (e == null) {
                // Convert bytes to bitmap
                Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
            }
        }
    });
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// Get file from object
$user = ParseUser::getCurrentUser();
$profilePhoto = $user->get("profilePhoto");

if ($profilePhoto) {
    echo "File name: " . $profilePhoto->getName();
    echo "File URL: " . $profilePhoto->getURL();
    
    // Output HTML img tag
    echo '<img src="' . $profilePhoto->getURL() . '" alt="Profile Photo">';
    
    // Or get file data
    try {
        $data = $profilePhoto->getData();
        // Use the data...
        echo "File downloaded successfully";
    } catch (Exception $e) {
        echo "Error downloading file: " . $e->getMessage();
    }
}
?>`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">File Content Retrieval</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access the actual file content directly via URL without any Parse headers or authentication.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5">💡</div>
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Performance Tip</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          Consider using a CDN (Content Delivery Network) to serve your files. This can significantly reduce costs and improve latency by caching files closer to your users.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("files-content", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Direct Access</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">HTML/JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          GET https://example.com/parse/files/YOUR_APP_ID/image.jpg
                        </div>
                        <CodeBlock language="bash">
{`# Direct file access - no authentication headers required
curl -X GET https://example.com/parse/files/YOUR_APP_ID/image.jpg

# This returns the actual file content (image, PDF, etc.)
# The response will have the appropriate Content-Type header
# For images: Content-Type: image/jpeg, image/png, etc.
# For PDFs: Content-Type: application/pdf
# For videos: Content-Type: video/mp4, etc.

# You can save the file directly
curl -X GET https://example.com/parse/files/YOUR_APP_ID/image.jpg -o downloaded_image.jpg

# Or stream it
curl -X GET https://example.com/parse/files/YOUR_APP_ID/video.mp4 --output video.mp4`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Use file URL directly in HTML elements
const fileUrl = "https://example.com/parse/files/YOUR_APP_ID/image.jpg";

// For images
const img = document.createElement('img');
img.src = fileUrl;
img.alt = 'My Image';
document.body.appendChild(img);

// For videos
const video = document.createElement('video');
video.src = fileUrl;
video.controls = true;
document.body.appendChild(video);

// For audio
const audio = document.createElement('audio');
audio.src = fileUrl;
audio.controls = true;
document.body.appendChild(audio);

// For downloads
const downloadLink = document.createElement('a');
downloadLink.href = fileUrl;
downloadLink.download = 'filename.jpg';
downloadLink.textContent = 'Download File';
document.body.appendChild(downloadLink);

// Fetch file content as blob
fetch(fileUrl)
  .then(response => response.blob())
  .then(blob => {
    // Use blob for further processing
    const objectURL = URL.createObjectURL(blob);
    console.log('Object URL:', objectURL);
  });`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="swift" className="p-0 -mt-px">
                        <CodeBlock language="swift">
{`// Load image from URL
if let url = URL(string: "https://example.com/parse/files/YOUR_APP_ID/image.jpg") {
    // Using URLSession
    do {
        let (data, response) = try await URLSession.shared.data(from: url)
        if let image = UIImage(data: data) {
            DispatchQueue.main.async {
                self.imageView.image = image
            }
        }
    } catch {
        print("Error loading image: \\(error)")
    }
    
    // Using AsyncImage (iOS 15+)
    AsyncImage(url: url) { image in
        image
            .resizable()
            .aspectRatio(contentMode: .fit)
    } placeholder: {
        ProgressView()
    }
}

// Download and save file
if let url = URL(string: "https://example.com/parse/files/YOUR_APP_ID/document.pdf") {
    let downloadTask = URLSession.shared.downloadTask(with: url) { localURL, response, error in
        guard let localURL = localURL else { return }
        
        // Move to documents directory
        let documentsPath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        let destinationURL = documentsPath.appendingPathComponent("document.pdf")
        
        try? FileManager.default.moveItem(at: localURL, to: destinationURL)
    }
    downloadTask.resume()
}`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="android" className="p-0 -mt-px">
                        <CodeBlock language="java">
{`// Load image using Picasso
String fileUrl = "https://example.com/parse/files/YOUR_APP_ID/image.jpg";
Picasso.get().load(fileUrl).into(imageView);

// Load image using Glide
Glide.with(context)
    .load(fileUrl)
    .into(imageView);

// Download file manually
new AsyncTask<String, Void, Bitmap>() {
    @Override
    protected Bitmap doInBackground(String... urls) {
        try {
            URL url = new URL(urls[0]);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @Override
    protected void onPostExecute(Bitmap bitmap) {
        if (bitmap != null) {
            imageView.setImageBitmap(bitmap);
        }
    }
}.execute(fileUrl);

// For video playback
VideoView videoView = findViewById(R.id.videoView);
Uri videoUri = Uri.parse("https://example.com/parse/files/YOUR_APP_ID/video.mp4");
videoView.setVideoURI(videoUri);
videoView.start();`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
$fileUrl = "https://example.com/parse/files/YOUR_APP_ID/image.jpg";

// Display image in HTML
echo '<img src="' . htmlspecialchars($fileUrl) . '" alt="My Image">';

// Download file content
$fileContent = file_get_contents($fileUrl);
if ($fileContent !== false) {
    // Save to local file
    file_put_contents('downloaded_image.jpg', $fileContent);
    echo "File downloaded successfully";
} else {
    echo "Error downloading file";
}

// Stream file to browser
function streamFile($fileUrl, $filename) {
    $headers = get_headers($fileUrl, 1);
    $contentType = $headers['Content-Type'];
    $contentLength = $headers['Content-Length'];
    
    header('Content-Type: ' . $contentType);
    header('Content-Length: ' . $contentLength);
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    
    readfile($fileUrl);
}

// Usage
// streamFile($fileUrl, 'image.jpg');

// Get file info without downloading
$headers = get_headers($fileUrl, 1);
echo "Content-Type: " . $headers['Content-Type'];
echo "Content-Length: " . $headers['Content-Length'];
?>`}
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
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Push Notifications</h2>
                  <SuggestChange sectionTitle="Push Notifications" sectionId="push" />
                </div>

                {/* Introduction */}
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Push notifications are a great way to keep your users engaged and informed about your app. You can reach your entire user base quickly and effectively. This guide will help you through the setup process and the general usage of Parse to send push notifications.
                  </p>
                </div>

                {/* Security Warning */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 dark:text-red-200">Security Warning</h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        Enabling Client Push can lead to security vulnerabilities. We recommend enabling Client Push for testing purposes only, and moving push notification logic into Cloud Code when your app is ready for production.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Installation Overview */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Installation Objects</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Every Parse application installed on a device registered for push notifications has an associated Installation object. The Installation object is where you store all the data needed to target push notifications.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Important Installation Fields:</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><strong>channels:</strong> An array of the channels to which a device is currently subscribed</li>
                      <li><strong>deviceType:</strong> The type of device, "ios", "android", "winrt", "winphone", or "dotnet" (readonly)</li>
                      <li><strong>deviceToken:</strong> The Apple or Google generated token used to deliver messages</li>
                      <li><strong>installationId:</strong> Universally Unique Identifier (UUID) for the device (readonly)</li>
                      <li><strong>badge:</strong> The current value of the icon badge for iOS apps</li>
                      <li><strong>timeZone:</strong> The current time zone where the target device is located</li>
                    </ul>
                  </div>
                </div>

                {/* Using Channels */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Using Channels</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The simplest way to start sending notifications is using channels. This allows you to use a publisher-subscriber model for sending pushes. Devices start by subscribing to one or more channels, and notifications can later be sent to these subscribers.
                  </p>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("push-channels", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Send to specific channels
Parse.Push.send({
  channels: ["Giants", "Mets"],
  data: {
    alert: "The Giants won against the Mets 2-3."
  }
}).then(() => {
  console.log("Push was successful");
}, (error) => {
  console.error("Push failed:", error);
});

// Send to all subscribers of a channel
Parse.Push.send({
  channels: [""],  // Empty string = broadcast channel
  data: {
    alert: "Hello, World!"
  }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/push
                        </div>
                        <CodeBlock language="bash">
{`# Send to specific channels
curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channels": ["Giants", "Mets"],
    "data": {
      "alert": "The Giants won against the Mets 2-3."
    }
  }' \\
  https://example.com/parse/push`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Advanced Targeting */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Advanced Targeting with Queries</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    While channels are great for many applications, sometimes you need more precision when targeting the recipients of your pushes. Parse allows you to write a query for any subset of your Installation objects using the querying API.
                  </p>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("push-queries", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Target users by device type
const query = new Parse.Query(Parse.Installation);
query.equalTo('deviceType', 'ios');

Parse.Push.send({
  where: query,
  data: {
    alert: "Hello iOS users!",
    badge: 1,
    sound: "default"
  }
});

// Target users with specific user data
const query = new Parse.Query(Parse.Installation);
query.equalTo('injuryReports', true);

Parse.Push.send({
  where: query,
  data: {
    alert: "Willie Hayes injured by own pop fly."
  }
});

// Combine channels with queries
const query = new Parse.Query(Parse.Installation);
query.equalTo('channels', 'Giants');
query.equalTo('scores', true);

Parse.Push.send({
  where: query,
  data: {
    alert: "Giants scored against the A's! It's now 2-2."
  }
});

// Target users by location
const userQuery = new Parse.Query(Parse.User);
userQuery.withinMiles("location", stadiumLocation, 1.0);

const pushQuery = new Parse.Query(Parse.Installation);
pushQuery.matchesQuery('user', userQuery);

Parse.Push.send({
  where: pushQuery,
  data: {
    alert: "Free hotdogs at the Parse concession stand!"
  }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/push
                        </div>
                        <CodeBlock language="bash">
{`# Target by device type
curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "where": {
      "deviceType": "ios"
    },
    "data": {
      "alert": "Hello iOS users!",
      "badge": 1,
      "sound": "default"
    }
  }' \\
  https://example.com/parse/push`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Customizing Notifications */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Customizing Your Notifications</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you want to send more than just a message, you can set other fields in the data dictionary. There are some reserved fields that have a special meaning for different platforms.
                  </p>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("push-custom", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Rich notification with platform-specific features
Parse.Push.send({
  channels: ["Mets"],
  data: {
    alert: "The Mets scored! The game is now tied 1-1.",
    badge: "Increment",           // iOS: increment badge
    sound: "cheering.caf",        // iOS: custom sound
    title: "Mets Score!",         // Android: notification title
    action: "com.example.UPDATE_STATUS",  // Android: custom action
    category: "SPORTS_UPDATE",    // iOS: notification category
    
    // Custom data accessible in your app
    gameId: "12345",
    homeTeam: "Mets",
    awayTeam: "Giants",
    score: "1-1"
  }
});

// Background notification for iOS
Parse.Push.send({
  where: iosQuery,
  data: {
    "content-available": 1,
    "push_type": "background",
    "priority": 5,
    // Custom data for background processing
    updateType: "scoreUpdate",
    gameId: "12345"
  }
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/push
                        </div>
                        <CodeBlock language="bash">
{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channels": ["Mets"],
    "data": {
      "alert": "The Mets scored! The game is now tied 1-1.",
      "badge": "Increment",
      "sound": "cheering.caf",
      "title": "Mets Score!",
      "gameId": "12345",
      "homeTeam": "Mets",
      "awayTeam": "Giants",
      "score": "1-1"
    }
  }' \\
  https://example.com/parse/push`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Scheduling Pushes */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Scheduling Push Notifications</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    You can schedule a push in advance by specifying a push_time. The scheduled time cannot be in the past, and can be up to two weeks in the future.
                  </p>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Scheduler Setup Required</h4>
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                          Scheduled push notifications require setting up a scheduler with Parse Server, which is not included out of the box. You'll need to implement a scheduling mechanism (such as a cron job or task queue) to process scheduled pushes at the specified times.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("push-schedule", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Schedule a push for tomorrow at noon UTC
const tomorrowNoon = new Date();
tomorrowNoon.setDate(tomorrowNoon.getDate() + 1);
tomorrowNoon.setHours(12, 0, 0, 0);

const query = new Parse.Query(Parse.Installation);
query.equalTo('user', user);

Parse.Push.send({
  where: query,
  data: {
    alert: "You previously created a reminder for the game today"
  },
  push_time: tomorrowNoon
});

// Schedule with expiration
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

Parse.Push.send({
  channels: [""],
  data: {
    alert: "Season tickets on sale until next week!"
  },
  push_time: tomorrowNoon,
  expiration_time: oneWeekFromNow
});

// Use expiration interval instead of absolute time
const oneDayFromNow = new Date();
oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
const sixDaysInMs = 6 * 24 * 60 * 60 * 1000;

Parse.Push.send({
  data: {
    alert: "Limited time offer!"
  },
  push_time: oneDayFromNow,
  expiration_interval: sixDaysInMs
});`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/push
                        </div>
                        <CodeBlock language="bash">
{`# Schedule push for specific time (ISO 8601 format)
curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channels": [""],
    "data": {
      "alert": "Season tickets on sale until next week!"
    },
    "push_time": "2024-08-22T12:00:00",
    "expiration_time": "2024-08-29T12:00:00"
  }' \\
  https://example.com/parse/push

# Schedule with UNIX timestamp (seconds)
curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channels": [""],
    "data": {
      "alert": "Game reminder!"
    },
    "push_time": 1440226800
  }' \\
  https://example.com/parse/push`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Platform Targeting */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Platform-Specific Targeting</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you build a cross-platform app, you may want to target iOS or Android devices specifically with platform-optimized notifications.
                  </p>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("push-platform", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Send different notifications to different platforms
const androidQuery = new Parse.Query(Parse.Installation);
androidQuery.equalTo('deviceType', 'android');

Parse.Push.send({
  where: androidQuery,
  data: {
    alert: "New Android app update available!",
    title: "App Update",
    uri: "https://play.google.com/store/apps/details?id=com.yourapp"
  }
});

const iosQuery = new Parse.Query(Parse.Installation);
iosQuery.equalTo('deviceType', 'ios');

Parse.Push.send({
  where: iosQuery,
  data: {
    alert: "New iOS app update available!",
    badge: 1,
    sound: "update.caf",
    category: "APP_UPDATE"
  }
});

// Windows platforms
const windowsQuery = new Parse.Query(Parse.Installation);
windowsQuery.equalTo('deviceType', 'winrt');

Parse.Push.send({
  where: windowsQuery,
  data: {
    alert: "Your Windows app has been updated!"
  }
});

const windowsPhoneQuery = new Parse.Query(Parse.Installation);
windowsPhoneQuery.equalTo('deviceType', 'winphone');

Parse.Push.send({
  where: windowsPhoneQuery,
  data: {
    alert: "New features available on Windows Phone!"
  }
});`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Cloud Code Best Practices */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Cloud Code Best Practices</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    For production apps, it's recommended to send push notifications from Cloud Code rather than client-side code for security and reliability.
                  </p>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("push-cloud", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
                      <TabsList className="w-full justify-start bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-none h-12">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Cloud Code</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript" className="p-0 -mt-px">
                        <CodeBlock language="javascript">
{`// Cloud Function to send push notification
Parse.Cloud.define("sendGameNotification", async (request) => {
  const { gameId, homeTeam, awayTeam, message } = request.params;
  const user = request.user;
  
  // Validate user authentication
  if (!user) {
    throw new Parse.Error(Parse.Error.INVALID_SESSION_TOKEN, "User must be authenticated");
  }
  
  // Find installations for users interested in this game
  const query = new Parse.Query(Parse.Installation);
  query.equalTo('channels', \`game_\${gameId}\`);
  
  try {
    await Parse.Push.send({
      where: query,
      data: {
        alert: message,
        badge: "Increment",
        sound: "default",
        gameId: gameId,
        homeTeam: homeTeam,
        awayTeam: awayTeam
      }
    }, { useMasterKey: true });
    
    return { success: true, message: "Push notification sent successfully" };
  } catch (error) {
    console.error("Push notification failed:", error);
    throw new Parse.Error(Parse.Error.PUSH_MISCONFIGURED, "Failed to send push notification");
  }
});

// Cloud Function to handle user engagement notifications
Parse.Cloud.define("sendWelcomePush", async (request) => {
  const { userId } = request.params;
  
  const userQuery = new Parse.Query(Parse.User);
  const user = await userQuery.get(userId, { useMasterKey: true });
  
  const pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('user', user);
  
  await Parse.Push.send({
    where: pushQuery,
    data: {
      alert: \`Welcome to our app, \${user.get('firstName')}!\`,
      badge: 1,
      category: "WELCOME"
    }
  }, { useMasterKey: true });
  
  return { success: true };
});

// Background job for scheduled notifications
Parse.Cloud.job("sendDailyDigest", async (request) => {
  const { message } = request.params;
  
  // Find users who have opted in for daily notifications
  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo('dailyNotifications', true);
  
  const pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.matchesQuery('user', userQuery);
  
  const result = await Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message || "Check out what's new today!",
      badge: 1,
      category: "DAILY_DIGEST"
    }
  }, { useMasterKey: true });
  
  console.log("Daily digest sent to", result.length, "devices");
  return { sentTo: result.length };
});`}
                        </CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Troubleshooting Push Notifications</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Common Issues</h4>
                      <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                        <li>• Push certificates not properly configured</li>
                        <li>• Device tokens not being saved to Installation</li>
                        <li>• Client Push disabled in app settings</li>
                        <li>• Incorrect channel subscriptions</li>
                        <li>• Missing master key for server-side pushes</li>
                        <li>• Invalid device tokens or expired certificates</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Debugging Tips</h4>
                      <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                        <li>• Check Parse Dashboard push console for delivery status</li>
                        <li>• Verify Installation objects have correct deviceToken</li>
                        <li>• Test with small audience first</li>
                        <li>• Monitor push analytics in Dashboard</li>
                        <li>• Use push_type: "background" for silent notifications</li>
                        <li>• Check device notification settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cloud Functions Section */}
            {activeSection === "cloud" && (
              <div className="space-y-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Cloud Functions</h2>
                  <SuggestChange sectionTitle="Cloud Functions" sectionId="cloud" />
                </div>
                
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
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Security</h2>
                  <SuggestChange sectionTitle="Security" sectionId="security" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Access Control Lists (ACLs)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Control who can read and write to your objects using Access Control Lists.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tabs value={getAvailableTabForSection("security", activeCodeTab)} onValueChange={setActiveCodeTab} className="w-full">
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
    "ACL": {
      "*": {
        "read": true,
        "write": false
      },
      "3KmCvT7Zsb": {
        "read": true,
        "write": true
      },
      "role:admin": {
        "read": true,
        "write": true
      }
    }
  }' \\
  https://example.com/parse/classes/GameScore`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation CreateGameScoreWithACL($input: CreateGameScoreInput!) {
  createGameScore(input: $input) {
    gameScore {
      objectId
      score
      playerName
      ACL
    }
  }
}

# Variables:
{
  "input": {
    "fields": {
      "score": 1337,
      "playerName": "Sean Plott",
      "ACL": {
        "*": {
          "read": true,
          "write": false
        },
        "3KmCvT7Zsb": {
          "read": true,
          "write": true
        },
        "role:admin": {
          "read": true,
          "write": true
        }
      }
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
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
                        <TabsTrigger value="rest" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">REST</TabsTrigger>
                        <TabsTrigger value="graphql" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">GraphQL</TabsTrigger>
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Swift</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Android</TabsTrigger>
                        <TabsTrigger value="php" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">PHP</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          POST https://example.com/parse/roles
                        </div>
                        <CodeBlock language="bash">
{`# Create a role
curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "admin",
    "ACL": {
      "*": {
        "read": true
      }
    }
  }' \\
  https://example.com/parse/roles

# Add users to role
curl -X PUT \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "users": {
      "__op": "AddRelation",
      "objects": [
        {"__type": "Pointer", "className": "_User", "objectId": "user1Id"}
      ]
    }
  }' \\
  https://example.com/parse/roles/roleObjectId`}
                        </CodeBlock>
                      </TabsContent>
                      <TabsContent value="graphql" className="p-0 -mt-px">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          MUTATION https://example.com/parse/graphql
                        </div>
                        <CodeBlock language="graphql">
{`mutation CreateRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    role {
      objectId
      name
      users {
        edges {
          node {
            objectId
            username
          }
        }
      }
    }
  }
}

# Variables:
{
  "input": {
    "fields": {
      "name": "admin",
      "ACL": {
        "*": {
          "read": true
        }
      }
    }
  }
}

# Add users to role:
mutation UpdateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    role {
      objectId
      name
    }
  }
}

# Variables:
{
  "input": {
    "id": "roleObjectId",
    "fields": {
      "users": {
        "add": [
          {"objectId": "user1Id"}
        ]
      }
    }
  }
}`}
                        </CodeBlock>
                      </TabsContent>
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
                      <TabsContent value="php" className="p-0 -mt-px">
                        <CodeBlock language="php">
{`<?php
// Create a role
$roleACL = new ParseACL();
$roleACL->setPublicReadAccess(true);

$adminRole = new ParseRole("admin", $roleACL);

// Add users to role
$user1Query = new ParseQuery("_User");
$user1 = $user1Query->get("user1Id");

$adminRole->getUsers()->add($user1);
$adminRole->save();

// Use role in ACL
$postACL = new ParseACL();
$postACL->setRoleReadAccess($adminRole, true);
$postACL->setRoleWriteAccess($adminRole, true);

$post = new ParseObject("Post");
$post->setACL($postACL);
$post->save();
?>`}
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
