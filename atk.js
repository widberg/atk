(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
var e = [];

const o = {
  fuel: () => {
    const o = Process.enumerateModules()[0];
    Memory.protect(o.base, o.size, "rwx");
    var a, n, t = !1, r = "a1 ?? ?? ?? ?? d9 05 ?? ?? 9d 00 6a 00 d9 1d ?? ?? a7 00 68 ?? ?? 9c 00 50 c6 05 ?? ?? a7 00 00 e8 3a 13 01 00 83 05 ?? ?? a7 00 01 80 3d 79 ?? a6 00 00 75 f7 e8 85 f9 ff ff e8 ?? 71 19 00 84 c0", c = Memory.scanSync(o.base, o.size, r);
    if (0 != c.length) a = c[0].address.add(1).readPointer(); else {
      if (r = "e0 54 a7 00 68 c0 dc 81 00 52 bf e4 13 9d 00 e8 98 c0 e7 ff e8 73 ae e6 ff 88 44 24 0f 6a 00 68 60 62 9f 00 6a 08 6a 3b ff d6 6a 00 68 68 62 9f 00 6a 08 6a 35 ff d6 6a 00 68 70 62 9f 00 6a 18", 
      0 == (c = Memory.scanSync(o.base, o.size, r)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      a = new NativePointer("0x00a754e0"), t = !0;
    }
    var l, s = Memory.scanSync(o.base, o.size, "b8 0c 80 00 00 e8 ?? ?? 21 00 8b 94 24 14 80 00 00 53 56 57 8b bc 24 1c 80 00 00 8d 44 24 18 b9 1f 00 00 00 33 db 88 18 05 00 04 00 00 83 e9 01 79 f4 8b c2 8d 70 01 8a 08 83 c0 01 84 c9 75 f7");
    if (0 != s.length) n = new NativeFunction(s[0].address, "bool", [ "pointer", "pointer", "uint32" ], "stdcall"); else {
      if (!t) return void console.log("Could not locate the nfRunCommand. Aborting...");
      n = new NativeFunction(new NativePointer("0x0069b7a0"), "bool", [ "pointer", "pointer", "uint32" ], "stdcall");
    }
    global.runCommand = e => {
      n(a.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var d = Memory.scanSync(o.base, o.size, "83 ec 10 53 55 6a 10 e8 ?? ?? 21 00 33 db 83 c4 04 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08 8b e8 eb 02 33 ed 33 c0 3b fb 74 07 8b d7 e8 ?? ?? ?? ff 89 45 00 8b 44 24 20 89 45 08 8b c7 56");
    if (0 != d.length) l = d[0].address; else {
      if (!t) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      l = new NativePointer("0x0069b610");
    }
    Interceptor.attach(l, {
      onEnter: o => {
        e.push(this.context.edi.readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  },
  "wall-e": () => {
    const o = Process.enumerateModules()[0];
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var a = o.base.add(9627448).sub(4194304), n = new NativeFunction(o.base.add(4679040).sub(4194304), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
    global.runCommand = e => {
      n(a.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var t = o.base.add(4678576).sub(4194304);
    Interceptor.attach(t, {
      onEnter: o => {
        e.push(o[0].readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  },
  overlay: () => {
    Memory.protect(fuelModule.base, fuelModule.size, "rwx");
    for (const e of Process.enumerateModules()) Memory.protect(e.base, e.size, "rwx");
    var o;
    isRU = !1;
    var a, n = "8b 0d ?? ?? ?? ?? 6a 00 68 ?? ?? 72 00 c6 05 ?? ?? ?? 00 00 e8 ?? ?? ?? ff 83 05 ?? ?? ?? 00 01 80 3d ?? ?? ?? 00 00 75 f7 e8 ?? a6 ff ff e8 ?? ?? 09 00 84 c0 74 e9 e8 ?? e8 ff ff b0 01 c3 cc", t = Memory.scanSync(ratModule.base, ratModule.size, n);
    if (0 != t.length) o = t[0].address.add(2).readPointer(); else {
      if (n = "8b 0d b8 12 78 00 6a 00 68 20 91 6f 00 c6 05 78 22 78 00 00 e8 0c 32 fe ff ff 05 6c 22 78 00 8d 9b 00 00 00 00 a0 a8 3b 79 00 84 c0 75 f7 e8 32 ae ff ff e8 bd 85 fb ff 84 c0 74 e9 e8 e4 e8 ff", 
      0 == (t = Memory.scanSync(ratModule.base, ratModule.size, n)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      o = new NativePointer("0x007812b8"), isRU = !0;
    }
    var r, c = Memory.scanSync(ratModule.base, ratModule.size, "b8 10 40 00 00 e8 ?? ?? ?? 00 a1 ?? ?? 7c 00 33 c4 89 84 24 0c 40 00 00 55 57 8b bc 24 1c 40 00 00 8b e9 89 7c 24 08 8d 44 24 14 b9 0f 00 00 00 c6 00 00 05 00 04 00 00 83 e9 01 79 f3 8b c7 8d");
    if (0 != c.length) a = new NativeFunction(c[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"); else {
      if (!isRU) return void console.log("Could not locate the nfRunCommand. Aborting...");
      a = new NativeFunction(new NativePointer("0x005a0c50"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
    }
    global.runCommand = e => {
      a(o.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var l = Memory.scanSync(ratModule.base, ratModule.size, "83 ec 18 a1 ?? ?? 7c 00 33 c4 89 44 24 14 53 55 8b 6c 24 24 57 6a 1a 68 ?? ?? 72 00 68 ?? ?? ?? 00 6a 10 89 4c 24 1c e8 ?? ?? fc ff 33 db 83 c4 10 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08");
    if (0 != l.length) r = l[0].address; else {
      if (!isRU) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      r = new NativePointer("0x005a08a0");
    }
    Interceptor.attach(r, {
      onEnter: o => {
        e.push(o[0].readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  },
  overlay_win2k: () => {
    o.overlay();
  }
};

var a = o[Process.enumerateModules()[0].name.toLowerCase().split(".")[0]];

a ? a() : console.log("Unknown executable name. Unable to instrument.");

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
