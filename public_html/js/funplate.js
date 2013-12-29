/**********************************************************************
 * Copyright (c) 2013 Holger Szuesz, <hszuesz@live.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *********************************************************************/

function Log(){

    var messageQue = [];
    var outputs = [];

    var defaultConsoleOutput = function( msg ){

        if (window.console){
            console[msg.level]( msg.message );
        }
    };

    return {

        info: function( msg ){

            messageQue.push( {message: msg, level: 'info'} );
        },

        debug: function( msg ) {
            messageQue.push( {message: msg, level: 'debug'} );
        },

        warn: function( msg ) {
            messageQue.push( {message: msg, level: 'warn'} );
        },

        error: function( msg ){
            messageQue.push( {message: msg, level: 'error'} );
        },

        add: function( output ){
            outputs.push( output );
        },

        go: function(){

            if ( messageQue ) {

                for ( var i in messageQue ){

                    if ( !outputs.length ) {
                        outputs.push(defaultConsoleOutput);
                    }

                    for ( var j in outputs ) {

                        outputs[j](messageQue[i]);
                    }
                }
            }
        }
    };
}

function Funplate(c){
    
    var defaultConf = {
        target: undefined,
        template: undefined,
        data: {},
        source: 'json',
        update: false,
        interval: 10,
        fallback: undefined
    };
    
    return {
        conf: defaultConf,
        
        init: function(){
            log.info("funplate initialized. lets go...");
        },
        
        plot: function(){
            log.info("Try to plot template...")
        }
    };
};

var alertBox = function( msg ){
    if (msg.level === 'info'){ alert("info: " + msg.message);};
    if (msg.level === 'debug'){ alert("debug: " + msg.message);};
    if (msg.level === 'warn'){ alert("warn: " + msg.message);};
    if (msg.level === 'error'){ alert("error: " + msg.message);};
};

var log = new Log();
log.add(alertBox);