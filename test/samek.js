/**
 * Run: node switch.js  (in node)
 *      run.html?unit=samek (in browser)
 */

(function(exports, undefined){
    'use strict'

    try {
        core = require('./core');
        Statechart = require('../lib/statechart');
    } catch (e) {}


    var machine = core.Mixin({
        // slots
        myFoo: false,
        // machine
        initialState: "S0",
        states: {
            S0: {
                init: "S1",
                "E": { target: "S211" },
                states: {
                    S1: {
                        init: "S11",
                        "A": { target: "S1"   },
                        "B": { target: "S11"  },
                        "C": { target: "S2"   },
                        "D": { target: "S0"   },
                        "F": { target: "S211" },
                        states: {
                            S11: {
                                "G": { target: "S211" },
                                "H": {
                                    guard: function(){ return this.myFoo; },
                                    action: function(){ this.myFoo = false; }
                                }
                            }
                        }
                    },
                    S2: {
                        init: "S21",
                        "C": { target: "S1"  },
                        "F": { target: "S11" },
                        states: {
                            S21: {
                                init: "S211",
                                "B": { target: "S211" },
                                "H": {
                                    guard: function(){ return !this.myFoo; },
                                    action: function(){ this.myFoo = true; },
                                    target: "S21"
                                },
                                states: {
                                    S211: {
                                        "D": { target: "S21" },
                                        "G": { target: "S0"  }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, Statechart.Statechart);


    // Test
    machine.run();
    machine.dispatch("G");
    machine.dispatch("G");
    machine.dispatch("E");
    machine.dispatch("G");
    machine.dispatch("E");
    machine.dispatch("G");
    machine.dispatch("E");
    machine.dispatch("G");
    machine.dispatch("E");
    machine.dispatch("G");
    machine.dispatch("E");
    machine.dispatch("G");
    machine.dispatch("E");
    machine.dispatch("G");
    machine.dispatch("E");

})(typeof exports !== "undefined" ? exports : test = {});

/**
   Expected order of states:

   [S0] enter
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S21] enter
   [S211] enter
   [S211] init
   [S211] exit
   [S21] exit
   [S2] exit
   [S0] exit
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S2] enter
   [S21] enter
   [S211] enter
   [S211] init
   [S211] exit
   [S21] exit
   [S2] exit
   [S0] exit
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S2] enter
   [S21] enter
   [S211] enter
   [S211] init
   [S211] exit
   [S21] exit
   [S2] exit
   [S0] exit
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S2] enter
   [S21] enter
   [S211] enter
   [S211] init
   [S211] exit
   [S21] exit
   [S2] exit
   [S0] exit
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S2] enter
   [S21] enter
   [S211] enter
   [S211] init
   [S211] exit
   [S21] exit
   [S2] exit
   [S0] exit
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S2] enter
   [S21] enter
   [S211] enter
   [S211] init
   [S211] exit
   [S21] exit
   [S2] exit
   [S0] exit
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S2] enter
   [S21] enter
   [S211] enter
   [S211] init
   [S211] exit
   [S21] exit
   [S2] exit
   [S0] exit
   [S0] init
   [S1] enter
   [S1] init
   [S11] enter
   [S11] init
   [S11] exit
   [S1] exit
   [S2] enter
   [S21] enter
   [S211] enter
   [S211] init

*/