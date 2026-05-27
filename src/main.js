import { getDom } from './dom.js';
import { signInWithGitHub, signOutUser, subscribeToAuthState, signInAsGuest } from './auth.js';
import { ApiClient } from './api.js';
import { DashboardController } from './dashboard.js';
import { renderAuthState, renderError, renderFindings, renderLogs } from './render.js';

const dom = getDom(document);
const api = new ApiClient();
const dashboard = new DashboardController({ dom, api });

dashboard.start();
renderLogs(dom, []);
renderFindings(dom, []);

dom.signInButtons.forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      renderError(dom, error.message);
    }
  });
});

dom.bypassButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    try {
      signInAsGuest();
    } catch (error) {
      renderError(dom, error.message);
    }
  });
});

dom.signOutButton.addEventListener('click', async () => {
  try {
    await signOutUser();
  } catch (error) {
    renderError(dom, error.message);
  }
});

subscribeToAuthState(async (profile) => {
  renderAuthState(dom, profile);

  if (!profile) {
    return;
  }

  try {
    await api.syncCurrentUser(profile);
  } catch (error) {
    renderError(dom, error.message);
  }
});
