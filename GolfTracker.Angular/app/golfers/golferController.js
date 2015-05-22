(function () {
    'use strict';

    angular.module('golftracker')
        .controller('golferController', ["golferService", "golfClubService", "handicapCalculatorService","authService",
            function (golferService, golfClubService, handicapCalculatorService, authService) {
                var vm = this;

                vm.golfcoursename = "";
                vm.golfclubname = "";
                vm.golfcourses = [];
                vm.golfclubs = [];
                vm.tees = [];

                vm.golfers = [];
                vm.golfer = {};
                vm.round = {};
                vm.rounds = [];
                vm.showRounds = false;
                vm.golferFormIsVisible = false;
                vm.roundFormIsVisible = false;
                vm.viewRoundsIsVisible = false;
                vm.dialogTitle = "";

                vm.isAuthenticated = authService.authentication.isAuth;

                // Load the list of golfers.
                golferService.getGolfers()
                                .then(function (data) {
                                    vm.golfers = data;
                                    //console.log("golfers: " + angular.toJson(vm.golfers));
                                });

                /***********************************
                * Begin Golfer.html code
                ***********************************/

                // Display the rounds of golf for the selected golfer.
                vm.clickShowRounds = function (idx) {
                    var player = vm.golfers[idx];
                    vm.golfer = player;
                    vm.rounds = player.Rounds;
                    vm.showRounds = true;
                };


                /***********************************
                * End Golfer.html code
                ***********************************/







                /***********************************
                * Begin ManageGolfer.html code
                ***********************************/

                // Begin Add Golfer Form

                vm.showAddGolferForm = function () {
                    hideAllForms();
                    vm.golfer = {};
                    vm.golferFormIsVisible = true;
                    vm.dialogTitle = "Add";
                };

                vm.submitGolferForm = function (isValid, golfer) {
                    if (!isValid) {
                        return;
                    }

                    if (golfer.id == null) {
                        golferService.insertGolfer(golfer).then(function (data) {
                            //golfer.id = data.id;
                            vm.golfers.push(data.Result);
                            vm.golferFormIsVisible = false;
                            vm.golfer = {};
                        });
                    } else {
                        golferService.updateGolfer(golfer).then(function (data) {
                            vm.golferFormIsVisible = false;
                            vm.golfer = {};
                        });
                    }
                };

                vm.cancelGolferForm = function () {
                    $("#golferform input").removeAttr("required");

                    vm.golferFormIsVisible = false;
                };

                vm.update = function (idx) {
                    hideAllForms();
                    vm.dialogTitle = "Edit";
                    vm.golfer = vm.golfers[idx];
                    vm.golferFormIsVisible = true;
                };

                vm.delete = function (idx) {
                    if (confirm("Are you sure you want to delete this golfer?")) {
                        var g = vm.golfers[idx];
                        golferService.deleteGolfer(g).then(function (data) {
                            vm.golfers.splice(idx, 1);
                            vm.viewRoundsIsVisible = false;
                        });
                    }
                };

                // End Add Golfer Form




                // Begin Show Round Form

                vm.showRoundForm = function (idx) {
                    hideAllForms();
                    vm.round = {};
                    vm.golfer = vm.golfers[idx];
                    vm.roundFormIsVisible = true;
                };

                vm.submitRoundForm = function (IsValid, round) {
                    if (!IsValid) {
                        return;
                    }
                    //console.log("golfer: " + angular.toJson(vm.golfer));
                    //console.log("round: " + angular.toJson(round));

                    if (vm.golfer.Rounds === null) {
                        vm.golfer.Rounds = [];
                    }

                    // Set some local variables for net score calculation.
                    var grossScore = round.Score;
                    var hdcpIndex = fixHandicapIndex(vm.golfer.Handicap, vm.golfer.IsPlus);
                    var slope = round.GolfCourse.TeePlayed.Slope;

                    // Calculate Net Score and update round.
                    var netScore = handicapCalculatorService.calculateNetScore(grossScore, hdcpIndex, slope);

                    // Update the round with the calculated net score.
                    round.NetScore = netScore;

                    // Add the round to the Rounds array for the golfer.
                    vm.golfer.Rounds.push(round);

                    // Update the golfer in the data store.
                    golferService.updateGolfer(vm.golfer).then(function (data) {
                        vm.rounds = vm.golfer.Rounds;
                        vm.roundFormIsVisible = false;
                        vm.viewRoundsIsVisible = true;
                    });
                };


                vm.viewRounds = function (idx) {
                    hideAllForms();
                    vm.golfer = vm.golfers[idx];
                    vm.rounds = vm.golfer.Rounds;
                    vm.viewRoundsIsVisible = true;
                    //console.log("view: " + angular.toJson(vm.rounds));
                };

                vm.cancelRoundForm = function () {
                    $("#roundForm input").removeAttr("required");
                    vm.roundFormIsVisible = false;
                };

                // This can be a little complex, but not too bad when thought 
                // through properly.
                // 1) Remove the round to delete from the Rounds array for the golfer.
                // 2) Update the golfer by sending the entire golfer document to the data store.
                vm.deleteRound = function (idx) {
                    if (confirm("Are you sure you want to delete this round?")) {
                        // var r = vm.rounds[idx];
                        //console.log("round to delete: " + angular.toJson(r));

                        //console.log("golfer: " + angular.toJson(vm.golfer));

                        // Remove the round to delete from the Rounds array for the 
                        // selected golfer.
                        vm.golfer.Rounds.splice(idx, 1);

                        //console.log("golfer after splice: " + angular.toJson(vm.golfer));

                        // Now send the entire golfer document to the service to update
                        // the document stored.
                        golferService.updateGolfer(vm.golfer).then(function (data) {

                        });
                    }
                };

                vm.closeRoundsPanel = function () {
                    vm.viewRoundsIsVisible = false;
                };



                // This is for the cascading dropdowns for adding a round of golf
                // for a golfer.

                // Load the Golf Club dropdown with data from the golf club service.
                golfClubService.getGolfClubs().then(function (data) {
                    vm.golfclubs = data;
                });

                vm.getGolfCourses = function () {
                    // From the selected golf club name, retrieve the selected golf club object.
                    vm.golfclub = getByName(vm.round.GolfCourse.GolfClubName, vm.golfclubs);

                    // Now get the GolfCourses array from the golf club object for the 
                    // second drop down.
                    vm.golfcourses = vm.golfclub.GolfCourses;
                };

                vm.getTees = function () {
                    // From the selected golf course name, retrieve the selected golf course object.
                    vm.golfcourse = getByName(vm.round.GolfCourse.GolfCourseName, vm.golfcourses);

                    // Now get the Tees array from the golf courses object for the third drop down.
                    vm.tees = vm.golfcourse.Tees;
                };

                // End Show Round Form






                // Begin Date functions for the Date Picker
                // This is the Angular/Bootstrap UI component.
                vm.today = function () {
                    vm.round.DatePlayed = new Date();
                };
                vm.today();

                vm.clear = function () {
                    vm.round.DatePlayed = null;
                };

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM/dd/yyyy'];
                vm.format = vm.formats[4];

                // End Date functions


                // Helper functions

                function getByName(name, myArray) {
                    return myArray.filter(function (obj) {
                        if (obj.Name == name) {
                            return obj;
                        }
                    })[0]
                }

                // This fixes the handicap index based on the golfers
                // scratch indicator, whether isPlus is true.  This tells
                // the function whether the golfer is really, Really good
                // and can shoot or break par, or is just an average golfer
                // and shoots above par.
                // -- isPlus = true = scratch golfer (good player)
                function fixHandicapIndex(hdcpIndex, isPlus) {
                    var result = hdcpIndex;

                    if (isPlus) {
                        result = hdcpIndex * -1;
                    } else {
                        result = Math.abs(hdcpIndex);
                    }

                    return result;
                }

                function hideAllForms() {
                    vm.golferFormIsVisible = false;
                    vm.roundFormIsVisible = false;
                    vm.viewRoundsIsVisible = false;
                }
            }]);
})();