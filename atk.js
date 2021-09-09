(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
var e = [];

const o = {
  fuel: () => {
    const o = Process.enumerateModules()[0];
    Memory.protect(o.base, o.size, "rwx");
    var n, a, t = !1, r = "a1 ?? ?? ?? ?? d9 05 ?? ?? 9d 00 6a 00 d9 1d ?? ?? a7 00 68 ?? ?? 9c 00 50 c6 05 ?? ?? a7 00 00 e8 3a 13 01 00 83 05 ?? ?? a7 00 01 80 3d 79 ?? a6 00 00 75 f7 e8 85 f9 ff ff e8 ?? 71 19 00 84 c0", c = Memory.scanSync(o.base, o.size, r);
    if (0 != c.length) n = c[0].address.add(1).readPointer(); else {
      if (r = "e0 54 a7 00 68 c0 dc 81 00 52 bf e4 13 9d 00 e8 98 c0 e7 ff e8 73 ae e6 ff 88 44 24 0f 6a 00 68 60 62 9f 00 6a 08 6a 3b ff d6 6a 00 68 68 62 9f 00 6a 08 6a 35 ff d6 6a 00 68 70 62 9f 00 6a 18", 
      0 == (c = Memory.scanSync(o.base, o.size, r)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      n = new NativePointer("0x00a754e0"), t = !0;
    }
    var l, d = Memory.scanSync(o.base, o.size, "b8 0c 80 00 00 e8 ?? ?? 21 00 8b 94 24 14 80 00 00 53 56 57 8b bc 24 1c 80 00 00 8d 44 24 18 b9 1f 00 00 00 33 db 88 18 05 00 04 00 00 83 e9 01 79 f4 8b c2 8d 70 01 8a 08 83 c0 01 84 c9 75 f7");
    if (0 != d.length) a = new NativeFunction(d[0].address, "bool", [ "pointer", "pointer", "uint32" ], "stdcall"); else {
      if (!t) return void console.log("Could not locate the nfRunCommand. Aborting...");
      a = new NativeFunction(new NativePointer("0x0069b7a0"), "bool", [ "pointer", "pointer", "uint32" ], "stdcall");
    }
    global.runCommand = e => {
      a(n.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var i = Memory.scanSync(o.base, o.size, "83 ec 10 53 55 6a 10 e8 ?? ?? 21 00 33 db 83 c4 04 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08 8b e8 eb 02 33 ed 33 c0 3b fb 74 07 8b d7 e8 ?? ?? ?? ff 89 45 00 8b 44 24 20 89 45 08 8b c7 56");
    if (0 != i.length) l = i[0].address; else {
      if (!t) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      l = new NativePointer("0x0069b610");
    }
    if (Interceptor.attach(l, {
      onEnter: o => {
        e.push(this.context.edi.readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    }, !t) {
      var s = Process.findModuleByName("xlive.dll");
      if (s) {
        Memory.protect(s.base, s.size, "rwx");
        var b = Memory.scanSync(s.base, s.size, "8b ff 55 8b ec 83 ec 20 53 56 57 8d 45 e0 33 f6 50 ff 75 0c 8b f9 8b 4d 08 89 75 e0 89 75 e4 89");
        if (0 != b.length) b[0].address.writeByteArray([ 194, 12, 0 ]); else console.log("Could not locate the npXLiveMemCheck. Assuming you have liveless installed.");
      } else console.log("Could not locate xlive.dll. Assuming you have liveless installed.");
    }
  },
  "wall-e": () => {
    const o = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var n = o.base.add(9627448).sub(4194304), a = new NativeFunction(o.base.add(4679040).sub(4194304), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
    global.runCommand = e => {
      a(n.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var t, r = o.base.add(4678576).sub(4194304);
    Interceptor.attach(r, {
      onEnter: o => {
        e.push(o[0].readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
    var c = Memory.scanSync(o.base, o.size, "50 41 54 43 48 5f 46 4c 41 47 53 5f 70 5f 44 5f 62 5f 4c 5f 4d 5f 63");
    0 != c.length ? (t = c[0].address.add(22), global.enableDPadCheats = () => {
      t.writeU8(67);
    }, global.disableDPadCheats = () => {
      t.writeU8(99);
    }) : console.log("Could not locate the npDPadCheats. Aborting...");
  },
  overlay: () => {
    const o = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var n = "b8 0c 44 00 00 e8 d6 8b 0f 00 a1 60 6d 79 00 33 84 24 0c 44 00 00 53 55 89 84 24 10 44 00 00 8b e9 8d 84 24 10 04 00 00 b9 10 00 00 00 8d 49 00 c6 00 00 05 00 04 00 00 49 75 f5 8b 9c 24 18 44", a = Memory.scanSync(o.base, o.size, n);
    if (0 != a.length && a[0].address.equals(new NativePointer("0x0052e8b0"))) {
      var t = new NativePointer("0x007b2f9c"), r = new NativeFunction(new NativePointer("0x0052e8b0"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
      global.runCommand = e => {
        r(t.readPointer(), Memory.allocUtf8String(e), 0);
      };
      var c = new NativePointer("0x0052e520");
      Interceptor.attach(c, {
        onEnter: o => {
          e.push(o[0].readUtf8String());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
      var l = new NativePointer("0x005EBAED").add(1);
      global.enableContextMenu = () => {
        l.writeU8(0);
      }, global.disableContextMenu = () => {
        l.writeU8(86);
      };
    } else if (n = "8b 44 24 08 8b 54 24 04 8b 89 0c 29 00 00 50 52 e8 ab d6 09 00 c2 08 00 90 90 90 90 90 90 90 90 8b 44 24 08 8b 54 24 04 8b 89 0c 29 00 00 50 52 e8 2b d8 09 00 c2 08 00 90 90 90 90 90 90 90 90", 
    0 != (a = Memory.scanSync(o.base, o.size, n)).length && a[0].address.equals(new NativePointer("0x0054B420"))) {
      t = new NativePointer("0x00724414"), r = new NativeFunction(new NativePointer("0x0054B420"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
      global.runCommand = e => {
        r(t.readPointer(), Memory.allocUtf8String(e), 0);
      };
      c = new NativePointer("0x0054B1C0");
      Interceptor.attach(c, {
        onEnter: o => {
          e.push(o[0].readUtf8String());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
      l = new NativePointer("0x0060AE7D").add(1);
      global.enableContextMenu = () => {
        l.writeU8(0);
      }, global.disableContextMenu = () => {
        l.writeU8(86);
      };
    } else if (n = "4d 55 4d 4d 59 00 00 00 42 4c 4f 43 4b 33 00 00 42 4c 4f 43 4b 32 00 00 42 4c 4f 43 4b 31 00 00 42 4c 4f 43 4b 30 00 00 54 68 65 20 4d 75 6d 6d 79 00 00 00 35 32 38 33 35 00 00 00", 
    0 != (a = Memory.scanSync(o.base, o.size, n)).length) {
      var d = "8b 0d ?? ?? 6b 00 68 ?? ?? 6a 00 e8 ?? 0d fe ff ff 05 ?? ?? 6b 00 a0 ?? ?? 6c 00 84 c0 75 f7 8b 0d ?? ?? 6b 00 8d 41 18 8b 0d ?? ?? 6b 00 50 e8 ?? 00 fd ff 85 c0 74 1c 8b 0d ?? ?? 6b 00 83 c0";
      if (0 == (b = Memory.scanSync(o.base, o.size, d)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      t = b[0].address.add(2).readPointer();
      var i = "8b 44 24 08 8b 54 24 04 8b 89 10 29 00 00 50 52 e8 ?? ?? 08 00 c2 08 00 90 90 90 90 90 90 90 90 8b 44 24 04 8b 89 10 29 00 00 50 e8 ?? ?? 08 00 c2 04 00 90 90 90 90 90 90 90 90 90 90 90 90 90";
      if (0 == (m = Memory.scanSync(o.base, o.size, i)).length) return void console.log("Could not locate the nfRunCommand. Aborting...");
      r = new NativeFunction(m[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), 
      global.runCommand = e => {
        r(t.readPointer(), Memory.allocUtf8String(e), 0);
      };
      var s = "83 ec 14 55 56 57 6a 1b 68 ?? ?? 6a 00 68 58 e0 69 00 89 4c 24 18 6a 10 e8 ?? ee fe ff 33 f6 83 c4 10 3b c6 74 0f 89 30 89 70 04 89 70 0c 89 70 08 8b e8 eb 02 33 ed 53 8b 5c 24 28 53 e8 5e 7d";
      if (0 == (u = Memory.scanSync(o.base, o.size, s)).length) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      c = u[0].address, Interceptor.attach(c, {
        onEnter: o => {
          e.push(o[0].readUtf8String());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
    } else if (n = "44 55 43 4b 00 00 00 00 42 4c 4f 43 4b 33 00 00 42 4c 4f 43 4b 32 00 00 42 4c 4f 43 4b 31 00 00 42 4c 4f 43 4b 30 00 00 53 69 74 74 69 6e 67 44 75 63 6b 73 00 00 00 00 35 32 31 31 36 00 00 00", 
    0 != (a = Memory.scanSync(o.base, o.size, n)).length) {
      d = "8b 0d ?? ?? 5d 00 68 ?? ?? 5b 00 e8 ?? ?? fe ff ff 05 ?? ?? 5d 00 a0 ?? ?? 5d 00 84 c0 75 f7 8b 0d ?? ?? 5d 00 8d 41 14 8b 0d ?? ?? 5d 00 50 e8 ?? ?? fd ff 85 c0 74 1c 8b 0d ?? ?? 5d 00 83 c0";
      if (0 == (b = Memory.scanSync(o.base, o.size, d)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      t = b[0].address.add(2).readPointer();
      i = "8b 44 24 08 8b 54 24 04 8b 89 10 ?? 00 00 50 52 e8 bb ?? 07 00 c2 08 00 90 90 90 90 90 90 90 90 8b 81 10 ?? 00 00 8b 40 20 c3 90 90 90 90 90 90 b8 cc ?? 00 00 e8 ?? ?? 0d 00 53 55 56 8b b4 24";
      if (0 == (m = Memory.scanSync(o.base, o.size, i)).length) return void console.log("Could not locate the nfRunCommand. Aborting...");
      r = new NativeFunction(m[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), 
      global.runCommand = e => {
        r(t.readPointer(), Memory.allocUtf8String(e), 0);
      };
      s = "83 ec 14 55 56 57 6a 1b 68 ?? ?? 5b 00 68 18 ?? 5a 00 89 4c 24 18 6a 10 e8 33 41 ff ff 33 f6 83 c4 10 3b c6 74 0f 89 30 89 70 04 89 70 0c 89 70 08 8b e8 eb 02 33 ed 53 8b 5c 24 28 53 e8 fe 7d";
      if (0 == (u = Memory.scanSync(o.base, o.size, s)).length) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      c = u[0].address, Interceptor.attach(c, {
        onEnter: o => {
          e.push(o[0].readUtf8String());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
    } else {
      var b, f = !1;
      d = "8b 0d ?? ?? ?? ?? 6a 00 68 ?? ?? 72 00 c6 05 ?? ?? ?? 00 00 e8 ?? ?? ?? ff 83 05 ?? ?? ?? 00 01 80 3d ?? ?? ?? 00 00 75 f7 e8 ?? a6 ff ff e8 ?? ?? 09 00 84 c0 74 e9 e8 ?? e8 ff ff b0 01 c3 cc";
      if (0 != (b = Memory.scanSync(o.base, o.size, d)).length) t = b[0].address.add(2).readPointer(); else {
        if (d = "8b 0d b8 12 78 00 6a 00 68 20 91 6f 00 c6 05 78 22 78 00 00 e8 0c 32 fe ff ff 05 6c 22 78 00 8d 9b 00 00 00 00 a0 a8 3b 79 00 84 c0 75 f7 e8 32 ae ff ff e8 bd 85 fb ff 84 c0 74 e9 e8 e4 e8 ff", 
        0 == (b = Memory.scanSync(o.base, o.size, d)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
        t = new NativePointer("0x007812b8"), f = !0;
      }
      var m;
      i = "b8 10 40 00 00 e8 ?? ?? ?? 00 a1 ?? ?? 7c 00 33 c4 89 84 24 0c 40 00 00 55 57 8b bc 24 1c 40 00 00 8b e9 89 7c 24 08 8d 44 24 14 b9 0f 00 00 00 c6 00 00 05 00 04 00 00 83 e9 01 79 f3 8b c7 8d";
      if (0 != (m = Memory.scanSync(o.base, o.size, i)).length) r = new NativeFunction(m[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"); else {
        if (!f) return void console.log("Could not locate the nfRunCommand. Aborting...");
        r = new NativeFunction(new NativePointer("0x005a0c50"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
      }
      global.runCommand = e => {
        r(t.readPointer(), Memory.allocUtf8String(e), 0);
      };
      var u;
      s = "83 ec 18 a1 ?? ?? 7c 00 33 c4 89 44 24 14 53 55 8b 6c 24 24 57 6a 1a 68 ?? ?? 72 00 68 ?? ?? ?? 00 6a 10 89 4c 24 1c e8 ?? ?? fc ff 33 db 83 c4 10 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08";
      if (0 != (u = Memory.scanSync(o.base, o.size, s)).length) c = u[0].address; else {
        if (!f) return void console.log("Could not locate the npRegisterCommand. Aborting...");
        c = new NativePointer("0x005a08a0");
      }
      Interceptor.attach(c, {
        onEnter: o => {
          e.push(o[0].readUtf8String());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
      var g = Memory.scanSync(o.base, o.size, "75 53 a1 ?? ?? ?? 00 80 78 1d 00 74 48 53 56 ff 15 ?? ?? 70 00 8b 1d ?? ?? ?? 00 8d 4c 24 0c 51 8b f0 ff 15 ?? ?? 70 00 8b 57 08 52 56 8b cf e8 df fe ff ff 8b 44 24 10 8b 4c 24 0c 6a 00 53 6a");
      if (0 != g.length) l = g[0].address.add(1); else {
        if (!f) return void console.log("Could not locate the npModernPopupMenuCondition. Aborting...");
        l = new NativePointer("0x006051fd").add(1);
      }
      global.enableContextMenu = () => {
        l.writeU8(0);
      }, global.disableContextMenu = () => {
        f ? l.writeU8(84) : l.writeU8(83);
      };
    }
  },
  overlay_win2k: () => {
    o.overlay();
  },
  up: () => {
    const o = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var n, a = Memory.scanSync(o.base, o.size, "8b 0d c8 cc a7 00 6a 00 d9 1d b0 df a7 00 68 5c 78 9e 00 c6 05 b8 df a7 00 00 e8 da 9c f9 ff 83 05 a8 df a7 00 01 80 3d 88 7c a6 00 00 75 f7 e8 b5 f9 ff ff e8 b0 60 17 00 84 c0 74 e9 e8 f7 08");
    0 != a.length && a[0].address.equals(new NativePointer("0x00482387")) ? (console.log("UP RU"), 
    n = new NativePointer("0x00a7ccc8")) : (console.log("UP US"), n = new NativePointer("0x00a7ccb0"));
    var t = new NativeFunction(new NativePointer("0x0041c080"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
    global.runCommand = e => {
      t(n.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var r = new NativePointer("0x0041bec0");
    Interceptor.attach(r, {
      onEnter: o => {
        e.push(o[0].readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  }
};

var n = o[Process.enumerateModules()[0].name.toLowerCase().split(".")[0]];

n ? n() : console.log("Unknown executable name. Unable to instrument.");

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
