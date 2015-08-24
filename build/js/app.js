var neighborhood={lat:27.7761,lng:-82.6386,name:"St. Petersburg, FL"},infoWindow=new google.maps.InfoWindow,point=function(o,e){function n(o){setTimeout(function(){o.setAnimation(null)},1400)}this.map=o,this.name=e.name,this.position=e.location,this.url=e.url,this.address=e.location.address,this.contact=e.contact.formattedPhone,this.rating=e.rating+"/10",this.category=e.categories[0].name,this.marker=new google.maps.Marker({map:o,position:e.location,title:e.name,animation:google.maps.Animation.DROP});var t='<div class="infoName">'+this.name+'</div><div class="infoAdd">Address: '+this.address+'</div><div class="infoCon">Contact: '+this.contact+'</div><a class="infoUrl" href = '+this.url+">Click for more info</a>";this.openInfoWindow=function(){infoWindow.setContent(t),infoWindow.open(o,this),o.panTo(this.position),this.setAnimation(google.maps.Animation.BOUNCE),n(this)},google.maps.event.addListener(this.marker,"click",this.openInfoWindow)},config={authTokenPara1:"https://api.foursquare.com/v2/venues/explore?ll=",authTokenPara2:"&oauth_token=I3QD5N1FBA1JNPGRATZUNDGEFLHOAEJDEHFSAA13KHXNGCSX&v=20150724"},GoogleMap=function(o,e){var n=new google.maps.LatLng(e.lat,e.lng),t={panControl:!1,zoomControl:!1,streetViewControl:!1,mapTypeControl:!1,center:n,zoom:15},i=new google.maps.Map(o,t),a=new google.maps.Marker({map:i,position:n,title:e.name,icon:{path:"M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z",fillColor:"#ffff00",fillOpacity:1,scale:.5,strokeColor:"#bd8d2c",strokeWeight:1}});return google.maps.event.addListener(a,"click",function(){infoWindow.setContent(a.title),infoWindow.open(i,a)}),i},ViewModel=function(){var o=this,e=document.getElementById("map-canvas"),n=config.authTokenPara1+neighborhood.lat+","+neighborhood.lng+config.authTokenPara2;o.query=ko.observable(""),o.points=ko.observableArray(),o.map=GoogleMap(e,neighborhood),o.clickMarker=function(e){for(var n=e.name.toLowerCase(),t=0,i=o.points().length;i>t;t++)o.points()[t].name.toLowerCase()===n.toLowerCase()&&(google.maps.event.trigger(o.points()[t].marker,"click"),o.map.panTo(o.points()[t].position))},o.getFoursquarePlace=ko.computed(function(){$.getJSON(n,function(e){for(var n=e.response.groups[0].items,t=0;t<n.length;t++)o.points.push(new point(o.map,n[t].venue))}).error(function(o){console.log("Oops! Fail to get venues from FourSquare")})}),o.search=ko.computed(function(){return ko.utils.arrayFilter(o.points(),function(e){return e.name.toLowerCase().indexOf(o.query().toLowerCase())>=0})}),o.updateMarkers=ko.computed(function(){for(var e=0;e<o.points().length;e++)o.points()[e].marker.setVisible(o.points()[e].name.toLowerCase().indexOf(o.query().toLowerCase())<0?!1:!0)})};ko.applyBindings(new ViewModel);