import { forEach, forEachObject, unless, times, every, some, sortBy, sortByArg, once, memoize, arrayUtils, compose, curry, partial, composeN, pipelineN, MayBe, Either } from '../lib/es6-functional.js';
var request = require('sync-request');

var array = [1,2,3];
forEach(array,(data) => console.log(data)) //refereing to imported forEach

let object = {a: 1, b: 2};
forEachObject(object, (key, value) => { console.log(`${key}:${value}`); })

var array2 = [1,2,3,4,5,6,7];
forEach(array2, (number) => {
	unless((number % 2), () => { console.log(`${number} is even`); })
});

times(100, function (n) {
	unless((n % 2), () => { console.log(`${n} is even`); })
});


console.log('-->', some([NaN, NaN, 4], isNaN));


var people = [
 {firstname: "aaFirstName", lastname: "cclastName"},
 {firstname: "ccFirstName", lastname: "aalastName"},
 {firstname:"bbFirstName", lastname:"bblastName"}
];

//sortByArg(people, 'firstname');
//console.log(people);

people.sort(sortBy('firstname'));
console.log(people);


function greeting() { console.log('hi')};
let sayHi = once(greeting());

sayHi();
sayHi();
sayHi();
sayHi();
sayHi();

function factorial(n) {
	if (n === 1) {
		return 1;
	}

	return n * factorial(n-1);
}

function spell(string) {
	return string.split('');
}


function personProfile(objectPerson) {
	return objectPerson;
}

function reversed(array) {
	return array.reverse();
}


var oso = memoize(factorial);
var perro = memoize(factorial);

oso(5);
perro(5);
oso(5);

var myname = memoize(spell);
myname('diego');
myname('laura');
myname('diego');

var myProfile = memoize({ id:2332, name:'Diego'});

var arrayReversed = memoize(reversed);

arrayReversed([ 'd', 'i', 'e', 'g', 'o' ]);


var myArray = [1,2,3];
let apressBooks = [
 {
 "id": 111,
 "title": "C# 6.0",
 "author": "ANDREW TROELSEN",
 "rating": [4.7],
 "reviews": [{good : 4 , excellent : 12}]
 },
 {
 "id": 222,
 "title": "Efficient Learning Machines",
 "author": "Rahul Khanna",
 "rating": [4.5],
 "reviews": []
 },
 {
 "id": 333,
 "title": "Pro AngularJS",
 "author": "Adam Freeman",
 "rating": [4.0],
 "reviews": []
 },
 {
 "id": 444,
 "title": "Pro ASP.NET",
 "author": "Adam Freeman",
 "rating": [4.2],
 "reviews": [{good : 14 , excellent : 12}]
 }
];


var nameAuthor = arrayUtils.map(apressBooks, (x) => { return {'title': x.title,
															  'author': x.author
															 } 
													});
//console.log(nameAuthor);


var byRating = arrayUtils.filter(apressBooks, (book) => book.rating[0] > 4.5).map((book) => { return { 'title': book.title, 'author': book.author }});
//var ratingTitleAuthor = arrayUtils.map(byRating, (x) => { return { 'title': x.title, 'author': x.author }});
//console.log(ratingTitleAuthor);

//console.log(byRating);


let apressBooks2 = [
 	{	name : "beginners",
		bookDetails : [
			 { "id": 111,
			   "title": "C# 6.0",
			   "author": "ANDREW TROELSEN",
			   "rating": [4.7],
			   "reviews": [{good : 4 , excellent : 12}]
			 },
			{ "id": 222,
			  "title": "Efficient Learning Machines",
			  "author": "Rahul Khanna",
			  "rating": [4.5],
			  "reviews": []
			}
		 ]
	},
	{	name : "pro",
	 	bookDetails : [
	 		{ "id": 333,
			  "title": "Pro AngularJS",
			  "author": "Adam Freeman",
			  "rating": [4.0],
			  "reviews": []
	 		},
			{ "id": 444,
			  "title": "Pro ASP.NET",
			  "author": "Adam Freeman",
			  "rating": [4.2],
			  "reviews": [{good : 14 , excellent : 12}]
	 		}
	 	]
 	}
];

var bookDetails = arrayUtils.map(apressBooks2, (book) => book.bookDetails);
console.log(bookDetails);
console.log('------------------------------->');
var filteredBooks = arrayUtils.concatAll(bookDetails, function(books) {
	return arrayUtils.filter(books, (book) => book.rating[0] > 4.5);
});

