(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
var e = [], o = !1;

const n = {
  fuel: () => {
    const n = Process.enumerateModules()[0];
    Memory.protect(n.base, n.size, "rwx");
    var a, t, r = !1, c = "a1 ?? ?? ?? ?? d9 05 ?? ?? 9d 00 6a 00 d9 1d ?? ?? a7 00 68 ?? ?? 9c 00 50 c6 05 ?? ?? a7 00 00 e8 3a 13 01 00 83 05 ?? ?? a7 00 01 80 3d 79 ?? a6 00 00 75 f7 e8 85 f9 ff ff e8 ?? 71 19 00 84 c0", l = Memory.scanSync(n.base, n.size, c);
    if (0 != l.length) a = l[0].address.add(1).readPointer(); else {
      if (c = "e0 54 a7 00 68 c0 dc 81 00 52 bf e4 13 9d 00 e8 98 c0 e7 ff e8 73 ae e6 ff 88 44 24 0f 6a 00 68 60 62 9f 00 6a 08 6a 3b ff d6 6a 00 68 68 62 9f 00 6a 08 6a 35 ff d6 6a 00 68 70 62 9f 00 6a 18", 
      0 == (l = Memory.scanSync(n.base, n.size, c)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      a = new NativePointer("0x00a754e0"), r = !0;
    }
    var s, i = Memory.scanSync(n.base, n.size, "b8 0c 80 00 00 e8 ?? ?? 21 00 8b 94 24 14 80 00 00 53 56 57 8b bc 24 1c 80 00 00 8d 44 24 18 b9 1f 00 00 00 33 db 88 18 05 00 04 00 00 83 e9 01 79 f4 8b c2 8d 70 01 8a 08 83 c0 01 84 c9 75 f7");
    if (0 != i.length) t = new NativeFunction(i[0].address, "bool", [ "pointer", "pointer", "uint32" ], "stdcall"); else {
      if (!r) return void console.log("Could not locate the nfRunCommand. Aborting...");
      t = new NativeFunction(new NativePointer("0x0069b7a0"), "bool", [ "pointer", "pointer", "uint32" ], "stdcall");
    }
    Interceptor.attach(t, {
      onEnter: e => {
        o && (this.command_line = e[1].readAnsiString());
      },
      onLeave: e => {
        o && console.log('"' + this.command_line + '" ' + (255 & e.toInt32()));
      }
    }), global.runCommand = e => {
      t(a.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var d = Memory.scanSync(n.base, n.size, "83 ec 10 53 55 6a 10 e8 ?? ?? 21 00 33 db 83 c4 04 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08 8b e8 eb 02 33 ed 33 c0 3b fb 74 07 8b d7 e8 ?? ?? ?? ff 89 45 00 8b 44 24 20 89 45 08 8b c7 56");
    if (0 != d.length) s = d[0].address; else {
      if (!r) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      s = new NativePointer("0x0069b610");
    }
    if (Interceptor.attach(s, {
      onEnter: o => {
        e.push(this.context.r7.readAnsiString());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    }, !r) {
      var b = Process.findModuleByName("xlive.dll");
      if (b) {
        Memory.protect(b.base, b.size, "rwx");
        var f = Memory.scanSync(b.base, b.size, "8b ff 55 8b ec 83 ec 20 53 56 57 8d 45 e0 33 f6 50 ff 75 0c 8b f9 8b 4d 08 89 75 e0 89 75 e4 89");
        if (0 != f.length) f[0].address.writeByteArray([ 194, 12, 0 ]); else console.log("Could not locate the npXLiveMemCheck. Assuming you have liveless installed.");
      } else console.log("Could not locate xlive.dll. Assuming you have liveless installed.");
    }
  },
  "wall-e": () => {
    const n = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var a = n.base.add(9627448).sub(4194304), t = new NativeFunction(n.base.add(4679040).sub(4194304), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
    Interceptor.attach(t, {
      onEnter: e => {
        o && console.log(e[0].readAnsiString());
      }
    }), global.runCommand = e => {
      t(a.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var r, c = n.base.add(4678576).sub(4194304);
    Interceptor.attach(c, {
      onEnter: o => {
        e.push(o[0].readAnsiString());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
    var l = Memory.scanSync(n.base, n.size, "50 41 54 43 48 5f 46 4c 41 47 53 5f 70 5f 44 5f 62 5f 4c 5f 4d 5f 63");
    0 != l.length ? (r = l[0].address.add(22), global.enableDPadCheats = () => {
      r.writeU8(67);
    }, global.disableDPadCheats = () => {
      r.writeU8(99);
    }) : console.log("Could not locate the npDPadCheats. Aborting...");
  },
  overlay: () => {
    const n = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var a = "b8 0c 44 00 00 e8 d6 8b 0f 00 a1 60 6d 79 00 33 84 24 0c 44 00 00 53 55 89 84 24 10 44 00 00 8b e9 8d 84 24 10 04 00 00 b9 10 00 00 00 8d 49 00 c6 00 00 05 00 04 00 00 49 75 f5 8b 9c 24 18 44", t = Memory.scanSync(n.base, n.size, a);
    if (0 != t.length && t[0].address.equals(new NativePointer("0x0052e8b0"))) {
      var r = new NativePointer("0x007b2f9c"), c = new NativeFunction(new NativePointer("0x0052e8b0"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
      Interceptor.attach(c, {
        onEnter: e => {
          o && console.log(e[0].readAnsiString());
        }
      }), global.runCommand = e => {
        c(r.readPointer(), Memory.allocUtf8String(e), 0);
      };
      var l = new NativePointer("0x0052e520");
      Interceptor.attach(l, {
        onEnter: o => {
          e.push(o[0].readAnsiString());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
      var s = new NativePointer("0x005EBAED").add(1);
      global.enableContextMenu = () => {
        s.writeU8(0);
      }, global.disableContextMenu = () => {
        s.writeU8(86);
      };
    } else if (a = "8b 44 24 08 8b 54 24 04 8b 89 0c 29 00 00 50 52 e8 ab d6 09 00 c2 08 00 90 90 90 90 90 90 90 90 8b 44 24 08 8b 54 24 04 8b 89 0c 29 00 00 50 52 e8 2b d8 09 00 c2 08 00 90 90 90 90 90 90 90 90", 
    0 != (t = Memory.scanSync(n.base, n.size, a)).length && t[0].address.equals(new NativePointer("0x0054B420"))) {
      r = new NativePointer("0x00724414"), c = new NativeFunction(new NativePointer("0x0054B420"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
      Interceptor.attach(c, {
        onEnter: e => {
          o && console.log(e[0].readAnsiString());
        }
      }), global.runCommand = e => {
        c(r.readPointer(), Memory.allocUtf8String(e), 0);
      };
      l = new NativePointer("0x0054B1C0");
      Interceptor.attach(l, {
        onEnter: o => {
          e.push(o[0].readAnsiString());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
      s = new NativePointer("0x0060AE7D").add(1);
      global.enableContextMenu = () => {
        s.writeU8(0);
      }, global.disableContextMenu = () => {
        s.writeU8(86);
      };
    } else if (a = "4d 55 4d 4d 59 00 00 00 42 4c 4f 43 4b 33 00 00 42 4c 4f 43 4b 32 00 00 42 4c 4f 43 4b 31 00 00 42 4c 4f 43 4b 30 00 00 54 68 65 20 4d 75 6d 6d 79 00 00 00 35 32 38 33 35 00 00 00", 
    0 != (t = Memory.scanSync(n.base, n.size, a)).length) {
      var i = "8b 0d ?? ?? 6b 00 68 ?? ?? 6a 00 e8 ?? 0d fe ff ff 05 ?? ?? 6b 00 a0 ?? ?? 6c 00 84 c0 75 f7 8b 0d ?? ?? 6b 00 8d 41 18 8b 0d ?? ?? 6b 00 50 e8 ?? 00 fd ff 85 c0 74 1c 8b 0d ?? ?? 6b 00 83 c0";
      if (0 == (f = Memory.scanSync(n.base, n.size, i)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      r = f[0].address.add(2).readPointer();
      var d = "8b 44 24 08 8b 54 24 04 8b 89 10 29 00 00 50 52 e8 ?? ?? 08 00 c2 08 00 90 90 90 90 90 90 90 90 8b 44 24 04 8b 89 10 29 00 00 50 e8 ?? ?? 08 00 c2 04 00 90 90 90 90 90 90 90 90 90 90 90 90 90";
      if (0 == (g = Memory.scanSync(n.base, n.size, d)).length) return void console.log("Could not locate the nfRunCommand. Aborting...");
      c = new NativeFunction(g[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), 
      Interceptor.attach(c, {
        onEnter: e => {
          o && console.log(e[0].readAnsiString());
        }
      }), global.runCommand = e => {
        c(r.readPointer(), Memory.allocUtf8String(e), 0);
      };
      var b = "83 ec 14 55 56 57 6a 1b 68 ?? ?? 6a 00 68 58 e0 69 00 89 4c 24 18 6a 10 e8 ?? ee fe ff 33 f6 83 c4 10 3b c6 74 0f 89 30 89 70 04 89 70 0c 89 70 08 8b e8 eb 02 33 ed 53 8b 5c 24 28 53 e8 5e 7d";
      if (0 == (u = Memory.scanSync(n.base, n.size, b)).length) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      l = u[0].address, Interceptor.attach(l, {
        onEnter: o => {
          e.push(o[0].readAnsiString());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
    } else if (a = "44 55 43 4b 00 00 00 00 42 4c 4f 43 4b 33 00 00 42 4c 4f 43 4b 32 00 00 42 4c 4f 43 4b 31 00 00 42 4c 4f 43 4b 30 00 00 53 69 74 74 69 6e 67 44 75 63 6b 73 00 00 00 00 35 32 31 31 36 00 00 00", 
    0 != (t = Memory.scanSync(n.base, n.size, a)).length) {
      i = "8b 0d ?? ?? 5d 00 68 ?? ?? 5b 00 e8 ?? ?? fe ff ff 05 ?? ?? 5d 00 a0 ?? ?? 5d 00 84 c0 75 f7 8b 0d ?? ?? 5d 00 8d 41 14 8b 0d ?? ?? 5d 00 50 e8 ?? ?? fd ff 85 c0 74 1c 8b 0d ?? ?? 5d 00 83 c0";
      if (0 == (f = Memory.scanSync(n.base, n.size, i)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      r = f[0].address.add(2).readPointer();
      d = "8b 44 24 08 8b 54 24 04 8b 89 10 ?? 00 00 50 52 e8 bb ?? 07 00 c2 08 00 90 90 90 90 90 90 90 90 8b 81 10 ?? 00 00 8b 40 20 c3 90 90 90 90 90 90 b8 cc ?? 00 00 e8 ?? ?? 0d 00 53 55 56 8b b4 24";
      if (0 == (g = Memory.scanSync(n.base, n.size, d)).length) return void console.log("Could not locate the nfRunCommand. Aborting...");
      c = new NativeFunction(g[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), 
      Interceptor.attach(c, {
        onEnter: e => {
          o && console.log(e[0].readAnsiString());
        }
      }), global.runCommand = e => {
        c(r.readPointer(), Memory.allocUtf8String(e), 0);
      };
      b = "83 ec 14 55 56 57 6a 1b 68 ?? ?? 5b 00 68 18 ?? 5a 00 89 4c 24 18 6a 10 e8 33 41 ff ff 33 f6 83 c4 10 3b c6 74 0f 89 30 89 70 04 89 70 0c 89 70 08 8b e8 eb 02 33 ed 53 8b 5c 24 28 53 e8 fe 7d";
      if (0 == (u = Memory.scanSync(n.base, n.size, b)).length) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      l = u[0].address, Interceptor.attach(l, {
        onEnter: o => {
          e.push(o[0].readAnsiString());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
    } else {
      var f, m = !1;
      i = "8b 0d ?? ?? ?? ?? 6a 00 68 ?? ?? 72 00 c6 05 ?? ?? ?? 00 00 e8 ?? ?? ?? ff 83 05 ?? ?? ?? 00 01 80 3d ?? ?? ?? 00 00 75 f7 e8 ?? a6 ff ff e8 ?? ?? 09 00 84 c0 74 e9 e8 ?? e8 ff ff b0 01 c3 cc";
      if (0 != (f = Memory.scanSync(n.base, n.size, i)).length) r = f[0].address.add(2).readPointer(); else {
        if (i = "8b 0d b8 12 78 00 6a 00 68 20 91 6f 00 c6 05 78 22 78 00 00 e8 0c 32 fe ff ff 05 6c 22 78 00 8d 9b 00 00 00 00 a0 a8 3b 79 00 84 c0 75 f7 e8 32 ae ff ff e8 bd 85 fb ff 84 c0 74 e9 e8 e4 e8 ff", 
        0 == (f = Memory.scanSync(n.base, n.size, i)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
        r = new NativePointer("0x007812b8"), m = !0;
      }
      var g;
      d = "b8 10 40 00 00 e8 ?? ?? ?? 00 a1 ?? ?? 7c 00 33 c4 89 84 24 0c 40 00 00 55 57 8b bc 24 1c 40 00 00 8b e9 89 7c 24 08 8d 44 24 14 b9 0f 00 00 00 c6 00 00 05 00 04 00 00 83 e9 01 79 f3 8b c7 8d";
      if (0 != (g = Memory.scanSync(n.base, n.size, d)).length) c = new NativeFunction(g[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"); else {
        if (!m) return void console.log("Could not locate the nfRunCommand. Aborting...");
        c = new NativeFunction(new NativePointer("0x005a0c50"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
      }
      Interceptor.attach(c, {
        onEnter: e => {
          o && console.log(e[0].readAnsiString());
        }
      }), global.runCommand = e => {
        c(r.readPointer(), Memory.allocUtf8String(e), 0);
      };
      var u;
      b = "83 ec 18 a1 ?? ?? 7c 00 33 c4 89 44 24 14 53 55 8b 6c 24 24 57 6a 1a 68 ?? ?? 72 00 68 ?? ?? ?? 00 6a 10 89 4c 24 1c e8 ?? ?? fc ff 33 db 83 c4 10 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08";
      if (0 != (u = Memory.scanSync(n.base, n.size, b)).length) l = u[0].address; else {
        if (!m) return void console.log("Could not locate the npRegisterCommand. Aborting...");
        l = new NativePointer("0x005a08a0");
      }
      Interceptor.attach(l, {
        onEnter: o => {
          e.push(o[0].readAnsiString());
        }
      }), global.dumpCommandNames = () => {
        console.log(e);
      };
      var h = Memory.scanSync(n.base, n.size, "75 53 a1 ?? ?? ?? 00 80 78 1d 00 74 48 53 56 ff 15 ?? ?? 70 00 8b 1d ?? ?? ?? 00 8d 4c 24 0c 51 8b f0 ff 15 ?? ?? 70 00 8b 57 08 52 56 8b cf e8 df fe ff ff 8b 44 24 10 8b 4c 24 0c 6a 00 53 6a");
      if (0 != h.length) s = h[0].address.add(1); else {
        if (!m) return void console.log("Could not locate the npModernPopupMenuCondition. Aborting...");
        s = new NativePointer("0x006051fd").add(1);
      }
      global.enableContextMenu = () => {
        s.writeU8(0);
      }, global.disableContextMenu = () => {
        m ? s.writeU8(84) : s.writeU8(83);
      };
    }
  },
  overlay_win2k: () => {
    n.overlay();
  },
  up: () => {
    const n = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var a, t = Memory.scanSync(n.base, n.size, "8b 0d c8 cc a7 00 6a 00 d9 1d b0 df a7 00 68 5c 78 9e 00 c6 05 b8 df a7 00 00 e8 da 9c f9 ff 83 05 a8 df a7 00 01 80 3d 88 7c a6 00 00 75 f7 e8 b5 f9 ff ff e8 b0 60 17 00 84 c0 74 e9 e8 f7 08");
    0 != t.length && t[0].address.equals(new NativePointer("0x00482387")) ? (console.log("UP RU"), 
    a = new NativePointer("0x00a7ccc8")) : (console.log("UP US"), a = new NativePointer("0x00a7ccb0"));
    var r = new NativeFunction(new NativePointer("0x0041c080"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
    Interceptor.attach(r, {
      onEnter: e => {
        o && console.log(e[0].readAnsiString());
      }
    }), global.runCommand = e => {
      r(a.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var c = new NativePointer("0x0041bec0");
    Interceptor.attach(c, {
      onEnter: o => {
        e.push(o[0].readAnsiString());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  },
  aplaguetaleinnocence_x64: () => {
    const n = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var a, t = Memory.scanSync(n.base, n.size, "48 8b 0d ?? ?? bb 00 4c 8d 9c 24 f0 00 00 00 49 8b 5b 38 49 8b 6b 40 49 8b 73 48 49 8b e3 41 5f 41 5e 41 5d 41 5c 5f e9 ?? ?? dc ff cc cc cc cc cc cc cc cc cc 48 8b c4 55 57 41 54 41 56 41 57");
    if (0 != t.length) {
      var r, c = t[0].address, l = c.add(3).readU32();
      a = c.add(l + 7);
      var s = Memory.scanSync(n.base, n.size, "44 89 44 24 18 48 89 54 24 10 55 56 57 41 54 41 55 41 56 41 57 48 8d ac 24 90 7e ff ff b8 70 82 00 00 e8 ?? ?? 67 00 48 2b e0 48 c7 44 24 30 fe ff ff ff 48 89 9c 24 b0 82 00 00 0f 29 b4 24 60");
      if (0 != s.length) {
        var i;
        r = new NativeFunction(s[0].address, "bool", [ "pointer", "pointer", "int64" ], "win64"), 
        Interceptor.attach(r, {
          onEnter: e => {
            o && console.log(this.context.r2.readAnsiString());
          }
        }), global.runCommand = e => {
          r(a.readPointer(), Memory.allocUtf8String(e), 0);
        };
        var d = Memory.scanSync(n.base, n.size, "48 89 5c 24 18 55 56 57 41 54 41 55 41 56 41 57 48 83 ec 40 4d 8b e0 48 8b ea 48 8b f9 48 85 d2 74 16 4c 8b 05 ?? ?? df 00 48 8d 8c 24 80 00 00 00 e8 ?? ?? f2 ff eb 17 48 8b 05 ?? ?? df 00 48");
        0 != d.length ? (i = d[0].address, Interceptor.attach(i, {
          onEnter: o => {
            e.push(this.context.r2.readAnsiString());
          }
        }), global.dumpCommandNames = () => {
          console.log(e);
        }) : console.log("Could not locate the npRegisterCommand. Aborting...");
      } else console.log("Could not locate the nfRunCommand. Aborting...");
    } else console.log("Could not locate the nppGlobalCommandState. Aborting...");
  }
};

var a = n[Process.enumerateModules()[0].name.toLowerCase().split(".")[0]];

a ? (a(), global.enableLogCommands = () => {
  o = !0;
}, global.disableLogCommands = () => {
  o = !1;
}) : console.log("Unknown executable name. Unable to instrument.");

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
