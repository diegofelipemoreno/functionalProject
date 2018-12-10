const unless = (condition, fn) => {
	if (!condition) {
		fn();
	}
}

const times = (times, fn) => {
	for (var i = 0; i < times; i++) {
		fn(i);
	}
}

const every = (array, fn) => {
	let result = true;

	for(let value of array)	{
		if(!fn(value)) {
			result = false;
		} 
	}
	return result;
}

const some = (array, fn) => {
	let result = false;

	for(let value of array)	{
		if(!fn(value)) {
			result = true;
		} 
	}
	return result;
}

/*
const tap = (value) =>
 (fn) => {
 if (typeof(fn) === 'function') {
 	fn(value);
    console.log(value);
  }
 }
*/

const curryExample = (binaryFn) => {
   return function (firstArg) {
       return function (secondArg) {
         return binaryFn(firstArg, secondArg);
       }
   }    
}

const MayBe = function (val) {
			  this.value = val;
			}

	MayBe.of = function(val) {
	             return new MayBe(val);
	           }

	MayBe.prototype.isNothing = function() {
		return (this.value === null || this.value === undefined);
	}

	MayBe.prototype.map =  function(fn) {
		return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
	}

	MayBe.prototype.join = function() {
	 return this.isNothing() ? MayBe.of(null) : this.value;
	}

	MayBe.prototype.chain = function(fn){
	 return this.map(fn).join();
	}

const Nothing = function(val) {
	this.value = val;
};

	Nothing.of = function(val) {
	 return new Nothing(val);
	};
	Nothing.prototype.map = function(f) {
	 return this;
	};

const Some = function(val) {
	this.value = val;
};

	Some.of = function(val) {
		return new Some(val);
	};
	Some.prototype.map = function(fn) {
		return Some.of(fn(this.value));
	}

const Either = {
	Some : Some,
	Nothing: Nothing
}

//-----------------------------------------

const forEach = (array, fn) => {
	let i;

	for(i = 0; i < array.length; i++) {
		fn(array[i]);
	}
}

const forEachObject = (obj, fn) => {
	for(var property in obj) {
		
		if (obj.hasOwnProperty(property)) {
			fn(property, obj[property]);
		}
	}	
}

const sortByArg = (array, sortByArg) => {
	
	array.sort((a, b) => { 
		if (a.hasOwnProperty(sortByArg) && b.hasOwnProperty(sortByArg)) {
			return a[sortByArg] > b[sortByArg];
		}
	});

	return array;
}

const sortBy = (property) => {
    // console.log(people); --> scope, remember the array people  
    return (a, b) => {
        return a[sortByArg] > b[sortByArg];;
    }
}

const once = (fn) => {
	let done = false;

	return function () {
		if(!done) {
			done = true;
			return fn;
		}
	}
}  

const memoize = (fn) => {
	let cache = {};

	return function (arg) {

		if (cache[arg]) {
			console.log('Data fetched' , cache[arg], cache);
			return cache[arg];
		} else { 
			cache[arg] = fn(arg);
			console.log('Data saved' , cache[arg], cache);
			return cache[arg];
		}
	}
}

const arrayUtils = {
	map: (array, fn) => array.map(fn),
	filter: (array, fn) => array.filter(fn),
	reduce: (array, fn) => array.reduce((previous, current) => {
		return fn(previous, current);
	}),
	concatAll: (array, fn) => {
		let results = [];

		(function _looper(array) {

			for(const value of array) {

				if ('Array' === value.constructor.name) {
					_looper(value);
				} else {
					results.push(value);
				}
			}
		})(array);

		if (fn) {
			return fn(results);
		} else {
			return results;
		}
	},
	zip: (array1, array2, fn) => {
		let finalArray = [];

		array1.forEach(elem => { finalArray.push(elem)});
		array2.forEach(elem => { finalArray.push(elem)});
		return fn(finalArray);
	}
}

const curry =(fn) => {
	if(typeof fn!=='function'){
		throw Error('No function provided');
	}

	return function curriedFn(...args){
		return fn.apply(null, args);
	};
};

const partial = function (fn,...partialArgs){
	let args = partialArgs;
	return function(...fullArguments) {
		let arg = 0;
		for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
			if (args[i] === undefined) {
				args[i] = fullArguments[arg++];
			}
		}
		return fn.apply(null, args);
	};
};

const compose = (fn1, fn2) => (arg) => fn1(fn2(arg))
 /*
 var compose1 = function(fn1, fn2) {
 					return function (arg) {
 						let restulFn2 = fn2(arg);
 						return fn1(restulFn2);
                     }
 			   }
 */

const composeN = (...fns) => (value) => fns.reverse().reduce((previous, actual) => actual(value), value); 						
/*
const composeN = function (...fns) {
 	fns.reverse();
 	
 	return function (value) {

 		return fns.reduce(function(previous, actual) {
 			return actual(value);
 		}, value);
     }
 }
*/


const pipelineN = (...fns) => (value) => fns.reduce((previous, actual) => actual(value), value); 						
/*
const composeN = function (...fns) {
 	
 	return function (value) {

 		return fns.reduce(function(previous, actual) {
 			return actual(value);
 		}, value);
     }
 }
*/

export {forEach, forEachObject, unless, times, every, some, sortBy, sortByArg, once, memoize, arrayUtils, compose, composeN, pipelineN, partial, curry, MayBe, Either};