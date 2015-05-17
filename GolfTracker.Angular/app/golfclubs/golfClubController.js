(function () {
    'use strict';

    angular.module('golftracker')
        .controller('golfClubController', ["golfClubService", function (golfClubService) {
            var vm = this;

            vm.golfclubs = [];
            vm.golfclub = {};
            vm.golfcourse = {};
            vm.tee = {};
            vm.teeIndex = -1;
            vm.courseIndex = -1;

            vm.teeFormIsVisible = false;
            vm.golfClubFormIsVisible = false;
            vm.golfCourseFormIsVisible = false;
            vm.golfCoursesTableIsVisible = false;
            vm.showViewCoursesButton = false;

            vm.isUpdate = false;
            vm.isDelete = false;

            vm.dialogTitle = "Add New";
            vm.teeFormTitle = "Add";
            vm.courseFormTitle = "Add";

            // Load the golf clubs table when the page loads.
            golfClubService.getGolfClubs().then(function (data) {
                //console.log("data: " + JSON.stringify(data));
                vm.golfclubs = data;
            });

            // Button to show or hide the "Add Golf Club Form"
            vm.showGolfClubForm = function () {
                hideAllForms()
                vm.dialogTitle = "Add New";
                vm.golfClubFormIsVisible = true;
                vm.golfclub = {};
                if (vm.golfClubFormIsVisible) {
                    $("#golfClubName").attr("required", "required");
                    vm.golfCourseFormIsVisible = false;
                } else {
                    $("#golfClubName").removeAttr("required");
                }
            };

            // Insert or update the Golf Club and all nested documents.
            vm.insertOrUpdate = function (golfclub) {
                if (golfclub.Name != undefined) {
                    if (golfclub.id == null) {
                        golfClubService.insertGolfClub(golfclub).then(function (data) {
                            vm.golfclubs.push(data.Result);
                            vm.golfclub = {};
                            vm.golfClubFormIsVisible = false;
                        });
                    } else {
                        golfClubService.updateGolfClub(golfclub).then(function (data) {
                            vm.golfclub = {};
                            vm.golfClubFormIsVisible = false;
                        });
                    }
                }
            };

            // Get the selected golf club from the list and display the form.
            vm.update = function (idx) {
                vm.dialogTitle = "Edit";
                vm.golfclub = vm.golfclubs[idx];
                vm.golfClubFormIsVisible = true;
            };

            // Delete the selected golf club.
            vm.delete = function (idx) {
                if (confirm("Are you sure you want to delete this golf club?")) {
                    var club = vm.golfclubs[idx];
                    golfClubService.deleteGolfClub(club).then(function (data) {
                        vm.golfclubs.splice(idx, 1);
                        vm.golfCoursesTableIsVisible = false;
                    });
                }
            };

            // The cancel button on the Golf Club form.
            vm.cancel = function () {
                // I'm removing the "required" attribute before hiding the form.
                // This prevents a JavaScript exception in Chrome when an input
                // field is not focusable.
                $("#golfClubName").removeAttr("required");
                vm.golfclub = {};
                vm.golfClubFormIsVisible = false;
            };

            // Display the Add Course form for the selected golf club.
            vm.showCourseForm = function (idx) {
                hideAllForms()
                vm.golfclub = vm.golfclubs[idx];
                vm.golfCourseFormIsVisible = true;
                vm.golfcourse = {};
                $("#golfCourseName").attr("required", "required");
            };

            // Add or edit the course to the golf club.
            vm.addOrUpdateCourse = function (id, courseObj) {
                // Validate the field.
                if (courseObj.Name == undefined) {
                    return;
                }

                // Get the golf club by the Id.
                var c = getById(id, vm.golfclubs);

                // Initialize the GolfCourses collection if it's null.
                if (c.GolfCourses === null) {
                    c.GolfCourses = [];
                }

                // Add the new GolfCourse object to the array.
                if (vm.isUpdate) {
                    // Replace the selected course information.
                    c.GolfCourses.splice(vm.courseIndex, 1, courseObj);
                } else {
                    // Add the new course to the array of golf courses.
                    c.GolfCourses.push(courseObj);
                }


                // Update the document.
                golfClubService.updateGolfClub(c).then(function (data) {
                    vm.golfCourseFormIsVisible = false;
                    vm.golfcourse = {};
                });
            };

            // Cancel the "Add Course" form.
            vm.cancelAddCourse = function () {
                $("#golfCourseName").removeAttr("required");
                vm.golfCourseFormIsVisible = false;
            };

            vm.showGolfCoursesTable = function (idx) {
                hideAllForms();
                vm.golfclub = vm.golfclubs[idx];
                vm.golfCoursesTableIsVisible = true;
            };

            vm.showTeeForm = function (id, idx) {
                // Get the golf club by the Id.
                var club = getById(id, vm.golfclubs);
                vm.golfcourse = club.GolfCourses[idx];
                vm.tee = { Gender: "Mens", Par: 72 };

                vm.teeFormIsVisible = true;
            };

            vm.cancelTeeForm = function () {
                $(".tee-form input").removeAttr("required");
                vm.teeFormIsVisible = false;
            };

            // Add or Edit the tee for the selected golf course.
            vm.submitTeeForm = function (isValid, id, course, tee) {
                if (!isValid) {
                    alert("This Tee form is not valid!");
                    return;
                }

                // Get the golf club by the Id.
                var club = getById(id, vm.golfclubs);

                // Initialize the Tees array if it's null.
                if (!vm.golfcourse.Tees) {
                    vm.golfcourse.Tees = [];
                }

                if (vm.golfcourse.Tees === null) {
                    vm.golfcourse.Tees = [];
                }

                // Add the new tee to the Tees array.
                // The 'club' object which represents the entire golf club document
                // is magically updated with the new Tee data.
                // Don't ask me how.  I said, don't ask me how!
                //course.Tees.push(tee);
                if (vm.isUpdate) {
                    // Replace the old tee with the new tee
                    vm.golfcourse.Tees.splice(vm.teeIndex, 1, tee);
                } else {
                    // Insert new tee
                    vm.golfcourse.Tees.push(tee);
                }


                // Update the entire document.
                golfClubService.updateGolfClub(club).then(function (data) {
                    vm.teeFormIsVisible = false;
                    vm.teeIndex = -1;
                    vm.isUpdate = false;
                    vm.isDelete = false;
                });
            };

            // Show the Tee form for editing.
            vm.editTee = function (gc, idx) {
                vm.teeFormTitle = "Edit";
                var t = gc.Tees[idx];
                vm.teeIndex = idx;

                vm.isUpdate = true;
                vm.golfcourse = gc;
                vm.tee = t;
                vm.teeFormIsVisible = true;
            };

            // Identify the tee for deletion, then update the club.
            vm.deleteTee = function (club, course, idx) {
                if (confirm("Are you sure you want to delete this tee?")) {
                    course.Tees.splice(idx, 1);

                    golfClubService.updateGolfClub(club).then(function (data) {
                        vm.teeFormIsVisible = false;
                        vm.teeIndex = -1;
                        vm.isUpdate = false;
                        vm.isDelete = false;
                    })
                }
            };

            vm.closeCoursesPanel = function () {
                vm.golfCoursesTableIsVisible = false;
            };

            vm.editCourse = function (club, gc, idx) {
                vm.courseFormTitle = "Edit";
                hideAllForms();
                vm.isUpdate = true;
                vm.golfCourseFormIsVisible = true;

                vm.courseIndex = idx;
                vm.golfclub = club;
                vm.golfcourse = gc;
                $("#golfCourseName").attr("required", "required");
            };

            vm.deleteCourse = function (club, gc, idx) {
                if (confirm("Are you sure you want to delete this golf course?")) {
                    club.GolfCourses.splice(idx, 1);

                    golfClubService.updateGolfClub(club).then(function (data) {
                        vm.golfCoursesTableIsVisible = false;
                        vm.courseIndex = -1;
                        vm.isUpdate = false;
                        vm.isDelete = false;
                    })
                }
            };




            // Helper functions

            function hideAllForms() {
                vm.golfClubFormIsVisible = false;
                vm.golfCourseFormIsVisible = false;
                vm.golfCoursesTableIsVisible = false;
            }

            function getById(id, myArray) {
                return myArray.filter(function (obj) {
                    if (obj.id == id) {
                        return obj
                    }
                })[0]
            }

            function getByName(name, myArray) {
                return myArray.filter(function (obj) {
                    if (obj.Name == name) {
                        return obj;
                    }
                })[0]
            }

        }]);
})();