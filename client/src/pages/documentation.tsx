import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book,
  Code,
  Database,
  ExternalLink,
  FileText,
  Search,
  Server,
  Shield,
  Users,
  Zap
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("objects");

  const navigationSections = [
    { id: "objects", title: "Objects", icon: Database },
    { id: "queries", title: "Queries", icon: Search },
    { id: "users", title: "Users", icon: Users },
    { id: "files", title: "Files", icon: FileText },
    { id: "push", title: "Push Notifications", icon: Zap },
    { id: "cloud", title: "Cloud Functions", icon: Server },
    { id: "security", title: "Security", icon: Shield },
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

            {/* Objects Section */}
            {activeSection === "objects" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Working with Objects</h2>
                
                {/* Save an Object */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="h-5 w-5" />
                      <span>Save an Object</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Create and save objects to the Parse database. Objects can contain any data that can be JSON-encoded.
                    </p>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="space-y-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                          <code className="text-sm">
                            <div className="text-green-600 dark:text-green-400">POST</div>
                            <div className="text-blue-600 dark:text-blue-400">https://your-app.parseapi.com/parse/classes/GameScore</div>
                          </code>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "score": 1337,
    "playerName": "Sean Plott",
    "cheatMode": false
  }' \\
  https://your-app.parseapi.com/parse/classes/GameScore`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Initialize Parse
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'https://your-app.parseapi.com/parse';

// Create a new GameScore object
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
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`import ParseSwift

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
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Initialize Parse in your Application class
Parse.initialize(new Parse.Configuration.Builder(this)
    .applicationId("YOUR_APP_ID")
    .clientKey("YOUR_CLIENT_KEY")
    .server("https://your-app.parseapi.com/parse/")
    .build());

// Create a new GameScore object
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
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Retrieve an Object */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>Retrieve an Object</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Retrieve objects from Parse by their objectId or using queries to find multiple objects.
                    </p>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="space-y-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                          <code className="text-sm">
                            <div className="text-green-600 dark:text-green-400">GET</div>
                            <div className="text-blue-600 dark:text-blue-400">https://your-app.parseapi.com/parse/classes/GameScore/objectId</div>
                          </code>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  https://your-app.parseapi.com/parse/classes/GameScore/Ed1nuqPvc`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Get object by ID
const GameScore = Parse.Object.extend("GameScore");
const query = new Parse.Query(GameScore);

try {
  const gameScore = await query.get("Ed1nuqPvc");
  console.log('Score:', gameScore.get('score'));
  console.log('Player:', gameScore.get('playerName'));
} catch (error) {
  console.error('Error fetching GameScore:', error);
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Retrieve object by ID
do {
    let gameScore: GameScore = try await GameScore.query()
        .where("objectId" == "Ed1nuqPvc")
        .first()
    
    print("Score: \\(gameScore.score ?? 0)")
    print("Player: \\(gameScore.playerName ?? "")")
} catch {
    print("Error fetching GameScore: \\(error)")
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Get object by ID
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
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Queries Section */}
            {activeSection === "queries" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Queries</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>Basic Queries</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Query for objects using constraints like equality, comparison operators, and more.
                    </p>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`# Query with constraints
curl -X GET \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -G \\
  --data-urlencode 'where={"playerName":"Sean Plott","score":{"$gte":1000}}' \\
  https://your-app.parseapi.com/parse/classes/GameScore`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`const GameScore = Parse.Object.extend("GameScore");
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
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`do {
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
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`ParseQuery<ParseObject> query = ParseQuery.getQuery("GameScore");
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
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users Section */}
            {activeSection === "users" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">User Management</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>User Sign Up</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Create new user accounts with username and password, or using email verification.
                    </p>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "cooldude6",
    "password": "p_n7!-e8",
    "email": "user@example.com"
  }' \\
  https://your-app.parseapi.com/parse/users`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Sign up a new user
const user = new Parse.User();
user.set("username", "cooldude6");
user.set("password", "p_n7!-e8");
user.set("email", "user@example.com");

try {
  const newUser = await user.signUp();
  console.log('User created:', newUser.id);
} catch (error) {
  console.error('Error signing up:', error);
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Sign up a new user
var user = User()
user.username = "cooldude6"
user.password = "p_n7!-e8"
user.email = "user@example.com"

do {
    let signedUpUser = try await user.signup()
    print("User created: \\(signedUpUser.objectId ?? "")")
} catch {
    print("Error signing up: \\(error)")
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`ParseUser user = new ParseUser();
user.setUsername("cooldude6");
user.setPassword("p_n7!-e8");
user.setEmail("user@example.com");

user.signUpInBackground(new SignUpCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("User", "Sign up successful: " + user.getObjectId());
        } else {
            Log.e("User", "Sign up failed: " + e.getMessage());
        }
    }
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Files Section */}
            {activeSection === "files" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">File Storage</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Upload Files</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Upload and store files in Parse, including images, documents, and other binary data.
                    </p>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: image/jpeg" \\
  --data-binary @myfile.jpg \\
  https://your-app.parseapi.com/parse/files/pic.jpg`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Upload file from input element
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

const parseFile = new Parse.File("photo.jpg", file);

try {
  const savedFile = await parseFile.save();
  console.log('File saved:', savedFile.url());
  
  // Associate with an object
  const photo = new Parse.Object("Photo");
  photo.set("image", savedFile);
  await photo.save();
} catch (error) {
  console.error('Error uploading file:', error);
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Upload file
let imageData = image.jpegData(compressionQuality: 0.8)!
let parseFile = ParseFile(name: "photo.jpg", data: imageData)

do {
    let savedFile = try await parseFile.save()
    print("File saved: \\(savedFile.url?.absoluteString ?? "")")
    
    // Associate with an object
    var photo = Photo()
    photo.image = savedFile
    let savedPhoto = try await photo.save()
} catch {
    print("Error uploading file: \\(error)")
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Upload file
byte[] data = // your file data
ParseFile file = new ParseFile("photo.jpg", data);

file.saveInBackground(new SaveCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("File", "File saved: " + file.getUrl());
            
            // Associate with an object
            ParseObject photo = new ParseObject("Photo");
            photo.put("image", file);
            photo.saveInBackground();
        } else {
            Log.e("File", "Error uploading file: " + e.getMessage());
        }
    }
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Push Notifications Section */}
            {activeSection === "push" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Push Notifications</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Send Push Notifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Send push notifications to your app users using Parse's push notification service.
                    </p>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "where": {
      "deviceType": "ios"
    },
    "data": {
      "alert": "Hello World!"
    }
  }' \\
  https://your-app.parseapi.com/parse/push`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Send push notification
Parse.Push.send({
  where: {
    deviceType: "ios"
  },
  data: {
    alert: "Hello World!"
  }
}).then(() => {
  console.log('Push sent successfully');
}).catch(error => {
  console.error('Error sending push:', error);
});`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Send push notification (from Cloud Code)
// This example shows how to trigger from client,
// but push sending should typically be done from Cloud Code

let query = Installation.query()
    .where("deviceType" == "ios")

do {
    try await ParsePush()
        .set(message: "Hello World!")
        .send(query: query)
    print("Push sent successfully")
} catch {
    print("Error sending push: \\(error)")
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Send push notification (from Cloud Code)
// This example shows how to trigger from client,
// but push sending should typically be done from Cloud Code

ParseQuery<ParseInstallation> query = ParseInstallation.getQuery();
query.whereEqualTo("deviceType", "android");

ParsePush push = new ParsePush();
push.setQuery(query);
push.setMessage("Hello World!");

push.sendInBackground(new SendCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("Push", "Push sent successfully");
        } else {
            Log.e("Push", "Error sending push: " + e.getMessage());
        }
    }
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Cloud Functions Section */}
            {activeSection === "cloud" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Cloud Functions</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Server className="h-5 w-5" />
                      <span>Define and Call Cloud Functions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Create server-side functions that run in the Parse Server environment and call them from your client apps.
                    </p>
                    <Tabs defaultValue="cloud-code" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="cloud-code">Cloud Code</TabsTrigger>
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="cloud-code" className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Define the function in your Parse Server cloud/main.js:
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// cloud/main.js
Parse.Cloud.define("hello", async (request) => {
  const { params, user } = request;
  
  return {
    message: \`Hello \${params.name}!\`,
    user: user ? user.get("username") : "anonymous"
  };
});

Parse.Cloud.define("averageStars", async (request) => {
  const query = new Parse.Query("Review");
  const results = await query.find({ useMasterKey: true });
  
  let sum = 0;
  for (let i = 0; i < results.length; ++i) {
    sum += results[i].get("stars");
  }
  
  return sum / results.length;
});`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="rest" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "World"
  }' \\
  https://your-app.parseapi.com/parse/functions/hello`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Call cloud function
try {
  const result = await Parse.Cloud.run("hello", { name: "World" });
  console.log('Cloud function result:', result);
} catch (error) {
  console.error('Error calling cloud function:', error);
}

// Call function that returns average
try {
  const averageStars = await Parse.Cloud.run("averageStars");
  console.log('Average stars:', averageStars);
} catch (error) {
  console.error('Error getting average:', error);
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Call cloud function
do {
    let result: [String: Any] = try await Cloud.function("hello", 
                                                         parameters: ["name": "World"])
    print("Cloud function result: \\(result)")
} catch {
    print("Error calling cloud function: \\(error)")
}

// Call function that returns a value
do {
    let averageStars: Double = try await Cloud.function("averageStars")
    print("Average stars: \\(averageStars)")
} catch {
    print("Error getting average: \\(error)")
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Call cloud function
HashMap<String, Object> params = new HashMap<>();
params.put("name", "World");

ParseCloud.callFunctionInBackground("hello", params, new FunctionCallback<HashMap<String, Object>>() {
    public void done(HashMap<String, Object> result, ParseException e) {
        if (e == null) {
            Log.d("Cloud", "Result: " + result.toString());
        } else {
            Log.e("Cloud", "Error: " + e.getMessage());
        }
    }
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Security & ACLs</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Access Control Lists (ACLs)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Control who can read and write objects using Access Control Lists (ACLs).
                    </p>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest">REST API</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="swift">Swift</TabsTrigger>
                        <TabsTrigger value="android">Android</TabsTrigger>
                      </TabsList>
                      <TabsContent value="rest" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`curl -X POST \\
  -H "X-Parse-Application-Id: YOUR_APP_ID" \\
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Private message",
    "ACL": {
      "user123": {
        "read": true,
        "write": true
      },
      "*": {
        "read": false,
        "write": false
      }
    }
  }' \\
  https://your-app.parseapi.com/parse/classes/Message`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="javascript" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Create an ACL for a private message
const Message = Parse.Object.extend("Message");
const message = new Message();

message.set("text", "Private message");

// Create ACL
const acl = new Parse.ACL();
acl.setReadAccess(Parse.User.current(), true);
acl.setWriteAccess(Parse.User.current(), true);
acl.setPublicReadAccess(false);
acl.setPublicWriteAccess(false);

message.setACL(acl);

try {
  await message.save();
  console.log('Private message saved');
} catch (error) {
  console.error('Error saving message:', error);
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="swift" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`// Create an ACL for a private message
var message = Message()
message.text = "Private message"

// Create ACL
var acl = ParseACL()
acl.setReadAccess(user: User.current, value: true)
acl.setWriteAccess(user: User.current, value: true)
acl.publicReadAccess = false
acl.publicWriteAccess = false

message.ACL = acl

do {
    let savedMessage = try await message.save()
    print("Private message saved")
} catch {
    print("Error saving message: \\(error)")
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="android" className="space-y-4">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
<code>{`ParseObject message = new ParseObject("Message");
message.put("text", "Private message");

// Create ACL
ParseACL acl = new ParseACL();
acl.setReadAccess(ParseUser.getCurrentUser(), true);
acl.setWriteAccess(ParseUser.getCurrentUser(), true);
acl.setPublicReadAccess(false);
acl.setPublicWriteAccess(false);

message.setACL(acl);

message.saveInBackground(new SaveCallback() {
    public void done(ParseException e) {
        if (e == null) {
            Log.d("Message", "Private message saved");
        } else {
            Log.e("Message", "Error saving message: " + e.getMessage());
        }
    }
});`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
