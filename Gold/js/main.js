

// this works to dynamically populate the genre group!
var bandType = ["--choose a genre--", "rock", "metal", "country", "classical", "rap", "kids", "jazz", "other"];

var myElement = document.getElementById("groups");

for(var i = 0; i < bandType.length; i++)
{
	var myNewElement = document.createElement("option");
	myElement.appendChild(myNewElement);
	
	var myText = document.createTextNode(bandType[i]);
	myNewElement.appendChild(myText);
	
}

// searching for the id of bandsearch for the individual list items
// this works for populating the search for bands page with the 
// static array.  Will work on getting it to work with my JSON data
// at a later time.
/*var bandSearch = document.getElementById("bandSearch");

for (var j = 0; j < bandType.length; j++)
{
	var getLIBand = document.createElement("li");
	bandSearch.appendChild(getLIBand);
	
	var newText = document.createTextNode(bandType[j]);
	getLIBand.appendChild(newText);
}
*/
// dont actually need this section at the moment
// I do not need to stringify the json data just yet
	var stringifiedJson = JSON.stringify(json);
	console.log(stringifiedJson);
	
// this will turn the stringified version of the json data
// back into an object.  Like above, I dont really need this
// just yet	
	var parsedJson = JSON.parse(stringifiedJson);
	console.log(parsedJson);

// this will (hopefully) dynamically populate the search local bands
// page.  Problem I am having is that I have to manually search
// through my json data for each bname

for(var key in json)
{
	var getBandListEle = document.getElementById("bandSearch");
	var setBandListLi = document.createElement("li");
	getBandListEle.appendChild(setBandListLi);
	
// The problem lies with bandInfo1.  In order for this to work
// I have to cycle through each iteration of bandInfo's
// exe. bandInfo1.bname, bandInfo2.bname, bandInfo3.bname	
	var bandInfo = document.createTextNode(json[key].bname[1]);
	
	setBandListLi.appendChild(bandInfo);
}

/*for(var key in json)
{
	alert("key: " + key + ", value: " + json[key].bname[1]);
}

*/

/*for(var i = 0; i < 20; i++)
{
	var getBandListEle = document.getElementById("bandSearch");
	var setBandListLi = document.createElement("li");
	getBandListEle.appendChild(setBandListLi);
	
// The problem lies with bandInfo1.  In order for this to work
// I have to cycle through each iteration of bandInfo's
// exe. bandInfo1.bname, bandInfo2.bname, bandInfo3.bname	
	var bandInfo = document.createTextNode(json.bandInfo2.bname[1]);
	
	setBandListLi.appendChild(bandInfo);
}

for(var key in json)
{
	alert("key: " + key + ", value: " + json[key].bname[1]);
} */













// this is the main java script file for the web-app
// Author: Cory Green
// Date: 03/18/2012
// project: Mobile interfaces

