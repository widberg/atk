# ATK

Asobo Toolkit

<sup>This repository is a relative of the main [FMTK repository](https://github.com/widberg/fmtk).</sup>

## Supported Games

* Ratatouille (EN:US)
* WALL-E (RU)
* FUEL (EN:US,RU,Steam Demo)

## Getting Started

### Prerequisites

Run the commands below the list to install everything.

* [Python](https://www.python.org/) 3.x
* [Frida](https://github.com/frida/frida)
* [atk.js](https://raw.githubusercontent.com/widberg/atk/master/atk.js)

Using [winget](https://github.com/microsoft/winget-cli) or manual installation

```sh
winget install python3
pip3 install frida-tools
```

You may need to add a directory to your Path environment variable to run Frida, pip should warn you if this is the case, from the command line. Check out [this StackOverflow answer](https://stackoverflow.com/a/36160069/3997768) if you are getting the `'frida' is not recognized as an internal or external command, operable program or batch file.` error and need help.

now download [atk.js](https://raw.githubusercontent.com/widberg/atk/master/atk.js) from this repo

### Running

Replace the FUEL example data with whatever is appropriate for the game you are running.

Choose one of the 2 options.

Double check that you are running Frida from the correct directory. Ideally you will run Frida from the directory containing the executable and `atk.js`.

#### Option 1) Instrument an already running game (Recommended)

```sh
frida -n FUEL.exe -l atk.js --no-pause
```

#### Option 2) Launch the game with instrumentation

This option will not work on all games. You may have to circumvent DRM/Anti-debug to launch the game directly. Ratatouille in particular does not like being launched as a child process.

```sh
frida -f FUEL.exe -l atk.js --no-pause
```

### REPL

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