console.log(filteredBooks);
console.log('------------------------------>');
let useless = [2,5,6,1,10];

var myreduce = arrayUtils.reduce(useless, (previous, current) => previous + current);
console.log(myreduce);

let apressBooks3 = [
	{	name : "beginners",
		bookDetails : [
			{   "id": 111,
				"title": "C# 6.0",
				"author": "ANDREW TROELSEN",
				"rating": [4.7],
				"reviews": [{good : 4 , excellent : 12}]
			},
			{	"id": 222,
				"title": "Efficient Learning Machines",
				"author": "Rahul Khanna",
				"rating": [4.5],
				"reviews": []
			}
		]
	},
	{	name : "pro",
		bookDetails : [
			{	"id": 333,
				"title": "Pro AngularJS",
				"author": "Adam Freeman",
				"rating": [4.0],
				"reviews": []
			},
			{	"id": 444,
				"title": "Pro ASP.NET",
				"author": "Adam Freeman",
				"rating": [4.2],
				"reviews": [{good : 14 , excellent : 12}]
			}
		]
	}
];
console.log('------------------------------>');
let proBooks = arrayUtils.filter(apressBooks3, (books) => books.name === 'pro');
console.log(proBooks);
console.log('------------------------------>');

let apressBooks5 = [
	 {	 name : "beginners",
		 bookDetails : [
			{  "id": 111,
				"title": "C# 6.0",
				"author": "ANDREW TROELSEN",
				"rating": [4.7]
			},
			{	"id": 222,
				"title": "Efficient Learning Machines",
				"author": "Rahul Khanna",
				"rating": [4.5],
				"reviews": []
			}
		]
	 },
	 {	 name : "pro",
	 	 bookDetails : [
	 	 	{ 	"id": 333,
				"title": "Pro AngularJS",
				"author": "Adam Freeman",
				"rating": [4.0],
				"reviews": []
	 		},
			{	"id": 444,
				"title": "Pro ASP.NET",
				"author": "Adam Freeman",
				"rating": [4.2]
	 		}
	 	]
	 }
];

let reviewDetails5 = [
	 {	"id": 111,
	 	"reviews": [{good : 4 , excellent : 12}]
	 },
	 {	"id" : 222,
	 	"reviews" : []
	 },
	 {	"id" : 333,
	 	"reviews" : []
	 },
	 {	"id" : 444,
	 	"reviews": [{good : 14 , excellent : 12}]
	 }
]

var mapBooksDetails = arrayUtils.map(apressBooks5, (book) => book.bookDetails);
var onlyBooksDetails = arrayUtils.concatAll(mapBooksDetails);
var zipArray = arrayUtils.zip(onlyBooksDetails, reviewDetails5, function(elem) {
	return arrayUtils.filter(elem, (elem) => elem.reviews && elem.reviews.length);
});
console.log(zipArray);

console.log('------------------------------>');
let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
const countWords = compose(count,splitIntoSpaces);
const output = countWords("hello your reading about composition");
console.log(output, 'compose');


console.log('------------------------------>');

var apressBooks6 = [
 {
 "id": 111,
 "title": "C# 6.0",
 "author": "ANDREW TROELSEN",
 "rating": [4.7],
 "reviews": [{good : 4 , excellent : 12}]
 },
 {
 "id": 222,
 "title": "Efficient Learning Machines",
 "author": "Rahul Khanna",
 "rating": [4.5],
 "reviews": []
 },
 {
 "id": 333,
 "title": "Pro AngularJS",
 "author": "Adam Freeman",
 "rating": [4.0],
 "reviews": []
 },
 {
 "id": 444,
 "title": "Pro ASP.NET",
 "author": "Adam Freeman",
 "rating": [4.2],
 "reviews": [{good : 14 , excellent : 12}]
 }
];

var filterOutStandingBooks = (book) => book.rating[0] === 5;
var filterGoodBooks = (book) => book.rating[0] > 4.5;
var filterBadBooks = (book) => book.rating[0] < 3.5;

var projectTitleAndAuthor = (book) => { return {title: book.title, author:book.author} }
var projectAuthor = (book) => { return {author:book.author} }
var projectTitle = (book) => { return {title: book.title} }

										/*  undefined because when the method stars
											we dont have the result form the first method executed(right method)
										    when it finished the result replace undefined ready to be an arg fot the left method 
										*/	

/* with curry approach
	var curryFilter = curry(function(array) {
		return function (condition) {
			return arrayUtils.filter(array, condition);
		}
	});

	var booksFiltered = curryFilter(apressBooks6);
	var booksFilteredBy = booksFiltered(filterGoodBooks);
	console.log(booksFilteredBy);
*/										

