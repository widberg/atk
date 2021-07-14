(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
var e = [];

const t = {
  "FUEL.exe": () => {
    const t = new NativePointer("0x00a7c080"), n = new NativeFunction(new NativePointer("0x0069a590"), "bool", [ "pointer", "pointer", "uint32" ], "stdcall"), r = new NativePointer("0x0069a400");
    return {
      runCommand: e => {
        n(t.readPointer(), Memory.allocUtf8String(e), 0);
      },
      interceptRegisterCommand: () => Interceptor.attach(r, {
        onEnter: t => {
          e.push(this.context.edi.readUtf8String());
        }
      })
    };
  },
  "WALL-E.exe": () => {
    const t = new NativePointer("0x0092e738"), n = new NativeFunction(new NativePointer("0x004546b0"), "bool", [ "pointer", "pointer" ], "stdcall"), r = new NativePointer("0x00476580");
    return {
      runCommand: e => {
        n(t.readPointer(), Memory.allocUtf8String(e));
      },
      interceptRegisterCommand: () => Interceptor.attach(r, {
        onEnter: t => {
          e.push(t[0].readUtf8String());
        }
      })
    };
  },
  "overlay.exe": () => {
    const t = new NativePointer("0x007de8a0"), n = new NativeFunction(new NativePointer("0x005a6e20"), "bool", [ "pointer", "pointer", "uint32" ], "thiscall"), r = new NativePointer("0x005a6a70");
    return {
      runCommand: e => {
        n(t.readPointer(), Memory.allocUtf8String(e), 0);
      },
      interceptRegisterCommand: () => Interceptor.attach(r, {
        onEnter: t => {
          e.push(t[0].readUtf8String());
        }
      })
    };
  }
};

var n = t[Process.enumerateModules()[0].name]() || {};

n.interceptRegisterCommand && (n.interceptRegisterCommand(), global.dumpCommandNames = () => {
  console.log(e);
}), n.runCommand && (global.runCommand = n.runCommand);

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
