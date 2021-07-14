# ATK

Asobo Toolkit

<sup>This repository is a relative of the main [FMTK repository](https://github.com/widberg/fmtk).</sup>

## Supported Games

* Ratatouille
* WALL-E
* FUEL

## Getting Started

### Prerequisites

Run the commands below the list to install everything.

* Node.js 8.x or newer
* Python3.x
* [Frida](https://github.com/frida/frida) with Node.js bindings
* [atk.js](https://raw.githubusercontent.com/widberg/atk/master/atk.js)

Using [winget](https://github.com/microsoft/winget-cli) or manual installation

```sh
winget install node
winget install python3
pip3 install frida-tools
npm install -g frida
```

### Running

Replace the FUEL example data with whatever is appropriate for the game you are running.

#### Instrument

Choose one of the 2 options.

Double check that you are running Frida from the correct directory. Ideally you will run Frida from the directory containing the executable and `atk.js`.

##### Option 1) Instrument an already running game (Recommended)

```sh
frida -n FUEL.exe -l atk.js --no-pause
```

##### Option 2) Launch the game with instrumentation

This option will not work on all games. You may have to circumvent DRM/Anti-debug to launch the game directly. Ratatouille in particular does not like being launched as a child process.

```sh
frida -f FUEL.exe -l atk.js --no-pause
```

#### REPL

Once Frida has instrumented the game you should be greeted with a repl:

```sh
[Local::FUEL.exe]->
```

You can call any atk function here:

### Functions

#### runCommand(\<cmd : string\>)

Run the command string.

```sh
[Local::FUEL.exe]-> runCommand("SetTimeFactor 0.5")
```

#### dumpCommandNames()

Print the array of command names that have been registered while the game was instrumented. If the game was instrumented after launch then this will probably be empty because one of the first things to happen is command registration.

```sh
[Local::FUEL.exe]-> dumpCommandNames()
```
