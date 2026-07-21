(() => {
  const adminContentUrl = "/api/admin/content";
  const imageManifestUrl = "/api/image-upload";
  const imageUploadEndpoint = "/api/image-upload";
  const adminSessionKey = "harborlink-demo-admin-session-token";
  const rememberKey = "harborlink-demo-admin-remember-token";
  const locale = document.documentElement.lang || "ja";
  const locales = ["ja", "zh", "en"];
  const maxBytes = 1024 * 1024;
  const maxInitialDimension = 2400;
  const expectedAdminPassword = "demo-admin";
  const state = {
    token: "",
    active: false,
    fields: {},
    textTargets: [],
    imageTargets: [],
    baseFields: {},
    baseFieldsLoaded: false,
    pendingImages: {},
    pendingText: false,
    pendingImage: false,
    dirtySinceOpen: false
  };

  const labels = {
    ja: { password: "管理パスワード", remember: "パスワードを保存", login: "編集を開始", cancel: "キャンセル", wrong: "パスワードが違います", edit: "編集", save: "保存して反映", close: "閉じる", saving: "保存中", saved: "保存しました。終了後に反映されます", failed: "保存できませんでした", image: "画像を変更", uploading: "アップロード中", uploaded: "保存しました。終了後に反映されます", deploying: "新しいサイト版をデプロイ中です。約2分後に全体へ反映されます。" },
    zh: { password: "管理密码", remember: "保存密码", login: "开始编辑", cancel: "取消", wrong: "密码不正确", edit: "编辑", save: "保存，退出后生效", close: "关闭", saving: "保存中", saved: "已保存，退出后生效", failed: "保存失败", image: "替换图片", uploading: "上传中", uploaded: "已保存，退出后生效", deploying: "正在部署网站新版本，大约2分钟后全网生效。" },
    en: { password: "Admin password", remember: "Remember password", login: "Start editing", cancel: "Cancel", wrong: "Incorrect password", edit: "Edit", save: "Save; apply on exit", close: "Close", saving: "Saving", saved: "Saved; applies on exit", failed: "Could not save", image: "Replace image", uploading: "Uploading", uploaded: "Saved; applies on exit", deploying: "Deploying the new website version. It should be live in about 2 minutes." }
  }[locale] || {};

  const shouldSkip = (element) => element.closest("script, style, svg, [data-admin-ui], .settings-switcher, .admin-dialog, .image-edit-overlay");
  const textSelector = "h1,h2,h3,h4,p,a,button,small,strong,span,dt,dd,li,em";

  const getStoredToken = () => {
    try { return sessionStorage.getItem(adminSessionKey) || localStorage.getItem(rememberKey) || ""; } catch (error) { return ""; }
  };
  const storeToken = (token, remember) => {
    try {
      sessionStorage.setItem(adminSessionKey, token);
      if (remember) localStorage.setItem(rememberKey, token);
    } catch (error) {}
  };

  const modal = document.createElement("div");
  modal.className = "admin-dialog";
  modal.hidden = true;
  modal.setAttribute("data-admin-ui", "");
  modal.innerHTML = `
    <div class="admin-dialog-panel">
      <form class="admin-login-form">
        <input type="text" name="username" value="harborlink-demo-admin" autocomplete="username" hidden><label><span>${labels.password}</span><input type="password" name="password" autocomplete="current-password"></label>
        <label class="admin-remember"><input type="checkbox" name="remember"><span>${labels.remember}</span></label>
        <p class="admin-dialog-message" data-admin-login-message></p>
        <div class="admin-dialog-actions"><button type="button" data-admin-cancel>${labels.cancel}</button><button type="submit">${labels.login}</button></div>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const editor = document.createElement("div");
  editor.className = "admin-text-editor";
  editor.hidden = true;
  editor.setAttribute("data-admin-ui", "");
  editor.innerHTML = `
    <div class="admin-text-panel">
      <div class="admin-text-head"><strong>${labels.edit}</strong><button type="button" data-admin-editor-close aria-label="${labels.close}">×</button></div>
      <label>日本語<textarea data-admin-locale="ja" rows="3"></textarea></label>
      <label>中文<textarea data-admin-locale="zh" rows="3"></textarea></label>
      <label>English<textarea data-admin-locale="en" rows="3"></textarea></label>
      <p class="admin-dialog-message" data-admin-editor-message></p>
      <div class="admin-dialog-actions"><button type="button" data-admin-editor-cancel>${labels.close}</button><button type="button" data-admin-editor-save>${labels.save}</button></div>
    </div>`;
  document.body.appendChild(editor);

  const toast = document.createElement("div");
  toast.className = "admin-toast";
  toast.hidden = true;
  toast.setAttribute("data-admin-ui", "");
  document.body.appendChild(toast);

  let toastTimer = 0;
  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 5200);
  };

  const showLogin = () => {
    modal.hidden = false;
    modal.querySelector("input[name='password']")?.focus();
  };
  const hideLogin = () => { modal.hidden = true; };

  const applyPendingChanges = async () => {
    let changed = false;
    if (state.pendingText) {
      applyTextOverrides();
      state.pendingText = false;
      changed = true;
    }
    if (state.pendingImage) {
      Object.entries(state.pendingImages).forEach(([id, url]) => {
        const target = collectImageTargets().find((item) => item.id === id);
        if (target) {
          applyReplacement(target, url);
          changed = true;
        }
      });
      state.pendingImages = {};
      state.pendingImage = false;
      await fetchImages();
    }
    return changed;
  };

  const setAdminMode = async (enabled) => {
    const changed = !enabled ? await applyPendingChanges() : false;
    state.active = enabled;
    document.documentElement.classList.toggle("admin-edit-mode", enabled);
    document.documentElement.classList.toggle("image-edit-mode", enabled);
    if (enabled) {
      collectTextTargets();
      collectImageTargets().forEach(createImageOverlay);
    } else {
      clearImageOverlays();
      closeTextEditor();
      if (changed || state.dirtySinceOpen) showToast(labels.deploying);
      state.dirtySinceOpen = false;
    }
  };

  const fetchContent = async () => {
    try {
      const response = await fetch(`${adminContentUrl}?v=${Date.now()}`, { cache: "no-store" });
      const payload = await response.json();
      state.fields = payload && typeof payload.fields === "object" ? payload.fields : {};
      applyTextOverrides();
    } catch (error) {}
  };

  const fieldKey = (index) => `field-${String(index + 1).padStart(4, "0")}`;
  const hasDirectText = (element) => Array.from(element.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0);
  const getDirectText = (element) => Array.from(element.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.nodeValue)
    .join(" ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*/g, "\n")
    .trim();
  const setDirectText = (element, value) => {
    let updated = false;
    Array.from(element.childNodes).forEach((node) => {
      if (node.nodeName === "BR") node.remove();
      else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0 && !updated) {
        node.nodeValue = value;
        updated = true;
      } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
        node.nodeValue = "";
      }
    });
    element.classList.toggle("admin-text-has-breaks", String(value).includes("\n"));
  };

  const collectTextTargets = () => {
    const elements = Array.from(document.querySelectorAll(textSelector)).filter((element) => !shouldSkip(element) && hasDirectText(element));
    state.textTargets = elements.map((element, index) => {
      const key = fieldKey(index);
      element.setAttribute("data-admin-text-id", key);
      element.setAttribute("tabindex", element.getAttribute("tabindex") || "0");
      return { key, element, original: getDirectText(element) };
    });
  };

  const collectTextEntries = (root) => Array.from(root.querySelectorAll(textSelector))
    .filter((element) => !shouldSkip(element) && hasDirectText(element))
    .map((element, index) => [fieldKey(index), getDirectText(element)]);

  const loadBaseTexts = async () => {
    if (state.baseFieldsLoaded) return;
    const parser = new DOMParser();
    for (const code of locales) {
      try {
        const response = await fetch(`/${code}/?v=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) continue;
        const html = await response.text();
        const doc = parser.parseFromString(html, "text/html");
        collectTextEntries(doc).forEach(([key, value]) => {
          state.baseFields[key] = { ...(state.baseFields[key] || {}), [code]: value };
        });
      } catch (error) {}
    }
    state.baseFieldsLoaded = true;
  };

  const applyTextOverrides = () => {
    if (state.textTargets.length === 0) collectTextTargets();
    state.textTargets.forEach((target) => {
      const value = state.fields[target.key]?.[locale];
      if (typeof value === "string" && value.trim()) setDirectText(target.element, value);
    });
  };

  const openTextEditor = async (target) => {
    if (!state.active || !target) return;
    await loadBaseTexts();
    editor.hidden = false;
    editor.dataset.fieldKey = target.key;
    locales.forEach((code) => {
      const input = editor.querySelector(`[data-admin-locale="${code}"]`);
      if (!input) return;
      input.value = state.fields[target.key]?.[code] || state.baseFields[target.key]?.[code] || (code === locale ? getDirectText(target.element) : "");
    });
    editor.querySelector(`[data-admin-locale="${locale}"]`)?.focus();
  };
  const closeTextEditor = () => { editor.hidden = true; delete editor.dataset.fieldKey; };

  document.addEventListener("click", (event) => {
    const element = event.target.closest("[data-admin-text-id]");
    if (!state.active || !element || shouldSkip(element)) return;
    event.preventDefault();
    event.stopPropagation();
    const target = state.textTargets.find((item) => item.key === element.getAttribute("data-admin-text-id"));
    openTextEditor(target);
  }, true);

  editor.querySelector("[data-admin-editor-close]")?.addEventListener("click", closeTextEditor);
  editor.querySelector("[data-admin-editor-cancel]")?.addEventListener("click", closeTextEditor);
  editor.querySelector("[data-admin-editor-save]")?.addEventListener("click", async () => {
    const key = editor.dataset.fieldKey;
    if (!key) return;
    const message = editor.querySelector("[data-admin-editor-message]");
    message.textContent = labels.saving;
    const next = { ...(state.fields[key] || {}) };
    locales.forEach((code) => {
      const input = editor.querySelector(`[data-admin-locale="${code}"]`);
      if (!input) return;
      if (input.value.trim()) next[code] = input.value.trim();
      else delete next[code];
    });
    state.fields[key] = next;
    state.pendingText = true;
    state.dirtySinceOpen = true;
    try {
      const response = await fetch(adminContentUrl, {
        method: "POST",
        headers: { "content-type": "application/json", "x-admin-token": state.token },
        body: JSON.stringify({ fields: state.fields })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || "save failed");
      message.textContent = labels.saved;
      setTimeout(closeTextEditor, 800);
    } catch (error) {
      message.textContent = `${labels.failed}: ${error.message || error}`;
    }
  });

  const normalizeUrl = (value) => {
    if (!value) return "";
    try {
      const url = new URL(value, window.location.origin);
      return url.origin === window.location.origin ? `${url.pathname}${url.search}` : url.href;
    } catch (error) { return value; }
  };
  const getBackgroundUrl = (element) => {
    const value = element.style.backgroundImage || getComputedStyle(element).backgroundImage;
    const match = value.match(/url\(["']?(.+?)["']?\)/);
    return match ? match[1] : "";
  };
  const stableImageId = (element, current) => {
    const existing = element.getAttribute("data-admin-image-id");
    if (existing) return existing;
    const id = normalizeUrl(current);
    element.setAttribute("data-admin-image-id", id);
    return id;
  };
  const collectImageTargets = () => {
    const imageTargets = Array.from(document.querySelectorAll("img[src]")).filter((element) => !shouldSkip(element)).map((element) => ({ element, frame: element.parentElement, kind: "img", id: stableImageId(element, element.getAttribute("src")) }));
    const backgroundTargets = Array.from(document.querySelectorAll(".hero-slide")).map((element) => {
      const current = getBackgroundUrl(element);
      return { element, frame: element, kind: "background", id: stableImageId(element, current) };
    });
    state.imageTargets = [...imageTargets, ...backgroundTargets].filter((target) => target.id && target.frame);
    return state.imageTargets;
  };
  const applyReplacement = (target, url) => {
    if (target.kind === "img") {
      target.element.setAttribute("src", url);
      target.element.removeAttribute("srcset");
    } else target.element.style.backgroundImage = `url('${url}')`;
  };
  const resolveReplacement = (images, id) => {
    let next = images[id];
    const seen = new Set([id]);
    while (next && images[next] && !seen.has(next)) {
      seen.add(next);
      next = images[next];
    }
    return next || "";
  };
  const fetchImages = async () => {
    try {
      const response = await fetch(`${imageManifestUrl}?v=${Date.now()}`, { cache: "no-store" });
      const payload = await response.json();
      const images = payload && typeof payload.images === "object" ? payload.images : {};
      collectImageTargets().forEach((target) => {
        const replacement = resolveReplacement(images, target.id);
        if (replacement) applyReplacement(target, replacement);
      });
    } catch (error) {}
  };
  const makeSlug = (id) => id.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase().slice(0, 72) || "image";
  const canvasToBlob = (canvas, quality) => new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality));
  const compressImage = async (file) => {
    const bitmap = await createImageBitmap(file);
    let scale = Math.min(1, maxInitialDimension / Math.max(bitmap.width, bitmap.height));
    let quality = 0.86;
    let blob = null;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { alpha: false });
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.drawImage(bitmap, 0, 0, width, height);
      blob = await canvasToBlob(canvas, quality);
      if (blob && blob.size <= maxBytes) break;
      if (quality > 0.62) quality -= 0.08;
      else scale *= 0.82;
    }
    bitmap.close?.();
    return new File([blob || file], `${file.name.replace(/\.[^.]+$/, "") || "image"}.jpg`, { type: "image/jpeg" });
  };
  const uploadReplacement = async (target, file) => {
    const compressed = await compressImage(file);
    const data = new FormData();
    data.set("image", compressed);
    data.set("imageId", target.id);
    data.set("slug", makeSlug(target.id));
    const response = await fetch(imageUploadEndpoint, { method: "POST", body: data, headers: { "x-image-edit-token": state.token } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.url) throw new Error(payload.error || "upload failed");
    return payload.url;
  };
  const clearImageOverlays = () => {
    document.querySelectorAll(".image-edit-overlay").forEach((element) => element.remove());
    document.querySelectorAll(".image-edit-frame").forEach((element) => element.classList.remove("image-edit-frame"));
  };
  const createImageOverlay = (target) => {
    const frame = target.frame;
    if (!frame || frame.querySelector(":scope > .image-edit-overlay")) return;
    frame.classList.add("image-edit-frame");
    const overlay = document.createElement("div");
    overlay.className = "image-edit-overlay";
    const button = document.createElement("button");
    button.className = "image-edit-upload";
    button.type = "button";
    button.textContent = labels.image;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.hidden = true;
    button.addEventListener("click", (event) => { event.preventDefault(); input.click(); });
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      button.textContent = labels.uploading;
      button.disabled = true;
      try {
        const url = await uploadReplacement(target, file);
        state.pendingImages[target.id] = url;
        state.pendingImage = true;
        state.dirtySinceOpen = true;
        button.textContent = labels.uploaded;
      } catch (error) {
        button.textContent = `${labels.failed}`;
      } finally {
        setTimeout(() => { button.textContent = labels.image; button.disabled = false; }, 1400);
        input.value = "";
      }
    });
    overlay.append(button, input);
    frame.appendChild(overlay);
  };

  modal.querySelector("[data-admin-cancel]")?.addEventListener("click", hideLogin);
  modal.querySelector(".admin-login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const token = form.password.value.trim();
    const remember = form.remember.checked;
    const message = modal.querySelector("[data-admin-login-message]");
    if (!token) return;
    if (token !== expectedAdminPassword) {
      message.textContent = labels.wrong;
      return;
    }
    state.token = token;
    storeToken(token, remember);
    hideLogin();
    await setAdminMode(true);
  });

  document.addEventListener("click", async (event) => {
    const toggle = event.target.closest("[data-settings-toggle]");
    if (!toggle) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const token = getStoredToken();
    if (!token || token !== expectedAdminPassword) { showLogin(); return; }
    state.token = token;
    await setAdminMode(!state.active);
  }, true);

  fetchContent();
  fetchImages();
})();
