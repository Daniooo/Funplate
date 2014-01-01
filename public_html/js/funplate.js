/**********************************************************************
 * Copyright (c) 2013 Holger Szuesz, <hszuesz@live.com>
 * Copyright (c) 2013 Daniel Togelang, <daniel@togelang.de>
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


var log = new Log();
// log.add(alertBox);
// log.add(smsLogger);
// log.disable();

var i11n = {
    de : {
        invalidTarget: 'Entschuldige Meister, du must ein valides Ziel zum Rendern der Daten auswählen.'
    },

    en: {
        invalidTarget: 'Excuse me Master, you should use a valid target to render your data.'
    }
};

var helper = {

    // checking the DataTypes
    // String, Number, Boolean, Array, Object, Null, Undefined
    type: function( obj ){

        if (obj === null) return 'null';
        if (typeof obj === 'undefined') return 'undefined';
        if (typeof obj === 'string') return 'string';
        if (typeof obj === 'boolean') return 'boolean';
        if (typeof obj === 'number') return 'number';
        if (obj instanceof Array ) return 'array';
        if (typeof obj === 'object') return 'object';
    
    },

    isEmpty: function( obj ){
        if ( this.type( obj ) === 'undefined' ) return true;
        if ( this.type( obj ) === 'string' && obj == '' ) return true;
        if ( this.type( obj ) === 'array' && obj.length == 0 ) return true;

        return false;
    },

    isntEmpty: function( obj ) {
        return !this.isEmpty( obj );
    },
    
    $_GET: function(name) {
        var p,t,r=/[?&]?([^=]+)=([^&]*)/g;
        while ( t = r.exec( document.location.search.split("+").join(" ")) ){
            if ( t[1]==name ) p = decodeURIComponent( t[2] );
        }
        return p;
    },
    
    strReplace: function( search, replace, searchstring ){
        return searchstring.split( search ).join( replace );
    },

    i11n: function( string ){
        return i11n[this.language][string];
    },

    language: function(){

        var browserLanguage = navigator.language || navigator.userLanguage; 
        return browserLanguage.slice(0,2) || 'en';
    }()
};

function Funplate( options ){
    
    // default configuration for the funplate object.
    var config = {
        target:     options.target    || null,
        template:   options.template  || null,
        data:       options.data      || {},
        source:     options.source    || 'json',
        update:     options.update    || false,
        interval:   options.interval  || 10,
        fallback:   options.fallback  || null,
        language:   options.language  || 'en'
    };


    // public interface.
    return {

        config: config,

        // set a new target or use the default one.
        target: function( domElement ){

            // TODO: remove jQuery dependency
            if ( $(domElement).length ){
                config.target = domElement;
            }

            if ( !$( config.target ).length ) {
                log.error( helper.i11n( 'invalidTarget' )); 
                log.error( config.target + " not found." );
            }
            
            return this;            
        },

        template: function( template ){

        },

        data: function( dataObject ){
            
            log.debug( typeof dataObject );



            if ( dataObject ){
                config.data = dataObject;
            }

            return this;
        },

        render: function(){

            // TODO: remove jQuery dependency
            $( config.target ).html( config.data );

        },

        // what is this needed for?
        init: function(){
            // initially hide all funplates?
            //$("div[data-template").hide();

            log.info("funplate initialized. lets go...");
        },
        
        // what is this needed for?
        plot: function(){
            log.info("Try to plot template...");
        }
    };
};

var alertBox = function( msg ){
    if (msg.level === 'info'){ alert("info: " + msg.message);};
    if (msg.level === 'debug'){ alert("debug: " + msg.message);};
    if (msg.level === 'warn'){ alert("warn: " + msg.message);};
    if (msg.level === 'error'){ alert("error: " + msg.message);};
};

var smsLogger = function( msg ){
    if (msg.level === "error" ) {
        alert("Sending SMS with following content: " + msg.message );
    }
};