var queryGoodBooks = partial(arrayUtils.filter, undefined, filterGoodBooks);
var queryBadBooks = partial(arrayUtils.filter, undefined, filterBadBooks);
var mapTitleAndAuthor = partial(arrayUtils.map, undefined, projectTitleAndAuthor);
var mapTitle = partial(arrayUtils.map, undefined, projectTitle);

//var queryGoodBooksFiltered = curry(arrayUtils.filter)(filterGoodBooks);

var titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks)(apressBooks6);
var titleForBadBooks = compose(mapTitle, queryBadBooks)(apressBooks6);

console.log(titleForBadBooks);

console.log('------------COMPOSE MANY FUNCTIONS ------------------>');

var splitIntoSpaces2 = (str) => { str = str.toString(); return str.split(' ')};
var count2 = (array) => array.length;
var oddOrEven2 = (ip) => ip % 2 == 0 ? "even" : "odd";

const identityForDebug = (it) => {
 console.log(it);
 return it
}

var oddOrEvenWords = composeN(oddOrEven2, identityForDebug, count2, splitIntoSpaces2)('hello your reading about composition');
//var oddOrEvenWords = pipelineN(splitIntoSpaces2, count2, oddOrEven2)('hello your reading about composition');
console.log(oddOrEvenWords);

console.log('----------CHAPTER:  Functor as being nothing but a container with a map function implemented. ------------------');
console.log('----------------MAYBE------------------>');
let getTopTenSubRedditPosts = (type) => {
	let response;

	try{
		response = JSON.parse(request('GET',"https://www.reddit.com/r/subreddits/" + type + ".json?limit=10").getBody('utf8'))
	} catch(err) {
		response = { message: "Something went wrong" , errorCode: err['statusCode'] }
	}

	return response
}

let getTopTenSubRedditData = (type) => {
	let response = getTopTenSubRedditPosts(type);

	return MayBe.of(response).map((arr) => arr['data'])
							 .map((arr) => arr['children'])
							 .map((arr) => arrayUtils.map(arr, 
							 	(x) => {
							 		return {
							 			title: x['data'].title,
							 			url: x['data'].url
							 		}
							 	}	
							 ));			
} 

let cosa = getTopTenSubRedditData('unknown');
console.log(cosa);

console.log('--------------EITHER--------------->');

let getTopTenSubRedditPostsEither = (type) => {
	let response;

	try{
		response = Either.Some.of(JSON.parse(request('GET',"https://www.reddit.com/r/subreddits/" + type + ".json?limit=10").getBody('utf8')))
	} catch(err) {
		response = Either.Nothing.of({ message: "Something went wrong" , errorCode: err['statusCode'] })
	}
	return response
}

let getTopTenSubRedditDataEither = (type) => {
	let response = getTopTenSubRedditPostsEither(type);

	return response.map((arr) => arr['data'])
				   .map((arr) => arr['children'])
				   .map((arr) => arrayUtils.map(arr,
				   		(x) => {
								return { title : x['data'].title,
										 url : x['data'].url
										}
								}
					));
}

console.log(getTopTenSubRedditDataEither('new'));
console.log('--------------------------------->');
let searchReddit = (search) => {
	let response;

	try{
		response = JSON.parse(request('GET',"https://www.reddit.com/search.json?q=" + encodeURI(search)).getBody('utf8'))
	} catch(err) {
		response = { message: "Something went wrong" , errorCode: err['statusCode'] }
	}
	return response;
}

let getComments = (link) => {
	let response;

	try {
		response = JSON.parse(request('GET',"https://www.reddit.com/" +	link).getBody('utf8'));
	} catch(err) {
		response = { message: "Something went wrong" , errorCode: err['statusCode'] }
	}
	return response;
}

let mergeViaMayBe = ((searchText) => {
	let redditMayBe = MayBe.of(searchReddit(searchText));
	let ans = redditMayBe.map((arr) => arr['data']) 
						 .map((arr) => arr['children'])
						 .map((arr) => arrayUtils.map(arr, (x) => {
						 					return {
						 						title: x['data'].title,
						 						permalink: x['data'].permalink
						 					}
						 			   })
						 ).chain((obj) => arrayUtils.map(obj, (x) => {
						 					return {
						 						title: x.title,
						 						comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json")))
						 					}
						 			   })

						 )
	return ans;
})('functional programming');

console.log(mergeViaMayBe, 'xx>');
