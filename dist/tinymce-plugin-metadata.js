const l = (a) => (i) => i.options.get(a), s = (a) => {
  const i = a.options.register;
  i("metadata", {
    processor: "object[]"
  });
}, m = l("metadata"), r = (a) => {
  const i = [], d = {}, c = m(a);
  if (c === void 0)
    throw Error("Metadata plugin not configured.");
  for (const n of c) {
    const e = document.getElementById(n.id);
    if (e === null)
      throw Error(`Element '#${n.id}' not found.`);
    if (e.nodeName !== "INPUT" && e.nodeName !== "TEXTAREA" && e.nodeName !== "SELECT")
      throw Error(`Element '#${n.id}' must be a input, textarea or a select but is ${e.nodeName}.`);
    d[n.id] = e.value;
    const t = { type: "input", name: n.id, label: n.label };
    if (e.nodeName === "INPUT") {
      const o = e;
      t.type = "input", o.type === "checkbox" ? (t.type = "checkbox", d[n.id] = o.checked, t.checked = o.checked) : o.type === "color" ? t.type = "colorinput" : o.type === "range" && (t.type = "slider", d[n.id] = Number(e.value), t.min = Number(o.min), t.max = Number(o.max)), o.inputMode && (t.inputMode = o.inputMode);
    } else if (e.nodeName === "TEXTAREA")
      t.type = "textarea";
    else if (e.nodeName === "SELECT") {
      t.type = "selectbox", t.items = [];
      for (const o of e.options)
        t.items.push({ text: o.label, value: o.value });
    }
    e instanceof HTMLSelectElement && e.disabled && (t.enabled = !1), (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) && ((e.disabled || e.readOnly) && (t.enabled = !1), e.placeholder && (t.placeholder = e.placeholder)), i.push(t);
  }
  a.windowManager.open({
    title: "Metadata",
    size: "normal",
    body: {
      type: "panel",
      items: i
    },
    buttons: [
      {
        type: "cancel",
        name: "cancel",
        text: "Cancel"
      },
      {
        type: "submit",
        name: "save",
        text: "Save",
        primary: !0
      }
    ],
    initialData: d,
    onSubmit: (n) => {
      for (const e of c) {
        const t = document.getElementById(e.id);
        t !== null && (t.value = n.getData()[e.id], t.type == "checkbox" && (t.checked = n.getData()[e.id]));
      }
      n.close();
    }
  });
}, p = (a) => {
  a.addCommand("mceMetadata", () => {
    r(a);
  });
}, u = (a) => {
  const i = () => a.execCommand("mceMetadata");
  a.ui.registry.addButton("metadata", {
    icon: "metadata",
    tooltip: "Edit metadata",
    onAction: i
  }), a.ui.registry.addIcon("metadata", '<svg height="24" width="24"><path d="M12 19 L19 5 L5 5 Z" /></svg>'), a.ui.registry.addMenuItem("metadata", {
    text: "Edit metadata",
    onAction: i
  });
}, f = () => {
  tinymce.PluginManager.add("metadata", (a) => {
    p(a), s(a), u(a);
  });
};
f();
