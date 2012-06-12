// this is the main java script file for the web-app
// Author: Cory Green
// Date: 05/30/2012
// project: ASD

//waiting until the DOM is ready
// this beginning function has been modified to fit the jquery version
$(function(){



// still working on making this work out.
function checkboxes()
{	
	var newthing = $('.ui-checkbox');
	
	for(var i = 0; i < newthing.length; i++)
	{
		if(checked === true)
		{
			console.log(newthing.value);
		}
		console.log(newthing[i]);
		
	}
}

checkboxes();












// this will be used to pull from my json file!
// the actual json file should not have var json at the beginning of it!
function jsonAjax()
{
	

	$.ajax({
		url			: 'xhr/data.json',
		type		: 'GET',
		dataType	: 'json',
		success		: function(response)
			{
					for(var i = 0, j = response.bandInfo.length; i < j; i++)
					{
						var info = response.bandInfo[i];
						$('' + '<li>' + "name of person : " +info.fname + '</li>' +
							   '<li>' + "name of band : " +info.bname + '</li>'+
							   '<li>' + "genre of group : " +info.groups + '</li>'
							   ).appendTo('#localBandList');
					}
											
			}	
		});
}	

// this is going to be pulling from my xml file!
function xmlAjax()
{
	$.ajax({
		url			:	'xhr/data.xml',
		type		:	'GET',
		dataType	:	'xml',
		success		: function(response)
		{
			// ok ok this works!  Stumbled upon the use of .text() to reveal the actual value!
			// the word item has to be used in this instance, will break code without
				$(response).find("item").each(function()
				{
					var item = $(this);
					var bName = item.find("band").text();
					var genre = item.find("genre").text();
					var place = item.find("place").text();
					var price = item.find("price").text();
					
					// simply displaying the data :D					
					var newLi = $('<li>').text("The name of the band : " 
								+ bName + " the Genre of music : " + genre);

					var newNewLi = $('<li>').text("Where they are playing : " 
								+ place + " price of admission : " + price);

					// appending both li's
					$('#localBandList').append(newLi , newNewLi);
					
				});	
		}		
		});
}	


// my csv ajax now works!!
function csvAjax()
{
	$.ajax({
		url			:	'xhr/data.csv',
		type		:	'GET',
		dataType	:	"text",
		success		:	function(data,response)
		{
			// my split function now works now that I have the correct dataType
			
			
			var thingy = data.split("\n");
			
			
			for (var lineNum = 0; lineNum < thingy.length; lineNum++)
			{
				var row = thingy[lineNum];
				var columns = row.split(",");
				
				var newLine = $('<li>'). text("Name of band : " 
							  + columns[1] + " Date of show : " + columns[3]);
				
				$('#localBandList').append(newLine);
			}
		}
	});
}


// function used to dynamically populate my genre drop down menu
function makeCatagory()
{
	var bandType = ["--choose a genre--", "rock", "metal", "country", "classical", "rap", "kids", "jazz", 							"other"];

	for(var i = 0; i < bandType.length; i++)
	{
		// able to compress my code into two lines using jquery!
		var myNewElement = $('<option>').text(bandType[i]); 
		$('#groups').append(myNewElement);  	    	
	} 
}

// function used to dynamically populate my search band page
function popBandSearch()
{	
	for(var key in json)
	{
		// once again making my code more compact!
		var setBandListLi = $('<li>').text(json[key].bname[1]);  
		$('#bandSearch').append(setBandListLi);  
	}
}
		
// default values for my checkboxes		
	var	instrument1Value = "no",
		instrument2Value = "no",
		instrument3Value = "no",
		instrument4Value = "no",
		instrument5Value = "no",
		instrument6Value = "no",
		instrument7Value = "no",
		instrument8Value = "no",
		instrument9Value = "no"; 
		
	var errMsg = $('#errors');	
		
// find value of selected buttons
function getCheckBoxValue()
{
	if($('#inst1').checked)
	{
		instrument1Value = $('#inst1').val();
	}
	else
	{
		instrument1Value = "No";
	}
	if($('#inst2').checked)
	{
		instrument2Value = $('#inst2').val();
	}
	else
	{
		instrument2Value = "No";
	}
	if($('#inst3').checked)
	{
		instrument3Value = $('#inst3').val();
	}
	else
	{
		instrument3Value = "No";
	}
	if($('#inst4').checked)
	{
		instrument4Value = $('#inst4').val();
	}
	else
	{
		instrument4Value = "No";
	}
	if($('#inst5').checked)
	{
		instrument5Value = $('#inst5').val();
	}
	else
	{
		instrument5Value = "No";
	}
	if($('#inst6').checked)
	{
		instrument6Value = $('#inst6').val();
	}
	else
	{
		instrument6Value = "No";
	}
	if($('#inst7').checked)
	{
		instrument7Value = $('#inst7').val();
	}
	else
	{
		instrument7Value = "No";
	}
	if($('#inst8').checked)
	{
		instrument8Value = $('#inst8').val();
	}
	else
	{
		instrument8Value = "No";
	}
	if($('#inst9').checked)
	{
		instrument9Value = $('#inst9').val();
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
			$('#bandInfo').css('display', "none");  
			$('#reset').css('display', "inline");
			$('#disp').css('display', "none");
			$('#addNew').css('display', "inline");
			break;
		case "off":
			$('#bandInfo').css('display', "block");
			$('#reset').css('display', "inline");
			$('#disp').css('display', "inline");
			$('#addNew').css('display', "inline");
			$('#item').css('display', "inline");
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
			item.fname 			= ["Your Name:", $('#fname').val()];  
			item.bname 			= ["Band Name:", $('#bname').val()];
			item.email			= ["Email Address:", $('#email').val()];
			item.groups 		= ["Genre:", $('#groups').val()];
			item.startdate		= ["Date Requesting: ", $('#startdate').val()];
			item.instrument1	= ["1 guitar", instrument1Value];
			item.instrument2	= ["2 guitars", instrument2Value];
			item.instrument3	= ["bass", instrument3Value];
			item.instrument4	= ["drums", instrument4Value];
			item.instrument5	= ["main vocals", instrument5Value];
			item.instrument6	= ["1 backup vocal", instrument6Value];
			item.instrument7	= ["2 backup vocals", instrument7Value];
			item.instrument8	= ["3 backup vocals", instrument8Value];
			item.instrument9	= ["Other Instrument(s)", instrument9Value];
		
			item.other1			= ["Other Info:", $('#other1').val()];
			item.tickets		= ["Tickets Wanted", $('#tickets').val()];
			
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
		var makeDiv = $('<div>'); 
		makeDiv.attr('id', "item");  
		var makeList = $('<ul>');	
		makeDiv.append(makeList);
		$('#ending').append(makeDiv);					 															
		$('#item').css('display', "block");
		for(var i = 0, j = localStorage.length; i < j; i++)
		{
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			// convert the string fromm local storage value back to an object by using JSON .parse
			var obj = JSON.parse(value);
			var makeSubList = $('<ul>');  
			makeli.append(makeSubList);
			
			getImage(obj.groups[1], makeSubList); // gets an image for our form, passes in makeSubList
			for(var n in obj)	
			{
				var makeSubli = $('<li>'); ;
				makeSubList.append(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.html(optSubText); 							
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links for each item in local storage
		}	
	}
	
	// get the image for the right catagory
	function getImage(catName, makeSubList)
	{
		//creates a ul then appends an li to it then appends an image to that
		
		var imageLi = $('<li>');  //document.createElement('li');
		$('<ul>').append(imageLi); // makeSubList.appendChild(imageLi);
		var newImg = $('<img>');  //document.createElement('img');
		var setSrc = newImg.attr('src', "pics/"+ catName + ".png");
		imageLi.append(newImg);
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
		var editLink = $('<a>'); //document.createElement('a');
		editLink.href = "#";
		editLink.key = key;	
		var editText = "Edit Info";
		editLink.bind("click", editItem); //addEventListener("click", editItem);
		$('#editLink').html(editText);    // editLink.innerHTML = editText;
		linksLi.append(editLink);
		
		// adds a seperator between links
		var breakTag = $('<br>');  //document.createElement('br');
		linksLi.append(breakTag);
		
		var deleteLink = $('<a>'); //document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Info";
		deleteLink.bind("click", deleteItem);
		$('#deleteLink').html(deleteText);			// deleteLink.innerHTML = deleteText;
		linksLi.append(deleteLink);
	}
	
	function editItem()
	{
		// grab data from our local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// show the form
		toggleControls("off");
		
		// populate the form fields with the current localStorage values.
		$('#fname').val(item.fname[1]); // .value = item.fname[1];
		$('#bname').val(item.bname[1]);
		$('#email').val(item.email[1]);
		$('#groups').val(item.groups[1]);
		$('#startdate').val(item.startdate[1]);
	if($('#inst1').checked)
	{
		instrument1Value = $('#inst1').val();
	}
	else
	{
		instrument1Value = "No";
	}
	if($('#inst2').checked)
	{
		instrument2Value = $('#inst2').val();
	}
	else
	{
		instrument2Value = "No";
	}
	if($('#inst3').checked)
	{
		instrument3Value = $('#inst3').val();
	}
	else
	{
		instrument3Value = "No";
	}
	if($('#inst4').checked)
	{
		instrument4Value = $('#inst4').val();
	}
	else
	{
		instrument4Value = "No";
	}
	if($('#inst5').checked)
	{
		instrument5Value = $('#inst5').val();
	}
	else
	{
		instrument5Value = "No";
	}
	if($('#inst6').checked)
	{
		instrument6Value = $('#inst6').val();
	}
	else
	{
		instrument6Value = "No";
	}
	if($('#inst7').checked)
	{
		instrument7Value = $('#inst7').val();
	}
	else
	{
		instrument7Value = "No";
	}
	if($('#inst8').checked)
	{
		instrument8Value = $('#inst8').val();
	}
	else
	{
		instrument8Value = "No";
	}
	if($('#inst9').checked)
	{
		instrument9Value = $('#inst9').val();
	}
	else
	{
		instrument9Value = "No";
	} 
		
		$('#other1').val(item.other1[1]);
		$('#tickets').val(item.tickets[1]);
		
		// remove the initial listener from the input save conctact
		submit.unbind("click", storeData);  // changed save to submit removeEventListener("click", 																 //storeData);
		// change submit button value to edit button
		$('#submit').val("Edit Contact");
		var editSubmit = $('#submit');
		// save key value established in this function as a property of the edit submit event
		// so we can use that value when we save the data we edited.
		editSubmit.bind("click", validate); //addEventListener("click", validate);
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
		var getfname = $('#fname');
		var getbname = $('#bname');
		var getemail = $('#email');
		var getgroups = $('#groups');
		
		//reset error messages
		$('#errMsg').html("");    // errMsg.innerHTML = "";
		getgroups.css({'border': "1px", "color": "black"});
		getfname.css({'border': "1px", "color": "black"});
		getbname.css({'border': "1px", "color": "black"});
		getemail.css({'border': "1px", "color": "black"});
		
		
		// get error messages
		var messageArry = [];
		// fname validation
		/*if(getgroups.value == "--choose a genre--")
		{
			var genreError = "Please choose a genre.";
			getgroups.css('border', "1px solid red");
			messageArry.push(genreError);
		} */
		
		// name validation
		if(getfname.val() === "")
		{
			var fNameError = "Please enter in your name";
			getfname.css({'border': "1px", "color": "red"});
			messageArry.push(fNameError);
		}
		
		// band validation
		if(getbname.val() === "")
		{
			var bNameError = "Please enter in your band name";
			getbname.css({'border': "1px", "color": "red"});
			messageArry.push(bNameError);
		}
		
		//Email validation
		//when I replaced all $ with getE, it changed the end $ to getE and 
		//destroyed the programs ability to save!
		var regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(regular.exec(getemail.val())))
		{
			var emailError = "Please enter a valid email address.";
			getemail.css({'border': "1px", "color": "red"});
			messageArry.push(emailError);
		}	
		
		// if there were errors display them on screen
		// if there is anything in the message array that means there was an error
		if(messageArry.length >= 1)
		{
			for(var i = 0, j = messageArry.length; i < j; i++)
			{	
				var txt = $('<li>');  
				txt.text(messageArry[i]);    //txt.html(messageArry[i]); 
				errMsg.append(txt);
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
	makeCatagory();
	popBandSearch();
	
	// buttons for my json,xml, and my csv files
	$('#jsonButton').bind('click', jsonAjax);
	
	$('#xmlButton').bind('click', xmlAjax);
	
	$('#otherButton').bind('click', csvAjax);
	
	
	// set link and submit click events
	// made all my links jquery links insead of normal javascript
	// shows data function
	$('#disp').bind('click', getData); // bind('click', getData);
	
	
	// set submit click events
	$('#submit').bind('click', validate);
	
	
	// clear function
	$('#reset').bind('click', clearLocal);
});


