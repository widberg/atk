(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
var e = [];

const n = {
  "fuel.exe": () => {
    const n = Process.enumerateModules()[0];
    Memory.protect(n.base, n.size, "rwx");
    var o, t, a = !1, r = "a1 ?? ?? ?? ?? d9 05 ?? ?? 9d 00 6a 00 d9 1d ?? ?? a7 00 68 ?? ?? 9c 00 50 c6 05 ?? ?? a7 00 00 e8 3a 13 01 00 83 05 ?? ?? a7 00 01 80 3d 79 ?? a6 00 00 75 f7 e8 85 f9 ff ff e8 ?? 71 19 00 84 c0", i = Memory.scanSync(n.base, n.size, r);
    if (0 != i.length) o = i[0].address.add(1).readPointer(); else {
      if (r = "e0 54 a7 00 68 c0 dc 81 00 52 bf e4 13 9d 00 e8 98 c0 e7 ff e8 73 ae e6 ff 88 44 24 0f 6a 00 68 60 62 9f 00 6a 08 6a 3b ff d6 6a 00 68 68 62 9f 00 6a 08 6a 35 ff d6 6a 00 68 70 62 9f 00 6a 18", 
      0 == (i = Memory.scanSync(n.base, n.size, r)).length) return void console.log("Could not locate the nppGlobalCommandState. Aborting...");
      o = new NativePointer("0x00a754e0"), a = !0;
    }
    var l, c = Memory.scanSync(n.base, n.size, "b8 0c 80 00 00 e8 ?? ?? 21 00 8b 94 24 14 80 00 00 53 56 57 8b bc 24 1c 80 00 00 8d 44 24 18 b9 1f 00 00 00 33 db 88 18 05 00 04 00 00 83 e9 01 79 f4 8b c2 8d 70 01 8a 08 83 c0 01 84 c9 75 f7");
    if (0 != c.length) t = new NativeFunction(c[0].address, "bool", [ "pointer", "pointer", "uint32" ], "stdcall"); else {
      if (!a) return void console.log("Could not locate the nfRunCommand. Aborting...");
      t = new NativeFunction(new NativePointer("0x0069b7a0"), "bool", [ "pointer", "pointer", "uint32" ], "stdcall");
    }
    global.runCommand = e => {
      t(o.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var s = Memory.scanSync(n.base, n.size, "83 ec 10 53 55 6a 10 e8 ?? ?? 21 00 33 db 83 c4 04 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08 8b e8 eb 02 33 ed 33 c0 3b fb 74 07 8b d7 e8 ?? ?? ?? ff 89 45 00 8b 44 24 20 89 45 08 8b c7 56");
    if (0 != s.length) l = s[0].address; else {
      if (!a) return void console.log("Could not locate the npRegisterCommand. Aborting...");
      l = new NativePointer("0x0069b610");
    }
    Interceptor.attach(l, {
      onEnter: n => {
        e.push(this.context.edi.readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  },
  "wall-e.exe": () => {
    const n = Process.enumerateModules()[0];
    Memory.protect(n.base, n.size, "rwx");
    var o = new NativePointer("0x0092e738").readPointer(), t = new NativeFunction(new NativePointer("0x00476580"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall");
    global.runCommand = e => {
      t(o.readPointer(), Memory.allocUtf8String(e), 0);
    };
    var a = new NativePointer("0x004763b0");
    Interceptor.attach(a, {
      onEnter: n => {
        e.push(n[0].readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  },
  "overlay.exe": () => {
    const n = new NativePointer("0x007de8a0"), o = new NativeFunction(new NativePointer("0x005a6e20"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), t = new NativePointer("0x005a6a70");
    global.runCommand = e => {
      o(n.readPointer(), Memory.allocUtf8String(e), 0);
    }, Interceptor.attach(t, {
      onEnter: n => {
        e.push(n[0].readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  }
};

var o = n[Process.enumerateModules()[0].name.toLowerCase()];

o ? o() : console.log("Unknown executable name. Unable to instrument.");

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
