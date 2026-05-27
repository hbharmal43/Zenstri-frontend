function required(root, selector) {
  const element = root.querySelector(selector);
  if (!element) {
    throw new Error(`Missing required DOM element: ${selector}`);
  }
  return element;
}

export function getDom(root = document) {
  return {
    signInButton: required(root, '[data-auth-sign-in]'),
    signInButtons: root.querySelectorAll('[data-auth-sign-in]'),
    signOutButton: required(root, '[data-auth-sign-out]'),
    bypassButtons: root.querySelectorAll('[data-auth-bypass]'),
    dashboard: required(root, '[data-dashboard]'),
    userName: required(root, '[data-user-name]'),
    auditStatus: required(root, '[data-audit-status]'),
    logList: required(root, '[data-log-list]'),
    findingList: required(root, '[data-finding-list]'),
    projectForm: root.querySelector('[data-project-form]'),
    repoInput: root.querySelector('[data-repo-input]'),
    liveUrlInput: root.querySelector('[data-live-url-input]'),
    runAuditButton: root.querySelector('[data-run-audit]'),
    connectGitHubButton: root.querySelector('[data-connect-github]'),
    consentModal: root.querySelector('[data-consent-modal]'),
    consentCheckbox: root.querySelector('[data-consent-checkbox]'),
    consentConfirmButton: root.querySelector('[data-consent-confirm]'),
    errorBox: root.querySelector('[data-error-box]')
  };
}