//waiting until the DOM is ready
/*window.addEventListener("DOMContentLoaded", function()
{
	function getE(x)
	{
		var theElement = document.getElementById(x);
		return theElement;
	}

/*	//create select field elements and populate with elements
	function makeCatagory()
	{
		var formTag = document.getElementsByTagName("form"),
			selectLi = getE('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for(var i = 0, j = bandType.length; i < j; i++)
		{
			var makeOption = document.createElement('option');
			var optText = bandType[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
		
	} 
	// variable defaults
//	var bandType = ["--choose a genre--","rock", "metal", "country", "classical", "rap", 
//					"kids", "jazz", "other"];
	
												
	var	instrument1Value = "no",
		instrument2Value = "no",
		instrument3Value = "no",
		instrument4Value = "no",
		instrument5Value = "no",
		instrument6Value = "no",
		instrument7Value = "no",
		instrument8Value = "no",
		instrument9Value = "no"; 
		
	var errMsg = getE('errors');	
		
// find value of selected buttons
function getCheckBoxValue()
{
	if(getE('inst1').checked)
	{
		instrument1Value = getE('inst1').value;
	}
	else
	{
		instrument1Value = "No";
	}
	if(getE('inst2').checked)
	{
		instrument2Value = getE('inst2').value;
	}
	else
	{
		instrument2Value = "No";
	}
	if(getE('inst3').checked)
	{
		instrument3Value = getE('inst3').value;
	}
	else
	{
		instrument3Value = "No";
	}
	if(getE('inst4').checked)
	{
		instrument4Value = getE('inst4').value;
	}
	else
	{
		instrument4Value = "No";
	}
	if(getE('inst5').checked)
	{
		instrument5Value = getE('inst5').value;
	}
	else
	{
		instrument5Value = "No";
	}
	if(getE('inst6').checked)
	{
		instrument6Value = getE('inst6').value;
	}
	else
	{
		instrument6Value = "No";
	}
	if(getE('inst7').checked)
	{
		instrument7Value = getE('inst7').value;
	}
	else
	{
		instrument7Value = "No";
	}
	if(getE('inst8').checked)
	{
		instrument8Value = getE('inst8').value;
	}
	else
	{
		instrument8Value = "No";
	}
	if(getE('inst9').checked)
	{
		instrument9Value = getE('inst9').value;
	}
	else
	{
		instrument9Value = "No";
	} 
}	

// toggle controls
function toggleControls(n)
{
	switch(n)
	{
		case "on":
			getE('bandInfo').style.display = "none";
			getE('reset').style.display = "inline";
			getE('disp').style.display = "none";
			getE('addNew').style.display = "inline";
			break;
		case "off":
			getE('bandInfo').style.display = "block";
			getE('reset').style.display = "inline";
			getE('disp').style.display = "inline";
			getE('addNew').style.display = "inline";
			getE('item').style.display = "inline";
			break;
		default:
			return false;
	}
}
	// store in local storage - key and id
	function storeData(key)
	{
		// if there is no key this is a brand new item and we need a new key
		if(!key)
		{
			var id					= Math.floor(Math.random() * 1000000001);
		}
		else
		{	
			// set the id to the exsisting key were editing so that it will save over the data
			// the key is the same key that has been passed from the edit submit event handler
			// to the validate function, and then passed here, into the store data function
			id = key;
		}
		// gather up all our form field values and store in an object.
		// object properties contain array with the form label and input values
		getCheckBoxValue();
		var item 				= {};
			item.fname 			= ["Your Name:", getE('fname').value];
			item.bname 			= ["Band Name:", getE('bname').value];
			item.email			= ["Email Address:", getE('email').value];
			item.groups 		= ["Genre:", getE('groups').value];
		//	item.startdate		= ["Date Requesting: ", getE('startdate').value];
			item.instrument1	= ["1 guitar", instrument1Value];
			item.instrument2	= ["2 guitars", instrument2Value];
			item.instrument3	= ["bass", instrument3Value];
			item.instrument4	= ["drums", instrument4Value];
			item.instrument5	= ["main vocals", instrument5Value];
			item.instrument6	= ["1 backup vocal", instrument6Value];
			item.instrument7	= ["2 backup vocals", instrument7Value];
			item.instrument8	= ["3 backup vocals", instrument8Value];
			item.instrument9	= ["Other Instrument(s)", instrument9Value];
		
		//	item.other1			= ["Other Info:", getE('other1').value];
		//	item.tickets		= ["Tickets Wanted", getE('tickets').value];
		// save data into local storage: using stringify to convert our object to a string
		localStorage.setItem(id, JSON.stringify(item));
		alert("info saved!");
		
		
	}

	function getData()
	// writes data from local storage to the browser
	{
		toggleControls("on");
		if(localStorage.length === 0)
		{
			alert("There is no data in local storage so default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "item");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		getE('item').style.display = "block";
		for(var i = 0, j = localStorage.length; i < j; i++)
		{
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// convert the string fromm local storage value back to an object by using JSON .parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			
			getImage(obj.groups[1], makeSubList); // gets an image for our form, passes in makeSubList
			for(var n in obj)	// changed item from obj
			{
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links for each item in local storage
		}	
	}
	
	// get the image for the right catagory
	function getImage(catName, makeSubList)
	{
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "pics/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}
	
	// autopopulate the local storage
	function autoFillData()
	{
		// The actual JSON object data required for this to work is coming form our json.js file
		// store json object in local storage
		for(var n in json)
		{	
			var id = Math.floor(Math.random() *	1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	// make item links 
	// create edit and delete links for each stored item when displayed
	function makeItemLinks(key, linksLi)
	// add edit single item link
	{
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;	
		var editText = "Edit Info";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		// adds a seperator between links
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Info";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem()
	{
		// grab data from our local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// show the form
		toggleControls("off");
		
		// populate the form fields with the current localStorage values.
		getE('fname').value = item.fname[1];
		getE('bname').value = item.bname[1];
		getE('email').value = item.email[1];
		getE('groups').value = item.groups[1];
		getE('startdate').value = item.startdate[1];
			if(getE('inst1').checked)
			{
				instrument1Value = getE('inst1').value;
			}
			else
			{
				instrument1Value = "No";
			}
			if(getE('inst2').checked)
			{
				instrument2Value = getE('inst2').value;
			}
			else
			{
				instrument2Value = "No";
			}
			if(getE('inst3').checked)
			{
				instrument3Value = getE('inst3').value;
			}
			else
			{
				instrument3Value = "No";
			}
			if(getE('inst4').checked)
			{
				instrument4Value = getE('inst4').value;
			}
			else
			{
				instrument4Value = "No";
			}
			if(getE('inst5').checked)
			{
				instrument5Value = getE('inst5').value;
			}
			else
			{
				instrument5Value = "No";
			}
			if(getE('inst6').checked)
			{
				instrument6Value = getE('inst6').value;
			}
			else
			{
				instrument6Value = "No";
			}
			if(getE('inst7').checked)
			{
				instrument7Value = getE('inst7').value;
			}
			else
			{
				instrument7Value = "No";
			}
			if(getE('inst8').checked)
			{
				instrument8Value = getE('inst8').value;
			}
			else
			{
				instrument8Value = "No";
			}
			if(getE('inst9').checked)
			{
				instrument9Value = getE('inst9').value;
			}
			else
			{
				instrument9Value = "No";
			} 	
		
		getE('other1').value = item.other1[1];
		getE('tickets').value = item.tickets[1];
		
		// remove the initial listener from the input save conctact
		submit.removeEventListener("click", storeData);  // changed save to submit
		// change submit button value to edit button
		getE('submit').value = "Edit Contact";
		var editSubmit = getE('submit');
		// save key value established in this function as a property of the edit submit event
		// so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem()
	{
		var ask = confirm("Are you sure you want to delete this data?");
		if(ask)
		{
			localStorage.removeItem(this.key);
			alert("The contact was deleted!");
			window.location.reload();
		}
		else
		{
			alert("Item was NOT deleted.");
		}
	}
	
	// clear the local storage function
	function clearLocal()
	{
		if(localStorage.length === 0)
		{	
			alert("There is no data to clear.");
		}
		else
		{	
			localStorage.clear();
			alert("Everything has been deleted");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e)
	{
		// define the elements we want to check
		var getfname = getE('fname');
		var getbname = getE('bname');
		var getemail = getE('email');
		var getgroups = getE('groups');
		
		//reset error messages
		errMsg.innerHTML = "";
		getgroups.style.border = "1px solid black";
		getfname.style.border = "1px solid black";
		getbname.style.border = "1px solid black";
		getemail.style.border = "1px solid black";
		
		
		// get error messages
		var messageArry = [];
		// fname validation
		if(getgroups.value == "--choose a genre--")
		{
			var genreError = "Please choose a genre.";
			getgroups.style.border = "1px solid red";
			messageArry.push(genreError);
		}
		
		// name validation
		if(getfname.value === "")
		{
			var fNameError = "Please enter in your name";
			getfname.style.border = "1px solid red";
			messageArry.push(fNameError);
		}
		
		// band validation
		if(getbname.value === "")
		{
			var bNameError = "Please enter in your band name";
			getbname.style.border = "1px solid red";
			messageArry.push(bNameError);
		}
		
		//Email validation
		//when I replaced all $ with getE, it changed the end $ to getE and 
		//destroyed the programs ability to save!
		var regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(regular.exec(getemail.value)))
		{
			var emailError = "Please enter a valid email address.";
			getemail.style.border = "1px solid red";
			messageArry.push(emailError);
		}	
		
		// if there were errors display them on screen
		// if there is anything in the message array that means there was an error
		if(messageArry.length >= 1)
		{
			for(var i = 0, j = messageArry.length; i < j; i++)
			{	
				var txt = document.createElement('li');
				txt.innerHTML = messageArry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}
		else
		{	
			// if all is ok then save data, send key value(which came from the edit data function
			// remember this key value was passed through the edit submit listener as a property
			storeData(this.key);
		}
	}
	
	// calling on the makeCatagory function
	//makeCatagory();
	
	// set link and submit click events
	
	// shows data function
	var dispInfo = getE('disp');
	dispInfo.addEventListener("click", getData);
	
	// set submit click events
	var submit = getE('submit');
	submit.addEventListener("click", validate);
	
	
	// clear function
	var clear = getE('reset');
	clear.addEventListener("click", clearLocal);
});



/*<ul data-role="listview" data-filter="true" data-filter-palceholder="Search by Genre">
				<li><a href="#"><img src='pics/classical.png'/>Classical</a></li>
				<li><a href="#"><img src='pics/country.png'/>Country</a></li>
				<li><a href="#"><img src='pics/jazz.png'/>Jazz</a></li>
				<li><a href="#"><img src='pics/kids.png'/>Kids</a></li>
				<li><a href="#"><img src='pics/metal.png'/>Metal</a></li>
				<li><a href="#"><img src='pics/other.png'/>Other</a></li>
				<li><a href="#"><img src='pics/rap.png'/>Rap</a></li>
				<li><a href="#"><img src='pics/rock.png'/>Rock</a></li>
			</ul> 
			
			*/


