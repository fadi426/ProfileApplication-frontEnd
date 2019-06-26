import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import httpClient from '../../infrastructure/http-client';
import { ClassField } from '@angular/compiler';
import { StoreModule } from '../../modules/store/store.module';
import { Location } from '../../model/location';
// import { Locaion } from '../../model/location';

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  locations = [];
  id  = 0;

  constructor(private router: Router, private store: StoreModule) {}

  routeTo(component){
    let location = (<HTMLInputElement>document.getElementById('myInput')).value;
    this.getLocationInfo(location).then(() => {
      this.router.navigate([component]);
    })
  }

  async getLocationInfo(locationName) {
    const resp = await fetch('https://localhost:5001/api/profile/locations/' + locationName);
    const data = await resp.json();
    this.store.location = new Location(data.Name, data.Longitude, data.Latitude, data.Province, data.Country);
    console.log(data.Country);
  }

  async getLocations() {
    const resp = await fetch('https://localhost:5001/api/profile/locations/');
    const data = await resp.json();
    data.forEach(location => {
      this.locations.push(location.name);
    });
    this.autocomplete(document.getElementById("myInput"), this.locations);
  }

  autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    var firstItem = true;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists(null);
        if (!val) { return false;}
        currentFocus = 0;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.style.overflowY = "auto";
        a.style.minWidth = "200px";
        a.style.height = "150px";
        a.style.zIndex = "2";
        a.style.position = "relative";
        a.style.backgroundColor = "#e6ecf0";
        a.style.fontWeight = "normal";
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists(null);
            });
            a.appendChild(b);
          }
        }
    });
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    /*execute a function presses a key on the keyboard:*/
    function addActive(x, currentFocus) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      //removeActive(x);
      // if (currentFocus >= x.length) currentFocus = 0;
      // if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      var y = document.getElementById("myInputautocomplete-list");
      y = y.getElementsByTagName("div")[currentFocus];
      (<HTMLInputElement>document.getElementById('myInput')).value = y.innerText;
      y.style.backgroundColor = "#3F69AA";
      y.style.color = "#ffffff";
      var topPos = y.offsetTop;
      document.getElementById('myInputautocomplete-list').scrollTop = topPos-40;
    }
    inp.addEventListener("keydown", function(e) {
      var xArr = document.getElementById("myInputautocomplete-list");
      if(!xArr) return;
      x = xArr.getElementsByTagName("div")[currentFocus];
      if (x){
        x.style.backgroundColor = "#e6ecf0";
        x.style.color = "#000000";
      }
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          if(currentFocus != 0 || firstItem == false) currentFocus++;
          if(currentFocus >  xArr.getElementsByTagName("div").length -1)
            currentFocus = xArr.getElementsByTagName("div").length -1;
          /*and and make the current item more visible:*/
          addActive(x,currentFocus);
          if(currentFocus == 0) firstItem = false;
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          if(currentFocus <  0)
            currentFocus = 0;
          /*and and make the current item more visible:*/
          addActive(x,currentFocus);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            var x = document.getElementById("myInputautocomplete-list");
            if (x){
              x = x.getElementsByTagName("div")[currentFocus];
              x.click();
            } 
          }
        }
    });
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
  }

  ngOnInit() {
    this.getLocations();
  }

}
