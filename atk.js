(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
var e = [];

const o = {
  "fuel.exe": () => {
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
    var s = Memory.scanSync(o.base, o.size, "83 ec 10 53 55 6a 10 e8 ?? ?? 21 00 33 db 83 c4 04 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08 8b e8 eb 02 33 ed 33 c0 3b fb 74 07 8b d7 e8 ?? ?? ?? ff 89 45 00 8b 44 24 20 89 45 08 8b c7 56");
    if (0 != s.length) l = s[0].address; else {
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
  "wall-e.exe": () => {
    const o = Process.enumerateModules()[0];
    var n;
    Memory.protect(o.base, o.size, "rwx");
    var a = Memory.scanSync(o.base, o.size, "8b 0d ?? ?? ?? ?? 6a 00 68 24 f9 89 00 e8 a5 c7 d6 ff 8b 16 8b 42 48 6a 00 8b ce ff d0 80 be 6c 12 00 00 00 0f 84 81 00 00 00 8b 0d 38 e7 92 00 6a 00 68 24 f9 89 00 e8 7b c7 d6 ff c6 86 f5 13");
    if (0 != a.length) {
      var t;
      n = a[0].address.add(2).readPointer();
      var r = Memory.scanSync(o.base, o.size, "b8 0c 40 00 00 e8 16 0d 30 00 56 8b f1 57 89 74 24 0c 8d 44 24 14 b9 0f 00 00 00 eb 03 8d 49 00 c6 00 00 05 00 04 00 00 83 e9 01 79 f3 8b bc 24 18 40 00 00 8b c7 8d 50 01 8d a4 24 00 00 00 00");
      if (0 != r.length) {
        var c;
        t = new NativeFunction(r[0].address, "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), 
        global.runCommand = e => {
          t(n.readPointer(), Memory.allocUtf8String(e), 0);
        };
        var l = Memory.scanSync(o.base, o.size, "83 ec 14 53 55 6a 10 89 4c 24 0c e8 1f 5c 30 00 33 db 83 c4 04 3b c3 74 0f 89 18 89 58 04 89 58 0c 89 58 08 8b e8 eb 02 33 ed 56 57 8b 7c 24 28 3b fb 74 0b 33 d2 8b cf e8 c3 21 fb ff eb 02 33");
        0 != l.length ? (c = l[0].address, Interceptor.attach(c, {
          onEnter: o => {
            e.push(o[0].readUtf8String());
          }
        }), global.dumpCommandNames = () => {
          console.log(e);
        }) : console.log("Could not locate the npRegisterCommand. Aborting...");
      } else console.log("Could not locate the nfRunCommand. Aborting...");
    } else console.log("Could not locate the nppGlobalCommandState. Aborting...");
  },
  "overlay.exe": () => {
    const o = new NativePointer("0x007de8a0"), n = new NativeFunction(new NativePointer("0x005a6e20"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), a = new NativePointer("0x005a6a70");
    global.runCommand = e => {
      n(o.readPointer(), Memory.allocUtf8String(e), 0);
    }, Interceptor.attach(a, {
      onEnter: o => {
        e.push(o[0].readUtf8String());
      }
    }), global.dumpCommandNames = () => {
      console.log(e);
    };
  }
};

var n = o[Process.enumerateModules()[0].name.toLowerCase()];

n ? n() : console.log("Unknown executable name. Unable to instrument.");

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
