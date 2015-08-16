var $pfd = (function() {
	'use strict';
	var priz_formdata;
	var priz_formdata_array = {
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
		add_file : function(key, value, filename) {
			priz_formdata_array.files.forEach(function(e,i) {
				if(e[0]===key) return false;
			});
			priz_formdata_array.files.push([key,value,filename]);
			return true;
		},
		remove_file : function(key) {
			priz_formdata_array.files.forEach(function(e,i) {
				if(e[0]===key) priz_formdata_array[i] = null;
			});
			priz_formdata_array.files = cleanArray(priz_formdata_array.files);
		},
		add_text : function(key,value) {
			priz_formdata_array.text.forEach(function(e,i) {
				if(e[0]===key) return false;
			});
			priz_formdata_array.text.push([key,value]);
			return true;
		},
		remove_text : function() {
			priz_formdata_array.text.forEach(function(e,i) {
				if(e[0]===key) priz_formdata_array[i] = null;
			});
			priz_formdata_array.text = cleanArray(priz_formdata_array.text);
		},
		get_formdata : function() {
			priz_formdata = null;
			priz_formdata = new FormData();
			priz_formdata_array.text.forEach(function(e) {
				priz_formdata.append(e[0],e[1]);
			});
			priz_formdata_array.files.forEach(function(e) {
				priz_formdata.append(e[0],e[1],e[2]);
			});
			return priz_formdata;
		},
		toString : function() {
			return JSON.stringify(priz_formdata_array);
		},
		toJSON : function() {
			return priz_formdata_array;
		},
		clear : function() {
			priz_formdata = null;
			priz_formdata_array = null;
			priz_formdata_array = {
				text:[],
				files:[]
			};
		}
	};
});
