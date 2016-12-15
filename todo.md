* Things to do

** [15.12.16 12:35:57] Benjamin Longearet: 

1/ Finir le formulaire addPlace (rajouter les attributs)
2/ Take picture => get geolocation
3/ Rajouter le post dans le service places (+ endpoints)
4/ Faire l'appel au serveur (dév NodeJS + Mongo)

import {Geolocation} from 'ionic-native';

Geolocation.getCurrentPosition().then(pos => {
  console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
});

window.open("geo:#{lat},#{long}?q=#{text}", '_system', 'location=yes')

address = $scope.vm.article.addresses[0]
  lat = parseFloat(address.loc.lat)
  long = parseFloat(address.loc.lng)
  text =  encodeURIComponent(address.text)
  if ionic.Platform.isIOS()
    window.open("http://maps.apple.com/?q=#{text}&ll=#{lat},#{long}&near=#{lat},#{long}", '_system', 'location=yes')  
  else
    window.open("geo:#{lat},#{long}?q=#{text}", '_system', 'location=yes')