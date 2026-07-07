const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Import TutorialPanel
code = code.replace(/import \{ AuthModal, RewardsPanel, UserProfilePanel, LoginScreen \} from "\.\/components\/UserPanels";/, "import { AuthModal, RewardsPanel, UserProfilePanel, LoginScreen, TutorialPanel } from \"./components/UserPanels\";");

code = code.replace(/const \[showProfile, setShowProfile\] = useState\(false\);/, "const [showProfile, setShowProfile] = useState(false);\n  const [showTutorial, setShowTutorial] = useState(false);\n  \n  useEffect(() => {\n    if (user.isLoggedIn && !user.hasSeenTutorial && user.email !== 'jrnabil570@gmail.com') {\n      setShowTutorial(true);\n    }\n  }, [user]);");

code = code.replace(/<UserProfilePanel isOpen=\{showProfile\} /, "<TutorialPanel isOpen={showTutorial} onClose={() => { setShowTutorial(false); const u = { ...user, hasSeenTutorial: true }; setUser(u); saveUser(u); }} />\n      <UserProfilePanel isOpen={showProfile} ");

fs.writeFileSync('src/App.tsx', code);
