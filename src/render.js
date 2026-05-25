function clear(element) {
  element.replaceChildren();
}

function setText(element, value) {
  element.textContent = value || '';
}

export function renderAuthState(dom, profile) {
  const signedIn = Boolean(profile);
  dom.signInButton.hidden = signedIn;
  dom.signOutButton.hidden = !signedIn;
  dom.dashboard.hidden = !signedIn;
  setText(dom.userName, signedIn ? profile.displayName || profile.email : '');
}

export function renderAudit(dom, audit) {
  if (!audit) {
    setText(dom.auditStatus, 'No audit has run yet.');
    return;
  }

  const summary = audit.summary ? ` - ${audit.summary}` : '';
  setText(dom.auditStatus, `${audit.status}${summary}`);
}

export function renderLogs(dom, logs) {
  clear(dom.logList);

  for (const log of logs) {
    const row = document.createElement('div');
    row.className = `audit-log audit-log--${log.level || 'info'}`;
    row.textContent = `${log.agentName}: ${log.message}`;
    dom.logList.append(row);
  }
}

export function renderFindings(dom, findings) {
  clear(dom.findingList);

  if (findings.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'dashboard-empty';
    empty.textContent = 'Findings will appear here as agents confirm them.';
    dom.findingList.append(empty);
    return;
  }

  for (const finding of findings) {
    const article = document.createElement('article');
    article.className = `finding-card finding-card--${finding.severity}`;

    const title = document.createElement('h3');
    title.textContent = `${finding.severity}: ${finding.title}`;

    const proof = document.createElement('p');
    proof.textContent = finding.proof || finding.fixGuidance || 'Evidence is being prepared.';

    article.append(title, proof);

    if (finding.patchPrUrl) {
      const link = document.createElement('a');
      link.href = finding.patchPrUrl;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = 'Fix PR opened';
      article.append(link);
    } else if (finding.fixGuidance) {
      const guidance = document.createElement('p');
      guidance.className = 'finding-guidance';
      guidance.textContent = `How to fix: ${finding.fixGuidance}`;
      article.append(guidance);
    }

    dom.findingList.append(article);
  }
}

export function renderError(dom, message) {
  if (!dom.errorBox) {
    return;
  }

  dom.errorBox.hidden = !message;
  dom.errorBox.textContent = message || '';
}

export function renderConsentModal(dom, visible) {
  if (dom.consentModal) {
    dom.consentModal.hidden = !visible;
  }
}
