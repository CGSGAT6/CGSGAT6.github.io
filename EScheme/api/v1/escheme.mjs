const Z = [
  { id: "a", x: 0, y: 20 },
  { id: "b", x: 80, y: 20 }
];
function p(e, i, s, m, y, u, a = Z) {
  return { key: e, name: i, group: s, prefix: m, path: y, text: u, width: 80, height: 40, ports: a };
}
const A = "M0 20H22 M58 20H80 M58 20a18 18 0 1 1-36 0a18 18 0 1 1 36 0", v = "Пассивные элементы", $ = "Источники", q = "Приборы", P = "Коммутация", V = [
  p(
    "resistor",
    "Резистор",
    v,
    "R",
    "M0 20H18 M18 11H62V29H18Z M62 20H80"
  ),
  p(
    "capacitor",
    "Конденсатор",
    v,
    "C",
    "M0 20H35 M35 5V35 M45 5V35 M45 20H80"
  ),
  p(
    "inductor",
    "Катушка",
    v,
    "L",
    "M0 20H12 q0-16 7-16t7 16q0-16 7-16t7 16q0-16 7-16t7 16q0-16 7-16t7 16H80"
  ),
  p(
    "rheostat",
    "Реостат",
    v,
    "R",
    "M0 20H18 M18 13H62V29H18Z M62 20H80 M51 0H40V12 M36 7l4 5 4-5",
    void 0,
    [...Z, { id: "w", x: 51, y: 0 }]
  ),
  p(
    "battery",
    "Батарея",
    $,
    "G",
    "M0 20H29 M29 4V36 M36 12V28 M44 4V36 M51 12V28 M51 20H80"
  ),
  p("ac", "Источник AC", $, "G", A + " M28 20q6-12 12 0t12 0"),
  p("ammeter", "Амперметр", q, "PA", A, "A"),
  p("voltmeter", "Вольтметр", q, "PV", A, "V"),
  p(
    "switch",
    "Ключ",
    P,
    "SA",
    "M0 20H21 M27 18L56 4 M59 20H80 M27 20a3 3 0 1 1-6 0a3 3 0 1 1 6 0 M59 20a3 3 0 1 1-6 0a3 3 0 1 1 6 0"
  ),
  {
    key: "junction",
    name: "Узел",
    group: P,
    prefix: "",
    width: 8,
    height: 8,
    ports: [{ id: "a", x: 4, y: 4 }],
    path: "M7 4a3 3 0 1 1-6 0a3 3 0 1 1 6 0"
  }
];
function z(e = "Новая схема") {
  return { version: 1, name: e, devices: [], wires: [], custom: [] };
}
function E(e, i) {
  return e.rotation % 180 ? { width: i.height, height: i.width } : { width: i.width, height: i.height };
}
const l = (e) => !!e && typeof e == "object", h = (e) => typeof e == "string" && e.length <= 200, w = (e) => typeof e == "number" && Number.isFinite(e) && Math.abs(e) <= 1e6, N = (e) => l(e) && w(e.x) && w(e.y);
function C(e) {
  const i = () => {
    throw Error("Файл не является совместимым проектом EScheme.");
  };
  if (!l(e) || e.version !== 1 || !h(e.name) || !Array.isArray(e.devices) || !Array.isArray(e.custom) || !Array.isArray(e.wires))
    return i();
  const s = new Map(V.map((t) => [t.key, t])), m = [];
  for (const t of e.custom) {
    if (!l(t) || !h(t.key) || !t.key.startsWith("custom-") || s.has(t.key) || !h(t.name) || !w(t.width) || !w(t.height) || t.width <= 0 || t.height <= 0 || typeof t.image != "string" || !/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(t.image) || !Array.isArray(t.ports) || !t.ports.length)
      return i();
    const n = /* @__PURE__ */ new Set();
    for (const r of t.ports) {
      if (!l(r) || !w(r.x) || !w(r.y) || !h(r.id) || n.has(r.id) || r.x < 0 || r.y < 0 || r.x > t.width || r.y > t.height)
        return i();
      n.add(r.id);
    }
    const d = {
      key: t.key,
      name: t.name,
      group: "Пользовательские",
      prefix: "X",
      width: t.width,
      height: t.height,
      image: t.image,
      ports: t.ports.map((r) => ({ id: r.id, x: r.x, y: r.y }))
    };
    m.push(d), s.set(d.key, d);
  }
  const y = /* @__PURE__ */ new Map(), u = [];
  for (const t of e.devices) {
    if (!l(t) || !h(t.kind) || !s.has(t.kind) || !h(t.id) || !t.id || y.has(t.id) || !w(t.x) || !w(t.y) || !w(t.rotation) || ![0, 90, 180, 270].includes(t.rotation) || t.name !== void 0 && !h(t.name) || !h(t.label) || !h(t.value))
      return i();
    u.push({
      id: t.id,
      kind: t.kind,
      x: t.x,
      y: t.y,
      rotation: t.rotation,
      ...t.name ? { name: t.name } : {},
      label: t.label,
      value: t.value
    }), y.set(t.id, s.get(t.kind));
  }
  const a = new Set(y.keys()), f = (t) => l(t) && h(t.id) && h(t.port) && !!y.get(t.id)?.ports.some((n) => n.id === t.port), o = [];
  for (const t of e.wires) {
    if (!l(t) || !h(t.id) || !t.id || a.has(t.id) || !f(t.from) || !f(t.to) || !Array.isArray(t.via) || !t.via.every(N))
      return i();
    a.add(t.id), o.push({
      id: t.id,
      from: { id: t.from.id, port: t.from.port },
      to: { id: t.to.id, port: t.to.port },
      via: t.via.map((n) => ({ x: n.x, y: n.y }))
    });
  }
  return { version: 1, name: e.name, custom: m, devices: u, wires: o };
}
const G = "escheme/v1";
function F() {
  return V.map(({ key: e, name: i, width: s, height: m, ports: y }) => ({
    type: e,
    name: i,
    width: s,
    height: m,
    ports: y.map((u) => ({ ...u }))
  }));
}
function c(e, i) {
  throw new Error(e + " — " + i);
}
function H(e, i, s) {
  (!e || typeof e != "object" || Array.isArray(e)) && c(i, "ожидается объект");
  for (const m of Object.keys(e))
    s.includes(m) || c(i + "." + m, "неизвестное поле");
  return e;
}
function k(e, i) {
  return Array.isArray(e) || c(i, "ожидается массив"), e;
}
function M(e, i) {
  return (typeof e != "string" || e.length > 200) && c(i, "ожидается строка до 200 символов"), e;
}
function S(e, i) {
  return (!Array.isArray(e) || e.length !== 2 || ![e[0], e[1]].every(
    (s) => typeof s == "number" && Number.isFinite(s) && Math.abs(s) <= 1e5
  )) && c(i, "ожидается пара координат [x, y] в пределах ±100000"), { x: e[0], y: e[1] };
}
function O(e, i) {
  return (typeof e != "string" || !/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(e)) && c(
    i,
    "идентификатор должен начинаться с латинской буквы и содержать до 64 букв, цифр, дефисов или подчёркиваний"
  ), e;
}
function R(e) {
  return e === void 0 ? [] : k(e, "custom").map((i, s) => {
    try {
      return C({ ...z(), custom: [i] }).custom[0];
    } catch {
      return c(
        "custom[" + s + "]",
        "проверьте ключ custom-…, размеры, изображение PNG и координаты выводов"
      );
    }
  });
}
function L(e) {
  const i = H(
    typeof e == "string" ? JSON.parse(e) : e,
    "$",
    ["format", "name", "parts", "wires", "custom", "$schema"]
  );
  i.format !== G && c("format", 'ожидается "escheme/v1"'), i.$schema !== void 0 && M(i.$schema, "$schema");
  const s = z(M(i.name, "name")), m = new Map(V.map((a) => [a.key, a]));
  s.custom = R(i.custom), s.custom.forEach((a, f) => {
    m.has(a.key) && c("custom[" + f + "].key", "повторяющийся ключ " + a.key), m.set(a.key, a);
  });
  const y = /* @__PURE__ */ new Map();
  for (const [a, f] of k(i.parts, "parts").entries()) {
    const o = "parts[" + a + "]", t = H(f, o, [
      "id",
      "type",
      "at",
      "rotate",
      "label",
      "name",
      "value"
    ]), n = O(t.id, o + ".id");
    y.has(n) && c(o + ".id", "повторяющийся идентификатор " + n);
    const d = M(t.type, o + ".type"), r = m.get(d);
    r || c(o + ".type", "неизвестный тип " + d);
    const g = S(t.at, o + ".at"), x = t.rotate === void 0 ? 0 : t.rotate;
    (typeof x != "number" || ![0, 90, 180, 270].includes(x)) && c(o + ".rotate", "ожидается 0, 90, 180 или 270");
    const b = {
      id: "part:" + n,
      kind: d,
      x: g.x,
      y: g.y,
      rotation: x,
      label: t.label === void 0 ? d === "junction" ? "" : n : M(t.label, o + ".label"),
      value: t.value === void 0 ? "" : M(t.value, o + ".value"),
      ...t.name === void 0 ? {} : { name: M(t.name, o + ".name") }
    }, j = E(b, r);
    b.x -= j.width / 2, b.y -= j.height / 2, s.devices.push(b), y.set(n, r);
  }
  function u(a, f) {
    const o = M(a, f), t = o.indexOf(".");
    (t < 1 || t === o.length - 1) && c(f, "ожидается ссылка вида R1.a");
    const n = o.slice(0, t), d = o.slice(t + 1), r = y.get(n);
    return r || c(f, "элемент " + n + " не объявлен"), r.ports.some((g) => g.id === d) || c(
      f,
      "у " + n + " доступны выводы " + r.ports.map((g) => g.id).join(", ")
    ), { id: "part:" + n, port: d };
  }
  for (const [a, f] of k(i.wires, "wires").entries()) {
    const o = "wires[" + a + "]", t = H(f, o, ["from", "to", "via"]), n = u(t.from, o + ".from"), d = u(t.to, o + ".to");
    n.id === d.id && n.port === d.port && c(o, "оба конца подключены к одному выводу");
    const r = t.via === void 0 ? [] : k(t.via, o + ".via").map(
      (g, x) => S(g, o + ".via[" + x + "]")
    );
    s.wires.push({ id: "wire:" + (a + 1), from: n, to: d, via: r });
  }
  return s;
}
export {
  L as buildCircuit,
  F as catalog,
  G as format
};
