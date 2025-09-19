import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import "./App.css";

interface OneSignalStatus {
  isInitialized: boolean;
  permission: boolean;
  permissionNative: string;
  onesignalId?: string;
  externalId?: string;
  optedIn: boolean;
  tags: { [key: string]: string };
  language: string;
}

function App() {
  const [appId, setAppId] = useState("77e32082-ea27-42e3-a898-c72e141824ef");
  const [status, setStatus] = useState<OneSignalStatus>({
    isInitialized: false,
    permission: false,
    permissionNative: "default",
    optedIn: false,
    tags: {},
    language: "en",
  });
  const [logs, setLogs] = useState<string[]>([]);

  // Form states
  const [externalId, setExternalId] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [tagKey, setTagKey] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventProperties, setEventProperties] = useState("");
  const [email, setEmail] = useState("");
  const [smsNumber, setSmsNumber] = useState("");
  const [language, setLanguage] = useState("en");
  const [outcomeName, setOutcomeName] = useState("");
  const [outcomeWeight, setOutcomeWeight] = useState("1");

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const updateStatus = async () => {
    try {
      const tags = await OneSignal.User.getTags();
      const language = await OneSignal.User.getLanguage();

      setStatus((prev) => ({
        ...prev,
        isInitialized: true,
        permission: OneSignal.Notifications.permission,
        permissionNative: OneSignal.Notifications.permissionNative,
        onesignalId: OneSignal.User.onesignalId,
        externalId: OneSignal.User.externalId,
        optedIn: OneSignal.User.PushSubscription.optedIn ?? false,
        tags,
        language,
      }));
    } catch (error) {
      addLog(`Error updating status: ${error}`);
    }
  };

  useEffect(() => {
    const initOneSignal = async () => {
      try {
        await OneSignal.init({
          appId: appId,
        });
        OneSignal.Debug.setLogLevel("trace");
        addLog("OneSignal initialized successfully");
        await updateStatus();
      } catch (error) {
        addLog(`OneSignal initialization failed: ${error}`);
      }
    };

    if (appId !== "<YOUR_APP_ID>") {
      initOneSignal();
    }
  }, [appId]);

  const handleLogin = async () => {
    try {
      await OneSignal.login(externalId, jwtToken || undefined);
      addLog(`Logged in with external ID: ${externalId}`);
      await updateStatus();
    } catch (error) {
      addLog(`Login failed: ${error}`);
    }
  };

  const handleLogout = async () => {
    try {
      await OneSignal.logout();
      addLog("Logged out successfully");
      await updateStatus();
    } catch (error) {
      addLog(`Logout failed: ${error}`);
    }
  };

  const handleAddTag = async () => {
    try {
      OneSignal.User.addTag(tagKey, tagValue);
      addLog(`Added tag: ${tagKey} = ${tagValue}`);
      await updateStatus();
    } catch (error) {
      addLog(`Failed to add tag: ${error}`);
    }
  };

  const handleRemoveTag = async (key: string) => {
    try {
      OneSignal.User.removeTag(key);
      addLog(`Removed tag: ${key}`);
      await updateStatus();
    } catch (error) {
      addLog(`Failed to remove tag: ${error}`);
    }
  };

  const handleTrackEvent = async () => {
    try {
      const properties = eventProperties
        ? JSON.parse(eventProperties)
        : undefined;
      OneSignal.User.trackEvent(eventName, properties);
      addLog(
        `Tracked event: ${eventName}${
          properties ? ` with properties: ${JSON.stringify(properties)}` : ""
        }`
      );
    } catch (error) {
      addLog(`Failed to track event: ${error}`);
    }
  };

  const handleRequestPermission = async () => {
    try {
      const granted = await OneSignal.Notifications.requestPermission();
      addLog(`Permission request result: ${granted}`);
      await updateStatus();
    } catch (error) {
      addLog(`Permission request failed: ${error}`);
    }
  };

  const handleOptIn = async () => {
    try {
      await OneSignal.User.PushSubscription.optIn();
      addLog("Opted in to push notifications");
      await updateStatus();
    } catch (error) {
      addLog(`Opt-in failed: ${error}`);
    }
  };

  const handleOptOut = async () => {
    try {
      await OneSignal.User.PushSubscription.optOut();
      addLog("Opted out of push notifications");
      await updateStatus();
    } catch (error) {
      addLog(`Opt-out failed: ${error}`);
    }
  };

  const handleAddEmail = async () => {
    try {
      OneSignal.User.addEmail(email);
      addLog(`Added email: ${email}`);
    } catch (error) {
      addLog(`Failed to add email: ${error}`);
    }
  };

  const handleAddSms = async () => {
    try {
      OneSignal.User.addSms(smsNumber);
      addLog(`Added SMS: ${smsNumber}`);
    } catch (error) {
      addLog(`Failed to add SMS: ${error}`);
    }
  };

  const handleSetLanguage = async () => {
    try {
      OneSignal.User.setLanguage(language);
      addLog(`Set language to: ${language}`);
      await updateStatus();
    } catch (error) {
      addLog(`Failed to set language: ${error}`);
    }
  };

  const handleSendOutcome = async () => {
    try {
      const weight = parseFloat(outcomeWeight);
      await OneSignal.Session.sendOutcome(outcomeName, weight);
      addLog(`Sent outcome: ${outcomeName} (weight: ${weight})`);
    } catch (error) {
      addLog(`Failed to send outcome: ${error}`);
    }
  };

  const handlePromptPush = async () => {
    try {
      await OneSignal.Slidedown.promptPush();
      addLog("Triggered push notification prompt");
    } catch (error) {
      addLog(`Failed to prompt push: ${error}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>OneSignal React SDK Test App</h1>

        {/* App ID Configuration */}
        <div className="section">
          <h2>Configuration</h2>
          <div className="input-group">
            <label>App ID:</label>
            <input
              type="text"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder="Enter your OneSignal App ID"
            />
          </div>
        </div>

        {/* Status Display */}
        <div className="section">
          <h2>Status</h2>
          <div className="status-grid">
            <div>Initialized: {status.isInitialized ? "✅" : "❌"}</div>
            <div>Permission: {status.permission ? "✅" : "❌"}</div>
            <div>Permission Native: {status.permissionNative}</div>
            <div>Opted In: {status.optedIn ? "✅" : "❌"}</div>
            <div>OneSignal ID: {status.onesignalId || "N/A"}</div>
            <div>External ID: {status.externalId || "N/A"}</div>
            <div>Language: {status.language}</div>
          </div>
        </div>

        {/* User Authentication */}
        <div className="section">
          <h2>User Authentication</h2>
          <div className="input-group">
            <input
              type="text"
              value={externalId}
              onChange={(e) => setExternalId(e.target.value)}
              placeholder="External ID"
            />
            <input
              type="text"
              value={jwtToken}
              onChange={(e) => setJwtToken(e.target.value)}
              placeholder="JWT Token (optional)"
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Tags Management */}
        <div className="section">
          <h2>Tags Management</h2>
          <div className="input-group">
            <input
              type="text"
              value={tagKey}
              onChange={(e) => setTagKey(e.target.value)}
              placeholder="Tag Key"
            />
            <input
              type="text"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              placeholder="Tag Value"
            />
            <button onClick={handleAddTag}>Add Tag</button>
          </div>
          <div className="tags-display">
            {Object.entries(status.tags).map(([key, value]) => (
              <div key={key} className="tag-item">
                <span>
                  {key}: {value}
                </span>
                <button onClick={() => handleRemoveTag(key)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/* Event Tracking */}
        <div className="section">
          <h2>Event Tracking</h2>
          <div className="input-group">
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
            />
            <input
              type="text"
              value={eventProperties}
              onChange={(e) => setEventProperties(e.target.value)}
              placeholder='Properties (JSON, e.g., {"key": "value"})'
            />
            <button onClick={handleTrackEvent}>Track Event</button>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="section">
          <h2>Push Notifications</h2>
          <div className="button-group">
            <button onClick={handleRequestPermission}>
              Request Permission
            </button>
            <button onClick={handleOptIn}>Opt In</button>
            <button onClick={handleOptOut}>Opt Out</button>
            <button onClick={handlePromptPush}>Prompt Push</button>
          </div>
        </div>

        {/* User Profile */}
        <div className="section">
          <h2>User Profile</h2>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button onClick={handleAddEmail}>Add Email</button>
          </div>
          <div className="input-group">
            <input
              type="tel"
              value={smsNumber}
              onChange={(e) => setSmsNumber(e.target.value)}
              placeholder="SMS Number"
            />
            <button onClick={handleAddSms}>Add SMS</button>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Language Code (e.g., en, es, fr)"
            />
            <button onClick={handleSetLanguage}>Set Language</button>
          </div>
        </div>

        {/* Session Outcomes */}
        <div className="section">
          <h2>Session Outcomes</h2>
          <div className="input-group">
            <input
              type="text"
              value={outcomeName}
              onChange={(e) => setOutcomeName(e.target.value)}
              placeholder="Outcome Name"
            />
            <input
              type="number"
              value={outcomeWeight}
              onChange={(e) => setOutcomeWeight(e.target.value)}
              placeholder="Weight"
              step="0.1"
            />
            <button onClick={handleSendOutcome}>Send Outcome</button>
          </div>
        </div>

        {/* Logs */}
        <div className="section">
          <h2>Activity Log</h2>
          <div className="logs-container">
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
