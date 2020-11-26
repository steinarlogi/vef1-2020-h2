!(function () {
  "use strict";
  function t(t, e, r) {
    return (
      t(
        (r = {
          path: e,
          exports: {},
          require: function (t, e) {
            return (function () {
              throw new Error(
                "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
              );
            })(null == e && r.path);
          },
        }),
        r.exports
      ),
      r.exports
    );
  }
  t(function (t) {
    var e = (function (t) {
      var e,
        r = Object.prototype,
        n = r.hasOwnProperty,
        o = "function" == typeof Symbol ? Symbol : {},
        i = o.iterator || "@@iterator",
        a = o.asyncIterator || "@@asyncIterator",
        c = o.toStringTag || "@@toStringTag";
      function u(t, e, r) {
        return (
          Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        u({}, "");
      } catch (t) {
        u = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function f(t, e, r, n) {
        var o = e && e.prototype instanceof v ? e : v,
          i = Object.create(o.prototype),
          a = new O(n || []);
        return (
          (i._invoke = (function (t, e, r) {
            var n = s;
            return function (o, i) {
              if (n === p) throw new Error("Generator is already running");
              if (n === d) {
                if ("throw" === o) throw i;
                return S();
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = j(a, r);
                  if (c) {
                    if (c === y) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (n === s) throw ((n = d), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = p;
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (((n = r.done ? d : h), u.arg === y)) continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = d), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          })(t, r, a)),
          i
        );
      }
      function l(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      t.wrap = f;
      var s = "suspendedStart",
        h = "suspendedYield",
        p = "executing",
        d = "completed",
        y = {};
      function v() {}
      function m() {}
      function g() {}
      var w = {};
      w[i] = function () {
        return this;
      };
      var E = Object.getPrototypeOf,
        b = E && E(E(N([])));
      b && b !== r && n.call(b, i) && (w = b);
      var x = (g.prototype = v.prototype = Object.create(w));
      function _(t) {
        ["next", "throw", "return"].forEach(function (e) {
          u(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function L(t, e) {
        function r(o, i, a, c) {
          var u = l(t[o], t, i);
          if ("throw" !== u.type) {
            var f = u.arg,
              s = f.value;
            return s && "object" == typeof s && n.call(s, "__await")
              ? e.resolve(s.__await).then(
                  function (t) {
                    r("next", t, a, c);
                  },
                  function (t) {
                    r("throw", t, a, c);
                  }
                )
              : e.resolve(s).then(
                  function (t) {
                    (f.value = t), a(f);
                  },
                  function (t) {
                    return r("throw", t, a, c);
                  }
                );
          }
          c(u.arg);
        }
        var o;
        this._invoke = function (t, n) {
          function i() {
            return new e(function (e, o) {
              r(t, n, e, o);
            });
          }
          return (o = o ? o.then(i, i) : i());
        };
      }
      function j(t, r) {
        var n = t.iterator[r.method];
        if (n === e) {
          if (((r.delegate = null), "throw" === r.method)) {
            if (
              t.iterator.return &&
              ((r.method = "return"),
              (r.arg = e),
              j(t, r),
              "throw" === r.method)
            )
              return y;
            (r.method = "throw"),
              (r.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return y;
        }
        var o = l(n, t.iterator, r.arg);
        if ("throw" === o.type)
          return (r.method = "throw"), (r.arg = o.arg), (r.delegate = null), y;
        var i = o.arg;
        return i
          ? i.done
            ? ((r[t.resultName] = i.value),
              (r.next = t.nextLoc),
              "return" !== r.method && ((r.method = "next"), (r.arg = e)),
              (r.delegate = null),
              y)
            : i
          : ((r.method = "throw"),
            (r.arg = new TypeError("iterator result is not an object")),
            (r.delegate = null),
            y);
      }
      function T(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function k(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function O(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(T, this),
          this.reset(!0);
      }
      function N(t) {
        if (t) {
          var r = t[i];
          if (r) return r.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var o = -1,
              a = function r() {
                for (; ++o < t.length; )
                  if (n.call(t, o)) return (r.value = t[o]), (r.done = !1), r;
                return (r.value = e), (r.done = !0), r;
              };
            return (a.next = a);
          }
        }
        return { next: S };
      }
      function S() {
        return { value: e, done: !0 };
      }
      return (
        (m.prototype = x.constructor = g),
        (g.constructor = m),
        (m.displayName = u(g, c, "GeneratorFunction")),
        (t.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === m || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (t.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, g)
              : ((t.__proto__ = g), u(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(x)),
            t
          );
        }),
        (t.awrap = function (t) {
          return { __await: t };
        }),
        _(L.prototype),
        (L.prototype[a] = function () {
          return this;
        }),
        (t.AsyncIterator = L),
        (t.async = function (e, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new L(f(e, r, n, o), i);
          return t.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        _(x),
        u(x, c, "Generator"),
        (x[i] = function () {
          return this;
        }),
        (x.toString = function () {
          return "[object Generator]";
        }),
        (t.keys = function (t) {
          var e = [];
          for (var r in t) e.push(r);
          return (
            e.reverse(),
            function r() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in t) return (r.value = n), (r.done = !1), r;
              }
              return (r.done = !0), r;
            }
          );
        }),
        (t.values = N),
        (O.prototype = {
          constructor: O,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = e),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = e),
              this.tryEntries.forEach(k),
              !t)
            )
              for (var r in this)
                "t" === r.charAt(0) &&
                  n.call(this, r) &&
                  !isNaN(+r.slice(1)) &&
                  (this[r] = e);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var r = this;
            function o(n, o) {
              return (
                (c.type = "throw"),
                (c.arg = t),
                (r.next = n),
                o && ((r.method = "next"), (r.arg = e)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                c = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var u = n.call(a, "catchLoc"),
                  f = n.call(a, "finallyLoc");
                if (u && f) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (u) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!f)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];
              if (
                o.tryLoc <= this.prev &&
                n.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), y)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && e && (this.next = e),
              y
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), k(r), y;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  k(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (t, r, n) {
            return (
              (this.delegate = { iterator: N(t), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = e),
              y
            );
          },
        }),
        t
      );
    })(t.exports);
    try {
      regeneratorRuntime = e;
    } catch (t) {
      Function("r", "regeneratorRuntime = r")(e);
    }
  });
  function e(t, e, r, n, o, i, a) {
    try {
      var c = t[i](a),
        u = c.value;
    } catch (t) {
      return void r(t);
    }
    c.done ? e(u) : Promise.resolve(u).then(n, o);
  }
  function r(t) {
    return function () {
      var r = this,
        n = arguments;
      return new Promise(function (o, i) {
        var a = t.apply(r, n);
        function c(t) {
          e(a, o, i, c, u, "next", t);
        }
        function u(t) {
          e(a, o, i, c, u, "throw", t);
        }
        c(void 0);
      });
    };
  }
  var n = t(function (t) {
      var e = (t.exports =
        "undefined" != typeof window && window.Math == Math
          ? window
          : "undefined" != typeof self && self.Math == Math
          ? self
          : Function("return this")());
      "number" == typeof __g && (__g = e);
    }),
    o = t(function (t) {
      var e = (t.exports = { version: "2.6.11" });
      "number" == typeof __e && (__e = e);
    }),
    i = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    },
    a = function (t) {
      if (!i(t)) throw TypeError(t + " is not an object!");
      return t;
    },
    c = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    },
    u = !c(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
    f = n.document,
    l = i(f) && i(f.createElement),
    s =
      !u &&
      !c(function () {
        return (
          7 !=
          Object.defineProperty(
            ((t = "div"), l ? f.createElement(t) : {}),
            "a",
            {
              get: function () {
                return 7;
              },
            }
          ).a
        );
        var t;
      }),
    h = Object.defineProperty,
    p = {
      f: u
        ? Object.defineProperty
        : function (t, e, r) {
            if (
              (a(t),
              (e = (function (t, e) {
                if (!i(t)) return t;
                var r, n;
                if (
                  e &&
                  "function" == typeof (r = t.toString) &&
                  !i((n = r.call(t)))
                )
                  return n;
                if ("function" == typeof (r = t.valueOf) && !i((n = r.call(t))))
                  return n;
                if (
                  !e &&
                  "function" == typeof (r = t.toString) &&
                  !i((n = r.call(t)))
                )
                  return n;
                throw TypeError("Can't convert object to primitive value");
              })(e, !0)),
              a(r),
              s)
            )
              try {
                return h(t, e, r);
              } catch (t) {}
            if ("get" in r || "set" in r)
              throw TypeError("Accessors not supported!");
            return "value" in r && (t[e] = r.value), t;
          },
    },
    d = u
      ? function (t, e, r) {
          return p.f(
            t,
            e,
            (function (t, e) {
              return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e,
              };
            })(1, r)
          );
        }
      : function (t, e, r) {
          return (t[e] = r), t;
        },
    y = {}.hasOwnProperty,
    v = function (t, e) {
      return y.call(t, e);
    },
    m = 0,
    g = Math.random(),
    w = function (t) {
      return "Symbol(".concat(
        void 0 === t ? "" : t,
        ")_",
        (++m + g).toString(36)
      );
    },
    E = t(function (t) {
      var e = "__core-js_shared__",
        r = n[e] || (n[e] = {});
      (t.exports = function (t, e) {
        return r[t] || (r[t] = void 0 !== e ? e : {});
      })("versions", []).push({
        version: o.version,
        mode: "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
      });
    }),
    b = E("native-function-to-string", Function.toString),
    x = t(function (t) {
      var e = w("src"),
        r = "toString",
        i = ("" + b).split(r);
      (o.inspectSource = function (t) {
        return b.call(t);
      }),
        (t.exports = function (t, r, o, a) {
          var c = "function" == typeof o;
          c && (v(o, "name") || d(o, "name", r)),
            t[r] !== o &&
              (c && (v(o, e) || d(o, e, t[r] ? "" + t[r] : i.join(String(r)))),
              t === n
                ? (t[r] = o)
                : a
                ? t[r]
                  ? (t[r] = o)
                  : d(t, r, o)
                : (delete t[r], d(t, r, o)));
        })(Function.prototype, r, function () {
          return ("function" == typeof this && this[e]) || b.call(this);
        });
    }),
    _ = function (t, e, r) {
      if (
        ((function (t) {
          if ("function" != typeof t)
            throw TypeError(t + " is not a function!");
        })(t),
        void 0 === e)
      )
        return t;
      switch (r) {
        case 1:
          return function (r) {
            return t.call(e, r);
          };
        case 2:
          return function (r, n) {
            return t.call(e, r, n);
          };
        case 3:
          return function (r, n, o) {
            return t.call(e, r, n, o);
          };
      }
      return function () {
        return t.apply(e, arguments);
      };
    },
    L = function (t, e, r) {
      var i,
        a,
        c,
        u,
        f = t & L.F,
        l = t & L.G,
        s = t & L.S,
        h = t & L.P,
        p = t & L.B,
        y = l ? n : s ? n[e] || (n[e] = {}) : (n[e] || {}).prototype,
        v = l ? o : o[e] || (o[e] = {}),
        m = v.prototype || (v.prototype = {});
      for (i in (l && (r = e), r))
        (c = ((a = !f && y && void 0 !== y[i]) ? y : r)[i]),
          (u =
            p && a
              ? _(c, n)
              : h && "function" == typeof c
              ? _(Function.call, c)
              : c),
          y && x(y, i, c, t & L.U),
          v[i] != c && d(v, i, u),
          h && m[i] != c && (m[i] = c);
    };
  (n.core = o),
    (L.F = 1),
    (L.G = 2),
    (L.S = 4),
    (L.P = 8),
    (L.B = 16),
    (L.W = 32),
    (L.U = 64),
    (L.R = 128);
  var j = L,
    T = {}.toString,
    k = function (t) {
      return T.call(t).slice(8, -1);
    },
    O = Object("z").propertyIsEnumerable(0)
      ? Object
      : function (t) {
          return "String" == k(t) ? t.split("") : Object(t);
        },
    N = function (t) {
      return Object(
        (function (t) {
          if (null == t) throw TypeError("Can't call method on  " + t);
          return t;
        })(t)
      );
    },
    S = Math.ceil,
    C = Math.floor,
    F = Math.min,
    P = function (t) {
      return t > 0
        ? F(
            (function (t) {
              return isNaN((t = +t)) ? 0 : (t > 0 ? C : S)(t);
            })(t),
            9007199254740991
          )
        : 0;
    },
    M =
      Array.isArray ||
      function (t) {
        return "Array" == k(t);
      },
    A = t(function (t) {
      var e = E("wks"),
        r = n.Symbol,
        o = "function" == typeof r;
      (t.exports = function (t) {
        return e[t] || (e[t] = (o && r[t]) || (o ? r : w)("Symbol." + t));
      }).store = e;
    }),
    G = A("species"),
    I = function (t, e) {
      return new ((function (t) {
        var e;
        return (
          M(t) &&
            ("function" != typeof (e = t.constructor) ||
              (e !== Array && !M(e.prototype)) ||
              (e = void 0),
            i(e) && null === (e = e[G]) && (e = void 0)),
          void 0 === e ? Array : e
        );
      })(t))(e);
    },
    D = A("unscopables"),
    R = Array.prototype;
  null == R[D] && d(R, D, {});
  var q,
    B,
    z,
    U,
    V,
    Y,
    W,
    H,
    J,
    K,
    Q =
      ((z = 1 == (q = 5)),
      (U = 2 == q),
      (V = 3 == q),
      (Y = 4 == q),
      (W = 6 == q),
      (H = 5 == q || W),
      (J = B || I),
      function (t, e, r) {
        for (
          var n,
            o,
            i = N(t),
            a = O(i),
            c = _(e, r, 3),
            u = P(a.length),
            f = 0,
            l = z ? J(t, u) : U ? J(t, 0) : void 0;
          u > f;
          f++
        )
          if ((H || f in a) && ((o = c((n = a[f]), f, i)), q))
            if (z) l[f] = o;
            else if (o)
              switch (q) {
                case 3:
                  return !0;
                case 5:
                  return n;
                case 6:
                  return f;
                case 2:
                  l.push(n);
              }
            else if (Y) return !1;
        return W ? -1 : V || Y ? Y : l;
      }),
    X = "find",
    Z = !0;
  function $(t, e) {
    var r = document.createElement("div");
    return (
      (r.className = "Category__flex row"),
      e.forEach(function (e) {
        var n = document.createElement("a");
        n.className = "col col-4 col-md-12 singleVideo";
        var o = t.videos.find(function (t) {
          return t.id == e;
        });
        n.href = "/video.html?id=".concat(o.id);
        var i = document.createElement("img");
        i.src = o.poster;
        var a = document.createElement("div");
        (a.className = "singleVideo__image"),
          a.appendChild(i),
          n.appendChild(a);
        var c = document.createElement("span"),
          u = document.createTextNode(
            (function (t) {
              for (var e, r = parseInt(t, 10), n = 0, o = 0; r >= 3600; )
                (n += 1), (r -= 3600);
              for (; r >= 60; ) (o += 1), (r -= 60);
              return (
                (e = r),
                ""
                  .concat(0 === n ? "" : n > 9 ? n + ":" : "0" + n + ":")
                  .concat(0 === o ? "00" : o > 9 ? o : "0" + o, ":")
                  .concat(e > 9 ? e : "0" + e)
              );
            })(o.duration)
          );
        c.appendChild(u), a.appendChild(c);
        var f = document.createElement("h3"),
          l = document.createTextNode(o.title);
        f.appendChild(l), n.appendChild(f);
        var s = document.createElement("span"),
          h = new Date(o.created),
          p = new Date(),
          d = Math.floor((p.getTime() - h.getTime()) / 31536e6),
          y = Math.floor((p.getTime() - h.getTime()) / 2592e6),
          v = Math.floor((p.getTime() - h.getTime()) / 6048e5),
          m = Math.floor((p.getTime() - h.getTime()) / 864e5),
          g = Math.floor((p.getTime() - h.getTime()) / 36e5),
          w = "";
        w =
          d >= 1
            ? "Fyrir ".concat(d, d > 1 ? " árum síðan" : " ári síðan")
            : y >= 1
            ? "Fyrir ".concat(y, y > 1 ? " mánuðum síðan" : " mánuði síðan")
            : v >= 1
            ? "Fyrir ".concat(v, v > 1 ? " vikum síðan" : " viku síðan")
            : m >= 1
            ? "Fyrir ".concat(m, m > 1 ? " dögum síðan" : " degi síðan")
            : g >= 1
            ? "Fyrir ".concat(
                g,
                g > 1 ? " klukkustundum síðan" : " klukkustund síðan"
              )
            : "Fyrir minna en 1 klukkustund síðan";
        var E = document.createTextNode(w);
        s.appendChild(E), n.appendChild(s), r.appendChild(n);
      }),
      r
    );
  }
  function tt(t) {
    var e = document.getElementById("main");
    (e.className = "grid"),
      t.categories.forEach(function (r) {
        var n = document.createElement("section");
        n.className = "Category";
        var o = document.createElement("h2");
        o.className = "Category__Title";
        var i = document.createTextNode(r.title);
        o.appendChild(i), n.appendChild(o), n.appendChild($(t, r.videos));
        var a = document.createElement("div");
        (a.className = "line-div"), n.appendChild(a), e.appendChild(n);
      });
  }
  X in [] &&
    Array(1).find(function () {
      Z = !1;
    }),
    j(j.P + j.F * Z, "Array", {
      find: function (t) {
        return Q(this, t, arguments.length > 1 ? arguments[1] : void 0);
      },
    }),
    (K = X),
    (R[D][K] = !0),
    document.addEventListener(
      "DOMContentLoaded",
      r(
        regeneratorRuntime.mark(function t() {
          return regeneratorRuntime.wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  fetch("videos.json")
                    .then(function (t) {
                      return t.json();
                    })
                    .then(function (t) {
                      document.querySelector(".loading-div").remove(), tt(t);
                    });
                case 1:
                case "end":
                  return t.stop();
              }
          }, t);
        })
      )
    );
})();
//# sourceMappingURL=bundle.js.map
