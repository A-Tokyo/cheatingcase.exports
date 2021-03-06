swissAir.controller('flightsOneWayController', function($scope,$location,AirportsSrv) {
  $scope.disabled=true;
  $scope.outgoingFlights= AirportsSrv.getOutgoingFlights();
  $scope.Total = 0;
  $scope.seats = AirportsSrv.getSelectedSeats();

  $scope.$watch('seats', function() {
    $scope.passengerArray = [];
    for(var i=0; i<$scope.seats; i++){
      $scope.passengerArray.push({"firstName":"","lastName":"","passportNum":0,"dateOfBirth":0});
    }
    AirportsSrv.setPassengerArray($scope.passengerArray);
  });

  $scope.findType = function(flight){
    return "info";
  };

  $scope.findColor = function(flight){
    return "color: rgb(0,139,139)";
  };

  $scope.clearOthers = function(index,type){
      angular.forEach($scope.outgoingFlights, function(flight, position) {
        if (position != index){
          $scope.outgoingFlights[position].checked = false;
        }

        else{
          $scope.outgoingFlights[position].checked = true;
        }

      });
  }

  $scope.isDisabled = function(){
    for(var i=0;i<$scope.outgoingFlights.length;i++){
        if($scope.outgoingFlights[i].checked){
          $scope.Total = parseInt($scope.outgoingFlights[i].cost) * $scope.seats;
          $scope.disabled=false;
          return;
        }
    }
    $scope.disabled=true;
  }

  $scope.proceed = function() {

    for(var i=0;i<$scope.outgoingFlights.length;i++){
        if($scope.outgoingFlights[i].checked){
          var outgoingFlight = $scope.outgoingFlights[i];
          break;
        }
    }
    AirportsSrv.setOutgoingFlightID(outgoingFlight.flightId); //return here if error
    AirportsSrv.setOutgoingFlightAirline(outgoingFlight.Airline);
    AirportsSrv.setCost($scope.Total);
    $location.path('/flights/confirm');
  }

});
