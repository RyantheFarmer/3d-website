var $fd = (function() {
	'use strict';
	var formdata;
	var formdataArray = {
		text:[],
		files:[]
	};
	function cleanArray(actual) {
		var newArray = [];
		for(var i = 0; i < actual.length; i++)
			if (actual[i]) newArray.push(actual[i]);
		return newArray;
	}
	return {
		addFile : function(key, value, filename) {
			formdataArray.files.forEach(function(e,i) {
				if(e[0]===key) return false;
			});
			formdataArray.files.push([key,value,filename]);
			return true;
		},
		removeFile : function(key) {
			formdataArray.files.forEach(function(e,i) {
				if(e[0]===key) formdataArray[i] = null;
			});
			formdataArray.files = cleanArray(formdataArray.files);
		},
		addText : function(key,value) {
			formdataArray.text.forEach(function(e,i) {
				if(e[0]===key) return false;
			});
			formdataArray.text.push([key,value]);
			return true;
		},
		removeText : function(key) {
			formdataArray.text.forEach(function(e,i) {
				if(e[0]===key) formdataArray[i] = null;
			});
			formdataArray.text = cleanArray(formdataArray.text);
		},
		getFormdata : function() {
			formdata = null;
			formdata = new FormData();
			formdataArray.text.forEach(function(e) {
				formdata.append(e[0],e[1]);
			});
			formdataArray.files.forEach(function(e) {
				formdata.append(e[0],e[1],e[2]);
			});
			return formdata;
		},
		toString : function() {
			return JSON.stringify(formdataArray);
		},
		toJSON : function() {
			return formdataArray;
		},
		clear : function() {
			formdata = null;
			formdataArray = null;
			formdataArray = {
				text:[],
				files:[]
			};
		}
	};
});
