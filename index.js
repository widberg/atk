var commandNames = [];

const games = {
  "FUEL.exe": () => {
    const nppGlobalCommandState = new NativePointer("0x00a7c080");
    const nfRunCommand = new NativeFunction(new NativePointer("0x0069a590"), "bool", ["pointer", "pointer", "uint32"], 'stdcall');
    const npRegisterCommand = new NativePointer("0x0069a400");

    return {
      runCommand: cmd => { nfRunCommand(nppGlobalCommandState.readPointer(), Memory.allocUtf8String(cmd), 0) },
      interceptRegisterCommand: () => Interceptor.attach(npRegisterCommand, {
        onEnter: args => {
          commandNames.push(this.context.edi.readUtf8String());
        }
      })
    };
  },
  "WALL-E.exe": () => {
    const nppGlobalCommandState = new NativePointer("0x0092e738");
    const nfRunCommand = new NativeFunction(new NativePointer("0x004546b0"), "bool", ["pointer", "pointer"], 'stdcall');
    const npRegisterCommand = new NativePointer("0x00476580");

    return {
      runCommand: cmd => { nfRunCommand(nppGlobalCommandState.readPointer(), Memory.allocUtf8String(cmd)) },
      interceptRegisterCommand: () => Interceptor.attach(npRegisterCommand, {
        onEnter: args => {
          commandNames.push(args[0].readUtf8String());
        }
      })
    };
  },
  "overlay.exe": () => {
    const nppGlobalCommandState = new NativePointer("0x007de8a0");
    const nfRunCommand = new NativeFunction(new NativePointer("0x005a6e20"), "bool", ["pointer", "pointer", "uint32"], 'thiscall');
    const npRegisterCommand = new NativePointer("0x005a6a70");

    return {
      runCommand: cmd => { nfRunCommand(nppGlobalCommandState.readPointer(), Memory.allocUtf8String(cmd), 0) },
      interceptRegisterCommand: () => Interceptor.attach(npRegisterCommand, {
        onEnter: args => {
          commandNames.push(args[0].readUtf8String());
        }
      })
    };
  }
};

var game = games[Process.enumerateModules()[0].name]();

if (game) {
  if (game.interceptRegisterCommand) {
    game.interceptRegisterCommand();
    global.dumpCommandNames = () => {
      console.log(commandNames);
    }
  }

  if (game.runCommand) {
    global.runCommand = game.runCommand;
  }
} else {
  console.log("Unknown executable name. Unable to instrument.");
}
