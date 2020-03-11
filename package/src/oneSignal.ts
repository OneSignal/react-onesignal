const DEFAULT_BASE_SCRIPT_ID = 'react-onesignal-base';

const DEFAULT_MODULE_SCRIPT_ID = 'react-onesignal-module';

/**
 * Provides the OneSignal script to inject.
 */
const ONE_SIGNAL_SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

/**
 * Provides the module script content to inject.
 */
const getModuleScriptBody = (appId: string) => `
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "${appId}",
    });
  });
`;

/**
 * Injects one script into the DOM.
 * @param id script id.
 * @param buildScript script factory.
 */
const injectScript = (id: string, buildScript: (script: HTMLScriptElement) => HTMLScriptElement) => {
  const hasScript = !!document.getElementById(id);

  if (hasScript) {
    return;
  }

  let script = document.createElement('script');

  script.id = id;

  script = buildScript(script);

  document.body.appendChild(script);
}

/**
 * Injects the base script for OneSignal
 */
const injectBaseScript = () => {
  injectScript(DEFAULT_BASE_SCRIPT_ID, (script) => {
    script.src = ONE_SIGNAL_SCRIPT_SRC;

    return script;
  });
};

/**
 * Injects the module script for OneSignal
 */
const injectModuleScript = (appId: string) => {
  injectScript(DEFAULT_MODULE_SCRIPT_ID, (script) => {
    script.innerHTML = getModuleScriptBody(appId);
    script.async = true;

    return script;
  });
};

/**
 * Initializes OneSignal.
 */
const initialize = (appId: string) => {
  if (!appId) {
    throw new Error('You need to provide your OneSignal appId.');
  }

  if (!document) {
    return;
  }

  injectBaseScript();
  injectModuleScript(appId);
};

/**
 * Object for manipulating OneSignal.
 */
const ReactOneSignal = {
  initialize,
};

export default ReactOneSignal;
