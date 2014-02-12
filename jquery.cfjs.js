/*!
 * jQuery CFJS plugin
 * version 1.3.3 (12 FEB 2014)
 * @requires jQuery (http://jquery.com)
 *
 * Copyright (c) 2008 - 2013 Christopher Jordan
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 /**
 * Modified by Christopher Jordan (chris.s.jordan@gmail.com) from
 * code originally written (except where noted), and
 * published as-is and without license as LeftCorner.js by
 * Randy Anderson (randerson@leftcorner.com)
 *
 * I'd like to thank Randy for the work he put in on the library as
 * it was when I started working on it.
 *
 * Thanks Randy. :o)
 *
 */
jQuery.extend({
	_commafy: function(str){
		/* more code from Steve Levithan (http://blog.stevenlevithan.com/).
		* again slightly modified because Steve made this an extension of
		* the string object. Brilliant Steve, thanks! :o)
		*/
		return str.replace(/(\D?)(\d{4,})/g, function($0, $1, $2) { 
			return (/[.\w]/).test($1) ? $0 : $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, '$&,'); 
		}); 
	},
	_DimensionCount: function(a){
		var c=0,i;
		for(i = 0; i < a.length; i += 1){
			if(a[i].constructor === Array){
				c++;
			}
		}
		return c;
	},
	Abs: function(n){
		return Math.abs(n);
	},
	ArrayAppend: function(a, v){
		return a.push(v);
	},
	ArrayPrepend: function(a, v){
		return a.unshift(v);
	},
	ArraySort: function(a,st,so){
		var _so;
		if (st.toUpperCase() === 'TEXTNOCASE'){
			if(!so || so.toUpperCase() !== "DESC"){
				_so = function(a, b) {a = a.toUpperCase(); b = b.toUpperCase(); if (a < b){return -1;} else if(a > b){return 1;} else {return 0;}};
			} else {
				_so = function(a, b) {a = a.toUpperCase(); b = b.toUpperCase(); if (a > b){return -1;} else if(a < b){return 1;} else {return 0;}};
			}
		} else if (st.toUpperCase() === 'TEXT'){
			if(!so || so.toUpperCase() !== "DESC"){
				_so = function(a, b) {if (a < b){return -1;} else if(a > b){return 1;} else {return 0;}};
			} else {
				_so = function(a, b) {if (a > b){return -1;} else if(a < b){return 1;} else {return 0;}};
			}
		} else if (st.toUpperCase() === 'NUMERIC'){
			if(!so || so.toUpperCase() !== "DESC"){
				_so = function(a,b) {return a - b;};
			} else {
				_so = function(a,b) {return b - a;};
			}
		}
		return a.sort(_so);
	},
	ArrayToList: function(a,d){
		if(!d){d = ",";}
		return a.join(d);
	},
	ArrayLen: function(a){
		return a.length;
	},
	Ceiling: function(n){
		return Math.ceil(n);
	},
	Compare: function(s1,s2){
		if (s1 === s2) {return 0;}
		if (s1 > s2) {return 1;}
		else {return -1;}
	},
	CompareNoCase: function(s1,s2){
		return this.Compare(s1.toUpperCase(),s2.toUpperCase());
	},
	CreateDate: function(y,m,d){
		var rd = new Date('01/01/1970');
		rd.setFullYear(y);
		rd.setMonth(m-1);
		rd.setDate(d);
		rd.setHours(0);
		rd.setMinutes(0);
		rd.setSeconds(0);
		return rd;
	},
	CreateDateTime: function(y,m,d,h,n,s){
		var rd = new Date('01/01/1970');
		rd.setFullYear(y);
		rd.setMonth(m-1);
		rd.setDate(d);
		rd.setHours(h);
		rd.setMinutes(n);
		rd.setSeconds(s);
		return rd;
	},
	CreateTime: function(h,n,s){
		var rd = new Date('01/01/1970');
		rd.setHours(h);
		rd.setMinutes(n);
		rd.setSeconds(s);
		return rd;
	},
	CreateODBCDate: function(d){
		var year,month,day,error="invalid date object";
		if(isNaN(Date.parse(d))){return error;}
		year	= d.getFullYear();
		month	= d.getMonth() + 1;// because it returns 0 - 11 not 1 - 12
		month	= (month < 10)?"0"+month:month;
		day		= d.getDate();
		day		= (day < 10)?"0"+day:day;
		return "{d '" + year + "-" + month + "-" + day + "'}";
	},
	CreateODBCDateTime: function(d){
		var year,month,day,hours,minutes,seconds,error = "invalid date object";
		if(isNaN(Date.parse(d))){return error;}
		year	= d.getFullYear();
		month	= d.getMonth() + 1;// because it returns 0 - 11 not 1 - 12
		month	= (month < 10)?"0"+month:month;
		day		= d.getDate();
		day		= (day < 10)?"0"+day:day;
		hours	= d.getHours();
		minutes	= d.getMinutes();
		seconds	= d.getSeconds();
		return "{ts '" + year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "'}";
	},
	CreateODBCTime: function(d){
		var hours,minutes,seconds,error = "invalid date object";
		if(isNaN(Date.parse(d))){return error;}
		hours	= d.getHours();
		minutes	= d.getMinutes();
		seconds	= d.getSeconds();
		return "{t '" + hours + ":" + minutes + ":" + seconds + "'}";
	},
	DateAdd:function(p,n,d){
		if(!(d instanceof Date)){
			d = new Date(d);
		}
		switch(p.toLowerCase()){
			case 'yyyy':	// year
				return new Date(d.getFullYear()+n,d.getMonth(),d.getDate());
			case 'q':		// quarter
				return new Date(d.getFullYear(),d.getMonth()+(n*3),d.getDate());
			case 'm':		// day of year
				return new Date(d.getFullYear(),d.getMonth()+n,d.getDate());
			case 'd':		// day
				return new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
			case 'w':		// weekday
				return d; // not yet implemented
			case 'ww':		// week (7 days)
				return new Date(d.getFullYear(),d.getMonth(),d.getDate()+(n*7));
			default:
				return d;
		}
	},
	DateDiff: function(dp,d1,d2){
		var iDiff,nWeeks,nDays,nHours,nMinutes,nSeconds,nMilliseconds,nQuarters,nMonths,nYears,dtDiff,iDiffMS,dt1=new Date(d1),dt2 = new Date(d2);
		iDiffMS	= dt2.valueOf() - dt1.valueOf();
		dtDiff	= new Date(iDiffMS);
		nYears	= dt2.getUTCFullYear() - dt1.getUTCFullYear();
		nMonths	= dt2.getUTCMonth() - dt1.getUTCMonth() + (nYears!==0 ? nYears*12 : 0);
		nQuarters = nMonths / 3;
		nMilliseconds = iDiffMS;
		nSeconds = iDiffMS / 1000;
		nMinutes = nSeconds / 60;
		nHours	= nMinutes / 60;
		nDays	= nHours / 24;
		nWeeks	= nDays / 7;
		iDiff	= 0;
		switch(dp.toLowerCase()){
			case "yyyy": return nYears;
			case "q": return nQuarters;
			case "m": return nMonths;
			case "y": return nDays;
			case "d": return nDays;
			case "w": return nDays;
			case "ww":return nWeeks;
			case "h": return nHours;
			case "n": return nMinutes;
			case "s": return nSeconds;
			case "ms":return nMilliseconds;
			default: return "invalid interval: '" + dp + "'";
		}
	},
	DateFormat: function(d, mask) {
		// DateFormat slightly modified from code by Steve Levithan (http://blog.stevenlevithan.com/)
		// date (d) is now being passed in since this isn't an extension of the date object.
		// var d = this; // Needed for the replace() closure
		
		var m,zeroize;

		// we're expecting d to be a javascript date object, but if it's not then we'll assume it's a string
		// representation of a date and attempt to convert that string into a date object
		if(!(d instanceof Date)){
			d = new Date(d);
		}

		// If preferred, zeroise() can be moved out of the format() method for performance and reuse purposes
		zeroize = function (value, length) {
			var i;
			if(!length){length = 2;}
			value = String(value);
			for(i = 0, zeros = ''; i < (length - value.length); i++){
				zeros += '0';
			}
			return zeros + value;
		};

		return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
			switch($0) {
				case 'd':		return d.getDate();
				case 'dd':		return zeroize(d.getDate());
				case 'ddd':		return ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'][d.getDay()];
				case 'dddd':	return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
				case 'm':		return d.getMonth() + 1;
				case 'mm':		return zeroize(d.getMonth() + 1);
				case 'mmm':		return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
				case 'mmmm':	return ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()];
				case 'yy':		return String(d.getFullYear()).substr(2);
				case 'yyyy':	return d.getFullYear();
				case 'h':		return d.getHours() % 12 || 12;
				case 'hh':		return zeroize(d.getHours() % 12 || 12);
				case 'H':		return d.getHours();
				case 'HH':		return zeroize(d.getHours());
				case 'M':		return d.getMinutes();
				case 'MM':		return zeroize(d.getMinutes());
				case 's':		return d.getSeconds();
				case 'ss':		return zeroize(d.getSeconds());
				case 'l':		return zeroize(d.getMilliseconds(), 3);
				case 'L':		m = d.getMilliseconds();
								if(m > 99){m = Math.round(m / 10);}
								return zeroize(m);
				case 'tt':		return d.getHours() < 12 ? 'am' : 'pm';
				case 't':		return d.getHours() < 12 ? 'a' : 'p';
				case 'TT':		return d.getHours() < 12 ? 'AM' : 'PM';
				case 'T':		return d.getHours() < 12 ? 'A' : 'P';
				case 'Z':		return d.toUTCString().match(/[A-Z]+$/);
				// Return quoted strings with the surrounding quotes removed
				default:		return $0.substr(1, $0.length - 2);
			}
		});
	},
	DatePart: function(dp, d){
		var d1,m,day;
		switch(dp){
			case "yyyy":
				return d.getFullYear();
			case "q":
				m = d.getMonth() + 1;
				switch(m){
					case 1:
					case 2:
					case 3:
						return 1;
					case 4:
					case 5:
					case 6:
						return 2;
					case 7:
					case 8:
					case 9:
						return 3;
					case 10:
					case 11:
					case 12:
						return 4;
				}
                break;
			case "m":
				m = d.getMonth() + 1;// because it returns 0 - 11 not 1 - 12
				m = (m<10)?"0"+m:m;
				return m;
			case "y":
				//y: Day of year
				d1 = this.CreateDate(d.getFullYear(), 1, 1);
				return Math.ceil(this.DateDiff("d", d1, d));
			case "d":
				day	= d.getDate();
				day = (day<10)?"0"+day:day;
				return day;
			case "w":
				return d.getDay() + 1;
			case "ww":
				//ww: Week of year
				d1 = this.CreateDate(d.getFullYear(), 1, 1);
				return Math.round(this.DateDiff("d", d1, d)/7);
			case "h":
				return d.getHours();
			case "n":
				return d.getMinutes();
			case "s":
				return d.getSeconds();
			case "l":
				return d.getMilliseconds();
		}
	},
    Day: function(d){
        if(!(d instanceof Date)){
            d = new Date(d);
        }
        return d.getDate();
    },
    DayOfWeek: function(d){

        if(!(d instanceof Date)){
            d = new Date(d);
        }
        return d.getDay() + 1;
    },
    DayOfWeekAsString: function(d){
        /* we will assume that d will be a number from 1 to 7 (not 0 to 6) */
        var aDays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        return aDays[d - 1];
    },
	DaysInMonth: function(m,y){
		/* Thanks to Charlie (http://snippets.dzone.com/user/Charlie) over at dzone for this code.
		 * Only slightly modified from the sample found at http://snippets.dzone.com/posts/show/2099
		 * such that the caller does *NOT* have to pass in the zero based month (0 = Jan, 1 = Feb, etc.)
		 * Instead, 1=January, 2=February, etc.
		 */
		return 32 - new Date(y, (m-1), 32).getDate();
	},
	DecimalFormat: function(n){
		return this._commafy(Number(n).toFixed(2));
	},
	DollarFormat: function(n) {
		var _n,sign,cents;
		_n = n.toString().replace(/\$|\,/g,'');
		_n = _n.toString().replace('(','-');
		_n = _n.toString().replace(')','');
		if(isNaN(_n)){
			_n = 0;
		}
		sign = (_n === (_n = Math.abs(n)));
			_n = Math.floor(_n*100+0.50000000001);
		cents = _n%100;
			_n = Math.floor(_n/100).toString();
		if(cents < 10){
			cents = "0" + cents;
		}
		_n += "." + cents;
		_n = this._commafy(_n);
		return (((sign)?'':'(') + '$' + _n + ((sign)?'':')'));
	},
	Find: function(sb,s){
        return s.toString().indexOf(sb) + 1;
	},
	FindNoCase: function(sb,s){
		return this.Find(sb.toUpperCase(),s.toUpperCase());
	},
    Hour: function(d){

        if(!(d instanceof Date)){
            d = new Date(d);
        }
        return d.getHours();
    },
	HTMLCodeFormat: function(s){
		return '<pre>' + this.HTMLEditFormat(s) + '</pre>';
	},
	HTMLEditFormat: function(s){
		var my = {};
		s += ''; // cheap way to ensure that s is string
		my.sf = '';
		for(my.i = 0; my.i < s.length; my.i++){
			my.c = s.slice(my.i, my.i+1);
			switch(my.c){
				case '"':
					my.c = '&quot;';
					break;
				case '&':
					my.c = '&amp;';
					break;
				case '>':
					my.c = '&gt;';
					break;
				case '<':
					my.c = '&lt;';
					break;
				default:
					break;
			}
			my.sf += my.c;
		}
		return my.sf;
	},
	Insert: function(sb,s,p){
		s += "";
		return s.slice(0, p) + sb + s.slice(p, s.length);
	},
	IsArray: function(a,dim){
		if(dim){
			nod = this._DimensionCount(a);
			if(nod === dim){
				return true;
			}
			return false;
		}
		if(a.constructor === Array){
			return true;
		}
		return false;
	},
	IsBoolean: function(v){
		if(v.constructor === Boolean){
			return true;
		}
		return false;
	},
	IsDate: function(d){
		var datePat,matchArray,month,day,year,isleap;
		datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
		matchArray = d.toString().match(datePat);
		if (matchArray === null) {
			return false;
		}
		month = matchArray[1];
		day = matchArray[3];
		year = matchArray[5];
		isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
		if (month < 1 || month > 12) {
			return false;
		}
		if (day < 1 || day > 31) {
			return false;
		}
		if ((month===4 || month===6 || month===9 || month===11) && day===31) {
			return false;
		}
		if (month === 2) {
			if (day > 29 || (day===29 && !isleap)) {
				return false;
			}
		}
		return true;
	},
	IsDefined: function(o){
		if(typeof o !== "undefined"){return true;}
		return false;
	},
	IsLeapYear: function(y){
		if((y/4)   !== Math.floor(y/4)){return false;}
		if((y/100) !== Math.floor(y/100)){return true;}
		if((y/400) !== Math.floor(y/400)){return false;}
		return true;
	},
	IsNumeric: (function(s){
		//because jquery is now providing their own version of isNumeric as of jq1.7
		return jQuery.isNumeric || 
		function(s) {
			return !isNaN(parseFloat(s)) && isFinite(s);
		};
	})(),
	IsSimpleValue: function(v){
		if(this.IsString(v)){return true;}
		if(this.IsNumeric(v)){return true;}
		if(this.IsBoolean(v)){return true;}
		if(this.IsDate(v)){return true;}
		return false;
	},
	IsString: function(s){
		if(s.constructor === String){return true;}
		return false;
	},
	IsStruct: function(s){
		if(s.constructor === Object){return true;}
		return false;
	},
	IsValid: function(t,v,r,m){
		var i,digit,sum=0;
		t = t.toLowerCase();
		switch(t){
			case "any": return this.IsSimpleValue(v);
			case "array": return this.IsArray(v);
			case "date": return this.IsDate(v);
			case "boolean": return this.IsBoolean(v);
			case "email": return this.IsValid("regex",v,/(^[a-z0-9]([\-a-z_\.0-9]*)@([\-a-z_\.0-9]*)([.][a-z]{2,6})$)/i);
			case "eurodate": return this.IsDate(v);
			case "float": return this.IsNumeric(v);
			case "guid": return this.IsValid("regex",v,/(^[0-9-a-fA-F]{8}-([0-9-a-fA-F]{4}-){3}[0-9-a-fA-F]{12}$)/);
			case "integer": return this.IsValid("regex",v,/(^-?\d\d*$)/);
			case "numeric": return this.IsNumeric(v);
			case "range": return (((v) >= r) && ((v) <= m))? true:false;
			case "regex": return v.toString().match(r) ? true:false;
			case "regular_expression": return this.IsValid("regex",v,r);
			case "social_security_number": return this.IsValid("ssn",v);
			case "ssn": return this.IsValid("regex",v,/^([0-6]\d{2}|7[0-6]\d|77[0-2])([ \-]?)(\d{2})\2(\d{4})$/);
			case "string": return this.IsString(v);
			case "struct": return this.IsStruct(v);
			case "telephone": return this.IsValid("regex",v,/^(\([1-9]\d{2}\)\s?|[1-9]\d{2}[\.\-])?\d{3}[\.\-]\d{4}$/);
			case "time": return this.IsDate(v);
			case "url": return this.IsValid("regex",v,/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i);
			case "uuid": return this.IsValid("regex",v,/(^[0-9-a-fA-F]{8}-([0-9-a-fA-F]{4}-){2}[0-9-a-fA-F]{15}$)/);
			case "variablename": return this.IsValid("regex",v,/(^[a-zA-Z_][0-9a-zA-Z_]*$)/);
			case "zipcode": return this.IsValid("regex",v,/(^\d{5}$)|(^\d{5}-\d{4}$)/);
			case "creditcard": 
				if(!this.IsValid("range",v.length,13,16)){return false;}
				for (i=(2-(v.length % 2)); i<=v.length; i+=2){
					sum += parseInt(v.charAt(i-1),10);
				}
				for (i=(v.length % 2) + 1; i<v.length; i+=2){
					digit = parseInt(v.charAt(i-1),10) * 2;
					sum += (digit < 10)? digit : (digit-9); 
				}
				return ((sum % 10) === 0) ? true : false;			
		}
	},
	LCase: function(s){
		s += "";
		return s.toLowerCase();
	},
	Left: function(s,c){
		s += "";
		return s.slice(0, c);
	},
	Len: function(s){
		s += "";
		return s.length;
	},
	ListAppend: function(l, v, d){
		var r='';
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		if (this.ListLen(l)){
			r = l + d + v;
		} else {
			r = v;
		}
		return r;
	},
	ListChangeDelims: function(l, nd, od){
		var spc = "^,$,|,.,+,*,?,\,/",re;
		l += ''; // cheap way to convert to a string
		if(!od){od=',';}
		if(this.ListFind(spc,od)){od="\\"+od;}
		re = new RegExp(od,"gi");
		return l.replace(re,nd);
	},
	ListContains: function(l, sb, d){
		var spc = "^,$,|,.,+,*,?,\,/",re,i;
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		if(this.ListFind(spc,sb)){sb="\\"+sb;}
		l = l.split(d);
		re = new RegExp(sb,"g");
		for(i=0; i<l.length;i++){
			if(re.test(l[i])){return true;}
		}
		return false;
	},
	ListContainsNoCase: function(l, sb, d){
		var spc = "^,$,|,.,+,*,?,\,/",re,i;
		l += ''; // cheap way to convert to a string
		if(!d){d=",";}
		if(this.ListFind(spc,sb)){sb="\\"+sb;}
		l = l.split(d);
		re = new RegExp(sb,"gi");
		for(i=0; i<l.length;i++){
			if(re.test(l[i])){return true;}
		}
		return false;
	},
	ListDeleteAt: function(l, p, d){
		var i,posInList,r='',thisD='',posInArray = p - 1;
		l += ''; // cheap way to convert to a string
		if(!d){d = ",";}
		for(i = 0; i < l.split(d).length; i++){
			if (i !== posInArray){
				posInList = i + 1;
				if (r.length){
					thisD = d;
				}
				r += thisD + this.ListGetAt(l, posInList, d);
			}
		}
		return r;
	},
	ListFind: function (l,v,d){
		var i,r=0,listToArray;
		l += ''; // cheap way to convert to a string
		if(!d){d = ',';}
		listToArray = l.split(d);
		for (i=0; i < listToArray.length; i++){
			if (listToArray[i] === v){
				r = i + 1;
				break;
			}
		}
		return r;
	},
	ListFindNoCase: function(l,v,d){
		l += ''; // cheap way to convert to a string
		if(!d){d = ",";}
		return this.ListFind(l.toUpperCase(), v.toUpperCase(), d);
	},
	ListFirst: function(l,d){
		l += ''; // cheap way to convert to a string
		if(!d){d = ",";}
		return l.split(d)[0];
	},
	ListGetAt: function (l, p, d){
		l += ''; // cheap way to convert to a string
		if(!d){d = ",";}
		return l.split(d)[p - 1];
	},
	ListInsertAt: function(l, p, v, d){
		var a;
		l += ''; // cheap way to convert to a string
		if(!d){d=",";}
		l = l.split(d);
		if(p===0){
			l.unshift(v);
		}
		else{
			a = l.splice(p);
			l.push(v);
			l = l.concat(a);
		}
		return this.ListChangeDelims(l.toString(), d, ',');
	},
	ListLast: function(l,d){
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		l = l.split(d);
		return l[l.length - 1];
	},
	ListLen: function(l,d){
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		if(l.length){return l.split(d).length;}
		return 0;
	},
	ListPrepend: function(l, v, d){
		var r='';
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		if (this.ListLen(l)){
			r = v + d + l;
		} else {
			r = v;
		}
		return r;
	},
	ListRest: function(l,d){
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		l = l.split(d);
		l.splice(0,1);
		l=(l.length)?this.ArrayToList(l,d):'';
		return l;
	},
	ListSetAt: function(l, p, v, d){
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		l = l.split(d);
		l[p-1] = v;
		return this.ListChangeDelims(l.toString(), d, ',');
	},
	ListSort: function(l, st, so, d){
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		l = l.split(d);
		l = this.ArraySort(l, st, so);
		return this.ListChangeDelims(l.toString(), d, ',');
	},
	ListToArray: function(l,d){
		l += ''; // cheap way to convert to a string
		var r,a;
		if(!d){d=',';}
		r = [];
		a = l.split(d);
		return a;
	},
	ListValueCount: function(l, v, d){
		var c = 0,i; // count
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		l = l.split(d);
		for(i = 0; i < l.length; i++){
			if(l[i] === v){c++;}
		}
		return c;
	},
	ListValueCountNoCase: function(l, v, d){
		var c = 0,i; // count
		l += ''; // cheap way to convert to a string
		if(!d){d=',';}
		l = l.split(d);
		for(i = 0; i < l.length; i++){
			if(l[i].toUpperCase() === v.toUpperCase()){c++;}
		}
		return c;
	},
	LTrim: function(s){
		s += '';
		if(s.length){return s.replace(/^\s*/, '');}
		return '';
	},
	Mid: function(s, start, c){
		s += '';
		start -= 1;
		return s.slice(start,start + c);
	},
    Minute: function(d){

        if(!(d instanceof Date)){
            d = new Date(d);
        }
        return d.getMinutes();
    },
    Month: function(d){

        if(!(d instanceof Date)){
            d = new Date(d);
        }
        return d.getMonth() + 1;

    },
    MonthAsString: function(m){
        /* we will assume that m is a month number between 1 and 12 (not 0 and 11). */
        var aMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return aMonths[m - 1];
    },
	Pad: function(s, n, pc, pd){
		var sl,pl;
		if(arguments.length <= 3){pd='R';}
		if(arguments.length <= 2){pc=' ';}
		if(arguments.length <= 1){n=10;}
		if(arguments.length === 0){s='';}
		sl = s.length;
		pl = n - sl;
		if(sl >= n){return s;}
		if(pd === 'R' || pd === 'Right'){return s + this.RepeatString(pc, pl);}
		return this.RepeatString(pc, pl) + s;
	},
	RandRange: function(n,n2){
		return Math.floor(Math.random()*(n2-n+1))+n;
	},
	RepeatString: function(s,n){
		var rs='',i;
		for(i = 1; i <= n; i++){
			rs += s;
		}
		return rs;
	},
	ReReplace: function(s1,p,s2,g){
		var r;
		if(p instanceof RegExp){
			r = p;
		}
		else{
			if(g === undefined || g.toLowerCase() === 'one'){
				r = new RegExp(p);
			}
			else if(g.toLowerCase() === 'all'){
				r = new RegExp(p,'g');
			}
			else{
				throw new Error('Error: ' + g + ' is an invalid scope. Use "one" (default if omitted) or "all".');
			}
		}
		if(typeof(s1) !== 'string'){
			throw new Error('Error: ' + s1 + ' is not a string.');
		}
		return s1.replace(r,s2);
	},
	ReReplaceNoCase: function(s1,p,s2,g){
		var r;
		if(p instanceof RegExp){
			r = p;
		}
		else{
			if(g === undefined || g.toLowerCase() === 'one'){
				r = new RegExp(p,'i');
			}
			else if(g.toLowerCase() === 'all'){
				r = new RegExp(p,'gi');
			}
			else{
				throw new Error('Error: ' + g + ' is an invalid scope. Use "one" (default if omitted) or "all".');
			}
		}
		if(typeof(s1) !== 'string'){
			throw new Error('Error: ' + s1 + ' is not a string.');
		}
		return s1.replace(r,s2);
	},
	Replace: function(s,sb1,sb2,sc){
		var re;
		s += '';
		if(!sc || sc.toUpperCase() !== 'ALL'){
			sc = '';
		} else {
			sc ='g';
		}
		re = new RegExp(sb1,sc);
		return s.replace(re,sb2);
	},
	ReplaceNoCase: function(s,sb1,sb2,sc){
		var re;
		s += '';
		if(!sc || sc.toUpperCase() !== 'ALL'){
			sc = 'i';
		} else {
			sc = 'gi';
		}
		re = new RegExp(sb1,sc);
		return s.replace(re,sb2);
	},
	Reverse: function(s){
		var i,r;
		s += '';
		r = '';
		for (i = s.length; 0 <= i; i--){
			r += s.charAt(i);
		}
		return r;
	},
	Right: function(s,c){
		s += '';
		return s.slice(s.length - c, s.length);
	},
	Round: function(n,p) {
		if(!p){return Math.round(parseFloat(n));}
		return Math.round(parseFloat(n)*Math.pow(10,p))/Math.pow(10,p);
	},
	RTrim: function(s){
		s += '';
		if(s.length){return s.replace(/\s*$/, '');}
		return '';
	},
    Second: function(d){

        if(!(d instanceof Date)){
            d = new Date(d);
        }
        return d.getSeconds();
    },
    StructKeyArray: function(s){
		var k,a=[];
		for(k in s){
			if (s.hasOwnProperty(k)) {
				a.push(k);
			}
		}
		return a;
	},
	StructKeyExists: function(s,k){
		return !!s[k];
	},
	StructKeyList: function(s,d){
		var k,a='';
		if(!d){d=',';}
		for(k in s){
			if (s.hasOwnProperty(k)) {
				a = this.ListAppend(a, k, d);
			}
		}
		return a;
	},
	TimeFormat: function(t,m){
		return this.DateFormat(t,m);
	},
	Trim: function(s){
		s += '';
		if(s.length){return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');}
		return '';
	},
	UCase: function(s){
		return s.toString().toUpperCase();
	},
	URLDecode: function(s){
		return unescape(s);
	},
	URLEncodedFormat: function(s){
		return encodeURI(s);
	},
	Val: function(s){
		var p = /^\s*[+\-]?[0-9\.]+/, a = s.match(p);
		if(a === null){
			return 0;
		}
		else{
			return parseFloat(a[0],10);
		}
	},
    Year: function(d){

        if(!(d instanceof Date)){
            d = new Date(d);
        }
        return d.getFullYear();
    }
});